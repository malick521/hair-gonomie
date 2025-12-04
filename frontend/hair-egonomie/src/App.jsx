import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';

// Import des composants
import SplashScreen from './components/SplashScreen';
import ModeSelector from './components/ModeSelector';
import QuestionCard from './components/QuestionCard';
import NextButton from './components/NextButton';

function App() {
  const [step, setStep] = useState("splash");
  const [mode, setMode] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    // Révélation progressive du bouton après un délai
    setTimeout(() => {
      setShowNextButton(true);
    }, 800);
  };

  const handleSplashComplete = () => {
    setStep("mode");
  };

  const handleNext = () => {
    setShowNextButton(false);
    setStep("questions");
  };

  return (
    <AnimatePresence mode="wait">
      {step === "splash" && (
        <SplashScreen key="splash" next={handleSplashComplete} />
      )}
      
      {step === "mode" && (
        <>
          <ModeSelector 
            key="mode" 
            onSelect={handleModeSelect} 
          />
          {showNextButton && (
            <NextButton
              label={`Commencer par ${mode?.toLowerCase()}`}
              onClick={handleNext}
              isVisible={showNextButton}
              delay={0.2}
            />
          )}
        </>
      )}

      {step === "questions" && (
        <QuestionCard key="questions" mode={mode} />
      )}
    </AnimatePresence>
  );
}

export default App;
