// Seven relationship archetypes with complete descriptions

export const archetypes = {
  nakki: {
    id: 'nakki',
    name: 'Näkki',
    subtitle: 'The Navigator',
    description: 'Strategic anticipator who sees patterns and plans ahead. Helps relationships navigate complexity and think long-term.',
    
    fullDescription: 'You operate by reading the terrain ahead, spotting patterns before they fully form, and helping your relationship navigate complexity with strategic foresight. You think in timelines and trajectories, naturally anticipating what might need attention before it becomes urgent.',
    
    recognizableBehaviors: [
      "You're the one who says \"we should probably talk about X\" before X becomes a problem",
      "You notice patterns in your relationship that your partner hasn't seen yet",
      "You think about relationship stages and transitions well in advance",
      "You find yourself planning for contingencies that may never happen"
    ],
    
    energizingCondition: "This role feels energizing when your foresight prevents problems and creates smoother sailing for both of you.",
    
    costlyCondition: "This role becomes costly when your partner experiences your anticipation as anxiety, or when you spend energy on scenarios that never materialize.",
    
    motto: "I see where we're heading before we get there",
    
    strengths: [
      "Prevents problems through early identification and strategic planning",
      "Provides long-term perspective that helps relationships weather uncertainty",
      "Creates structure and anticipatory systems that reduce future friction"
    ],
    
    frictionPoints: {
      exhausts: "Constantly monitoring for future issues without being able to be present",
      weakContexts: "Highly unpredictable environments where planning feels futile",
      whenBlocked: "When prevented from operating in Navigator mode, you may become anxious about unaddressed future risks or withdraw into overthinking"
    },
    
    compatibility: {
      worksWellWith: {
        archetype: "Tuuli (Responder)",
        reason: "Your strategic foresight pairs beautifully with their adaptive responsiveness - you anticipate, they adjust, creating balanced navigation"
      },
      potentialFrictionWith: {
        archetype: "Lehto (Tender)",
        reason: "Your future-focus can feel at odds with their present-focused care - they want to tend what's here now, you're already thinking three moves ahead"
      },
      requiresCoordinationWith: {
        archetype: "Kaiko (Foreguard)",
        reason: "Both of you operate at the leading edge - watch for over-planning or getting too far ahead of the relationship's actual needs"
      }
    }
  },
  
  tuuli: {
    id: 'tuuli',
    name: 'Tuuli',
    subtitle: 'The Responder',
    description: 'Real-time adjuster who adapts fluidly and is comfortable with emergence. Doesn\'t need everything defined to feel secure.',
    
    fullDescription: 'You operate by reading what\'s present and responding with fluidity, adjusting to conditions as they shift without needing everything mapped out in advance. You\'re comfortable with emergence and ambiguity, trusting that clarity comes through engagement rather than upfront planning.',
    
    recognizableBehaviors: [
      "You can shift plans without much disruption to your inner state",
      "You trust that you'll figure it out in the moment rather than planning extensively",
      "You're comfortable with relationship ambiguity that would make others anxious",
      "You adjust your approach based on what your partner needs right now, not what the plan was"
    ],
    
    energizingCondition: "This role feels energizing when your adaptability helps the relationship flow smoothly through changing circumstances.",
    
    costlyCondition: "This role becomes costly when your partner needs more structure than you naturally provide, or when you're expected to commit to plans far in advance.",
    
    motto: "We'll feel it out as we go",
    
    strengths: [
      "Brings flexibility and ease to relationship navigation",
      "Reduces friction by adapting to what's actually happening rather than what was expected",
      "Creates space for organic evolution of connection"
    ],
    
    frictionPoints: {
      exhausts: "Being held to rigid plans or having to operate with extensive advance structure",
      weakContexts: "Situations requiring long-term commitments or detailed coordination",
      whenBlocked: "When prevented from operating in Responder mode, you may feel trapped by structure or become passive-resistant to planning"
    },
    
    compatibility: {
      worksWellWith: {
        archetype: "Näkki (Navigator)",
        reason: "Their strategic planning provides direction while your adaptability handles the unexpected - complementary navigation styles"
      },
      potentialFrictionWith: {
        archetype: "Poro (Propeller)",
        reason: "Your emergent approach can frustrate their need for consistent momentum and clear direction"
      },
      requiresCoordinationWith: {
        archetype: "Miko (Specialist)",
        reason: "Your flexibility needs to respect their context-specific boundaries - neither should have to compromise their operating style entirely"
      }
    }
  },
  
  lehto: {
    id: 'lehto',
    name: 'Lehto',
    subtitle: 'The Tender',
    description: 'Creates warmth and tends home and emotional climate. Shows love through care, small circle but deeply nurtured.',
    
    fullDescription: 'You operate by creating sanctuary and tending to the emotional and physical climate of your relationship. You show love through acts of care, attention to comfort, and nurturing the intimate space you share. Your circle may be small, but it\'s deeply cherished and maintained.',
    
    recognizableBehaviors: [
      "You notice and respond to your partner's comfort needs before they ask",
      "You create rituals of care (their favorite meal, the way you make the bed, morning coffee)",
      "Home and shared space really matter to you - they're not just backdrops",
      "You feel most loving when you're taking care of someone or something"
    ],
    
    energizingCondition: "This role feels energizing when your care is received and reciprocated, and when you have space to create warmth.",
    
    costlyCondition: "This role becomes costly when your care goes unnoticed, or when you're operating in environments that don't value tending and maintenance.",
    
    motto: "I create the conditions for us to flourish",
    
    strengths: [
      "Creates emotional and physical sanctuary that helps relationships thrive",
      "Notices and responds to subtle needs before they become urgent",
      "Builds deep intimacy through consistent care and attention"
    ],
    
    frictionPoints: {
      exhausts: "One-sided caretaking or having your tending dismissed as unnecessary",
      weakContexts: "High-intensity, transactional environments with little space for nurturing",
      whenBlocked: "When prevented from operating in Tender mode, you may feel disconnected from your primary way of loving or become resentful of unreciprocated care"
    },
    
    compatibility: {
      worksWellWith: {
        archetype: "Poro (Propeller)",
        reason: "Your tending creates the stable base from which their momentum can launch - you maintain, they propel"
      },
      potentialFrictionWith: {
        archetype: "Kaiko (Foreguard)",
        reason: "Your inward focus on sanctuary can feel at odds with their outward orientation toward edges and exploration"
      },
      requiresCoordinationWith: {
        archetype: "Saita (Weaver)",
        reason: "Both value depth and continuity - watch for becoming too insular or losing sight of external engagement"
      }
    }
  },
  
  poro: {
    id: 'poro',
    name: 'Poro',
    subtitle: 'The Propeller',
    description: 'Sustained driver who maintains momentum through consistent effort. Keeps things moving forward, measures connection through shared action.',
    
    fullDescription: 'You operate by maintaining forward momentum and measuring connection through shared activity and consistent engagement. You keep things moving, build through sustained effort, and feel most connected when you\'re doing something together rather than just being together.',
    
    recognizableBehaviors: [
      "You suggest activities and outings - you like building connection through doing",
      "You have consistent energy for relationship engagement, not just sporadic bursts",
      "Sitting still feels less intimate to you than moving together",
      "You measure relationship health partly by whether you're making progress or building something"
    ],
    
    energizingCondition: "This role feels energizing when your momentum creates positive forward motion and your partner engages with your pace.",
    
    costlyCondition: "This role becomes costly when your partner can't match your energy, or when your drive is experienced as pressure rather than enthusiasm.",
    
    motto: "We're building something here",
    
    strengths: [
      "Prevents relationship stagnation through consistent forward momentum",
      "Creates shared experiences and accomplishments that strengthen bonds",
      "Brings reliable energy that partners can count on"
    ],
    
    frictionPoints: {
      exhausts: "Maintaining momentum alone or having your energy experienced as demanding",
      weakContexts: "Periods requiring stillness, waiting, or letting things unfold slowly",
      whenBlocked: "When prevented from operating in Propeller mode, you may feel stuck and frustrated, or push harder in ways that create friction"
    },
    
    compatibility: {
      worksWellWith: {
        archetype: "Lehto (Tender)",
        reason: "Their tending provides the stable foundation from which your momentum can build - complementary relationship maintenance styles"
      },
      potentialFrictionWith: {
        archetype: "Tuuli (Responder)",
        reason: "Your sustained drive can clash with their emergent, adaptive approach - you want momentum, they want flexibility"
      },
      requiresCoordinationWith: {
        archetype: "Näkki (Navigator)",
        reason: "Both are forward-focused - need to balance momentum with strategic direction, doing with planning"
      }
    }
  },
  
  kaiko: {
    id: 'kaiko',
    name: 'Kaiko',
    subtitle: 'The Foreguard',
    description: 'Early initiator comfortable at leading edge. Picks up signals first, willing to go first through transitions.',
    
    fullDescription: 'You operate at the leading edge of your relationship, picking up signals early and being willing to move first through uncertainty or transition. You\'re comfortable with exposure that comes from being the one who names things, tries things, or ventures into new territory first.',
    
    recognizableBehaviors: [
      "You're often the one who says it first - \"I love you,\" \"this isn't working,\" \"we should try X\"",
      "You notice shifts in the relationship before they're obvious to others",
      "You're willing to risk awkwardness or vulnerability to get to clarity",
      "You don't wait for permission or perfect conditions to initiate"
    ],
    
    energizingCondition: "This role feels energizing when your early action creates positive change and your partner trusts your lead on edges.",
    
    costlyCondition: "This role becomes costly when you're always the one going first, or when your early signals are dismissed until they become obvious to everyone.",
    
    motto: "I'll go first",
    
    strengths: [
      "Initiates important conversations before issues calcify",
      "Helps relationships navigate transitions and uncertainty",
      "Creates movement when things are stuck"
    ],
    
    frictionPoints: {
      exhausts: "Always being the one to initiate, or having your early warnings ignored",
      weakContexts: "Situations requiring patience and waiting for the right timing",
      whenBlocked: "When prevented from operating in Foreguard mode, you may become impatient with stagnation or withdraw from initiating entirely"
    },
    
    compatibility: {
      worksWellWith: {
        archetype: "Saita (Weaver)",
        reason: "Your forward motion pairs with their narrative coherence - you initiate, they make meaning of the trajectory"
      },
      potentialFrictionWith: {
        archetype: "Lehto (Tender)",
        reason: "Your edge-orientation can feel destabilizing to their sanctuary-building - you explore boundaries, they create safety"
      },
      requiresCoordinationWith: {
        archetype: "Näkki (Navigator)",
        reason: "Both operate ahead of the present - watch for getting too far ahead of what the relationship actually needs right now"
      }
    }
  },
  
  saita: {
    id: 'saita',
    name: 'Saita',
    subtitle: 'The Weaver',
    description: 'Meaning-maker who holds relationship story and continuity. Connects past-present-future, creates narrative coherence.',
    
    fullDescription: 'You operate by weaving meaning and narrative coherence across your relationship\'s timeline. You hold the story of how you got here, connect past to present to future, and help both partners understand the relationship as a continuous, meaningful arc rather than disconnected moments.',
    
    recognizableBehaviors: [
      "You remember significant moments and what they meant in the relationship's evolution",
      "You connect current issues to patterns from the past",
      "You help make sense of rough patches by placing them in larger context",
      "You're the keeper of \"our story\" - how you met, grew, overcame things"
    ],
    
    energizingCondition: "This role feels energizing when your meaning-making helps both partners understand the relationship more deeply.",
    
    costlyCondition: "This role becomes costly when you're the only one holding the narrative, or when your partner experiences your meaning-making as over-interpreting.",
    
    motto: "This is part of our story",
    
    strengths: [
      "Creates continuity and coherence that helps relationships weather difficult periods",
      "Provides perspective that prevents reactivity to isolated moments",
      "Builds deep intimacy through shared narrative understanding"
    ],
    
    frictionPoints: {
      exhausts: "Being the sole keeper of relationship memory and meaning",
      weakContexts: "Brand new relationships with no history, or partners who live entirely in the present",
      whenBlocked: "When prevented from operating in Weaver mode, you may feel like the relationship lacks depth or struggle to make sense of what's happening"
    },
    
    compatibility: {
      worksWellWith: {
        archetype: "Kaiko (Foreguard)",
        reason: "Their forward initiation gives you new material to weave into meaning - they create, you interpret and integrate"
      },
      potentialFrictionWith: {
        archetype: "Tuuli (Responder)",
        reason: "Your narrative focus can feel heavy to their present-focused fluidity - you want to understand the story, they want to respond to now"
      },
      requiresCoordinationWith: {
        archetype: "Lehto (Tender)",
        reason: "Both value depth and continuity - watch for getting too internally focused or losing sight of forward momentum"
      }
    }
  },
  
  miko: {
    id: 'miko',
    name: 'Miko',
    subtitle: 'The Specialist',
    description: 'Domain expert in specific relational contexts. Goes deep rather than broad, knows their range.',
    
    fullDescription: 'You operate by going deep in specific relational contexts rather than spreading yourself across all domains. You know your range and excel within it, bringing expertise and mastery to particular aspects of partnership while being clear about where you have less to offer.',
    
    recognizableBehaviors: [
      "You're exceptional in specific contexts (intellectual connection, adventure partnership, creative collaboration) but don't try to be everything",
      "You're clear about your boundaries and capacity",
      "You'd rather do a few things deeply than many things superficially",
      "You bring real expertise to your domains rather than general competence everywhere"
    ],
    
    energizingCondition: "This role feels energizing when your depth in specific areas is valued and when your boundaries are respected.",
    
    costlyCondition: "This role becomes costly when you're expected to be generalist or when your specialization is seen as limitation rather than strength.",
    
    motto: "I go deep where I go at all",
    
    strengths: [
      "Brings exceptional depth and expertise to specific relational domains",
      "Clear boundaries prevent overextension and resentment",
      "Models healthy specialization rather than trying to be everything to partner"
    ],
    
    frictionPoints: {
      exhausts: "Being asked to perform outside your range or defend your boundaries repeatedly",
      weakContexts: "Relationships requiring broad generalist engagement across all domains",
      whenBlocked: "When prevented from operating in Specialist mode, you may feel spread too thin or resentful of demands outside your range"
    },
    
    compatibility: {
      worksWellWith: {
        archetype: "Tuuli (Responder)",
        reason: "Their adaptability complements your specialization - they cover the range, you provide depth"
      },
      potentialFrictionWith: {
        archetype: "Poro (Propeller)",
        reason: "Your bounded range can frustrate their broad sustained engagement - they want consistent involvement, you offer deep but specific contribution"
      },
      requiresCoordinationWith: {
        archetype: "Näkki (Navigator)",
        reason: "Your specialization needs to coordinate with their strategic planning - ensure your domains align with relationship needs"
      }
    }
  }
};

export const getArchetypeById = (id) => archetypes[id];

export const getAllArchetypes = () => Object.values(archetypes);
