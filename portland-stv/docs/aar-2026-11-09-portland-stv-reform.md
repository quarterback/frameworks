# Agent Action Record: Portland STV reform research

**Date:** 2026-11-09  
**Status:** Parked for later development  
**Project:** Portland STV Lab  
**Possible publication surface:** ronbronson.dev  
**Record format:** ClosedTab Agent Action Record

## Intent

The project began with a practical constraint: Portland is likely to keep three-member City Council districts and Single Transferable Vote because changing the charter is difficult. The useful intervention is therefore the election code and tabulation method, not a broader attempt to reverse the form of government.

The research question became:

> How can Portland retain ranked-choice voting and the charter's STV threshold while making a council seat reflect broader voter support than a narrow first-choice bloc?

The motivating concerns are:

- A three-seat Droop quota is approximately 25 percent plus one vote. That feels unlike the majority rule many U.S. voters expect from single-winner elections.
- The current Weighted Inclusive Gregory-style count can make later ballot behavior depend on when candidates are elected or eliminated.
- Once a candidate is elected under Portland's current code, later transfers skip that candidate. A voter's stated ranking can therefore be interpreted differently depending on the state of the count.
- A six-ranking limit can prevent voters from expressing support for every acceptable candidate when fields are large.
- The desired reform should preserve ranked ballots and proportional representation while reducing avoidable tabulation artifacts.
- The political path should be as narrow as possible. The working assumption is an ordinance-level change to the kind of STV used, subject to legal review against Charter Section 3-102.

Out of scope for this research segment:

- redesigning Portland's form of government;
- changing the number of council seats or districts;
- proposing parliamentary confidence or dissolution mechanisms;
- designing the eventual data visualization;
- writing production simulator code;
- advocating for or against individual candidates.

## Action

Research compared Portland's current election code with established STV variants and identified the parts of the system fixed by charter versus specified by ordinance.

### Portland's current rule

Portland Charter Section 3-102 requires councilors to be elected through a proportional ranked-choice method known as Single Transferable Vote. The threshold is determined by the number of seats plus one. With three seats, this is approximately 25 percent plus one vote.

City Code 2.08.030 implements a Weighted Inclusive Gregory-style surplus rule:

1. Each ballot begins with transfer value 1.
2. A candidate at or above the threshold is elected.
3. The candidate's surplus fraction is `(V - T) / V`.
4. Every ballot assigned to that candidate receives a reduced transfer value based on the surplus fraction.
5. The calculation is truncated after four decimal places.
6. Those ballots transfer to their next highest-ranked active candidate.
7. Elected candidates are treated as holding exactly the threshold in later rounds and are no longer active destinations for later transfers.
8. If nobody reaches the threshold, the lowest candidate is eliminated and their ballots transfer.
9. Portland generally permits voters to rank up to six candidates.

The key distinction is that **Gregory controls surplus transfer mechanics. It does not create the 25 percent quota.** The charter's seats-plus-one threshold does.

### Established alternatives reviewed

#### Weighted Inclusive Gregory

Scotland uses Weighted Inclusive Gregory for local government STV. It is a mature implementation and uses three- and four-member wards. It validates that Portland's core method belongs to an established STV family rather than a unique new algorithm.

It does not solve the central research problem because elected candidates stop participating in later preference flows.

#### Meek STV

New Zealand local elections use a Meek method. Each candidate has a `keep value`.

- hopeful candidate: keep value 1;
- excluded candidate: keep value 0;
- elected candidate: keep only the fraction needed to maintain a quota and pass the rest onward.

Elected candidates continue receiving later preferences. Their keep values are recalculated as more vote weight reaches them.

The Royal Statistical Society comparison identifies the important conceptual distinction: in ordinary STV, elected candidates are ignored in later rounds, while Meek continues to route preferences through them. This means a ballot can continue to follow its actual ranking order.

Standard New Zealand Meek also recalculates the quota as nontransferable vote changes. That is a poor fit for Portland because the Portland charter describes a threshold derived from the initial vote and seats-plus-one structure.

### Working variant: fixed-quota recursive STV

The strongest candidate for later simulation is a Portland-specific hybrid:

**Keep Portland's charter threshold fixed, but use Meek-style recursive keep values.**

Provisional mechanics:

1. Calculate the Portland election threshold once using the charter formula.
2. Count first preferences.
3. Declare a candidate elected immediately upon reaching the fixed threshold.
4. Keep elected candidates in the preference graph.
5. For an elected candidate with current vote weight `V` and fixed quota `Q`, calculate a keep value approximately equal to `Q / V`.
6. The elected candidate retains the required fraction of every vote reaching them and passes the remainder to the next ranked candidate.
7. Recalculate flows when later transfers reach elected candidates.
8. If no additional candidate reaches the threshold, eliminate the lowest continuing candidate as the charter requires.
9. Repeat until all three seats are filled.

