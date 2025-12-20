# SPA Framework: Technical Specification

**Implementation guide for the Stratified Preference Allocation mechanism**

## 1. System Architecture

### 1.1 Core Components

```
┌─────────────────────────────────────────────────────┐
│                   SPA Platform                       │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌────────────────┐  ┌─────────────────────────┐   │
│  │  Participant   │  │   Discovery Engine      │   │
│  │  Management    │  │   - Profile browsing    │   │
│  │  - Profiles    │  │   - Filtering           │   │
│  │  - Quality     │  │   - Recommendations     │   │
│  │    scores      │  └─────────────────────────┘   │
│  └────────────────┘                                 │
│                                                      │
│  ┌────────────────┐  ┌─────────────────────────┐   │
│  │  Selection     │  │   Matching Engine       │   │
│  │  Manager       │  │   - Bilateral matching  │   │
│  │  - Draft board │  │   - Tier processing     │   │
│  │  - Tiers       │  │   - Revelation logic    │   │
│  │  - Constraints │  └─────────────────────────┘   │
│  └────────────────┘                                 │
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │         Quality Score Engine                │    │
│  │  - Metric calculation                       │    │
│  │  - Capacity computation                     │    │
│  │  - Behavior tracking                        │    │
│  └────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

### 1.2 Data Models

#### Participant
```typescript
interface Participant {
  id: string;
  profile: ProfileData;
  qualityScore: QualityScore;
  draftBoard: DraftBoard;
  matches: Match[];
  metadata: {
    createdAt: Date;
    lastActive: Date;
  };
}
```

#### Quality Score
```typescript
interface QualityScore {
  total: number;              // 0-1000
  components: {
    profileCompleteness: number;  // 0-200
    responseRate: number;          // 0-200
    matchEngagement: number;       // 0-200
    photoQuality: number;          // 0-200
    bioQuality: number;            // 0-200
  };
  capacity: number;           // Derived: selection slots
  history: ScoreHistory[];
}
```

#### Draft Board
```typescript
interface DraftBoard {
  selections: Selection[];
  capacity: number;           // k slots
  tierCapacities: {
    top: number;              // e.g., 3
    high: number;             // e.g., 4
    medium: number;           // e.g., 4
    low: number;              // e.g., remaining
    watchlist: number;        // e.g., unlimited
  };
  lastModified: Date;
  locked: boolean;            // Submitted for matching
}

interface Selection {
  participantId: string;
  tier: 'top' | 'high' | 'medium' | 'low' | 'watchlist';
  addedAt: Date;
  movedAt?: Date;
  notes?: string;
}
```

#### Match
```typescript
interface Match {
  participantId: string;
  yourTier: TierType;
  theirTier: TierType;
  matchedAt: Date;
  revealed: boolean;
  status: 'active' | 'messaged' | 'released';
  messages: Message[];
}
```

## 2. Core Algorithms

### 2.1 Capacity Calculation

```python
def calculate_capacity(quality_score: int) -> int:
    """
    Maps quality score to selection capacity.

    Args:
        quality_score: Integer from 0 to 1000

    Returns:
        Number of selection slots (k)
    """
    # Base capacity everyone gets
    BASE_CAPACITY = 10

    # Bonus capacity based on score
    # Linear scaling: +1 slot per 50 points above 500
    if quality_score >= 500:
        bonus = (quality_score - 500) // 50
    else:
        bonus = 0

    # Cap maximum capacity
    MAX_CAPACITY = 20

    return min(BASE_CAPACITY + bonus, MAX_CAPACITY)
```

**Example mappings:**
- Score 500 → 10 slots
- Score 600 → 12 slots
- Score 750 → 15 slots
- Score 900+ → 20 slots

### 2.2 Quality Score Calculation

```python
def calculate_quality_score(participant: Participant) -> int:
    """Calculate total quality score from components."""

    # Profile Completeness (0-200 points)
    profile_score = 0
    if participant.profile.photo_count >= 3: profile_score += 50
    if participant.profile.bio_length >= 100: profile_score += 50
    if participant.profile.bio_length >= 200: profile_score += 25
    if len(participant.profile.interests) >= 5: profile_score += 50
    if participant.profile.occupation: profile_score += 25

    # Response Rate (0-200 points)
    # response_rate is 0.0 to 1.0
    response_score = int(participant.response_rate * 200)

    # Match Engagement (0-200 points)
    engagement_score = 0
    if participant.avg_messages_per_match >= 5: engagement_score += 100
    if participant.match_retention_rate >= 0.7: engagement_score += 100

    # Photo Quality (0-200 points)
    # Could use ML model, for now use heuristics
    photo_score = 100  # Baseline
    if participant.profile.has_clear_face_photo: photo_score += 50
    if participant.profile.photo_variety >= 3: photo_score += 50

    # Bio Quality (0-200 points)
    bio_score = 0
    bio_length = participant.profile.bio_length
    if bio_length >= 50: bio_score += 50
    if bio_length >= 150: bio_score += 50
    if bio_length >= 300: bio_score += 50
    # Check for meaningful content (not just emojis)
    if participant.profile.bio_word_count >= 20: bio_score += 50

    total = profile_score + response_score + engagement_score + photo_score + bio_score
    return min(1000, max(0, total))
