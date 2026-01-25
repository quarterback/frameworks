# Stratified Preference Allocation (SPA) Framework

**A Constrained Signaling Mechanism for Bilateral Matching Markets**

## Abstract

The Stratified Preference Allocation (SPA) framework introduces a constrained, priority-based selection mechanism designed to address information asymmetry and preference revelation problems in bilateral matching markets. By replacing unbounded selection with limited, tiered resource allocation, SPA forces participants to reveal true preferences through constrained signaling, creating more efficient matches through stratified pooling.

**Keywords:** Matching markets, preference signaling, constrained choice, stratified selection, bilateral matching, information design

---

## 1. Core Principles

### 1.1 The Constraint Principle
Participants are allocated a **limited number of selection slots** (draft picks), forcing them to evaluate opportunity costs and reveal true preferences rather than expressing interest in all marginally acceptable options.

**Mathematical representation:**
```
Let N = total available options
Let k = allocated selection slots where k << N
Constraint: |S| ≤ k, where S is the set of selected options
```

### 1.2 The Stratification Principle
Selections are organized into **priority tiers** with tier-specific capacity constraints, creating a hierarchical signal strength that differentiates preference intensity.

**Tier structure:**
```
T = {T₁, T₂, ..., Tₙ} where:
- T₁ = highest priority tier (smallest capacity)
- Tₙ = lowest priority tier (largest capacity)
- Capacity: cap(T₁) < cap(T₂) < ... < cap(Tₙ)
```

### 1.3 The Dynamic Adjustment Principle
Selection capacity scales with participant **quality metrics** (credit score), creating incentive alignment for positive behaviors and natural market segmentation.

**Capacity function:**
```
k(q) = f(quality_score)
where k increases with participant quality
```

### 1.4 The Mutual Revelation Principle
After bilateral matching occurs, **tier placement information is revealed**, providing feedback on relative desirability and market position.

---

## 2. Theoretical Foundations

### 2.1 Game-Theoretic Framework

**Setup:**
- Two-sided matching market with asymmetric information
- Participants have hidden "types" (quality, compatibility)
- Traditional mechanism: unbounded signaling (e.g., unlimited "likes")
- Problem: Signal inflation, no preference revelation

**SPA Mechanism:**
- Participants allocated k slots, must allocate across priority tiers
- Matching requires bilateral selection
- Post-match revelation of tier placement

**Key Results:**
1. **Preference Revelation**: Constraints force truthful prioritization
2. **Signal Differentiation**: Tier system creates preference intensity gradations
3. **Strategic Complexity**: Participants must consider match probability × preference
4. **Market Clearing**: Stratification creates natural segmentation

### 2.2 Behavioral Economics Rationale

**Problems with Unbounded Choice:**
- **Choice Overload** (Schwartz, 2004): Excessive options reduce satisfaction
- **Paradox of Choice**: More options → decision paralysis
- **Low Signal Quality**: Costless signaling → preference inflation
- **Attention Fragmentation**: Spread too thin across options

**SPA Solutions:**
- **Forced Prioritization**: Scarcity reveals true preferences
- **Cognitive Load Reduction**: Focus on k best options
- **Costly Signaling**: Opportunity cost of slot allocation
- **Attention Concentration**: Deep evaluation of selected options

### 2.3 Market Design Perspective

**Matching Market Properties:**
- **Bilateral**: Requires mutual selection
- **Non-transferable utility**: No side payments
- **Incomplete information**: Hidden types
- **Search friction**: Discovery costs

**SPA as a Mechanism:**
- **Stability**: Stratification reduces cross-tier competition
- **Efficiency**: Constraints push toward optimal matching
- **Incentive Compatibility**: Quality rewards encourage truthful behavior
- **Participation**: Tiering makes rejection less costly (information about mismatch)

---

## 3. Implementation Mechanics

### 3.1 Selection Phase

**Step 1: Browse & Discover**
- Participants view available options (unconstrained browsing)
- Can review full information about potential matches
- Decision: Add to draft board or pass

**Step 2: Portfolio Construction**
- Limited to k total selections
- Must allocate selections across priority tiers
- Tier capacity constraints enforce prioritization hierarchy
- Drag-and-drop reordering allowed within and across tiers

**Step 3: Submission**
- Lock in tier allocations
- Matching algorithm runs on submitted preferences

### 3.2 Matching Phase

**Matching Algorithm:**
```
For each participant pair (A, B):
  If A selected B AND B selected A:
    Create match(A, B)
    Record tier_A(B) and tier_B(A)
    Remove A and B from pools
```

