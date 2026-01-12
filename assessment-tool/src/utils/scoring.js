// Weighted scoring algorithm for determining primary and secondary archetypes

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