This is not yet a legal conclusion or a finished election rule. It is the main hypothesis to test.

### Why recursive support matters

Suppose 100 valid ballots create a quota of 26.

A candidate could reach 26 first preferences and be elected. Under the current model, that initial bloc is sufficient to fill the seat.

Under a recursive model, later ballots that rank the winner second, third, or later can still flow through that winner. If 56 ballots eventually route some vote weight through the elected candidate, a simple illustrative keep value would be:

`26 / 56 = 0.4643`

The winner still retains exactly one 26-vote quota. The difference is that the retained quota can be composed fractionally from a much broader set of voters while the unused share of those ballots continues to other choices.

This does **not** prevent a candidate with a concentrated 26 percent first-choice bloc from winning. The charter threshold still permits that. It does allow the count to recognize broader support when voters actually expressed it.

### Other variants considered

**Scottish WIG:** useful benchmark, but too close to Portland's current logic to address the main concern.

**Full New Zealand Meek:** theoretically attractive, but its changing quota creates a stronger charter-fit question.

**Cambridge/Cincinnati whole-ballot surplus transfer:** historically interesting and easier to describe as whole votes, but which ballots transfer can matter. It substitutes a different source of arbitrariness.

**CPO-STV and Sequential STV:** academically interesting because they address premature elimination and compare possible winning sets. They are poor ordinance-level candidates because Portland's charter expressly describes successive elimination of low candidates.

### Available empirical data

Multnomah County publishes the 2024 certified cast-vote records for Portland Mayor, Auditor, and all four Council districts. Council CVRs are large CSV files containing the rankings marked in each contest.

The county also publishes 2026 RCV result data, including JSON and CSV summary data for Council contests. As of November 9, 2026, District 3's preliminary report shows a three-seat contest using the six-ranking ballot and a multi-round STV tabulation.

Those records make a real re-tabulation study possible. The future simulator does not need synthetic elections as its primary evidence.

## Judgment

The main judgment from this research is that the most useful reform target is **support breadth within the existing quota**, not an attempt to disguise a higher winning threshold inside the tabulator.

Changing Gregory alone cannot turn Portland's approximately 25 percent threshold into a majority requirement. The charter defines the threshold.

The better design question is:

> Can a 25 percent retained quota be assembled from a substantially broader share of voters because every ranking remains live throughout the count?

That leads to fixed-quota recursive STV as the strongest current hypothesis.

A useful public explanation would distinguish four quantities that Portland's current public results tend to collapse into a single "25 percent" story:

- **first-choice share:** ballots ranking the candidate first;
- **ranked reach:** ballots ranking the candidate anywhere within the available rankings;
- **contributing reach:** ballots that actually contribute nonzero vote weight to the candidate during the final count;
- **retained quota:** the final vote weight the elected candidate keeps to occupy one seat.

A candidate could therefore retain a 25 percent quota while drawing contributing support from a much larger portion of the electorate.

This is closer to the democratic concern motivating the project than simply replacing one surplus formula with another.

### Metrics worth preserving for a later simulator

For each candidate and each tabulation method:

- first-choice vote share;
- share of ballots ranking the candidate anywhere;
- share ranking the candidate in the top three;
- number and share of unique ballots contributing positive final vote weight;
- distribution of contribution by rank position;
- retained vote weight;
- transferred vote weight;
- exhausted or nontransferable vote weight;
- rounds or iterations required;
- elimination order;
- winner set;
- sensitivity to four-decimal truncation;
- sensitivity to tie resolution;
- number of times a ballot skips an elected candidate under the current method;
- amount of vote weight affected by those skips;
- effects of the six-ranking ceiling.

For comparisons across methods:

- whether the winner set changes;
- when and why the winner set changes;
- whether broader ranked support is reflected in the final retained quotas;
- whether the method reduces dependence on the timing of election and elimination events;
- whether the method makes more of each voter's expressed ranking consequential.

These should be descriptive measurements. Claims about "community will," incumbent advantage, strategic voting, or candidate legitimacy require separate empirical evidence.

## Deviation

The initial exploration treated the problem as "find a better form of STV" and briefly focused on whether Portland's version was novel.

That was the wrong level of analysis for the intended project.

The useful constraints emerged during the conversation:

1. Charter change is not the practical target.
2. The project is about modifying the STV implementation while retaining Portland's three-member districts and ranked ballots.
3. The principal political objection is not merely mathematical elegance. It is that a councilor can be elected at roughly 25 percent in a political culture accustomed to majority-style single-winner elections.
4. Raising the quota through ordinance is not the available route because the threshold itself is in the charter.
5. The useful alternative is to make the existing quota represent broader ranked support whenever that support exists.
6. A Pudding-style simulator is a later communication artifact, not the work of this research segment.

