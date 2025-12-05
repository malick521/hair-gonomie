import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TradingBackground from './TradingBackground';

// Questions de démonstration selon le mode sélectionné
const DEMO_QUESTIONS = {
  "Découvrir": [
    "Qu'est-ce que l'ergonomie dans le design d'interface ?",
    "Pourquoi la révélation progressive améliore-t-elle l'expérience utilisateur ?",
    "Comment réduire la charge cognitive dans une interface ?",
    "Quels sont les principes clés du design minimaliste ?"
  ],
  "Apprendre": [
    "Quelle est la différence entre UX et UI design ?",
    "Comment le parcours guidé réduit-il la friction utilisateur ?",
    "Pourquoi limiter les choix à une seule action à la fois ?",
    "Quels sont les bénéfices d'une navigation progressive ?"
  ],
  "S'exercer": [
    "Testez cette interface : que ressentez-vous pendant la navigation ?",
    "Identifiez les micro-interactions dans cette application.",
    "Analysez comment l'animation guide votre attention.",
    "Évaluez la fluidité de ce parcours guidé."
  ]
};

const QuestionCard = ({ mode, onComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(AUTO_ADVANCE_DELAY);
  const autoAdvanceTimerRef = useRef(null);
  const countdownTimerRef = useRef(null);
  const AUTO_ADVANCE_DELAY = 5000; // 5 secondes par question

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      
      try {
        const res = await fetch("http://127.0.0.1:8000/api/questions/");
        if (res.ok) {
          const data = await res.json();
          if (data.questions && data.questions.length > 0) {
            setQuestions(data.questions);
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // Backend non disponible - continuer avec les questions de démo
        console.log("Backend non disponible, utilisation des questions de démonstration");
      }
      
      // Utiliser les questions de démo selon le mode
      // Normaliser le mode pour correspondre aux clés de DEMO_QUESTIONS
      let normalizedMode = mode;
      if (mode && typeof mode === 'string') {
        // Correspondance flexible pour les modes
        const modeLower = mode.toLowerCase();
        if (modeLower.includes("découvrir") || modeLower.includes("decouvrir")) {
          normalizedMode = "Découvrir";
        } else if (modeLower.includes("apprendre")) {
          normalizedMode = "Apprendre";
        } else if (modeLower.includes("exercer") || modeLower.includes("s'exercer")) {
          normalizedMode = "S'exercer";
        } else if (mode === "Découvrir" || mode === "Apprendre" || mode === "S'exercer") {
          // Mode déjà correct
          normalizedMode = mode;
        } else {
          // Mode non reconnu, utiliser "Découvrir" par défaut
          normalizedMode = "Découvrir";
        }
      } else {
        // Mode null ou undefined, utiliser "Découvrir" par défaut
        normalizedMode = "Découvrir";
      }
      
      // Utiliser le mode normalisé ou "Découvrir" par défaut
      const demoQuestions = DEMO_QUESTIONS[normalizedMode] || DEMO_QUESTIONS["Découvrir"];
      console.log("Utilisation des questions de démonstration pour le mode:", normalizedMode);
      setQuestions(demoQuestions);
      setIsLoading(false);
    };

    loadQuestions();
  }, [mode]);

  const handleNext = useCallback(() => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < questions.length - 1) {
        return prevIndex + 1;
      } else {
        // Dernière question terminée
        if (onComplete) {
          onComplete({
            total: questions.length,
            completed: questions.length,
          });
        }
        return prevIndex;
      }
    });
  }, [questions.length, onComplete]);

  // Timer automatique pour avancer les questions
  useEffect(() => {
    if (questions.length === 0 || isLoading) return;

    // Nettoyer les timers précédents
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }

    // Si c'est la dernière question, ne pas avancer automatiquement
    if (currentQuestionIndex >= questions.length - 1) {
      setTimeRemaining(0);
      return;
    }

    // Réinitialiser le compte à rebours
    setTimeRemaining(AUTO_ADVANCE_DELAY);

    // Compte à rebours visuel
    countdownTimerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 100) {
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    // Créer un nouveau timer pour la question suivante
    autoAdvanceTimerRef.current = setTimeout(() => {
      handleNext();
    }, AUTO_ADVANCE_DELAY);

    // Nettoyer les timers au démontage ou changement de question
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
        autoAdvanceTimerRef.current = null;
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = null;
      }
    };
  }, [currentQuestionIndex, questions.length, isLoading, handleNext]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
        }}
      >
        <motion.div
          style={{
            textAlign: 'center',
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              fontSize: '3rem',
              marginBottom: '1.5rem',
            }}
          >
            ✨
          </motion.div>
          <motion.p
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 500,
            }}
          >
            Chargement des questions...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  if (questions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontSize: '1.25rem',
          color: 'rgba(255, 255, 255, 0.8)',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
        }}
      >
        Aucune question disponible
      </motion.div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 4vw, 2rem)',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Cartes flottantes en arrière-plan */}
      <TradingBackground />
      
      {/* Overlay élégant */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(236, 72, 153, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(219, 39, 119, 0.02) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
      {/* Overlay sombre pour mieux voir les cartes */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.1)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
      {/* Barre de progression */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #ec4899 0%, #db2777 50%, #be185d 100%)',
          zIndex: 1000,
          boxShadow: '0 2px 20px rgba(236, 72, 153, 0.5)',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: 'min(700px, 95vw)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: 'rgba(20, 20, 20, 0.7)',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              borderRadius: 'clamp(1rem, 4vw, 2rem)',
              padding: 'clamp(1.5rem, 5vw, 3rem)',
              boxShadow: `
                0 20px 60px rgba(0, 0, 0, 0.5),
                0 8px 32px rgba(236, 72, 153, 0.2),
                inset 0 1px 0 rgba(236, 72, 153, 0.15)
              `,
              border: '1px solid rgba(236, 72, 153, 0.2)',
            }}
          >
            {/* Indicateur de question */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: 'clamp(1rem, 3vw, 2rem)',
              }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                  color: 'rgba(236, 72, 153, 0.7)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Question {currentQuestionIndex + 1} sur {questions.length}
              </motion.span>
              
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  display: 'flex',
                  gap: 'clamp(0.25rem, 1vw, 0.5rem)',
                  flexWrap: 'wrap',
                }}
              >
                {questions.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: 'clamp(6px, 1.5vw, 8px)',
                      height: 'clamp(6px, 1.5vw, 8px)',
                      borderRadius: '50%',
                      background: index === currentQuestionIndex
                        ? '#ec4899'
                        : index < currentQuestionIndex
                        ? 'rgba(236, 72, 153, 0.6)'
                        : 'rgba(236, 72, 153, 0.2)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Question */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #f472b6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
                lineHeight: 1.3,
                letterSpacing: '-0.02em',
              }}
            >
              {currentQuestion}
            </motion.h2>

            {/* Barre de progression automatique */}
            {currentQuestionIndex < questions.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  width: '100%',
                  height: '3px',
                  background: 'rgba(236, 72, 153, 0.2)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  marginBottom: 'clamp(1rem, 3vw, 2rem)',
                }}
              >
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ 
                    scaleX: timeRemaining / AUTO_ADVANCE_DELAY,
                  }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #ec4899 0%, #db2777 50%, #be185d 100%)',
                    transformOrigin: 'left',
                  }}
                />
              </motion.div>
            )}

            {/* Bouton d'action */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 'clamp(1rem, 3vw, 2rem)',
              }}
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 12px 40px -8px rgba(236, 72, 153, 0.5)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  style={{
                    padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 3vw, 2rem)',
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: 'clamp(0.5rem, 2vw, 0.75rem)',
                    background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                    boxShadow: '0 8px 24px rgba(236, 72, 153, 0.4)',
                    width: 'auto',
                    minWidth: 'fit-content',
                  }}
                >
                  <span>Suivant</span>
                  <motion.svg
                    width="clamp(16px, 3vw, 20px)"
                    height="clamp(16px, 3vw, 20px)"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </motion.svg>
                </motion.button>
              ) : (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 12px 40px -8px rgba(236, 72, 153, 0.5)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Passer à la page de résultats avec les statistiques
                    if (onComplete) {
                      onComplete({
                        total: questions.length,
                        completed: questions.length,
                      });
                    }
                  }}
                  style={{
                    padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 3vw, 2rem)',
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: 'clamp(0.5rem, 2vw, 0.75rem)',
                    background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)',
                    color: 'white',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(236, 72, 153, 0.4)',
                    width: 'auto',
                    minWidth: 'fit-content',
                  }}
                >
                  Voir les résultats
                </motion.button>
      )}
    </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
