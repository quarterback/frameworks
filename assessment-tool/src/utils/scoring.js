// Weighted scoring algorithm for determining primary and secondary archetypes

export const calculateScores = (answers) => {
  // Initialize scores for all archetypes
  const scores = {
    nakki: 0,
    tuuli: 0,
    lehto: 0,
    poro: 0,
    kaiko: 0,
    saita: 0,
    miko: 0
  };

  // Module presence tracking for cross-module coherence
  const modulePresence = {
    nakki: new Set(),
    tuuli: new Set(),
    lehto: new Set(),
    poro: new Set(),
    kaiko: new Set(),
    saita: new Set(),
    miko: new Set()
  };

  // Process each answer and accumulate weighted scores
  Object.entries(answers).forEach(([questionId, answerId]) => {
    // Extract module from question ID (e.g., 'a1' -> 'a')
    const moduleId = questionId.charAt(0);
    
    // Find the question and selected answer
    const answer = findAnswer(questionId, answerId);
    
    if (answer && answer.weights) {
      // Add weighted scores to each archetype
      Object.entries(answer.weights).forEach(([archetype, weight]) => {
        scores[archetype] += weight;
        modulePresence[archetype].add(moduleId);
      });
    }
  });

  // Calculate total for percentage normalization
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

  // Apply cross-module coherence bonus
  // Archetypes appearing in 3+ modules get a 15% bonus
  Object.keys(scores).forEach(archetype => {
    if (modulePresence[archetype].size >= 3) {
      scores[archetype] *= 1.15;
    }
  });

  // Recalculate total after bonuses
  const totalWithBonus = Object.values(scores).reduce((sum, score) => sum + score, 0);

  // Convert to percentages
  const percentages = {};
  Object.keys(scores).forEach(archetype => {
    percentages[archetype] = totalWithBonus > 0 
      ? Math.round((scores[archetype] / totalWithBonus) * 100)
      : 0;
  });

  return percentages;
};

export const determineArchetypes = (percentages) => {
  // Sort archetypes by percentage
  const sorted = Object.entries(percentages)
    .sort(([, a], [, b]) => b - a);

  // Primary is highest, secondary is second highest
  const primary = sorted[0][0];
  const secondary = sorted[1][0];

  return {
    primary,
    secondary,
    scores: percentages,
    modulePresence: null // We could expose this for debugging
  };
};

// Helper function to find answer data from question ID and answer ID
const findAnswer = (questionId, answerId) => {
  // Import questions data (this will be available in the component context)
  // For now, we'll handle this in the component that calls this function
  // This is a helper that will be used with the actual questions data
  return null;
};

// Updated version that accepts questions data
export const calculateScoresWithQuestions = (answers, modules) => {
  const scores = {
    nakki: 0,
    tuuli: 0,
    lehto: 0,
    poro: 0,
    kaiko: 0,
    saita: 0,
    miko: 0
  };

  const modulePresence = {
    nakki: new Set(),
    tuuli: new Set(),
    lehto: new Set(),
    poro: new Set(),
    kaiko: new Set(),
    saita: new Set(),
    miko: new Set()
  };

  // Build a lookup map for questions
  const questionMap = {};
  modules.forEach(module => {
    module.questions.forEach(question => {
      questionMap[question.id] = question;
    });
  });

  // Process each answer
  Object.entries(answers).forEach(([questionId, answerId]) => {
    const moduleId = questionId.charAt(0);
    const question = questionMap[questionId];
    
    if (question) {
      const answer = question.answers.find(a => a.id === answerId);
      
      if (answer && answer.weights) {
        Object.entries(answer.weights).forEach(([archetype, weight]) => {
          scores[archetype] += weight;
          modulePresence[archetype].add(moduleId);
        });
      }
    }
  });

  // Apply cross-module coherence bonus (15% for appearing in 3+ modules)
  Object.keys(scores).forEach(archetype => {
    if (modulePresence[archetype].size >= 3) {
      scores[archetype] *= 1.15;
    }
  });

  // Calculate total
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);

  // Convert to percentages
  const percentages = {};
  Object.keys(scores).forEach(archetype => {
    percentages[archetype] = total > 0 
      ? Math.round((scores[archetype] / total) * 100)
      : 0;
  });

  // Sort and determine primary/secondary
  const sorted = Object.entries(percentages)
    .sort(([, a], [, b]) => b - a);

  return {
    primary: sorted[0][0],
    secondary: sorted[1][0],
    scores: percentages,
    modulePresence: Object.fromEntries(
      Object.entries(modulePresence).map(([k, v]) => [k, v.size])
    )
  };
};
