# Research and data inventory

This file preserves the source material needed to restart the Portland STV project.

## Primary Portland rules

### Portland Charter Section 3-102, Ranked Choice Voting

https://www.portland.gov/charter/3/1/102

Relevant points:

- Councilors are elected through a proportional ranked-choice method known as Single Transferable Vote.
- The threshold is determined by the number of seats plus one.
- Candidates at or above the threshold are elected.
- Votes above the threshold are surplus.
- Surplus percentages transfer proportionally to next-highest ranked candidates.
- Low candidates are successively eliminated when no new candidate reaches the threshold.
- Council must adopt an election code for administration.

### Portland City Code 2.08.030, Ranked Choice Voting

https://www.portland.gov/code/2/08/030

Relevant implementation choices:

- voters generally may rank six candidates;
- each STV ballot begins at transfer value 1;
- threshold is computed from first-round active votes and seats plus one;
- surplus fraction is `(V - T) / V`;
- surplus fraction and ballot transfer values are truncated after four decimal places;
- all ballots assigned to an elected candidate transfer at the same surplus fraction;
- simultaneous winners transfer surpluses simultaneously;
- an elected candidate is treated as holding exactly the threshold in future rounds;
- low-candidate ties can be determined by lot when tabulation cannot continue.

## Current Portland election explanation

https://www.portland.gov/vote/ranked-choice-voting-rcv

https://www.portland.gov/vote/questions/ranked-choice-voting-and-ballot

Useful public-facing facts:

- council elections use multi-winner ranked-choice voting;
- three seats produce a threshold above 25 percent;
- voters may rank up to six candidates;
- the number of candidates on the ballot is not capped at six.

## Official Portland data

### 2024 certified cast-vote records

https://multco.us/info/turnout-and-statistics-november-2024-general-election

Available CVRs include:

- Council District 1;
- Council District 2;
- Council District 3;
- Council District 4;
- Mayor;
- Auditor.

The council CSV files are large, approximately 99 MB to 153 MB each as published by the county.

The same page also provides a ballot-data report with turnout, overvotes, undervotes, and use of rankings.

### 2026 RCV reports

Multnomah County RCV landing page:

https://multco.us/info/ranked-choice-voting-rcv

District 3 preliminary report observed November 9, 2026:

https://rcvresults.multco.us/Reports/e4d5172d-7171-4bec-9dec-2ca986dca5cd/City_of_Portland_Councilor_-_District_3

The report provides:

- round-by-round results;
- downloadable CSV;
- JSON summary data;
- file documentation.

Final 2026 CVRs should replace preliminary summary data when available for research use.

## STV comparison sources

### Scotland: Weighted Inclusive Gregory

Scottish Government documentation:

https://www.gov.scot/binaries/content/documents/govscot/publications/foi-eir-release/2018/11-a/foi-18-03473/documents/foi-18-03473---related-documents/foi-18-03473---related-documents/govscot%3Adocument/FOI-18-03473%2B-%2Brelated%2Bdocuments.pdf

Key points:

- Scottish local elections use STV in multi-member wards.
- Wards can elect three or four members.
- Scotland uses the Droop quota.
- The transfer system is Weighted Inclusive Gregory.
- Voters can rank as many candidates as they wish.

### New Zealand: Meek STV

New Zealand Local Electoral Regulations 2001:

https://www.legislation.govt.nz/secondary-legislation/pco-drafted/2003/391/en/latest/

Relevant mechanics include:

- candidate keep values;
- successful candidate keep value based on quota divided by candidate vote;
- hopeful candidate keep value 1;
- withdrawn/excluded candidate keep value 0;
- iterative allocation of vote weight through preference order;
- official reporting of quota and final keep values.

Important difference from the proposed Portland hybrid:

New Zealand Meek can recalculate the quota as nontransferable votes change. The Portland research hypothesis holds the charter quota fixed.

### Royal Statistical Society: Meek comparison

https://rss.org.uk/RSS/media/File-library/News/2022/Single-transferable-vote-ERS97-vs-the-Meek-method.pdf

Useful conceptual points:

- ordinary STV methods stop elected candidates from receiving further surpluses;
- Meek lets elected candidates continue receiving and transferring vote weight;
- keep values are adjusted as the count changes;
- ballots can continue through candidates in their stated preference order.

## Working model

### Fixed-quota recursive STV

This is a research hypothesis, not an established named Portland election method.

Core idea:

```
Q = Portland charter quota, fixed from the initial count

for each candidate:
  hopeful -> keep = 1
  eliminated -> keep = 0
  elected -> keep adjusted so retained vote approaches Q

route each ballot through ranked candidates:
  candidate retains ballot_weight * keep
  remainder continues to next ranked candidate

if an unelected candidate reaches Q:
  elect candidate
  recalculate

if nobody new reaches Q:
  eliminate lowest continuing candidate
  recalculate

stop when three seats are filled
```

Questions to resolve:

1. Does Portland's charter permit elected candidates to receive later transfers as long as they ultimately retain no more than the fixed threshold?
2. Must the charter's reference to the "surplus percentage" be implemented as a one-time Gregory fraction?
3. Can the recursive algorithm be expressed as repeated proportional surplus transfers under the charter language?
4. What arithmetic precision and convergence rule should be used?
5. What audit record is necessary to reproduce every iteration?
6. What software certification would Oregon require?

## Simulator comparison schema

Recommended output per contest and method:

```json
{
  "election": "2024 Portland Council District 1",
  "method": "fixed-quota-recursive",
  "quota": 0,
  "ballots": 0,
  "winners": [],
  "iterations": 0,
  "exhausted_weight": 0,
  "candidates": [
    {
      "name": "",
      "first_choice_share": 0,
      "ranked_anywhere_share": 0,
      "top_three_share": 0,
      "contributing_ballot_share": 0,
      "retained_weight": 0,
      "transferred_weight": 0,
      "elected_iteration": null,
      "eliminated_iteration": null
    }
  ]
}
```

Additional event-level trace should record:

- ballot or aggregate ballot pattern;
- source candidate;
- destination candidate;
- rank used;
- weight before transfer;
- weight retained;
- weight transferred;
- reason for transfer;
- iteration.

That trace is what a later explanatory visualization should consume.

## Claims that remain hypotheses

Do not treat these as established without empirical testing:

- current STV materially advantages incumbents;
- recursive STV reduces incumbent advantage;
- current STV produces outcomes contrary to district community preferences;
- voters would rank the same way under a different STV algorithm;
- broader contributing reach is equivalent to political legitimacy;
- fixed-quota recursive STV can be adopted without a charter amendment.

The simulator can test tabulation behavior. Separate research is needed for campaign strategy, voter adaptation, incumbency effects, legal authority, and normative legitimacy.
