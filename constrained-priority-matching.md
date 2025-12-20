# Constrained Priority Matching (CPM)
## A Framework for Alignment-Based Digital Matching Systems

**Author:** Ron Bronson  
**Date:** December 2025  
**Version:** 1.0  
**License:** Creative Commons Attribution 4.0 International (CC BY 4.0)

---

## Abstract

Current digital matching platforms operate on infinite-choice models that create information overload, attention asymmetry, and misaligned platform incentives. These systems profit from prolonged user engagement rather than successful match outcomes, leading to what recent research characterizes as systematic "accommodating" of harmful behaviors and extraction from user frustration. Constrained Priority Matching (CPM) introduces finite selection constraints and explicit priority ranking to realign user and platform incentives around successful outcomes rather than prolonged engagement. This framework applies principles from mechanism design, behavioral economics, and information theory to create matching systems where platform success requires user success.

---

## 1. Problem Statement

### 1.1 The Extraction Model

Contemporary digital matching platforms—particularly in romantic partnership contexts—operate on business models that fundamentally misalign platform incentives with user outcomes. As documented by the Dating App Reporting Project (2025), major platforms knew the scale of harm occurring on their systems but concealed this information while simultaneously scaling back trust and safety teams. This is not incidental but structural: platforms maximize revenue through sustained engagement, not through successful matches that remove users from the platform.

### 1.2 Three Core Failures

**Information Overload Paralysis**  
Infinite-choice interfaces create decision paralysis. Research in behavioral economics demonstrates that excessive options reduce decision quality and satisfaction (Schwartz, 2004; Iyengar & Lepper, 2000). Users facing unlimited potential matches engage in perpetual optimization rather than meaningful evaluation.

**Attention Asymmetry**  
In heterosexual matching contexts, traditional courting patterns amplified by platform design create severe attention imbalances. Men initiate contact at dramatically higher rates than women, creating what appears to be female "market power" but actually constitutes an outsourcing of filtering labor. Women experience this as overwhelming and potentially threatening attention; men experience it as invisibility and rejection (Johansson Wilén et al., 2025).

**Misaligned Platform Incentives**  
Platforms profit from failed matches. Each unsuccessful interaction generates more data, more engagement, and more opportunities for monetization through premium features. The optimal business outcome—sustained user engagement without match completion—directly opposes the optimal user outcome of finding a suitable match and leaving the platform.

### 1.3 Existing Approaches and Their Limitations

**Infinite Swipe Model** (Tinder, Bumble)  
Maximizes choice, minimizes commitment. Creates attention asymmetry, decision fatigue, and gamification of human evaluation. Revenue model based on premium visibility features that advantage users who pay.

**Curated Match Model** (Coffee Meets Bagel, Hinge)  
Reduces choice through algorithmic curation. Still operates on engagement-based revenue model. Users cannot verify curation quality and suspect algorithmic manipulation to sustain engagement.

**Questionnaire Model** (OkCupid, eHarmony)  
Uses compatibility scoring to filter matches. Reduces choice but maintains infinite browsing within filtered set. Compatibility algorithms remain black boxes, creating trust issues and potential for manipulation.

None of these models structurally resolve the misalignment between platform profit and user outcomes.

---

## 2. Core Principles of Constrained Priority Matching

CPM introduces five interconnected design principles that fundamentally alter the incentive structure of digital matching platforms.

### 2.1 Finite Attention Constraint

**Principle:** Users maintain a limited roster of potential matches. Roster size is not arbitrary but determined by the user's behavioral reputation score (see 2.4).

**Rationale:** Scarcity forces intentionality. When users can only maintain 8-20 active considerations (depending on their score), each selection carries weight. This transforms passive browsing into active evaluation and reduces the cognitive load of unlimited choice.

**Implementation:** 
- Roster size R determined by reputation score S: R = floor(8 + (S/100))
- Users reaching roster capacity must either remove existing selections or decline new additions
- No "infinite scroll" interface—browsing continues but adding requires trade-offs

**Behavioral Impact:**
- Reduces decision paralysis by imposing hard constraints
- Encourages deeper evaluation of fewer candidates
- Creates natural exit points in browsing behavior

### 2.2 Explicit Priority Signaling

**Principle:** Users rank their roster selections across priority tiers (typically 4-5 tiers). These rankings directly influence matching algorithm behavior.

**Rationale:** Current platforms obscure user preferences, relying on implicit signals (swipe patterns, message timing) that users may not realize they're sending. Explicit ranking makes preference clear and creates accountability for those preferences.

