import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import QuestionCard from './QuestionCard';
import ContentCard from './ContentCard';
import { getContent } from '../utils/journeyManager';

const JourneyFlow = ({ journey, mode, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [questionStats, setQuestionStats] = useState({ total: 0, completed: 0 });

  // Construire les étapes du parcours : alterner contenu et questions
  const buildJourneySteps = () => {
    const steps = [];
    
    if (!journey || !journey.modules) {
      return steps;
    }

    // Pour chaque module, créer une étape de contenu suivie d'une question
    journey.modules.forEach((module, index) => {
      // Étape de contenu
      const contentId = `content_${module.type}_${index}`;
      steps.push({
        type: 'content',
        id: contentId,
        module: module,
        moduleIndex: index,
        contentType: module.type,
        title: module.label,
      });

      // Question associée (utiliser les questions de démo selon le mode)
      const questionId = `question_${index}`;
      steps.push({
        type: 'question',
        id: questionId,
        moduleIndex: index,
        isLast: index === journey.modules.length - 1, // Marquer la dernière question
      });
    });

    // S'assurer qu'il y a toujours une question finale si le parcours se termine par du contenu
    const lastStep = steps[steps.length - 1];
    if (lastStep && lastStep.type === 'content') {
      steps.push({
        type: 'question',
        id: 'final_question',
        moduleIndex: journey.modules.length,
        isLast: true,
      });
    }

    return steps;
  };

  const steps = buildJourneySteps();
  const currentStep = steps[currentStepIndex];

  const handleContentNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      // Scroll automatique vers le haut
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Parcours terminé
      if (onComplete) {
        onComplete({
          total: questionStats.total,
          completed: questionStats.completed,
        });
      }
    }
  };

  const handleQuestionComplete = (stats) => {
    setQuestionStats(prev => ({
      total: prev.total + stats.total,
      completed: prev.completed + stats.completed,
    }));

    // Passer à l'étape suivante
    if (currentStepIndex < steps.length - 1) {
      setTimeout(() => {
        setCurrentStepIndex(currentStepIndex + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 500);
    } else {
      // Dernière question terminée
      if (onComplete) {
        onComplete({
          total: questionStats.total + stats.total,
          completed: questionStats.completed + stats.completed,
        });
      }
    }
  };

  // Obtenir le contenu pour l'étape actuelle
  const getCurrentContent = () => {
    if (currentStep?.type === 'content') {
      const moduleType = currentStep.module?.type;
      let contentId = 'article1';
      
      // Mapper le type de module au contenu approprié
      if (moduleType === 'article') {
        const articleIds = ['article1', 'article1b', 'article2', 'article3', 'article4', 'article5'];
        contentId = articleIds[currentStep.moduleIndex % articleIds.length] || 'article1';
      } else if (moduleType === 'exercice') {
        const exerciseIds = ['exercise1', 'exercise2', 'exercise3'];
        contentId = exerciseIds[currentStep.moduleIndex % exerciseIds.length] || 'exercise1';
      } else if (moduleType === 'exemple') {
        contentId = 'article2'; // Utiliser un article comme exemple
      } else if (moduleType === 'resume') {
        contentId = 'article3';
      }
      
      const contentData = getContent(contentId);
      
      return {
        id: currentStep.id,
        contentType: currentStep.contentType,
        title: currentStep.title || currentStep.module?.label,
        content: contentData?.content || `<p>Contenu pour ${currentStep.module?.label}</p>`,
      };
    }
    return null;
  };

  if (steps.length === 0) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {currentStep?.type === 'content' && (
        <ContentCard
          key={currentStep.id}
          content={getCurrentContent()}
          onNext={handleContentNext}
          onComplete={currentStepIndex === steps.length - 1 ? handleContentNext : undefined}
        />
      )}

      {currentStep?.type === 'question' && (
        <QuestionCard
          key={currentStep.id}
          mode={mode}
          onComplete={handleQuestionComplete}
        />
      )}
    </AnimatePresence>
  );
};

export default JourneyFlow;

