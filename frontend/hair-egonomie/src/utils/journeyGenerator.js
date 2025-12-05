/**
 * Générateur de parcours intelligent basé sur les réponses de configuration
 * Combine : Niveau + Intention + Rythme + Style d'apprentissage
 */

export const generateJourney = (answers) => {
  const { level, intention, rythme, style } = answers;

  // Modules de base disponibles
  const modules = {
    article: { type: 'article', label: 'Article', icon: '📖', duration: '5-10 min' },
    exercice: { type: 'exercice', label: 'Exercice', icon: '💪', duration: '10-15 min' },
    exemple: { type: 'exemple', label: 'Exemple', icon: '💡', duration: '2-3 min' },
    resume: { type: 'resume', label: 'Résumé', icon: '📝', duration: '2-5 min' },
  };

  let journey = [];

  // Logique principale selon l'intention
  if (intention === 'comprendre') {
    // Intention : Comprendre
    if (style === 'exemples') {
      journey = [modules.article, modules.exemple, modules.exercice];
    } else if (style === 'explications') {
      journey = [modules.article, modules.resume, modules.exercice];
    } else if (style === 'visuel') {
      journey = [modules.exemple, modules.article, modules.exercice];
    } else {
      // pratique
      journey = [modules.article, modules.exercice, modules.exemple];
    }
  } else if (intention === 'voir') {
    // Intention : Voir (remplacé par Explorer visuellement)
    journey = [modules.exemple, modules.resume, modules.exercice];
    
    if (style === 'pratique') {
      journey = [modules.exemple, modules.exercice, modules.resume];
    }
  } else if (intention === 'pratiquer') {
    // Intention : Pratiquer
    journey = [modules.exercice, modules.article, modules.exemple];
    
    if (style === 'explications') {
      journey = [modules.exercice, modules.resume, modules.article];
    }
  } else {
    // Intention : Explorer
    // Mélange progressif selon le niveau
    if (level === 'debutant') {
      journey = [modules.exemple, modules.article, modules.exercice];
    } else if (level === 'intermediaire') {
      journey = [modules.article, modules.exemple, modules.exercice];
    } else {
      journey = [modules.exercice, modules.exemple, modules.article];
    }
  }

  // Adapter selon le niveau
  if (level === 'debutant') {
    // Pour débutants : simplifier, éviter surcharge
    journey = journey.filter((m) => m.type !== 'resume'); // Pas de résumé complexe
  } else if (level === 'avance') {
    // Pour avancés : ajouter des défis
    if (!journey.find((m) => m.type === 'exercice')) {
      journey.push(modules.exercice);
    }
  }

  // Adapter selon le style
  if (style === 'exemples' && !journey.find((m) => m.type === 'exemple')) {
    journey.splice(1, 0, modules.exemple);
  }
  if (style === 'visuel' && !journey.find((m) => m.type === 'exemple')) {
    journey.unshift(modules.exemple);
  }
  if (style === 'pratique' && !journey.find((m) => m.type === 'exercice')) {
    journey.unshift(modules.exercice);
  }

  // Configuration du rythme
  const rhythmConfig = {
    doucement: {
      transitionDuration: 0.8,
      revealDelay: 2000,
      showOneAtATime: true,
    },
    rapidement: {
      transitionDuration: 0.4,
      revealDelay: 800,
      showOneAtATime: false,
    },
    auto: {
      transitionDuration: 0.6,
      revealDelay: 1200,
      showOneAtATime: true,
    },
  };

  return {
    modules: journey,
    config: {
      level,
      intention,
      rythme,
      style,
      ...rhythmConfig[rythme || 'auto'],
    },
    description: getJourneyDescription(answers),
  };
};

const getJourneyDescription = (answers) => {
  const { level, intention, rythme, style } = answers;
  
  let desc = `Parcours personnalisé pour niveau ${level}, `;
  desc += `intention "${intention}", `;
  desc += `rythme ${rythme}, `;
  desc += `style ${style}`;
  
  return desc;
};

