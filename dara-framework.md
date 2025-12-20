# Delegated Authority Risk Assessment (DARA)
## A Framework for Evaluating Consequence Exposure in Autonomous Systems

**Author:** Ron Bronson  
**Date:** December 2025  
**Version:** 1.0  
**License:** Creative Commons Attribution 4.0 International (CC BY 4.0)

---

## Abstract

As organizations delegate decision-making authority to AI agents, they create consequence exposure: downstream human labor, institutional escalation, and reputational risk that emerges when autonomous systems fail or produce contested outcomes. The Delegated Authority Risk Assessment (DARA) framework provides a structured methodology for evaluating this exposure based on publicly observable evidence. Unlike technical performance metrics or safety certifications, DARA measures the institutional burden created by deploying agents in high-stakes environments. This framework enables organizations to make informed delegation decisions by making visible the costs currently absorbed informally by people and institutions.

---

## 1. Problem Statement

### 1.1 The Delegation Paradox

Organizations deploy AI agents to reduce human labor, but agent failures often create more work than they eliminate. When an agent makes an incorrect benefits determination, misclassifies a permit application, or generates a legally questionable contract clause, humans must intervene. This intervention is not simply "catching errors"—it involves explanation, justification, repair of trust, potential legal exposure, and institutional accountability for outcomes the human did not directly produce.

The promise of automation is efficiency. The reality is often consequence displacement: work that was visible and managed becomes invisible and diffuse, absorbed by customer service representatives, appeals officers, legal teams, communications departments, and affected individuals who must contest decisions or navigate repair processes.

### 1.2 Why Traditional Metrics Fail

Existing evaluation approaches focus on technical performance:
- **Accuracy metrics** measure how often agents produce correct outputs but ignore the cost of incorrect ones
- **Safety evaluations** assess catastrophic failure modes but not chronic low-grade friction
- **Alignment research** studies intent preservation but not institutional burden
- **Benchmark performance** compares capabilities but not deployment consequences

None of these frameworks answer the question: "If we delegate this decision to this agent, how much institutional risk are we accepting?"

### 1.3 The Need for Consequence-Based Assessment

Organizations need a framework that evaluates agents based on the reality of deployment, not the promise of technology. DARA provides this by measuring:

1. **Scope of delegated authority** - What real-world power does the agent exercise?
2. **Human override friction** - How hard is it to correct agent decisions?
3. **Population exposure** - Who bears the consequences and at what scale?
4. **Interpretability burden** - How much explanation labor does the agent create?
5. **Failure visibility and escalation gravity** - What happens when things go wrong?

These dimensions capture the institutional reality of autonomous systems: someone always pays for failures, and that cost must be legible before delegation decisions are made.

---

## 2. Core Principles

### 2.1 Consequence Exposure is the Primary Metric

DARA does not measure agent intelligence, accuracy, or technical sophistication. It measures the institutional burden created when authority is delegated. An agent that makes correct decisions 99% of the time but creates catastrophic consequences in the 1% may score worse than an agent with 95% accuracy whose failures are easily contained.

**Rationale:** Organizations care about total cost of deployment, not technical performance in isolation. A highly accurate agent that occasionally triggers lawsuits, media crises, or regulatory investigations is riskier than a moderately accurate agent whose failures are self-correcting.

### 2.2 Assessment is Based on Observable Evidence

DARA relies exclusively on publicly available information: journalism, court rulings, regulatory actions, company disclosures, documented incidents. Internal logs, proprietary telemetry, and confidential data are not required and not used.

**Rationale:** 
- Public accountability requires public evidence
- Organizations can contest assessments using the same evidence standards
- Reduces information asymmetry between deploying organizations and affected populations
- Prevents assessment capture by organizations with privileged data access

### 2.3 Ratings are Structured Judgments, Not Objective Facts

DARA assessments involve human interpretation of evidence. Two evaluators may reasonably disagree on dimension scores. This subjectivity is intentional and transparent.

**Rationale:**
Consequence exposure is experienced and negotiated socially. The burden of explaining an agent's decision to an angry constituent, the institutional cost of a lawsuit, the reputational damage from a media investigation—these cannot be fully quantified. They require judgment about institutional context, political environment, and social norms.

DARA makes this judgment disciplined and contestable through:
- Explicit scoring rubrics
- Written justification for each dimension
- Version control and revision history
- Public methodology enabling critique