```

### 2.3 Bilateral Matching Algorithm

```python
def run_matching_round(participants: List[Participant]) -> List[Match]:
    """
    Execute one round of bilateral matching.

    Returns:
        List of newly created matches
    """
    matches = []
    processed = set()

    # Sort by quality score (optional: prioritize high-quality participants)
    sorted_participants = sorted(
        participants,
        key=lambda p: p.qualityScore.total,
        reverse=True
    )

    for participant_a in sorted_participants:
        if participant_a.id in processed:
            continue

        # Get participant_a's selections
        a_selections = {s.participantId: s.tier
                       for s in participant_a.draftBoard.selections}

        for participant_b_id, a_tier in a_selections.items():
            if participant_b_id in processed:
                continue

            participant_b = get_participant(participant_b_id)

            # Get participant_b's selections
            b_selections = {s.participantId: s.tier
                           for s in participant_b.draftBoard.selections}

            # Check for mutual selection
            if participant_a.id in b_selections:
                b_tier = b_selections[participant_a.id]

                # Create bilateral match
                match = Match(
                    participant_a_id=participant_a.id,
                    participant_b_id=participant_b.id,
                    a_tier=a_tier,
                    b_tier=b_tier,
                    matched_at=now(),
                    revealed=False
                )

                matches.append(match)
                processed.add(participant_a.id)
                processed.add(participant_b.id)
                break  # Participant A is now matched

    return matches
```

### 2.4 Tier Constraint Validation

```python
def validate_selection(
    draft_board: DraftBoard,
    new_selection_tier: TierType
) -> bool:
    """
    Check if adding a selection to a tier violates constraints.

    Returns:
        True if valid, False if constraint violated
    """
    # Count current selections in target tier
    tier_count = sum(
        1 for s in draft_board.selections
        if s.tier == new_selection_tier
    )

    # Check tier capacity
    tier_capacity = draft_board.tierCapacities[new_selection_tier]
    if tier_count >= tier_capacity:
        return False

    # Check total capacity
    total_selections = len([
        s for s in draft_board.selections
        if s.tier != 'watchlist'
    ])

    if new_selection_tier != 'watchlist' and total_selections >= draft_board.capacity:
        return False

    return True
```

## 3. API Endpoints

### 3.1 Selection Management

```
POST /api/selections
Body: {
  "participantId": string,
  "tier": "top" | "high" | "medium" | "low" | "watchlist"
}
Response: {
  "success": boolean,
  "selection": Selection,
  "remainingCapacity": number
}

PUT /api/selections/:id/tier
Body: {
  "newTier": TierType
}
Response: {
  "success": boolean,
  "selection": Selection
}

DELETE /api/selections/:id
Response: {
  "success": boolean
}

GET /api/draft-board
Response: {
  "selections": Selection[],
  "capacity": number,
  "tierCapacities": TierCapacities,
  "utilizationPercent": number
}
```

### 3.2 Matching

```
POST /api/draft-board/submit
Response: {
  "success": boolean,
  "locked": boolean,
  "nextMatchingRound": Date
}

GET /api/matches
Response: {
  "matches": Match[],
  "newMatchCount": number
}

POST /api/matches/:id/reveal
Response: {
  "yourTier": TierType,
  "theirTier": TierType
}
```

### 3.3 Quality Score

```
GET /api/quality-score
Response: {
  "total": number,
  "components": QualityScoreComponents,
  "capacity": number,
  "history": ScoreHistory[]
}

GET /api/quality-score/recommendations
Response: {
  "tips": string[],
  "potentialGains": {
    "action": string,
    "points": number
  }[]
}
```

## 4. Database Schema

### PostgreSQL Schema

```sql
-- Participants
CREATE TABLE participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  profile_data JSONB NOT NULL,
  quality_score INTEGER DEFAULT 500,
  quality_components JSONB,
  selection_capacity INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_active TIMESTAMPTZ DEFAULT now()
);

-- Draft Boards
CREATE TABLE draft_boards (
  participant_id UUID PRIMARY KEY REFERENCES participants(id),
  capacity INTEGER NOT NULL,
  tier_capacities JSONB NOT NULL,
  locked BOOLEAN DEFAULT FALSE,
  last_modified TIMESTAMPTZ DEFAULT now()
);

-- Selections
CREATE TABLE selections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
  selected_participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('top', 'high', 'medium', 'low', 'watchlist')),
  added_at TIMESTAMPTZ DEFAULT now(),
  moved_at TIMESTAMPTZ,
  notes TEXT,
  UNIQUE(participant_id, selected_participant_id)
);

-- Matches
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_a_id UUID REFERENCES participants(id),
  participant_b_id UUID REFERENCES participants(id),
  a_tier TEXT NOT NULL,
  b_tier TEXT NOT NULL,
  matched_at TIMESTAMPTZ DEFAULT now(),
  revealed BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active',
  CHECK (participant_a_id < participant_b_id),
  UNIQUE(participant_a_id, participant_b_id)
);