A second correction is important: Portland's current method should not be described as uniquely invented for Portland. Its mechanics are closely related to the established Weighted Inclusive Gregory family. The project should critique the specific design choices and their consequences rather than depend on a novelty claim.

A third unresolved issue is legal fit. Portland's charter describes transfer of the "surplus percentage" of votes for elected candidates. Fixed-quota recursive STV appears conceptually compatible with STV and the fixed threshold, but a legal reading is needed before claiming that repeated keep-value recalculation can be adopted solely by ordinance.

## Consequence

The research now supports a much tighter future project.

The simulator can ask a concrete question:

> What changes when Portland's 25 percent STV quota is filled through recursive ranked support instead of one-time Gregory surplus transfers?

That creates a comparison grounded in actual Portland ballots rather than a generic debate over ranked-choice voting.

The likely analytical value is in showing **how vote weight travels**:

- which ballots elect each councilor;
- how many distinct voters contribute to each retained quota;
- which expressed rankings are skipped under the current rule;
- how recursive counting changes those flows;
- whether any actual winner sets change;
- how much of the difference is caused by transfer rules versus the six-ranking limit.

### Risks to carry forward

**Legal risk:** The charter language may constrain recursive treatment of elected candidates more than the working hypothesis assumes.

**Definition risk:** "Broad support" must be defined with transparent metrics. Ranking someone sixth is different from ranking them first.

**Interpretation risk:** A broader contributing pool does not automatically prove greater legitimacy or representativeness.

**Strategic-behavior risk:** The simulator will initially re-tabulate ballots cast under the current rules. It cannot directly show how voters or campaigns would behave if the counting rule changed.

**Data risk:** The six-ranking ceiling means existing CVRs do not reveal preferences beyond rank six. No algorithm can reconstruct those missing preferences.

**Communication risk:** Meek-style recursion can become mathematically opaque. The eventual explanation should expose ballot flows without requiring voters to understand iterative convergence.

**Implementation risk:** Election software certification, county administration, and reproducibility may constrain technically valid alternatives.

At 100 repeated research runs, the expected failure would be prematurely treating an elegant counting algorithm as a proven political or legal fix. The project should keep the distinction between mathematical behavior, voter behavior, legal authority, and political feasibility explicit.

## Change

When this project resumes, do the work in this order.

### 1. Establish the exact legal envelope

Read Charter Section 3-102 and City Code 2.08.030 as a specification.

Create two lists:

**Fixed by charter**
- three-member STV;
- seats-plus-one threshold;
- election at threshold;
- proportional surplus transfer;
- successive elimination when required.

**Potentially ordinance-level**
- precision and truncation;
- exact surplus-transfer implementation;
- simultaneous versus sequential surplus handling;
- treatment of elected candidates in later calculations;
- tie procedure;
- number of rankings, subject to voting equipment and other law;
- reporting and audit outputs.

Have election counsel review the proposed recursive rule before the project describes it as charter-compatible.

### 2. Implement reference tabulators

Build small, independently testable implementations for:

1. Portland 2.08.030 current method;
2. exact-precision WIG;
3. standard Meek;
4. fixed-quota recursive STV.

Do not begin with the visualization.

### 3. Validate the Portland implementation

Use official published round totals to prove that the Portland reference tabulator reproduces certified 2024 results before comparing alternatives.

### 4. Run official CVRs

Start with the four 2024 Council contests.

Then add 2026 Districts 3 and 4 once final CVRs are published.

Produce a machine-readable comparison table for every contest and method.

### 5. Measure support breadth

For every elected candidate calculate:

- first-choice share;
- ranked-anywhere share;
- top-three share;
- unique contributing ballot share;
- contribution-weight distribution by rank;
- retained quota;
- transferred remainder.

This is the core evidence for the project's thesis.

### 6. Isolate causes

Run sensitivity tests separately for:

- recursive treatment of elected candidates;
- exact arithmetic versus four-decimal truncation;
- six-ranking ceiling;
- tie handling;
- simultaneous surplus transfer.

Do not attribute an outcome change to "Meek" if one smaller rule change actually caused it.

### 7. Only then build the public simulator

The future ronbronson.dev artifact can use a Pudding-style explanatory form, but its job should be to reveal verified differences from the tabulation study rather than manufacture a predetermined conclusion.

### Working research question for the next session

**Can Portland preserve its charter-mandated 25 percent STV threshold while making each elected councilor's retained quota reflect a broader and more faithful traversal of voters' ranked preferences?**
