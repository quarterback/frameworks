# Stratified Preference Allocation (SPA) Framework

**A research framework for constrained signaling mechanisms in bilateral matching markets**

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

## Overview

The **Stratified Preference Allocation (SPA)** framework proposes an alternative to unbounded selection mechanisms (e.g., infinite swiping) in bilateral matching markets. By introducing **constrained, tiered selection**, SPA forces participants to reveal true preferences through resource-limited signaling, creating more efficient matches through stratified pooling.

### The Core Innovation

Instead of allowing unlimited signaling (infinite "likes"), participants receive a **limited number of selection slots** that must be allocated across **priority tiers**. This constraint:

1. **Reveals true preferences** - Scarcity forces prioritization
2. **Differentiates signal strength** - Tiers indicate preference intensity
3. **Reduces cognitive load** - Focus on k best options, not infinite browsing
4. **Creates natural segmentation** - Quality-based capacity scaling

## The Problem

Traditional matching platforms suffer from:
- **Signal inflation** - Costless likes lead to over-signaling
- **Choice overload** - Infinite options cause decision paralysis
- **Preference opacity** - No differentiation between "interested" and "very interested"
- **Low match quality** - Weak signals lead to poor matches

## The Solution

SPA introduces three key mechanisms:

### 1. Constrained Selection
```
Participants receive k slots (e.g., 15 selections)
k << N (total available options)
Forces opportunity cost consideration
```

### 2. Priority Tiers
```
Tier 1 (Top Priority):     Max 3 selections
Tier 2 (High Priority):    Max 4 selections
Tier 3 (Medium Priority):  Max 4 selections
Tier 4 (Low Priority):     Remaining slots
```

### 3. Quality-Based Capacity
```
k = f(quality_score)
Higher quality → More selection slots
Incentivizes positive behaviors
```

## Repository Contents

### 📚 Core Documentation
- **[FRAMEWORK.md](./FRAMEWORK.md)** - Complete theoretical framework (12,000+ words)
  - Game-theoretic foundations
  - Behavioral economics rationale
  - Implementation mechanics
  - Design patterns
  - Evaluation metrics

### 💻 Reference Implementation
- **[/src](./src)** - Working prototype demonstrating SPA concepts
  - React-based dating app UI
  - Drag-and-drop tier management
  - Credit score system
  - Mock matching algorithm

### 📊 Research Extensions
- Formal mathematical model
- Empirical research questions
- Application to other domains
- Related literature

## Key Concepts

### Preference Revelation
Constraints force truthful preference signaling. With unlimited likes, users signal interest in all marginally acceptable options. With k slots, users must rank by true preference.

### Stratified Signaling
Tier placement indicates preference intensity:
- **Top tier placement** = "Must have, would re-rank entire portfolio for"
- **High tier placement** = "Strong interest, excited to match"
- **Medium tier placement** = "Interested, good potential"
- **Low tier placement** = "Worth exploring, open-minded"

### Bilateral Transparency
After matching, participants learn their tier placement by their match, providing feedback on relative desirability and market position.

### Dynamic Capacity
Selection capacity scales with participant quality score, which reflects:
- Profile completeness and authenticity
- Response rates and engagement
- Match retention and satisfaction
- Platform citizenship behaviors

## Applications Beyond Dating

SPA can be applied to any bilateral matching market:

- **Job Recruiting**: Candidates draft companies, companies draft candidates
- **College Admissions**: Students rank schools with constrained slots
- **Housing Markets**: Renters/landlords express tiered preferences
- **Mentorship Matching**: Mentees/mentors signal priority interest
- **Academic Collaboration**: Researchers indicate project priorities
- **Freelance Platforms**: Clients/contractors stratified selection

## Theoretical Advantages

| Traditional Swiping | SPA Framework |
|---------------------|---------------|
| Unlimited likes = signal inflation | Constrained slots = preference revelation |
| Binary interested/not interested | Graduated preference intensity (tiers) |
| No prioritization required | Forced ranking through tiers |
| Low cost → low signal quality | Opportunity cost → high signal quality |
| Choice overload | Focused evaluation of k options |
| No market position feedback | Tier revelation provides feedback |

## Getting Started

### Understanding the Framework
1. Read **[FRAMEWORK.md](./FRAMEWORK.md)** for complete theoretical foundations
2. Review design patterns and implementation mechanics
3. Explore research questions and extensions

### Running the Demo
```bash
npm install
npm run dev
```

The demo includes:
- Profile creation with preference setting
- Grid-based profile browsing
- Drag-and-drop draft board with 5 tiers
- Credit score dashboard
- Mock matching with tier revelation

### Implementing SPA

Minimum viable implementation requires:
1. **Selection constraint** - Enforce k-slot limit
2. **Priority tiers** - Minimum 3 tiers with capacity constraints
3. **Bilateral matching** - Require mutual selection
4. **Quality system** - Basic scoring for capacity allocation

See [FRAMEWORK.md Section 8](./FRAMEWORK.md#8-implementation-guidelines) for detailed guidelines.

## Research Questions

Open questions for empirical investigation:

1. **Optimal k**: What constraint severity maximizes match quality × volume?
2. **Tier structure**: How many tiers? What capacity distribution?
3. **Revelation effects**: Does tier transparency improve outcomes?
4. **Gaming resistance**: How do participants exploit the system?
5. **Cross-domain**: How does SPA perform in non-dating contexts?

## Citation

If you use this framework in your research or implementation, please cite:

```bibtex
@misc{spa_framework_2025,
  author = {[Ron Bronson]},
  title = {Stratified Preference Allocation (SPA) Framework:
           A Constrained Signaling Mechanism for Bilateral Matching Markets},
  year = {2025},
  publisher = {GitHub},
  url = {https://github.com/quarterback/frameworks},
  note = {Licensed under CC BY 4.0}
}
```

## License

This framework is released under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

**You are free to:**
- Use this framework in commercial products
- Modify and extend the concepts
- Publish research based on these ideas

**You must:**
- Provide attribution to the original framework
- Link to this repository
- Indicate any modifications made