**Matching Priority (optional enhancement):**
- Higher-tier selections processed first
- Creates soft preference for mutual high-priority matches

### 3.3 Revelation Phase

**Post-Match Information:**
- Matched participants learn their tier placement by partner
- Provides feedback on relative desirability
- Information asymmetry: only matched pairs exchange tier data

**Strategic Implications:**
- Tier placement affects post-match dynamics
- Creates status signaling within matches
- Feedback loop for quality score adjustments

---

## 4. Quality Score System

### 4.1 Purpose
The quality score serves multiple functions:
1. **Capacity Allocation**: Determines number of selection slots (k)
2. **Market Segmentation**: Creates natural grouping by engagement quality
3. **Incentive Design**: Rewards positive behaviors
4. **Dynamic Adjustment**: Adapts to participant behavior

### 4.2 Score Components

**Profile Quality (Static)**
- Completeness (photos, bio, interests)
- Information richness
- Authenticity signals

**Behavioral Quality (Dynamic)**
- Response rate to matches
- Message engagement
- Match retention
- Feedback from partners

**Engagement Quality (Dynamic)**
- Draft board utilization
- Selection thoughtfulness (time spent evaluating)
- Portfolio diversity

### 4.3 Capacity Scaling Function

**Example Implementation:**
```python
def calculate_capacity(quality_score):
    """
    Maps quality score [0, 1000] to selection capacity [10, 20]
    Higher quality → more selection slots
    """
    base_capacity = 10
    bonus_capacity = min(10, (quality_score - 500) / 50)
    return int(base_capacity + bonus_capacity)
```

**Economic Rationale:**
- High-quality participants have more "market power"
- Creates incentive to maintain positive behaviors
- Natural segmentation reduces cross-quality mismatches

---

## 5. Design Patterns

### 5.1 Tier Configuration Patterns

**Conservative Pyramid:**
```
Top Tier:     2 slots (must-haves)
High Tier:    3 slots (strong interest)
Medium Tier:  4 slots (interested)
Low Tier:     6 slots (maybe)
```
**Rationale:** Forces very selective top tier, most capacity in exploration tier

**Balanced Distribution:**
```
All Tiers: Equal capacity (k/n slots each)
```
**Rationale:** No forced hierarchy, participants choose concentration vs. diversification

**Top-Heavy:**
```
Top Tier:     5 slots
Medium Tier:  5 slots
Low Tier:     5 slots
```
**Rationale:** Encourages more high-priority signals, reduces low-signal noise

### 5.2 Information Revelation Patterns

**Full Transparency:**
- Reveal tier placement to all matched pairs
- Provides clear feedback on relative desirability

**Partial Transparency:**
- Reveal only if both placed each other in top 2 tiers
- Reduces potential asymmetry discomfort

**Delayed Revelation:**
- Reveal tier placement after initial conversation
- Prevents premature judgment based on tier

**No Revelation:**
- Match success is signal enough
- Avoids hierarchy within matches

### 5.3 Constraint Severity Patterns

**Tight Constraints:**
- k = 10-15 (forces high selectivity)
- Small tier capacities
- **Effect:** Strong preference revelation, slower matching

**Moderate Constraints:**
- k = 15-25 (balanced)
- **Effect:** Good signal quality with reasonable match volume

**Loose Constraints:**
- k = 25-40 (many options)
- **Effect:** Reduced signal strength, more matches

---

## 6. Theoretical Advantages

### 6.1 Over Unbounded Selection (Traditional Swiping)

**Problem:** Signal inflation
- Costless "likes" lead to over-signaling
- Participants signal interest in all marginally acceptable options
- No preference differentiation

**SPA Solution:** Constrained signaling
- Opportunity cost forces selectivity
- Tier system differentiates preference intensity
- Scarce slots reveal true preferences

### 6.2 Over Algorithmic Matching (No User Control)

**Problem:** Preference opacity
- Algorithm selects matches without input
- Users lack agency and understanding
- Match failures provide no information

**SPA Solution:** Transparent preference expression
- Users actively construct preference portfolio
- Agency in selection process
- Tier revelation provides feedback on market position

### 6.3 Over Stable Marriage Algorithms

**Problem:** Rank order required
- Must rank all options (infeasible with large N)
- No partial participation
- Binary accept/reject post-proposal

**SPA Solution:** Partial preference revelation
- Only rank selected subset (k << N)
- Tier system approximates ranking
- Mutual selection requirement maintains stability

---

