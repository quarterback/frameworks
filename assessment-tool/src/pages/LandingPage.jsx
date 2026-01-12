import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-container">
        <header className="landing-header">
          <h1>Relationship Operating Style Assessment</h1>
          <p className="tagline">
            Understand how you function in intimate partnerships after the honeymoon phase ends
          </p>
        </header>

        <section className="intro-section">
          <h2>This is not a personality test</h2>
          <p>
            This is a compatibility and relationship orientation diagnostic that reveals your 
            operating style in partnerships. It's about <strong>how you function</strong> in 
            relationships, not who you are as a person.
          </p>
        </section>

        <section className="what-to-expect">
          <h2>What to Expect</h2>
          <div className="expectations-grid">
            <div className="expectation-item">
              <h3>⏱️ ~25 Minutes</h3>
              <p>Complete all 5 modules (~5 minutes each)</p>
            </div>
            <div className="expectation-item">
              <h3>🎯 Forced Choices</h3>
              <p>No neutral options - real trade-offs only</p>
            </div>
            <div className="expectation-item">
              <h3>📊 Your Position Profile</h3>
              <p>Primary + Secondary relationship positions</p>
            </div>
            <div className="expectation-item">
              <h3>🔗 Shareable Results</h3>
              <p>Get a unique link to share your results</p>
            </div>
          </div>
        </section>

        <section className="modules-overview">
          <h2>The Five Modules</h2>
          <div className="modules-list">
            <div className="module-item">
              <h3>Module A: Meaning-Making Under Ambiguity</h3>
              <p>How you interpret unclear signals and construct understanding</p>
            </div>
            <div className="module-item">
              <h3>Module B: Energy & Regulation Rhythms</h3>
              <p>How you recover, engage, and deplete in partnership</p>
            </div>
            <div className="module-item">
              <h3>Module C: Structure, Time, and Coordination</h3>
              <p>How you relate to plans, routines, and emergence</p>
            </div>
            <div className="module-item">
              <h3>Module D: Proximity, Intimacy, and Space</h3>
              <p>How closeness actually feels over time in daily coexistence</p>
            </div>
            <div className="module-item">
              <h3>Module E: Repair, Drift, and Reassessment</h3>
              <p>What you do when things strain, stall, or need recalibration</p>
            </div>
          </div>
        </section>

        <section className="guardrails">
          <div className="guardrail-box">
            <h3>Important Guardrails</h3>
            <ul>
              <li>This reveals <strong>tendencies, not mandates</strong></li>
              <li>No position is better than another</li>
              <li>Results are descriptive, not prescriptive</li>
              <li>There are no right answers - just what's true for you</li>
            </ul>
          </div>
        </section>

        <section className="cta-section">
          <button 
            className="start-button"
            onClick={() => navigate('/quiz')}
          >
            Start Assessment
          </button>
          <p className="completion-note">
            You can complete all modules at once or return later to finish
          </p>
        </section>

        <footer className="landing-footer">
          <p>
            This assessment works equally well for people in relationships and people dating.
            Use the language it provides to understand yourself and communicate with partners.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;