**Implementation:**
- Priority Tiers: Tier 1 (highest, limited to 2-3 slots), Tier 2 (3-4 slots), Tier 3 (3-4 slots), Tier 4 (remaining roster)
- Users drag profiles into tiers or assign numerical rankings
- Rankings can be revised but revisions are logged for reputation scoring
- Tier assignment is hidden from potential matches until after mutual match occurs

**Behavioral Impact:**
- Forces users to acknowledge actual preferences rather than hedging
- Creates commitment through explicit choice
- Reduces ambiguity in matching signals

### 2.3 Stratified Pool Organization

**Principle:** The matching algorithm organizes users into stratified pools based on historical prioritization patterns. Users predominantly see and match with others in similar priority tiers.

**Rationale:** A single unified marketplace creates unrealistic expectations and concentrates attention on a small subset of "high-value" users. Stratification creates multiple viable markets where users with similar mutual interest levels interact.

**Implementation:**
Let P_i represent user i's historical priority tier (mean tier at which others have ranked them). Users are assigned to pools where:

Pool(i) = {j : |P_i - P_j| ≤ τ}

where τ is a tolerance threshold (typically 1.0-1.5 tiers).

Matching probability M(i,j) is weighted by:
- Tier alignment: w_1 * min(T_i(j), T_j(i)) where T_i(j) is the tier user i assigned to user j
- Pool proximity: w_2 * exp(-|P_i - P_j|)
- Behavioral compatibility: w_3 * C(i,j) where C represents compatibility scoring

**Behavioral Impact:**
- Reduces attention concentration on "top tier" users
- Creates realistic expectations by showing users their actual market
- Enables successful matching at all tiers rather than only at extremes

### 2.4 Dynamic Reputation Scoring

**Principle:** Users receive a visible (to themselves only) reputation score based on behavioral signals. This score determines roster capacity and pool assignment.

**Rationale:** Credit scores in financial systems provide transparent feedback on trustworthiness while adapting to prevent gaming. Similarly, reputation scoring in matching systems can reward behaviors that indicate genuine matching intent while penalizing behaviors that waste others' time or game the system.

**Implementation:**

Base Score S₀ = 500

Score adjustments:

**Profile Quality Component:**
- Complete bio with substantive content: +50
- Multiple varied photos (not repetitive selfies): +30
- Verified photos (authentic representation): +40
- Interest tags and preferences specified: +20

**Engagement Component:**
- Response rate R_r: +200 * R_r (maximum +200 for 100% response rate)
- Average response time (faster): +0 to +50
- Conversation progression rate (messages lead to meetings): +100 * progression_rate
- Ghosting frequency: -150 per ghost

**Match Quality Component:**
- Mutual tier alignment in past matches: +0 to +100
- Successful match outcomes (both users report positive): +150 per successful match
- Reports received for inappropriate behavior: -500 per report
- Reports filed that are validated: +25 (rewards community moderation)

**Realism Component:**
- Tier appropriateness (selecting within realistic range): +0 to +75
- Frequent rejection by much higher-tier users: -25 per pattern
- Engagement with similar-tier users: +50

**Temporal Decay:**
Recent behavior weighted more heavily: Score = Σ(behavior_value * e^(-λt)) where t is time since behavior and λ is decay constant (typically 0.1-0.2 per month)