### 2.4 Scores Reflect Current Deployment Context

Agent risk is not static. The same agent deployed in different contexts creates different exposure. An agent processing internal HR queries has lower risk than one making disability benefits determinations. DARA scores specific deployments, not abstract capabilities.

**Rationale:** Risk emerges from the interaction between agent capabilities and delegation context. The framework evaluates "this agent in this role" not "this agent in general."

---

## 3. The DARA Scoring Framework

### 3.1 Scoring Scale

Delegated Authority Risk Scores range from **100 to 600**.

Lower scores indicate **higher consequence exposure** (higher risk).

**Score Bands:**

- **550-600: Prime** - Low consequence exposure. Failures are self-correcting and rarely escalate.
- **450-549: Near Prime** - Moderate exposure. Human intervention occurs but is distributed and containable.
- **300-449: Subprime** - High exposure. Failures regularly trigger escalation, labor concentration, or institutional risk.
- **100-299: Deep Subprime** - Severe exposure. Consequences are concentrated, visible, and costly to manage.

**Why this scale?**

The 100-600 range mirrors consumer credit scores, making the framework immediately legible to organizations familiar with risk assessment. The inversion (lower = higher risk) matches credit scoring conventions where lower scores indicate higher risk exposure.

### 3.2 Five Assessment Dimensions

Each dimension is scored independently from **20 to 120 points**.

Total DARA score = sum of five dimension scores.

---

## 4. Dimension 1: Scope of Delegated Authority

**What this measures:** How much real-world decision power the agent exercises.

**Key questions:**
- Does the agent provide recommendations or make binding decisions?
- Can the agent affect access to resources, services, or rights?
- Does the agent's output directly shape material outcomes for humans?
- Can agent decisions trigger enforcement, penalties, or denial of benefits?

**Scoring rubric:**

**100-120 (Low Risk): Advisory Role**
- Agent provides information or recommendations
- Humans make all final decisions
- Agent output is clearly labeled as non-authoritative
- No direct material consequences from agent outputs
- *Example:* Research assistant summarizing academic papers

**80-99 (Low-Moderate Risk): Filtered Authority**
- Agent makes preliminary decisions subject to human review
- All consequential outputs verified before action
- Clear human accountability for final outcomes
- Override is routine and expected
- *Example:* Document classifier flagging items for human triage

**60-79 (Moderate Risk): Conditional Authority**
- Agent makes binding decisions within constrained scope
- Human review triggered only by flags or appeals
- Most outputs proceed without verification
- Material consequences but bounded by domain limits
- *Example:* Automated parking violation processing

**40-59 (Moderate-High Risk): Presumptive Authority**
- Agent decisions are binding unless contested
- Human review requires active appeal or complaint
- Significant material consequences (money, access, status)
- Override requires justification and effort
- *Example:* Benefits eligibility determination

**20-39 (High Risk): Binding Authority**
- Agent makes consequential decisions with minimal oversight
- Affects fundamental rights, safety, or life circumstances
- Human intervention rare or procedurally difficult
- Decisions carry force of law or institutional power
- *Example:* Predictive policing deployment recommendations, parole risk assessment

---

## 5. Dimension 2: Human Override Friction

**What this measures:** How difficult it is for a human to intervene once the agent acts.

**Key questions:**
- Can decisions be reversed immediately or do they require procedural escalation?
- What is the time and effort cost of correcting agent outputs?
- Does override require specialized knowledge, authority, or access?
- Are there institutional, legal, or technical barriers to reversal?

**Scoring rubric:**

**100-120 (Low Friction): Immediate Override**
- Decisions can be reversed instantly
- No special authority or process required
- Undo function is obvious and accessible
- No lasting consequences from temporary errors
- *Example:* Email auto-categorization with manual re-sort

**80-99 (Low-Moderate Friction): Routine Override**
- Override requires simple request or form
- Reversal happens within hours or days
- Process is documented and accessible
- Minimal cost to affected parties
- *Example:* Spam filter with easy "not spam" button

**60-79 (Moderate Friction): Procedural Override**
- Requires formal request or appeal
- Multi-step process with waiting periods
- May require documentation or justification
- Some burden on affected parties but manageable
- *Example:* Insurance claim denial with standard appeal process

