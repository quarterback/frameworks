# Portland STV Lab

Research notes for a possible `ronbronson.dev` simulator examining alternative Single Transferable Vote tabulation rules for Portland City Council elections.

## Status

Parked research. No simulator has been designed or implemented.

The immediate question is narrow:

> Can Portland keep its charter-mandated three-member STV elections while changing the tabulation method so the 25 percent quota reflects broader ranked support and fewer path-dependent counting artifacts?

The working hypothesis is **fixed-quota recursive STV**, a Meek-like method that preserves Portland's fixed Droop threshold while allowing elected candidates to continue receiving and passing on later preferences.

## Start here

- [ClosedTab AAR: Portland STV reform research](./docs/aar-2026-11-09-portland-stv-reform.md)
- [Research and data inventory](./docs/research-and-data.md)

## Current constraints

Portland's charter requires:

- three councilors elected from each district;
- a proportional ranked-choice method known as Single Transferable Vote;
- a threshold based on the number of seats plus one;
- election of candidates who reach the threshold;
- proportional transfer of surplus votes;
- successive elimination of low candidates when no additional candidate reaches the threshold.

City Code supplies more specific mechanics, including the six-rank limit, four-decimal truncation, simultaneous surplus transfers, and treatment of elected candidates in later rounds.

Any proposed tabulation change should be tested against the charter text before it is treated as ordinance-only.

## Future simulator

The eventual simulator should compare Portland's current method with credible alternatives using official cast-vote records. The project should explain the difference through voter-level flows rather than assume prior knowledge of election mathematics.

This repository section is research only. Visual design and implementation decisions remain open.