**Anti-Gaming Measures:**
- Formula published but weights adjusted quarterly
- Sudden spikes in scoring behaviors flagged for review
- Peer rating component within tiers (can't be gamed by individual behavior)
- Machine learning models detect fake/thirst trap photos vs authentic presentation

**Score Visibility:**
- Users see their own score, breakdown by component, and trend over time
- Users do NOT see others' scores
- Scores used by algorithm for pool assignment and roster sizing but not displayed in matching interface

**Behavioral Impact:**
- Creates feedback loop for improving matching behavior
- Rewards genuine engagement over gaming
- Provides actionable improvement pathways
- Maintains dignity by not exposing scores to judgment by others

### 2.5 Resolution Pressure

**Principle:** The system is designed to move users toward resolution (match or no-match) rather than prolonging uncertainty.

**Rationale:** Current platforms benefit from users remaining in ambiguous states—maybe this person is interested, maybe I need to wait longer. CPM creates structural pressure toward clarity.

**Implementation:**

**Tier Mismatch Decay:**
If user i ranks user j in Tier 1 but user j's historical priority tier P_j >> P_i by more than 2 tiers, user j automatically drops from user i's visible pool after time period t_decay (typically 7-14 days).

**Mutual Match Escalation:**
When users match (both have each other rostered), system prompts progression:
- Initial match notification
- 48-hour window for first message
- After 7 days of messaging, prompt to either schedule meeting or release match
- After 14 days without meeting scheduled, match auto-releases unless both users actively choose to continue

**Roster Churn Incentives:**
- Users who maintain static rosters for >30 days receive roster capacity reduction
- Users who actively evaluate and turnover roster receive capacity bonuses
- System designed to reward active decision-making over passive holding

**Economic Model Alignment:**
- Revenue from periodic "draft entry" (weekly/monthly cycles) not from sustained engagement
- Platform succeeds when drafts clear (matches leave platform)
- Failed matches generate data for pool stratification improvement but not direct revenue

**Behavioral Impact:**
- Reduces "breadcrumbing" and ambiguous non-commitment
- Creates clarity through structured progression
- Aligns platform revenue with user outcomes (successful drafts = successful platform)

---

## 3. Theoretical Foundation

### 3.1 Mechanism Design

CPM applies mechanism design principles to create a system where truthful preference revelation is the dominant strategy.

**Incentive Compatibility:**  
Traditional matching platforms incentivize users to "swipe right" indiscriminately (men) or filter extremely narrowly (women) because there is no cost to these behaviors. CPM creates costs: roster slots are finite, rankings are consequential.

**Strategy-Proofness:**  
Users benefit from accurately representing their preferences. Ranking someone highly who is unlikely to reciprocate wastes a valuable high-tier slot. Over-ranking or under-ranking relative to true preferences reduces match quality.

**Participation Constraints:**  
The system must be more attractive than alternatives (other platforms, offline dating, remaining single). CPM addresses this through:
- Higher match quality through stratification
- Reduced wasted effort through finite attention
- Transparent feedback through reputation scoring

### 3.2 Information Economics

**Adverse Selection Mitigation:**  
In traditional platforms, users with poor intentions can masquerade as legitimate until after match. Reputation scoring based on behavioral history surfaces hidden information about user quality.

**Signaling Theory:**  
Explicit tier ranking serves as a costly signal of genuine interest. Placing someone in Tier 1 (limited slots) signals prioritization more credibly than a "super like" that can be purchased.

**Search Theory:**  
CPM reduces search costs by limiting search scope. Rather than searching an infinite space, users search within stratified pools where match probability is higher.

### 3.3 Behavioral Economics

**Paradox of Choice:**  
Excessive options reduce decision quality and satisfaction (Schwartz, 2004). CPM constrains choice to cognitively manageable sets (12-20 active considerations vs. thousands of potential matches).

**Commitment Devices:**  
Finite roster slots and explicit ranking serve as commitment devices. Users cannot endlessly "keep their options open" but must make actual choices.

**Loss Aversion:**  
Removing someone from roster (to make room for someone new) creates a psychologically meaningful loss. This friction encourages genuine evaluation before rostering.

**Temporal Discounting:**  
Resolution pressure mechanisms counteract users' tendency to delay decisions indefinitely. Automatic timeouts and decay functions force timely evaluation.

### 3.4 Platform Economics

**Two-Sided Market Design:**  
Traditional platforms optimize for engagement metrics (time on app, swipes per session). CPM optimizes for match quality and resolution speed.

**Network Effects:**  
Rather than relying on platform size, CPM creates value through stratification quality. A smaller pool of appropriately matched users is more valuable than a larger pool with poor matching.

**Contestability:**  
By making the algorithm logic transparent and adaptable, CPM reduces platform lock-in. Users understand how the system works and can hold platforms accountable for changes.

---

## 4. Implementation Specification

### 4.1 Algorithm Pseudocode

```python
# Constrained Priority Matching Algorithm

class CPMSystem:
    def __init__(self):
        self.users = {}
        self.reputation_scores = {}
        self.priority_histories = {}
        self.pool_assignments = {}
        
    def calculate_reputation_score(self, user_id):
        """
        Calculate user reputation score based on behavioral signals
        Returns: Score value (0-1000)
        """
        base_score = 500
        
        # Profile quality component
        profile_score = (
            check_bio_completeness(user_id) * 50 +
            check_photo_variety(user_id) * 30 +
            verify_photo_authenticity(user_id) * 40 +
            check_interests_specified(user_id) * 20
        )
        
        # Engagement component
        response_rate = get_response_rate(user_id)
        progression_rate = get_conversation_progression_rate(user_id)
        ghost_penalty = count_ghosting_incidents(user_id) * -150
        
        engagement_score = (
            response_rate * 200 +
            progression_rate * 100 +
            ghost_penalty
        )
        
        # Match quality component
        tier_alignment = get_historical_tier_alignment(user_id)
        successful_matches = count_successful_matches(user_id) * 150
        reports_received = count_reports_received(user_id) * -500
        
        quality_score = (
            tier_alignment * 100 +
            successful_matches +
            reports_received
        )
        
        # Realism component
        tier_appropriateness = assess_tier_selection_realism(user_id)
        realism_score = tier_appropriateness * 75
        
        # Apply temporal decay to favor recent behavior
        total_score = base_score + apply_temporal_decay([
            profile_score,
            engagement_score,
            quality_score,
            realism_score
        ])
        
        return clamp(total_score, 0, 1000)
    
    def assign_pool(self, user_id):
        """
        Assign user to stratified pool based on historical priority tier
        """
        historical_tier = self.priority_histories.get(user_id, 3.0)
        
        # Find users within tolerance threshold
        tolerance = 1.5
        pool = [
            uid for uid in self.users
            if abs(self.priority_histories.get(uid, 3.0) - historical_tier) <= tolerance
            and uid != user_id
        ]
        
        self.pool_assignments[user_id] = pool
        return pool
    
    def calculate_match_probability(self, user_i, user_j):
        """
        Calculate probability of match between two users
        """
        # Tier alignment weight
        tier_i_to_j = get_tier_assignment(user_i, user_j)
        tier_j_to_i = get_tier_assignment(user_j, user_i)
        tier_weight = 0.5 * min(tier_i_to_j, tier_j_to_i)
        
        # Pool proximity weight
        pool_i = self.priority_histories.get(user_i, 3.0)
        pool_j = self.priority_histories.get(user_j, 3.0)
        pool_weight = 0.3 * exp(-abs(pool_i - pool_j))
        
        # Compatibility weight (from profile attributes)
        compatibility = calculate_compatibility(user_i, user_j)
        compat_weight = 0.2 * compatibility
        
        return tier_weight + pool_weight + compat_weight
    
    def process_draft_cycle(self):
        """
        Run one complete draft cycle
        """
        # Update reputation scores
        for user_id in self.users:
            self.reputation_scores[user_id] = self.calculate_reputation_score(user_id)
            
        # Assign pools
        for user_id in self.users:
            self.assign_pool(user_id)
            
        # Determine roster capacity
        for user_id in self.users:
            score = self.reputation_scores[user_id]
            roster_capacity = floor(8 + (score / 100))
            set_roster_capacity(user_id, roster_capacity)
            
        # Process matches
        matches = []
        for user_i in self.users:
            roster_i = get_user_roster(user_i)
            for user_j in roster_i:
                roster_j = get_user_roster(user_j)
                if user_i in roster_j:  # Mutual rostering
                    match_prob = self.calculate_match_probability(user_i, user_j)
                    if match_prob > MATCH_THRESHOLD:
                        matches.append((user_i, user_j, match_prob))
                        
        # Handle tier mismatch decay
        for user_id in self.users:
            roster = get_user_roster(user_id)
            for candidate in roster:
                tier_assigned = get_tier_assignment(user_id, candidate)
                historical_tier = self.priority_histories.get(candidate, 3.0)
                user_tier = self.priority_histories.get(user_id, 3.0)
                
                # If mismatch > 2 tiers and time > decay period
                if (historical_tier - user_tier) > 2.0:
                    days_in_roster = get_days_in_roster(user_id, candidate)
                    if days_in_roster > 14:
                        remove_from_roster(user_id, candidate)
                        
        return matches
    
    def update_priority_history(self, user_id, assigned_tier):
        """
        Update user's historical priority tier based on new assignment
        """
        current_history = self.priority_histories.get(user_id, 3.0)
        
        # Exponentially weighted moving average
        alpha = 0.3  # Weight for new observation
        new_history = alpha * assigned_tier + (1 - alpha) * current_history
        
        self.priority_histories[user_id] = new_history
```

### 4.2 Data Schema

```sql
-- Users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    created_at TIMESTAMP,
    profile_complete BOOLEAN,
    bio TEXT,
    photos JSONB,  -- Array of photo URLs with metadata
    interests JSONB,  -- Array of interest tags
    preferences JSONB,  -- Age range, distance, relationship goals
    reputation_score INTEGER DEFAULT 500,
    roster_capacity INTEGER DEFAULT 12,
    historical_priority_tier DECIMAL(3,2) DEFAULT 3.00
);

-- Roster table (user's current draft board)
CREATE TABLE roster (
    roster_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    candidate_id UUID REFERENCES users(user_id),
    tier_assigned INTEGER,  -- 1-5
    added_at TIMESTAMP,
    last_updated TIMESTAMP,
    UNIQUE(user_id, candidate_id)
);

-- Matches table
CREATE TABLE matches (
    match_id UUID PRIMARY KEY,
    user_a_id UUID REFERENCES users(user_id),
    user_b_id UUID REFERENCES users(user_id),
    user_a_tier INTEGER,  -- Tier A assigned to B
    user_b_tier INTEGER,  -- Tier B assigned to A
    matched_at TIMESTAMP,
    first_message_at TIMESTAMP,
    meeting_scheduled BOOLEAN DEFAULT FALSE,
    outcome VARCHAR(50),  -- 'active', 'met', 'released', 'expired'
    UNIQUE(user_a_id, user_b_id)
);

-- Behavioral history table
CREATE TABLE behavior_history (
    event_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    event_type VARCHAR(50),  -- 'message_sent', 'response', 'ghost', 'report', etc.
    event_timestamp TIMESTAMP,
    related_user_id UUID,  -- Other party in interaction
    metadata JSONB  -- Additional context
);

-- Reputation score components table
CREATE TABLE reputation_components (
    component_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    calculated_at TIMESTAMP,
    profile_quality_score INTEGER,
    engagement_score INTEGER,
    match_quality_score INTEGER,
    realism_score INTEGER,
    total_score INTEGER
);
```

### 4.3 API Endpoints

```
# User Profile Management
POST /api/users/create
GET /api/users/{user_id}/profile
PUT /api/users/{user_id}/profile
GET /api/users/{user_id}/reputation

# Browsing and Roster Management
GET /api/browse?pool={pool_id}&filters={...}
POST /api/roster/add
DELETE /api/roster/remove
PUT /api/roster/rank
GET /api/roster/current

# Matching
POST /api/draft/submit
GET /api/matches/current
PUT /api/matches/{match_id}/status
POST /api/matches/{match_id}/message

# Reputation and Scoring
GET /api/reputation/breakdown
GET /api/reputation/history
POST /api/reputation/peer-rating

# Admin/Platform
POST /api/admin/update-weights
GET /api/admin/pool-statistics
GET /api/admin/platform-health
```

---

## 5. Comparative Analysis

### 5.1 vs. Infinite Swipe Model (Tinder, Bumble)

| Dimension | Infinite Swipe | CPM |
|-----------|---------------|-----|
| **Choice Constraint** | None | Roster capacity (8-20) |
| **Decision Quality** | Low (paradox of choice) | High (forced prioritization) |
| **Attention Distribution** | Highly concentrated | Stratified across tiers |
| **Platform Incentive** | Maximize engagement time | Maximize successful matches |
| **Revenue Model** | Premium visibility features | Draft entry fees |
| **Match Resolution** | Indefinite messaging | Structured progression |
| **User Feedback** | Opaque algorithm | Transparent reputation score |
| **Gaming Resistance** | Low (easy to manipulate) | High (adaptive scoring) |

**Outcome Prediction:**  
CPM should produce higher match quality (verified through successful meetings), lower user frustration, and more equitable attention distribution. Revenue per user may be lower but user lifetime value higher due to platform trust.

### 5.2 vs. Curated Match Model (Coffee Meets Bagel, Hinge)

| Dimension | Curated Match | CPM |
|-----------|--------------|-----|
| **Curation Authority** | Platform algorithm | User + algorithm collaborative |
| **User Agency** | Low (accept/reject presented matches) | High (build and rank roster) |
| **Transparency** | Black box algorithm | Visible reputation scoring |
| **Constraint Type** | Daily/weekly match limits | Roster capacity |
| **Prioritization** | Implicit (swipe order) | Explicit (tier assignment) |
| **Stratification** | Opaque | Transparent via reputation |
| **Trust Issues** | "Is algorithm manipulating me?" | "I control my selections" |

**Outcome Prediction:**  
CPM provides greater user agency and transparency than curated models while maintaining constraint benefits. Users more likely to trust system they can partially control.

### 5.3 vs. Questionnaire Model (OkCupid, eHarmony)

| Dimension | Questionnaire | CPM |
|-----------|--------------|-----|
| **Compatibility Basis** | Self-reported preferences | Behavioral revealed preferences |
| **Match Discovery** | Algorithm-suggested based on answers | User browsing within stratified pool |
| **Gaming Resistance** | Low (easy to lie on questions) | Higher (behavior harder to fake) |
| **Adaptiveness** | Static questionnaire | Dynamic reputation scoring |
| **User Effort** | High upfront (long questionnaire) | Distributed (ongoing behavior) |
| **Feedback Loop** | None (unclear why matches suggested) | Clear (see reputation components) |

**Outcome Prediction:**  
CPM better captures revealed vs. stated preferences. Users' actual behavior (who they rank highly, who they engage with) more predictive than questionnaire responses.

---

## 6. Applications Beyond Dating

The CPM framework applies to any domain where:
1. Participants seek mutual matches from a large pool
2. Information asymmetry or overload creates inefficiency
3. Platform incentives may misalign with participant outcomes

### 6.1 Job Candidate Selection

**Problem:** Employers receive hundreds of applications; candidates apply to dozens of positions. Both sides experience overwhelm and low match quality.

**CPM Application:**
- Candidates maintain roster of 15-20 positions they're seriously pursuing
- Candidates rank positions by preference tier
- Employers see candidates stratified by mutual interest + qualifications
- Reputation scores based on application quality, interview performance, offer acceptance rates
- System designed to clear successful hires, not maximize application volume

**Expected Outcome:** Reduced application spam, higher quality matches, more equitable hiring across candidate pools.

### 6.2 University Admissions

**Problem:** Students apply to 15-20 universities; top universities reject 95%+ of applicants. Enormous waste of effort on both sides.

**CPM Application:**
- Students roster 10-12 universities they'd genuinely attend
- Students rank schools by preference (binding early decision as Tier 1)
- Universities see applicants stratified by genuine interest + qualifications
- Reputation scoring for students based on application quality, demonstrated interest
- System optimizes for actual enrollments, not inflated application counts

**Expected Outcome:** Reduced gaming of admissions process, better yield predictions, less student debt from application fees.

### 6.3 AI Agent Trust Scoring (Direct Application)

**Problem:** Organizations deploying AI agents lack verified trust infrastructure. No reputation system exists for agent reliability across contexts.

**CPM Application:**
- Organizations roster limited number of AI agents for evaluation
- Organizations rank agents by deployment priority/trust level
- Agents stratified into trust tiers based on verified performance outcomes
- Reputation scoring based on:
  - Output quality (Cleanlab validation, hallucination detection)
  - Task completion rate
  - Adversarial resistance
  - Transparency/auditability
  - Recovery behavior when uncertain
- Blockchain ledger provides immutable performance history
- Kubernetes-based scoring oracles run continuous evaluation

**Expected Outcome:** Verified trust layer for AI agent deployment in high-stakes environments (government services, healthcare, finance). Organizations select agents based on demonstrated reliability, not marketing claims.

### 6.4 Resource Allocation in Public Services

**Problem:** Citizens seek access to limited public resources (housing assistance, childcare subsidies, permits). Agencies overwhelmed by volume and lack prioritization mechanisms.

**CPM Application:**
- Citizens roster limited number of programs they're pursuing
- Citizens rank programs by importance/fit
- Agencies see applicants stratified by need + program fit
- Reputation scoring based on:
  - Application completeness
  - Eligibility documentation quality
  - Previous program engagement (if applicable)
  - Responsiveness to follow-up requests
- System designed to clear successful allocations efficiently

**Expected Outcome:** Reduced administrative burden, more equitable resource distribution, better program fit for participants.

---

## 7. Empirical Validation Approach

### 7.1 Proposed Research Design

**Phase 1: Simulation Study**  
Build agent-based model of dating platform with CPM vs. baseline models. Simulate 10,000 users over 12-month period. Compare:
- Match quality (tier alignment)
- Time to successful match
- User satisfaction (simulated via utility functions)
- Platform revenue under different economic models
- Attention distribution (Gini coefficient across users)

**Phase 2: Laboratory Experiment**  
Recruit 200 participants for controlled dating simulation using CPM vs. traditional interface. Measure:
- Decision time per selection
- Self-reported decision confidence
- Match quality (participants rate compatibility with matches)
- System trust and satisfaction

**Phase 3: Field Pilot**  
Deploy CPM as alternative interface option within existing dating platform. Compare users who opt-in to CPM (N=1,000) vs. control group using standard interface (N=1,000) over 6 months:
- Match rate
- Time to first date
- Relationship persistence (3-month, 6-month follow-up)
- Platform engagement patterns
- User satisfaction and Net Promoter Score

### 7.2 Key Metrics

**User Outcomes:**
- Match rate: Percentage of users who achieve mutual match
- Match quality: Tier alignment score (0-1, where 1 = both users Tier 1 for each other)
- Time to resolution: Days from joining to first in-person meeting
- Relationship persistence: Percentage of matches still together at 3, 6, 12 months
- User satisfaction: Likert scale survey responses

**Platform Health:**
- Attention equity: Gini coefficient of incoming roster adds across users (lower = more equitable)
- Pool viability: Percentage of pools with sufficient depth for matching
- Churn rate: User departure rate
- Revenue per user: Under draft entry vs. engagement-based model

**Safety Outcomes:**
- Harassment reports per 1,000 users
- Verified bad actor recidivism (ability to rejoin after banning)
- User-reported safety incidents

### 7.3 Hypotheses

**H1:** CPM will produce higher match quality (tier alignment) than infinite swipe or curated models.

**H2:** CPM will reduce time to first in-person meeting compared to baseline.

**H3:** CPM will result in more equitable attention distribution (lower Gini coefficient) than infinite swipe.

**H4:** Users with lower conventional attractiveness metrics will report higher satisfaction with CPM than with baseline models.

**H5:** Platform revenue under draft entry model will be lower per user but with higher user lifetime value due to reduced churn.

**H6:** CPM will reduce harassment incidents and improve bad actor detection through reputation scoring.

---

## 8. Ethical Considerations

### 8.1 Transparency vs. Gaming

**Tension:** Transparent systems enable gaming; opaque systems reduce trust.

**CPM Approach:** Publish algorithm principles and scoring factors, but adjust weights quarterly and use machine learning to detect gaming patterns. Users understand how the system works but cannot perfectly optimize for it.

**Remaining Concern:** Sophisticated users may still game more effectively than naive users, creating new inequities.

### 8.2 Stratification and Social Inequality

**Tension:** Stratification may reinforce existing social hierarchies based on race, class, appearance norms.

**CPM Approach:** Reputation scoring emphasizes behavioral signals (responsiveness, authenticity, engagement quality) over static attributes. Multiple viable tiers reduce "winner take all" dynamics.

**Remaining Concern:** If behavioral expectations are culturally biased (e.g., response speed norms vary across cultures), scoring may still disadvantage certain groups. Requires ongoing bias auditing.

### 8.3 Privacy and Surveillance

**Tension:** Behavioral reputation scoring requires extensive data collection and monitoring.

**CPM Approach:** 
- Users see their own scores and can audit what behaviors influence them
- Scores not shared with other users
- Data collection limited to platform interactions (no external data sources)
- Users can request data deletion (though this resets reputation)

**Remaining Concern:** Even with privacy protections, intensive behavioral monitoring may create chilling effects on authentic self-presentation.

### 8.4 Coercion and Voluntariness

**Tension:** Systems with strong network effects may become compulsory even if nominally voluntary.

**CPM Approach:** Design for interoperability—users could export their reputation scores and roster to competing platforms using CPM framework. Reduces lock-in effects.

**Remaining Concern:** If CPM becomes dominant model, users with poor scores may face exclusion from romantic marketplace altogether.

### 8.5 Recommendation

CPM should be deployed with:
1. **Regular bias audits** examining score distributions across demographic groups
2. **User control mechanisms** allowing users to contest or request review of score components
3. **Sunset provisions** requiring periodic re-authorization of data collection practices
4. **Interoperability requirements** preventing platform lock-in
5. **Opt-in deployment** where users can choose between CPM and alternative interfaces

---

## 9. Limitations and Future Work

### 9.1 Known Limitations

**Cultural Specificity:**  
CPM developed in Western contexts with assumptions about courtship norms (individual choice, monogamy emphasis, etc.). May not translate to cultures with different relationship formation processes.

**Scale Requirements:**  
Stratification requires sufficient user density in each pool. May not work in small communities or niche markets.

**Cold Start Problem:**  
New users lack behavioral history for accurate scoring and pool assignment. Requires thoughtful bootstrapping (e.g., longer initial evaluation period, conservative score estimates).

**Assumes Benign Majority:**  
Reputation scoring works if most users behave reasonably. If platform becomes dominated by bad actors, scoring system could be overwhelmed.

### 9.2 Open Questions

**Optimal Tier Structure:**  
Is 5 tiers optimal? Should tier count vary by pool size? Does tier granularity affect user decision quality?

**Temporal Dynamics:**  
How frequently should draft cycles run? Weekly? Monthly? What's the optimal balance between fresh opportunities and relationship development time?

**Multi-Dimensional Preferences:**  
Current model assumes a single priority ranking. But users may have different preferences across contexts (casual dating vs. serious relationship vs. friendship). How should system handle multi-dimensional preferences?

**Collective Action Problems:**  
If too many users adopt conservative strategies (only roster safe bets), could system equilibrate at suboptimal outcome? What mechanisms prevent coordination failures?

### 9.3 Future Research Directions

**Cross-Cultural Validation:**  
Deploy CPM in diverse cultural contexts and examine how relationship formation norms interact with constraint mechanisms.

**Preference Learning:**  
Investigate whether users' stated tier rankings align with their revealed preferences (who they actually engage with). Use discrepancies to improve algorithm.

**Long-Term Outcomes:**  
Beyond first date, do CPM matches result in more satisfying relationships? Requires longitudinal studies with relationship quality measures.

**Hybrid Models:**  
Can CPM be combined with other matching approaches (compatibility algorithms, social graph approaches) to improve outcomes?

**Agent-Based Modeling:**  
Develop sophisticated simulation frameworks to explore CPM behavior under various conditions before field deployment.

---

## 10. Conclusion

Constrained Priority Matching offers a structural alternative to extraction-based digital matching platforms. By introducing finite attention constraints, explicit priority signaling, stratified pool organization, dynamic reputation scoring, and resolution pressure, CPM realigns platform incentives with user outcomes.

The framework is not a complete solution to all challenges in digital matching—cultural context, scale requirements, and ethical considerations remain—but it demonstrates that alternative architectures are possible. Current platform failures are not inevitable features of digital matching but consequences of specific design choices optimized for engagement rather than outcomes.

CPM's broader contribution is methodological: it shows how principles from mechanism design, behavioral economics, and platform economics can be integrated to redesign institutional architecture. The same approach that addresses dating app extraction can address AI agent trust scoring, job matching, university admissions, and public resource allocation.

Successful implementation requires:
1. Transparency about algorithm logic and scoring factors
2. User control and contestability mechanisms
3. Regular bias auditing and weight adjustments
4. Empirical validation through controlled studies
5. Ethical oversight and sunset provisions

The framework is released under Creative Commons Attribution 4.0 to encourage implementation, modification, and improvement by researchers, platform developers, and policymakers. The goal is not to create a single definitive matching system but to demonstrate that misaligned incentives can be structurally addressed and to provide a foundation for further innovation.

Dating apps claim to facilitate human connection while profiting from its failure. CPM shows a different path is possible: systems can succeed when their users succeed.

---

## 11. Citation

If you implement, modify, or build upon this framework, please cite:

**APA:**  
Bronson, R. (2025). Constrained Priority Matching: A Framework for Alignment-Based Digital Matching Systems. GitHub. [https://github.com/[username]/constrained-priority-matching](https://github.com/quarterback/RostR/constrained-priority-matching.md)

**BibTeX:**
```bibtex
@misc{bronson2025cpm,
  author = {Bronson, Ron},
  title = {Constrained Priority Matching: A Framework for Alignment-Based Digital Matching Systems},
  year = {2025},
  publisher = {GitHub},
  url = {https://github.com/[username]/constrained-priority-matching},
  note = {Licensed under CC BY 4.0}
}
```

**Chicago:**  
Bronson, Ron. "Constrained Priority Matching: A Framework for Alignment-Based Digital Matching Systems." GitHub, 2025. https://github.com/quarterback/RostR/constrained-priority-matching.md

---

## 12. License

This work is licensed under a Creative Commons Attribution 4.0 International License (CC BY 4.0).

You are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material for any purpose, even commercially

Under the following terms:
- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

Full license: https://creativecommons.org/licenses/by/4.0/



---

## References

Dating App Reporting Project. (2025). Dating App Cover-Up: How Tinder, Hinge, and Their Corporate Owner Keep Rape Under Wraps. *The Markup*.

Iyengar, S. S., & Lepper, M. R. (2000). When choice is demotivating: Can one desire too much of a good thing? *Journal of Personality and Social Psychology*, 79(6), 995-1006.

Johansson Wilén, E., Wemrell, M., & Gunnarsson, L. (2025). Dating in the Age of the Algorithm. *Jacobin*.

Mezzadra, S., & Neilson, B. (2019). *The Politics of Operations: Excavating Contemporary Capitalism*. Duke University Press.

Schwartz, B. (2004). *The Paradox of Choice: Why More Is Less*. Harper Perennial.