**40-59 (Moderate-High Friction): Escalated Override**
- Requires supervisor approval or specialized review
- Process takes weeks or months
- May require legal representation or advocacy
- Significant burden on affected parties
- *Example:* Disability benefits appeal with administrative hearing

**20-39 (High Friction): Structural Override Barriers**
- Reversal requires legal action, regulatory intervention, or public pressure
- Process takes months or years
- Substantial cost in time, money, or expertise
- Many affected parties cannot effectively contest
- *Example:* Criminal sentencing recommendation requiring appeal to higher courts

---

## 6. Dimension 3: Population Exposure

**What this measures:** Who is affected and at what scale.

**Key questions:**
- Are affected individuals internal users or general public?
- What is the volume of interactions?
- Do affected populations have alternative options?
- Are vulnerable populations disproportionately exposed?
- Is the context safety-critical?

**Scoring rubric:**

**100-120 (Low Exposure): Internal / Specialized**
- Affects internal organizational users only
- Small volume (hundreds to low thousands of interactions)
- Users have technical sophistication and institutional power
- Non-critical contexts with low stakes
- *Example:* Code review assistant for software developers

**80-99 (Low-Moderate Exposure): Controlled Public**
- Affects external users in opt-in contexts
- Moderate volume (thousands to tens of thousands)
- Users can easily exit or choose alternatives
- Non-essential services
- *Example:* Restaurant recommendation app

**60-79 (Moderate Exposure): Broad Public / Non-Critical**
- Affects general public at scale (hundreds of thousands)
- Limited alternatives but not essential services
- Diverse population with varying sophistication
- Errors create inconvenience but not crisis
- *Example:* Package delivery routing optimization

**40-59 (Moderate-High Exposure): Essential Services**
- Affects populations dependent on service (no practical alternatives)
- Large scale (millions of interactions)
- Includes vulnerable populations (low income, elderly, disabled)
- Errors create significant hardship
- *Example:* Medicaid eligibility determination

**20-39 (High Exposure): Critical / Vulnerable**
- Affects fundamental rights, safety, or life circumstances
- Massive scale or highly vulnerable populations
- No alternatives or exit options
- Errors can be catastrophic for individuals
- Disproportionate impact on marginalized groups
- *Example:* Child welfare risk assessment, criminal justice pretrial detention

---

## 7. Dimension 4: Interpretability Burden

**What this measures:** How much explanation labor is required when the agent's behavior is questioned.

**Key questions:**
- Can the agent's reasoning be clearly explained?
- Who bears the burden of explanation (agent deployer vs. affected party)?
- Do explanations require technical expertise to understand?
- Are outputs plausible enough to avoid explanation demands?
- What narrative labor is required to justify outcomes?

**Scoring rubric:**

**100-120 (Low Burden): Transparent Deterministic**
- Agent follows clear, documented rules
- Reasoning is fully traceable
- Explanations are simple and accessible
- Outputs rarely require justification
- *Example:* Tax calculation following published tax code

**80-99 (Low-Moderate Burden): Interpretable Heuristic**
- Agent uses understandable decision criteria
- Explanations reference observable factors
- Some expertise helpful but not required
- Occasional explanation requests, easily satisfied
- *Example:* Loan approval based on documented credit criteria

**60-79 (Moderate Burden): Statistical Model**
- Agent uses probability or correlation-based reasoning
- Explanations require statistical literacy
- Outputs sometimes counter-intuitive, requiring justification
- Regular explanation demands from users or oversight
- *Example:* Fraud detection flagging unusual but legitimate transactions

**40-59 (Moderate-High Burden): Complex Ensemble**
- Agent combines multiple opaque models
- Explanations are post-hoc rationalizations
- Significant expertise required to generate credible explanations
- Frequent contestation of outputs
- High labor cost for explanation staff
- *Example:* Credit scoring combining dozens of factors

**20-39 (High Burden): Opaque / Implausible Outputs**
- Agent reasoning cannot be meaningfully explained
- Outputs sometimes defy common sense understanding
- Explanations require extensive narrative construction
- Legal, regulatory, or public accountability demands constant
- Explanation failures create institutional crises
- *Example:* Deep learning model denying parole with no interpretable factors

---

## 8. Dimension 5: Failure Visibility and Escalation Gravity