## 7. Research Questions & Extensions

### 7.1 Empirical Questions

1. **Optimal Constraint Severity**: What k maximizes match quality × volume?
2. **Tier Structure**: How many tiers? What capacity distribution?
3. **Revelation Effects**: Does tier transparency improve or harm match outcomes?
4. **Quality Score Design**: Which behaviors best predict match success?
5. **Strategic Behavior**: How do participants game the system?

### 7.2 Theoretical Extensions

**Dynamic Drafting:**
- Allow "trades" or slot reallocation mid-period
- Create draft "seasons" with reset intervals

**Collaborative Filtering:**
- Use tier placements to infer similarity
- Recommend profiles based on co-selection patterns

**Market Clearing Mechanisms:**
- What if everyone selects top 1% of profiles?
- Need reserve prices or additional constraints?

**Asymmetric Designs:**
- Different k values for different user segments
- Gender-specific tier structures

### 7.3 Application Domains

Beyond dating/matching markets:
- **Job Recruiting**: Candidates draft companies, companies draft candidates
- **College Admissions**: Students rank schools with slot limits
- **Housing Markets**: Renters prioritize listings, landlords prioritize applicants
- **Mentorship Matching**: Mentees/mentors express tiered preferences
- **Collaboration Platforms**: Researchers signal project interest with constraints

---

## 8. Implementation Guidelines

### 8.1 Minimum Viable Implementation

**Core Requirements:**
1. Selection constraint (k slots)
2. Priority tiers (minimum 3 tiers)
3. Bilateral matching algorithm
4. Quality score system (can be simplified)

**Optional Enhancements:**
5. Tier revelation
6. Dynamic capacity adjustment
7. Drag-and-drop reordering
8. Real-time constraint feedback

### 8.2 Key Design Decisions

**Decision 1: Constraint Severity**
- Tighter constraints → stronger signals, fewer matches
- Consider market size and participant patience

**Decision 2: Tier Structure**
- More tiers → finer preference gradation
- Fewer tiers → simpler cognitive model
- Recommended: 4-5 tiers

**Decision 3: Quality Score Basis**
- Profile completeness (static, easily measurable)
- Behavioral metrics (dynamic, more predictive)
- Peer ratings (social proof, gaming risk)

**Decision 4: Revelation Policy**
- Full transparency: High feedback, potential discomfort
- No revelation: Neutral, less learning
- Conditional revelation: Balanced approach

### 8.3 User Experience Considerations

**Onboarding:**
- Clearly explain the constraint mechanism
- Emphasize thoughtful selection over quantity
- Tutorial on tier system usage

**Feedback Loops:**
- Show remaining slots during browsing
- Visualize tier capacity utilization
- Provide "cost" feedback when adding/moving selections

**Cognitive Aids:**
- Comparison tools for shortlisted options
- Notes/tags for each selection
- Tier recommendation hints

---

## 9. Evaluation Metrics

### 9.1 Mechanism Performance

**Preference Revelation Quality:**
- Tier distribution entropy (lower = more concentrated preferences)
- Selection revision frequency (higher = thoughtful consideration)
- Time spent per selection decision

**Match Quality:**
- Mutual tier placement correlation
- Match retention rate over time
- Message engagement post-match
- Reported satisfaction scores

**Market Efficiency:**
- Match rate (% of participants matched)
- Time to first match
- Portfolio turnover rate
- Unmatchable profile identification

### 9.2 Behavioral Metrics

**Strategic Behavior:**
- Tier gaming detection (e.g., all top tier)
- Selection concentration vs. diversification
- Quality score manipulation attempts

**User Satisfaction:**
- Perceived control over process
- Satisfaction with match quality
- Cognitive load self-reports
- Comparison to alternative mechanisms

---

## 10. Related Work & Literature

### Matching Markets
- Roth, A. E., & Sotomayor, M. (1990). *Two-sided matching: A study in game-theoretic modeling and analysis*
- Hitsch, G. J., Hortaçsu, A., & Ariely, D. (2010). Matching and sorting in online dating

### Constrained Choice & Preference Revelation
- Schwartz, B. (2004). *The paradox of choice: Why more is less*
- Iyengar, S. S., & Lepper, M. R. (2000). When choice is demotivating

### Signaling Theory
- Spence, M. (1973). Job market signaling
- Costly signaling in biological and economic systems

### Information Design
- Bergemann, D., & Morris, S. (2019). Information design: A unified perspective
- Kamenica, E., & Gentzkow, M. (2011). Bayesian persuasion

