// Quiz questions organized by module
// Each answer maps to multiple archetypes with different weights

export const modules = [
  {
    id: 'module-a',
    name: 'Module A: Meaning-Making Under Ambiguity',
    description: 'How you interpret unclear signals and construct understanding in relationships',
    questions: [
      {
        id: 'a1',
        text: "When your partner is quieter than usual, your first instinct is to:",
        answers: [
          {
            id: 'a',
            text: "Give them space and wait for them to bring it up when ready",
            weights: { tuuli: 3, lehto: 2 }
          },
          {
            id: 'b',
            text: "Check in directly - \"You seem quiet, is something on your mind?\"",
            weights: { kaiko: 3, nakki: 2 }
          }
        ]
      },
      {
        id: 'a2',
        text: "In the early stages of a relationship issue, you're more likely to:",
        answers: [
          {
            id: 'a',
            text: "Watch patterns over time before naming it",
            weights: { nakki: 3, saita: 2 }
          },
          {
            id: 'b',
            text: "Address it in the moment when you first notice",
            weights: { kaiko: 3, tuuli: 2 }
          }
        ]
      },
      {
        id: 'a3',
        text: "When a partner seems distant, you tend to:",
        answers: [
          {
            id: 'a',
            text: "Assume it's about something external to the relationship",
            weights: { tuuli: 3, nakki: 1 }
          },
          {
            id: 'b',
            text: "Wonder if you did something to cause it",
            weights: { saita: 3, lehto: 2 }
          }
        ]
      },
      {
        id: 'a4',
        text: "You're better at:",
        answers: [
          {
            id: 'a',
            text: "Seeing the forest - patterns, trajectories, where things are heading",
            weights: { nakki: 3, saita: 2 }
          },
          {
            id: 'b',
            text: "Seeing the trees - specific moments, what's happening right now",
            weights: { tuuli: 3, kaiko: 2 }
          }
        ]
      },
      {
        id: 'a5',
        text: "When something feels 'off' but you can't name it:",
        answers: [
          {
            id: 'a',
            text: "You trust that clarity will come with time",
            weights: { tuuli: 3, saita: 2 }
          },
          {
            id: 'b',
            text: "You actively work to understand what's causing the feeling",
            weights: { nakki: 3, kaiko: 2 }
          }
        ]
      },
      {
        id: 'a6',
        text: "In relationships, you're more oriented toward:",
        answers: [
          {
            id: 'a',
            text: "Understanding the story of how you got here",
            weights: { saita: 3, nakki: 2 }
          },
          {
            id: 'b',
            text: "Responding to what's present right now",
            weights: { tuuli: 3, kaiko: 1 }
          }
        ]
      }
    ]
  },
  {
    id: 'module-b',
    name: 'Module B: Energy & Regulation Rhythms',
    description: 'How you recover, engage, and deplete - your nervous system baseline in partnership',
    questions: [
      {
        id: 'b1',
        text: "After a long week, connection with your partner happens best when you:",
        answers: [
          {
            id: 'a',
            text: "Do something active together (cook, walk, project)",
            weights: { poro: 3, kaiko: 1 }
          },
          {
            id: 'b',
            text: "Settle into quiet presence (movie, reading side-by-side)",
            weights: { lehto: 3, tuuli: 2 }
          }
        ]
      },
      {
        id: 'b2',
        text: "Your ideal recovery after social depletion:",
        answers: [
          {
            id: 'a',
            text: "Complete solitude - alone time is non-negotiable",
            weights: { miko: 3, lehto: 2 }
          },
          {
            id: 'b',
            text: "Low-key presence with partner - together but not demanding",
            weights: { lehto: 3, tuuli: 2 }
          }
        ]
      },
      {
        id: 'b3',
        text: "In partnership, your energy typically:",
        answers: [
          {
            id: 'a',
            text: "Stays fairly steady with reliable peaks and dips",
            weights: { poro: 3, lehto: 2 }
          },
          {
            id: 'b',
            text: "Varies significantly based on external factors",
            weights: { tuuli: 3, kaiko: 1 }
          }
        ]
      },
      {
        id: 'b4',
        text: "When emotionally flooded, you need to:",
        answers: [
          {
            id: 'a',
            text: "Move, do something physical, shift your state actively",
            weights: { poro: 3, kaiko: 2 }
          },
          {
            id: 'b',
            text: "Withdraw to a calm environment and let it settle",
            weights: { lehto: 3, miko: 2 }
          }
        ]
      },
      {
        id: 'b5',
        text: "You tend to regulate through:",
        answers: [
          {
            id: 'a',
            text: "External activity - doing things, changing environment",
            weights: { poro: 3, kaiko: 1 }
          },
          {
            id: 'b',
            text: "Internal processing - reflection, rest, stillness",
            weights: { lehto: 3, saita: 2 }
          }
        ]
      },
      {
        id: 'b6',
        text: "Living with a partner, you need:",
        answers: [
          {
            id: 'a',
            text: "Shared rhythm and routine to feel grounded",
            weights: { poro: 3, lehto: 2 }
          },
          {
            id: 'b',
            text: "Flexibility to shift rhythms as needed",
            weights: { tuuli: 3, miko: 1 }
          }
        ]
      },
      {
        id: 'b7',
        text: "Your baseline relationship energy is:",
        answers: [
          {
            id: 'a',
            text: "High and consistent - naturally inclined toward engagement",
            weights: { poro: 3, kaiko: 2 }
          },
          {
            id: 'b',
            text: "Moderate and selective - energy goes to what matters most",
            weights: { miko: 3, lehto: 2 }
          }
        ]
      }
    ]
  },
  {
    id: 'module-c',
    name: 'Module C: Structure, Time, and Coordination',
    description: 'How you relate to plans, routines, and emergence with a partner',
    questions: [
      {
        id: 'c1',
        text: "When making weekend plans with a partner:",
        answers: [
          {
            id: 'a',
            text: "You like having a rough idea by Thursday",
            weights: { nakki: 3, poro: 2 }
          },
          {
            id: 'b',
            text: "You're comfortable deciding Saturday morning",
            weights: { tuuli: 3, kaiko: 1 }
          }
        ]
      },
      {
        id: 'c2',
        text: "In your ideal relationship rhythm:",
        answers: [
          {
            id: 'a',
            text: "Some things are consistent anchors (Sunday breakfast, Tuesday walks)",
            weights: { poro: 3, lehto: 2 }
          },
          {
            id: 'b',
            text: "Most things stay flexible based on how you both feel",
            weights: { tuuli: 3, miko: 1 }
          }
        ]
      },
      {
        id: 'c3',
        text: "When plans change last minute:",
        answers: [
          {
            id: 'a',
            text: "It's mostly fine - you adapt easily",
            weights: { tuuli: 3, kaiko: 2 }
          },
          {
            id: 'b',
            text: "It's harder than you'd like - you'd mentally prepared",
            weights: { nakki: 3, saita: 2 }
          }
        ]
      },
      {
        id: 'c4',
        text: "You're more likely to:",
        answers: [
          {
            id: 'a',
            text: "Suggest a plan and take initiative on logistics",
            weights: { nakki: 3, poro: 2 }
          },
          {
            id: 'b',
            text: "Go with flow and contribute to whatever emerges",
            weights: { tuuli: 3, lehto: 1 }
          }
        ]
      },
      {
        id: 'c5',
        text: "Living together, you prefer:",
        answers: [
          {
            id: 'a',
            text: "Clear systems for household coordination",
            weights: { nakki: 3, poro: 2 }
          },
          {
            id: 'b',
            text: "Organic division of labor that shifts as needed",
            weights: { tuuli: 3, miko: 1 }
          }
        ]
      },
      {
        id: 'c6',
        text: "When thinking about the relationship long-term:",
        answers: [
          {
            id: 'a',
            text: "You naturally think ahead about future stages and transitions",
            weights: { nakki: 3, saita: 2 }
          },
          {
            id: 'b',
            text: "You focus on building a strong present and trust the future will unfold",
            weights: { tuuli: 3, kaiko: 1 }
          }
        ]
      }
    ]
  },
  {
    id: 'module-d',
    name: 'Module D: Proximity, Intimacy, and Space',
    description: 'How closeness actually feels over time - daily coexistence patterns',
    questions: [
      {
        id: 'd1',
        text: "Living with a partner, your ideal daily pattern includes:",
        answers: [
          {
            id: 'a',
            text: "Meaningful stretches of parallel time (same space, separate activities)",
            weights: { lehto: 3, miko: 2 }
          },
          {
            id: 'b',
            text: "Natural flow between together and apart without much structure",
            weights: { tuuli: 3, kaiko: 1 }
          }
        ]
      },
      {
        id: 'd2',
        text: "Deep intimacy for you is more about:",
        answers: [
          {
            id: 'a',
            text: "Shared experiences and doing things together",
            weights: { poro: 3, kaiko: 2 }
          },
          {
            id: 'b',
            text: "Emotional transparency and being fully known",
            weights: { lehto: 3, saita: 2 }
          }
        ]
      },
      {
        id: 'd3',
        text: "After several days of intense togetherness:",
        answers: [
          {
            id: 'a',
            text: "You actively need solo time to feel like yourself again",
            weights: { miko: 3, kaiko: 2 }
          },
          {
            id: 'b',
            text: "You're generally fine with sustained closeness",
            weights: { lehto: 3, poro: 2 }
          }
        ]
      },
      {
        id: 'd4',
        text: "In the day-to-day of living together:",
        answers: [
          {
            id: 'a',
            text: "You like creating a shared sanctuary - home as refuge",
            weights: { lehto: 3, saita: 2 }
          },
          {
            id: 'b',
            text: "You like having a home base for independent adventures",
            weights: { kaiko: 3, miko: 2 }
          }
        ]
      },
      {
        id: 'd5',
        text: "Your ideal level of daily check-in with a partner:",
        answers: [
          {
            id: 'a',
            text: "Frequent light touch - texts, quick calls, staying connected",
            weights: { poro: 3, lehto: 2 }
          },
          {
            id: 'b',
            text: "Minimal unless something important comes up",
            weights: { miko: 3, tuuli: 1 }
          }
        ]
      },
      {
        id: 'd6',
        text: "When your partner needs space:",
        answers: [
          {
            id: 'a',
            text: "You easily give it without taking it personally",
            weights: { tuuli: 3, miko: 2 }
          },
          {
            id: 'b',
            text: "You understand it intellectually but feel it as distance",
            weights: { lehto: 3, saita: 2 }
          }
        ]
      }
    ]
  },
  {
    id: 'module-e',
    name: 'Module E: Repair, Drift, and Reassessment',
    description: 'What you do when things strain, stall, or need recalibration',
    questions: [
      {
        id: 'e1',
        text: "When something feels 'off' in your relationship:",
        answers: [
          {
            id: 'a',
            text: "You need to talk about it fairly soon to feel settled",
            weights: { kaiko: 3, nakki: 2 }
          },
          {
            id: 'b',
            text: "You sit with it for a while to understand it before discussing",
            weights: { saita: 3, tuuli: 2 }
          }
        ]
      },
      {
        id: 'e2',
        text: "During a rough patch, you're more likely to:",
        answers: [
          {
            id: 'a',
            text: "Actively work on it - read, discuss, try new approaches",
            weights: { nakki: 3, poro: 2 }
          },
          {
            id: 'b',
            text: "Give it breathing room and see what shifts naturally",
            weights: { tuuli: 3, lehto: 1 }
          }
        ]
      },
      {
        id: 'e3',
        text: "After a conflict, you typically:",
        answers: [
          {
            id: 'a',
            text: "Want to process what happened and what it means",
            weights: { saita: 3, nakki: 2 }
          },
          {
            id: 'b',
            text: "Move forward once you've both cooled down",
            weights: { tuuli: 3, kaiko: 1 }
          }
        ]
      },
      {
        id: 'e4',
        text: "When you sense growing distance:",
        answers: [
          {
            id: 'a',
            text: "You bring it up before it becomes a bigger issue",
            weights: { kaiko: 3, nakki: 2 }
          },
          {
            id: 'b',
            text: "You trust you'll naturally reconnect when conditions change",
            weights: { tuuli: 3, lehto: 1 }
          }
        ]
      },
      {
        id: 'e5',
        text: "Your approach to relationship maintenance:",
        answers: [
          {
            id: 'a',
            text: "Regular check-ins and preventive conversations",
            weights: { nakki: 3, poro: 2 }
          },
          {
            id: 'b',
            text: "Address things as they come up, not on a schedule",
            weights: { tuuli: 3, miko: 1 }
          }
        ]
      },
      {
        id: 'e6',
        text: "When the relationship needs recalibration:",
        answers: [
          {
            id: 'a',
            text: "You notice the pattern and suggest a conversation",
            weights: { nakki: 3, saita: 2 }
          },
          {
            id: 'b',
            text: "You adjust your own approach and see what unfolds",
            weights: { tuuli: 3, lehto: 1 }
          }
        ]
      }
    ]
  }
];

export const getTotalQuestions = () => {
  return modules.reduce((sum, module) => sum + module.questions.length, 0);
};