**What this measures:** What happens when the agent fails publicly or produces contested outcomes.

**Key questions:**
- Are failures visible only to affected individuals or to broader audiences?
- Do failures attract media, regulatory, or legal attention?
- Can single failures become precedent-setting cases?
- What is the institutional cost of high-profile failures?
- Do failures compound into systemic crises?

**Scoring rubric:**

**100-120 (Low Visibility): Private / Trivial**
- Failures affect only individual users
- No media, regulatory, or legal interest
- Easy to correct without institutional impact
- Failures do not accumulate into patterns
- *Example:* Autocorrect error in personal email

**80-99 (Low-Moderate Visibility): Contained Complaints**
- Failures visible to small groups (customer service, support tickets)
- Occasional social media complaints but no sustained attention
- Corrected through routine customer service
- Minimal reputational impact
- *Example:* E-commerce product recommendation showing irrelevant item

**60-79 (Moderate Visibility): Recurring Issues**
- Failures create patterns visible to advocacy groups
- Occasional news coverage in trade or local media
- May trigger internal reviews or policy adjustments
- Moderate reputational concern
- *Example:* Resume screening tool showing bias in hiring patterns

**40-59 (Moderate-High Visibility): Regulatory Attention**
- Failures attract investigation by oversight bodies
- National media coverage of specific incidents
- Potential for fines, sanctions, or mandated changes
- Significant reputational damage
- Institutional leadership must respond publicly
- *Example:* Healthcare denial algorithm leading to patient harm

**20-39 (High Visibility): Precedent-Setting Crises**
- Failures become test cases for regulation or litigation
- Sustained investigative journalism
- Congressional hearings, major lawsuits, or regulatory action
- Systemic reputation damage to deploying organization
- Potential for sector-wide policy changes
- Creates case law or regulatory precedent
- *Example:* Facial recognition misidentifying suspects leading to wrongful arrest

---

## 9. Calculating DARA Scores

### 9.1 Score Composition

Each dimension contributes equally to the total score:

**Total DARA Score** = D1 + D2 + D3 + D4 + D5

Where:
- D1 = Scope of Delegated Authority (20-120)
- D2 = Human Override Friction (20-120)
- D3 = Population Exposure (20-120)
- D4 = Interpretability Burden (20-120)
- D5 = Failure Visibility and Escalation Gravity (20-120)

**Minimum possible score:** 100 (20 × 5 dimensions)  
**Maximum possible score:** 600 (120 × 5 dimensions)

### 9.2 Worked Example: Benefits Eligibility Agent

**Context:** State agency deploys AI agent to determine Medicaid eligibility for applicants.

**Dimension 1: Scope of Delegated Authority**
- Agent makes binding eligibility determinations
- Affects access to essential healthcare
- Decisions proceed without routine human review
- **Score: 35** (Presumptive Authority - high material consequences)

**Dimension 2: Human Override Friction**
- Requires formal appeal process
- Takes 30-60 days for review
- Applicants must submit documentation and may need advocacy
- **Score: 45** (Moderate-High Friction - significant burden)

**Dimension 3: Population Exposure**
- Affects low-income population dependent on Medicaid
- Hundreds of thousands of annual determinations
- Vulnerable population with limited alternatives
- **Score: 30** (Essential Services - vulnerable population at scale)

**Dimension 4: Interpretability Burden**
- Uses complex rules engine with statistical risk models
- Denials difficult to explain in plain language
- Regular contestation requires expert explanation
- **Score: 50** (Moderate-High Burden - complex ensemble)

**Dimension 5: Failure Visibility and Escalation Gravity**
- Failures occasionally covered by local media
- Potential for litigation and advocacy group attention
- Individual cases can become political issues
- **Score: 55** (Moderate-High Visibility - regulatory attention risk)

**Total DARA Score: 215**

**Band: Deep Subprime** - Severe consequence exposure requiring substantial institutional risk management.

---

## 10. Interpretation and Use

### 10.1 What Scores Mean

**Prime (550-600):** Deploy with routine oversight
- Failures are self-correcting or trivial
- Minimal institutional burden
- Standard operational monitoring sufficient

**Near-Prime (450-549):** Deploy with active management
- Failures manageable but require attention
- Establish clear escalation procedures
- Regular audit and quality review