-- Quality Score History
CREATE TABLE quality_score_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  components JSONB NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_selections_participant ON selections(participant_id);
CREATE INDEX idx_selections_tier ON selections(tier);
CREATE INDEX idx_matches_participants ON matches(participant_a_id, participant_b_id);
CREATE INDEX idx_quality_history_participant ON quality_score_history(participant_id, recorded_at);
```

## 5. Configuration Parameters

### 5.1 System Configuration

```typescript
interface SPAConfig {
  // Capacity settings
  baseCapacity: number;           // Default: 10
  maxCapacity: number;            // Default: 20
  capacityScoreThreshold: number; // Default: 500
  capacityScoreScale: number;     // Default: 50 (points per slot)

  // Tier settings
  tierStructure: {
    top: { capacity: number };     // Default: 3
    high: { capacity: number };    // Default: 4
    medium: { capacity: number };  // Default: 4
    low: { capacity: number };     // Default: remaining
    watchlist: { capacity: number }; // Default: unlimited
  };

  // Matching settings
  matchingFrequency: 'realtime' | 'daily' | 'weekly';
  tierRevelationPolicy: 'immediate' | 'delayed' | 'never';

  // Quality score settings
  scoreUpdateFrequency: number;   // Hours between recalculations
  scoreComponents: {
    profileCompleteness: { weight: number };
    responseRate: { weight: number };
    matchEngagement: { weight: number };
    photoQuality: { weight: number };
    bioQuality: { weight: number };
  };
}
```

### 5.2 Tunable Parameters

| Parameter | Tight | Moderate | Loose |
|-----------|-------|----------|-------|
| Base Capacity | 8 | 10 | 15 |
| Max Capacity | 15 | 20 | 30 |
| Top Tier Capacity | 2 | 3 | 5 |
| High Tier Capacity | 3 | 4 | 6 |
| Matching Frequency | Daily | Daily | Realtime |

## 6. Performance Considerations

### 6.1 Scaling Factors

**Database queries:**
- Selection reads: O(k) per participant
- Matching algorithm: O(n·k) worst case
- Quality score updates: O(n) batch processing

**Optimization strategies:**
- Cache draft boards in Redis
- Pre-compute quality scores daily
- Index selections by participant and tier
- Batch matching operations

### 6.2 Load Estimates

For 100,000 active participants:
- Average 15 selections each = 1.5M selection records
- Daily matching computation: ~30 seconds with optimization
- Quality score batch update: ~5 minutes

## 7. Testing Strategies

### 7.1 Unit Tests

```typescript
// Test capacity calculation
test('capacity scales with quality score', () => {
  expect(calculateCapacity(500)).toBe(10);
  expect(calculateCapacity(750)).toBe(15);
  expect(calculateCapacity(1000)).toBe(20);
});

// Test constraint validation
test('rejects selection when tier is full', () => {
  const draftBoard = createDraftBoard();
  fillTier(draftBoard, 'top', 3);
  expect(validateSelection(draftBoard, 'top')).toBe(false);
});

// Test bilateral matching
test('creates match only when mutual selection exists', () => {
  const [a, b] = createParticipants(2);
  a.selectParticipant(b.id, 'high');
  b.selectParticipant(a.id, 'medium');

  const matches = runMatching([a, b]);
  expect(matches).toHaveLength(1);
  expect(matches[0].a_tier).toBe('high');
  expect(matches[0].b_tier).toBe('medium');
});
```

### 7.2 Integration Tests

- End-to-end selection workflow
- Multi-round matching scenarios
- Quality score update pipeline
- Tier constraint enforcement across operations

### 7.3 Load Tests

- 10K concurrent users browsing profiles
- 1K simultaneous selection updates
- Matching algorithm performance with 100K participants
- Quality score batch processing time

## 8. Migration Path

### 8.1 From Traditional Swiping

**Phase 1: Parallel implementation**
- Run SPA alongside existing system
- A/B test with subset of users
- Collect metrics and feedback

**Phase 2: Hybrid mode**
- Allow users to choose mechanism
- Gradually increase SPA allocation
- Monitor comparative performance

**Phase 3: Full migration**
- Migrate all users to SPA
- Deprecate old system
- Optimize based on learnings

### 8.2 Data Migration

```sql
-- Convert unlimited likes to constrained selections
-- Strategy: Keep only most recent k likes, assign tiers randomly

WITH ranked_likes AS (
  SELECT
    user_id,
    liked_user_id,
    created_at,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) as rank
  FROM likes
)
INSERT INTO selections (participant_id, selected_participant_id, tier)
SELECT
  user_id,
  liked_user_id,
  CASE
    WHEN rank <= 3 THEN 'top'
    WHEN rank <= 7 THEN 'high'
    WHEN rank <= 11 THEN 'medium'
    ELSE 'low'
  END as tier
FROM ranked_likes
WHERE rank <= 15;
```

---

*This technical specification is part of the SPA Framework project. See [FRAMEWORK.md](./FRAMEWORK.md) for theoretical foundations.*
