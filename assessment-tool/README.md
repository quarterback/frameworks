# Relationship Operating Style Assessment Tool

A web-based assessment tool that helps people understand their relationship operating style through a modular quiz format. This reveals how someone operates in intimate partnerships after the honeymoon phase ends.

## Features

✅ **Functional Quiz** - 5 modules with 31 questions total  
✅ **Weighted Scoring Algorithm** - Produces primary + secondary archetypes  
✅ **Comprehensive Results** - Full archetype descriptions and compatibility analysis  
✅ **Mobile Responsive** - Works on desktop, tablet, and mobile  
✅ **Shareable Results** - Unique link for each result  
✅ **Clean UI** - Modern design that feels like an interactive editorial piece

## The Seven Archetypes

1. **Näkki (The Navigator)** - Strategic anticipator, sees patterns, plans ahead
2. **Tuuli (The Responder)** - Real-time adjuster, adapts fluidly, comfortable with emergence
3. **Lehto (The Tender)** - Creates warmth, tends home and emotional climate
4. **Poro (The Propeller)** - Sustained driver, maintains momentum through consistent effort
5. **Kaiko (The Foreguard)** - Early initiator, comfortable at leading edge
6. **Saita (The Weaver)** - Meaning-maker, holds relationship story and continuity
7. **Miko (The Specialist)** - Domain expert in specific relational contexts

## The Five Modules

- **Module A:** Meaning-Making Under Ambiguity
- **Module B:** Energy & Regulation Rhythms
- **Module C:** Structure, Time, and Coordination
- **Module D:** Proximity, Intimacy, and Space
- **Module E:** Repair, Drift, and Reassessment

## Technology Stack

- **Frontend:** React with Vite
- **Routing:** React Router
- **Styling:** Vanilla CSS with responsive design
- **Storage:** LocalStorage for results persistence

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
cd assessment-tool
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Landing Page** - Read about the assessment and what to expect
2. **Quiz Flow** - Answer questions in all 5 modules (~25 minutes)
3. **Results Page** - View your primary and secondary archetypes with detailed analysis
4. **Share Results** - Copy the unique link to share your results

## Scoring Algorithm

The scoring system uses:

- **Weighted scoring** - Each answer contributes to multiple archetypes
- **Module patterns** - Consistency across modules amplifies archetype strength
- **Cross-module coherence** - Archetypes appearing in 3+ modules get a 15% bonus
- **Primary/Secondary determination** - Top two scoring archetypes become your profile

## Project Structure

```
assessment-tool/
├── src/
│   ├── data/
│   │   ├── questions.js      # All quiz questions with weighted mappings
│   │   └── archetypes.js     # Archetype descriptions and compatibility
│   ├── pages/
│   │   ├── LandingPage.jsx   # Welcome and overview page
│   │   ├── QuizPage.jsx      # Interactive quiz interface
│   │   └── ResultsPage.jsx   # Detailed results display
│   ├── utils/
│   │   └── scoring.js        # Weighted scoring algorithm
│   ├── App.jsx               # Main router configuration
│   └── main.jsx              # App entry point
├── public/                   # Static assets
└── package.json
```

## Design Philosophy

- **Not a personality test** - Focuses on relationship operating styles
- **Forced choices** - No neutral options to reveal true preferences
- **Descriptive not prescriptive** - Results reveal tendencies, not mandates
- **No right answers** - All positions are equally valid
- **Clean and accessible** - Direct language without therapy-speak

## Future Enhancements (Not in MVP)

- Account system/user login
- Email save/return functionality
- PDF export
- Partner comparison tool
- Archetype illustrations
- Social sharing graphics
- Analytics dashboard

## License

This project is part of the frameworks repository.