**Subprime (300-449):** Deploy with substantial safeguards
- Failures create significant institutional work
- Require dedicated oversight resources
- Implement robust human review and appeal processes
- Plan for regular explanation and justification demands

**Deep Subprime (100-299):** Reconsider deployment or implement extraordinary controls
- Failures create severe institutional and human cost
- Requires executive-level risk acceptance
- Implement multi-layer human oversight
- Establish crisis response procedures
- Consider whether delegation is appropriate

### 10.2 DARA is Not a Binary Go/No-Go

Organizations may choose to deploy deep subprime agents if they:
- Accept and resource the institutional burden
- Implement appropriate safeguards and oversight
- Communicate risks transparently to affected populations
- Establish accountability mechanisms

DARA makes the cost of that choice visible. It does not make the choice.

### 10.3 Comparative Assessment

DARA scores are most useful in comparison:
- **Across agents:** Which of three candidate agents creates least exposure for this use case?
- **Across deployments:** Does this agent create more risk in context A or context B?
- **Over time:** Is consequence exposure increasing or decreasing as we iterate?

---

## 11. Evidence Collection and Documentation

### 11.1 Acceptable Evidence Sources

**Primary sources:**
- Court rulings and legal filings
- Regulatory findings and enforcement actions
- Official company disclosures (earnings calls, SEC filings, public statements)
- Government reports and audits
- Peer-reviewed research on deployed systems

**Secondary sources:**
- Credible investigative journalism (major news outlets, specialized reporters)
- Documented incidents with corroboration
- Public complaints with verification
- Expert testimony in official proceedings

**Excluded sources:**
- Anonymous social media claims without corroboration
- Proprietary internal data not publicly available
- Speculation or prediction without evidence
- Competitor claims without independent verification

### 11.2 Documentation Requirements

Every DARA assessment must include:

1. **Evidence log** - Dated list of sources consulted
2. **Dimension justifications** - Written explanation for each score with evidence citations
3. **Scope statement** - Clear description of deployment context being assessed
4. **Assessor information** - Who conducted the assessment and when
5. **Version history** - Record of score changes and reasons

### 11.3 Example Evidence Documentation

**Agent:** XYZ Benefits Determination System  
**Deployment:** State Medicaid eligibility (California, 2024-2025)  
**Assessment Date:** December 15, 2025  
**Assessor:** [Name]

**Dimension 1 Evidence:**
- California DHCS policy memo (May 2024) describing automated determination process
- State legislation AB-1234 authorizing algorithmic eligibility decisions
- News article (LA Times, June 2024) documenting scale of automated decisions

**Dimension 1 Score:** 35  
**Justification:** System makes binding eligibility determinations affecting healthcare access for low-income populations. Decisions are presumptively valid unless appealed. While human review is available, it requires applicant initiative and occurs after denial. This constitutes "Presumptive Authority" under the rubric.

[Continue for all dimensions...]

---

## 12. Score Updates and Revisions

### 12.1 When to Update Scores

DARA scores should be revised when:
- Deployment conditions change materially (new oversight procedures, different population)
- Significant new evidence emerges (court ruling, investigative report, regulatory action)
- Agent capabilities change (model update, new features)
- Institutional context shifts (new regulations, changed political environment)

### 12.2 Version Control

Each score revision creates a new version while preserving history:

**Version 1.0** (Dec 2025): Score 215  
- Initial assessment based on deployment announcement and policy documents

**Version 1.1** (Feb 2026): Score 195  
- Updated after state implemented 48-hour human review for all denials
- Dimension 2 (Override Friction) improved from 45 to 65
- Total score increased by 20 points

**Version 2.0** (Jun 2026): Score 285  
- Major revision after investigative journalism revealed pattern of erroneous denials
- Dimension 5 (Failure Visibility) decreased from 55 to 35
- Evidence: sustained media coverage and regulatory investigation
- Total score decreased by 90 points

### 12.3 Stability vs. Responsiveness