### Platform Design
- Rochet, J. C., & Tirole, J. (2003). Platform competition in two-sided markets
- Parker, G., Van Alstyne, M., & Choudary, S. P. (2016). *Platform revolution*

---

## 11. License & Citation

### License
This framework is released under **Creative Commons Attribution 4.0 International (CC BY 4.0)**

You are free to:
- **Share**: Copy and redistribute the material in any medium or format
- **Adapt**: Remix, transform, and build upon the material for any purpose, even commercially

Under the following terms:
- **Attribution**: You must give appropriate credit, provide a link to the license, and indicate if changes were made

### Citation

**Academic Citation (APA):**
```
[Your Name]. (2025). Stratified Preference Allocation (SPA) Framework:
A Constrained Signaling Mechanism for Bilateral Matching Markets.
GitHub. https://github.com/quarterback/frameworks
```

**BibTeX:**
```bibtex
@misc{spa_framework_2025,
  author = {[Ron Bronson},
  title = {Stratified Preference Allocation (SPA) Framework: A Constrained Signaling Mechanism for Bilateral Matching Markets},
  year = {2025},
  publisher = {GitHub},
  url = {https://github.com/quarterback/frameworks},
  note = {Licensed under CC BY 4.0}
}
```
---

## Appendix A: Formal Model

### A.1 Environment
- Set of participants: P = {p₁, p₂, ..., pₙ}
- Each participant pᵢ has:
  - Quality score: qᵢ ∈ [0, 1000]
  - Slot capacity: k(qᵢ) = ⌊base + (qᵢ - threshold)/scale⌋
  - True preference ordering: ≻ᵢ over P\{pᵢ}

### A.2 Strategy Space
- Selection set: Sᵢ ⊆ P\{pᵢ} where |Sᵢ| ≤ k(qᵢ)
- Tier allocation: τᵢ: Sᵢ → {1, 2, ..., m} where m = number of tiers
- Tier capacity constraints: |τᵢ⁻¹(t)| ≤ cap(t)

### A.3 Matching Function
```
M: P × P → {0, 1}
M(pᵢ, pⱼ) = 1 iff pⱼ ∈ Sᵢ AND pᵢ ∈ Sⱼ
```

### A.4 Utility Function
```
Uᵢ = Σⱼ [M(pᵢ, pⱼ) · vᵢ(pⱼ) · g(τᵢ(pⱼ), τⱼ(pᵢ))]

where:
- vᵢ(pⱼ) = intrinsic value of matching with pⱼ
- g(·,·) = tier-symmetric utility modifier
```

### A.5 Equilibrium Concept
A strategy profile {Sᵢ*, τᵢ*}ᵢ∈P is a **constrained Nash equilibrium** if:
```
For all pᵢ and feasible (Sᵢ, τᵢ):
Uᵢ(Sᵢ*, τᵢ* | S₋ᵢ*, τ₋ᵢ*) ≥ Uᵢ(Sᵢ, τᵢ | S₋ᵢ*, τ₋ᵢ*)
```

---

## Appendix B: Example Scenarios

### Scenario 1: High-Value Mismatch Detection
**Setup:** Alice (q=850) and Bob (q=600) both browse profiles
- Alice gets 17 slots, Bob gets 12 slots
- Alice places Bob in "Low Priority" (being thorough)
- Bob places Alice in "Top Priority" (reaching up)

**Outcome:** They match, but tier revelation shows asymmetry
**Learning:** Bob learns he's "reach" for Alice; Alice learns Bob values her highly
**Market Effect:** Information helps Bob calibrate expectations

### Scenario 2: Mutual High Interest
**Setup:** Carol (q=750) and Dave (q=780)
- Carol places Dave in "Top Priority"
- Dave places Carol in "Top Priority"

**Outcome:** Strong bilateral signal, match occurs
**Learning:** Both learn they're mutually high priority
**Market Effect:** High-quality match, likely good outcome

### Scenario 3: Portfolio Strategy
**Setup:** Eve (q=700, 15 slots) constructs diverse portfolio:
- Top Tier (2 slots): Dream matches, low probability
- High Tier (3 slots): Realistic stretch goals
- Medium Tier (4 slots): Good mutual fits
- Low Tier (6 slots): Safe options, high probability

**Outcome:** Likely matches from Medium/Low tiers, possible High tier surprise
**Learning:** Diversification strategy balances aspiration and realism
**Market Effect:** Reduces "everyone chases top 10%" problem

---

*Version 1.0 - January 2025*