DARA balances stability (scores shouldn't change daily) with responsiveness (new evidence matters).

**Guidelines:**
- Don't update for minor incidents unless they reveal patterns
- Do update for material changes in deployment or evidence
- Maintain 30-day minimum between revisions unless extraordinary circumstances
- Document all changes with justification

---

## 13. Limitations and Appropriate Use

### 13.1 What DARA Does Not Measure

**Not a safety certification**  
DARA does not assess whether an agent is "safe" in absolute terms. A deep subprime agent might be the best available option for a critical need. The score makes risk visible; it does not certify safety.

**Not a technical performance metric**  
DARA does not measure accuracy, robustness, or capability. A highly accurate agent can still create severe consequence exposure if deployed in high-stakes contexts with inadequate oversight.

**Not a prediction of future incidents**  
DARA assesses current exposure based on observable deployment reality. It does not predict whether specific failures will occur or how severe they will be.

**Not a compliance audit**  
DARA does not verify adherence to regulations, standards, or internal policies. An agent can be legally compliant and still create high consequence exposure.

**Not a substitute for domain expertise**  
DARA provides structure for risk assessment but requires judgment informed by knowledge of institutional context, legal environment, and affected populations.

### 13.2 Appropriate Uses

**Strategic deployment decisions**  
- Should we delegate this authority to this agent?
- What safeguards are necessary for this deployment?
- How does this agent compare to alternatives?

**Resource allocation**  
- How much oversight capacity do we need?
- Where should we invest in explanation infrastructure?
- What crisis response capabilities are required?

**Transparency and accountability**  
- What should we disclose to affected populations?
- How do we communicate risk to oversight bodies?
- What evidence should we track for future assessment?

**Vendor evaluation**  
- Which agent creates least institutional burden for our use case?
- What contractual protections do we need?
- How should we structure pilot deployments?

### 13.3 Inappropriate Uses

**Competitive marketing**  
Don't use DARA scores to claim superiority without context. Scores reflect deployment context, not inherent agent quality.

**Regulatory compliance claims**  
Don't cite DARA scores as proof of regulatory compliance. DARA is not a certification.

**Blame deflection**  
Don't use low DARA scores to disclaim institutional responsibility. Organizations remain accountable for deployment decisions.

**Privacy invasion**  
Don't demand proprietary internal data to improve scores. DARA relies on public evidence by design.

---

## 14. Governance and Institutional Framework

### 14.1 Who Conducts Assessments

DARA assessments can be conducted by:
- **Deploying organizations** (internal risk assessment)
- **Independent researchers** (academic evaluation)
- **Oversight bodies** (regulatory review)
- **Advocacy organizations** (public accountability)
- **Journalism** (investigative reporting)

Multiple assessments of the same agent/deployment create productive contestation and improve evidence quality.

### 14.2 Assessment Independence

Assessors should disclose:
- Organizational affiliation and funding sources
- Relationships with deploying organizations or competitors
- Access to non-public information (and whether it influenced scoring)
- Potential conflicts of interest

Independence is not required but should be legible. An internal assessment by a deploying organization is valuable; readers should know that's what they're looking at.

### 14.3 Contestation and Appeal

Organizations may contest DARA scores by:
- Providing additional public evidence
- Identifying errors in dimension scoring or evidence interpretation
- Documenting changes in deployment conditions

Contestation should focus on:
- Specific dimensions and scoring justifications
- Evidence interpretation and source credibility
- Comparative precedent from similar deployments

Contestation should not claim:
- "This methodology is too subjective" (it is intentionally judgment-based)
- "You need access to our internal data" (public evidence is the standard)
- "Our agent is technically superior" (DARA doesn't measure technical performance)

---

## 15. Relationship to Other Frameworks

### 15.1 DARA and AI Safety Research

**Complementary, not competitive**

AI safety research focuses on:
- Preventing catastrophic failures
- Ensuring alignment with intended goals
- Technical robustness and reliability

DARA focuses on:
- Institutional burden from routine deployment
- Consequence exposure in actual operating environments
- Friction costs absorbed by humans and organizations

A technically safe agent can still create high consequence exposure. A technically risky agent might have low consequence exposure if deployed in well-controlled contexts.

### 15.2 DARA and Constrained Priority Matching (CPM)

CPM addresses misaligned incentives in matching markets (dating, hiring, admissions) by redesigning system architecture to align platform success with user outcomes.

DARA addresses consequence exposure in autonomous systems by making visible the institutional costs of delegation decisions.

**Shared principle:** Both frameworks make invisible costs legible. CPM makes extraction visible in matching markets. DARA makes consequence exposure visible in autonomous systems.

### 15.3 DARA and Stratified Preference Allocation (SPA)

SPA formalizes the game-theoretic foundations of constrained signaling mechanisms in bilateral matching.

DARA provides structured assessment for delegated authority in autonomous systems.

**Shared principle:** Both frameworks recognize that system design shapes who bears costs and how those costs are distributed. SPA designs for aligned cost distribution in matching. DARA measures consequence distribution in delegation.

---

## 16. Applications and Examples

### 16.1 Government Benefits Administration

**Context:** State unemployment insurance using automated fraud detection

**Dimension Scores:**
- D1 (Authority): 40 - Can suspend benefits pending investigation
- D2 (Override): 50 - Requires appeal process, takes weeks
- D3 (Population): 35 - Affects vulnerable unemployed population at scale
- D4 (Interpretability): 45 - Statistical model hard to explain to applicants
- D5 (Visibility): 50 - Media coverage when legitimate claims denied

**Total: 220 (Deep Subprime)**

**Implication:** Requires extraordinary oversight. Consider human review for all fraud flags, not just appeals. Establish rapid appeal process. Prepare for media and advocacy scrutiny.

### 16.2 Healthcare Prior Authorization

**Context:** Insurance company using AI for prior authorization decisions

**Dimension Scores:**
- D1 (Authority): 45 - Makes binding coverage determinations
- D2 (Override): 55 - Doctors can appeal but process is burdensome
- D3 (Population): 40 - Affects patients needing timely care, potentially vulnerable
- D4 (Interpretability): 50 - Medical necessity criteria complex, hard to explain
- D5 (Visibility): 45 - Occasional media coverage of denials, litigation risk

**Total: 235 (Deep Subprime)**

**Implication:** High institutional risk. Implement physician override with minimal friction. Establish clinical review board for complex cases. Monitor denial rates by demographic factors.

### 16.3 Internal Code Review

**Context:** Software company using AI to review code before deployment

**Dimension Scores:**
- D1 (Authority): 110 - Advisory only, developers make final decisions
- D2 (Override): 115 - Developers ignore suggestions freely
- D3 (Population): 115 - Internal users with technical expertise
- D4 (Interpretability): 90 - Can explain flagged issues in technical terms
- D5 (Visibility): 110 - Failures visible only to dev team, trivial impact

**Total: 540 (Prime)**

**Implication:** Low risk deployment. Standard operational monitoring sufficient. Can deploy widely with minimal oversight infrastructure.

### 16.4 Parole Risk Assessment

**Context:** Criminal justice system using algorithmic risk scores in parole decisions

**Dimension Scores:**
- D1 (Authority): 25 - Influences life-altering liberty decisions
- D2 (Override): 35 - Parole board can override but scores are influential
- D3 (Population): 25 - Affects incarcerated individuals, often marginalized
- D4 (Interpretability): 30 - Black-box scoring, hard to contest
- D5 (Visibility): 30 - Major media scrutiny, litigation, regulatory attention

**Total: 145 (Deep Subprime)**

**Implication:** Severe consequence exposure. Requires extraordinary safeguards. Consider whether algorithmic decision-support is appropriate. If deployed, implement mandatory human review, transparent scoring criteria, robust appeal rights, and regular bias audits. Executive-level risk acceptance required.

---

## 17. Future Development

### 17.1 Empirical Validation

DARA would benefit from:
- **Comparative studies** validating that low-scoring agents create higher institutional burden in practice
- **Longitudinal tracking** showing how consequence exposure evolves over time
- **Incident databases** correlating DARA scores with documented failures
- **Cost modeling** quantifying institutional burden in labor hours or expenses

### 17.2 Domain-Specific Extensions

DARA is general-purpose but could be refined for specific sectors:
- **Healthcare DARA** with medical-specific interpretability and failure modes
- **Criminal Justice DARA** emphasizing liberty interests and procedural rights
- **Financial Services DARA** incorporating regulatory compliance and consumer protection
- **Education DARA** accounting for long-term developmental impacts

### 17.3 Integration with Governance Frameworks

DARA could integrate with:
- **Impact assessments** (algorithmic impact assessments, data protection impact assessments)
- **Risk management frameworks** (NIST, ISO standards)
- **Procurement standards** (government acquisition criteria for AI systems)
- **Regulatory compliance** (sector-specific agency requirements)

### 17.4 Automated Evidence Collection

Current DARA relies on manual evidence gathering. Future development could include:
- **News aggregation** tools tracking relevant coverage
- **Legal database integration** monitoring court filings and rulings
- **Regulatory action feeds** from agency databases
- **Incident report aggregation** from public complaint systems

These tools would not replace human judgment but could improve evidence completeness.

---

## 18. Ethical Considerations

### 18.1 Power and Accountability

DARA makes consequence exposure visible, but visibility alone does not ensure accountability. Organizations with high-risk deployments may:
- Accept the risk because benefits outweigh costs
- Accept the risk because they can externalize costs to affected populations
- Ignore the risk because they face no meaningful consequences

DARA provides information for accountability mechanisms (oversight, regulation, public pressure) but does not create those mechanisms itself.

### 18.2 Gaming and Strategic Scoring

Organizations might attempt to improve DARA scores through:
- **Surface changes** that reduce visible exposure without addressing underlying risk
- **Evidence suppression** limiting public documentation of failures
- **Deployment relabeling** claiming advisory role while exercising de facto authority

Mitigation strategies:
- Evidence from independent sources (journalism, oversight, advocacy)
- Longitudinal tracking showing patterns over time
- Multiple assessors creating contestation
- Focus on observable institutional reality, not organizational claims

### 18.3 False Precision

DARA scores (215, 540, etc.) appear precise but rest on subjective judgments. This precision is useful for comparison but should not be mistaken for objective measurement.

Users should focus on:
- Score bands (Prime vs. Subprime) more than exact numbers
- Dimension-level analysis revealing specific risk factors
- Trends over time rather than absolute values
- Comparative assessment across alternatives

### 18.4 Distributional Effects

DARA measures aggregate consequence exposure but does not capture distribution of burden. Two agents with identical scores might create very different impacts:
- Agent A: moderate burden distributed across many people
- Agent B: severe burden concentrated on small vulnerable population

Dimension 3 (Population Exposure) partially addresses this but assessors should note distributional concerns in qualitative documentation.

---

## 19. Conclusion

The Delegated Authority Risk Assessment framework provides structured methodology for evaluating the institutional burden created by deploying AI agents in high-stakes environments. By focusing on consequence exposure rather than technical performance, DARA makes visible the costs currently absorbed informally by people and organizations.

DARA is not a solution to the challenges of autonomous systems. It is a tool for making delegation decisions more informed. Organizations will continue to deploy agents in contexts that create consequence exposure—DARA ensures they do so with awareness of what they are accepting.

As autonomous systems scale, someone always pays for their failures. DARA exists to make that cost legible before the delegation decision is made, not after the consequences have already materialized.

The framework is released under Creative Commons Attribution 4.0 to encourage use, critique, and refinement by researchers, deployers, oversight bodies, and affected communities. The goal is not a perfect risk assessment methodology but a shared vocabulary for discussing what is at stake when we delegate authority to machines.

---

## 20. Citation

If you use this framework in assessment, research, or governance, please cite:

**APA:**  
Bronson, R. (2025). Delegated Authority Risk Assessment (DARA): A Framework for Evaluating Consequence Exposure in Autonomous Systems. GitHub. [https://github.com/[username]/dara-framework](https://github.com/quarterback/frameworks/dara-framework)

**BibTeX:**
```bibtex
@misc{bronson2025dara,
  author = {Bronson, Ron},
  title = {Delegated Authority Risk Assessment (DARA): A Framework for Evaluating Consequence Exposure in Autonomous Systems},
  year = {2025},
  publisher = {GitHub},
  url = {https://github.com/[username]/dara-framework},
  note = {Licensed under CC BY 4.0}
}
```

**Chicago:**  
Bronson, Ron. "Delegated Authority Risk Assessment (DARA): A Framework for Evaluating Consequence Exposure in Autonomous Systems." GitHub, 2025. https://github.com/quarterback/frameworks/dara-framework

---

## 21. License

This work is licensed under a Creative Commons Attribution 4.0 International License (CC BY 4.0).

You are free to:
- **Share** - copy and redistribute the material in any medium or format
- **Adapt** - remix, transform, and build upon the material for any purpose, even commercially

Under the following terms:
- **Attribution** - You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

Full license: https://creativecommons.org/licenses/by/4.0/

