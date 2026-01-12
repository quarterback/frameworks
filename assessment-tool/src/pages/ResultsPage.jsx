import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { archetypes } from '../data/archetypes';
import './ResultsPage.css';

function ResultsPage() {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    // Load results from localStorage
    const stored = localStorage.getItem(`result-${resultId}`);
    if (stored) {
      setResultData(JSON.parse(stored));
    } else {
      // Result not found
      navigate('/');
    }
  }, [resultId, navigate]);

  if (!resultData) {
    return <div className="loading">Loading results...</div>;
  }

  const { results } = resultData;
  const primaryArchetype = archetypes[results.primary];
  const secondaryArchetype = archetypes[results.secondary];

  const shareUrl = `${window.location.origin}/results/${resultId}`;

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy link. Please copy it manually.');
      });
  };

  return (
    <div className="results-page">
      <div className="results-container">
        {/* Header */}
        <header className="results-header">
          <h1>Your Relational Position Profile</h1>
          <div className="share-section">
            <p className="share-label">Share your results:</p>
            <div className="share-controls">
              <input 
                type="text" 
                value={shareUrl} 
                readOnly 
                className="share-input"
              />
              <button onClick={copyShareLink} className="copy-button">
                Copy Link
              </button>
            </div>
          </div>
        </header>

        {/* Score Distribution */}
        <section className="score-distribution">
          <h2>Your Score Distribution</h2>
          <div className="scores-grid">
            {Object.entries(results.scores)
              .sort(([, a], [, b]) => b - a)
              .map(([archetypeId, score]) => (
                <div 
                  key={archetypeId} 
                  className={`score-item ${
                    archetypeId === results.primary ? 'primary' : 
                    archetypeId === results.secondary ? 'secondary' : ''
                  }`}
                >
                  <div className="score-bar-container">
                    <div 
                      className="score-bar" 
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <div className="score-label">
                    <span className="archetype-name">
                      {archetypes[archetypeId].name}
                    </span>
                    <span className="score-value">{score}%</span>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Primary Position */}
        <section className="primary-position">
          <div className="position-badge primary-badge">Primary Position</div>
          <h2 className="archetype-title">
            {primaryArchetype.name} — {primaryArchetype.subtitle}
          </h2>
          <p className="archetype-description">{primaryArchetype.fullDescription}</p>

          <div className="recognizable-section">
            <h3>You know you're a {primaryArchetype.name} when:</h3>
            <ul className="behaviors-list">
              {primaryArchetype.recognizableBehaviors.map((behavior, idx) => (
                <li key={idx}>{behavior}</li>
              ))}
            </ul>
          </div>

          <div className="conditions-grid">
            <div className="condition-box energizing">
              <h4>This role feels energizing when:</h4>
              <p>{primaryArchetype.energizingCondition}</p>
            </div>
            <div className="condition-box costly">
              <h4>This role becomes costly when:</h4>
              <p>{primaryArchetype.costlyCondition}</p>
            </div>
          </div>

          <div className="motto-section">
            <p className="motto">"{primaryArchetype.motto}"</p>
          </div>
        </section>

        {/* Secondary Position */}
        <section className="secondary-position">
          <div className="position-badge secondary-badge">Secondary Position</div>
          <h2 className="archetype-title">
            {secondaryArchetype.name} — {secondaryArchetype.subtitle}
          </h2>
          <p className="archetype-description">{secondaryArchetype.description}</p>
          <p className="secondary-note">
            Your secondary position provides flexibility and shows up particularly in 
            specific contexts or when your primary mode isn't serving the situation. 
            This combination of {primaryArchetype.name} and {secondaryArchetype.name} creates 
            your unique relational operating style.
          </p>
        </section>

        {/* How This Shows Up */}
        <section className="synthesis-section">
          <h2>How This Shows Up</h2>
          <p>
            As a <strong>{primaryArchetype.name}/{secondaryArchetype.name}</strong>, you bring {primaryArchetype.name}'s 
            {' '}{primaryArchetype.subtitle.toLowerCase()} qualities while drawing on {secondaryArchetype.name}'s 
            {' '}{secondaryArchetype.subtitle.toLowerCase()} tendencies when needed. This means you primarily 
            operate through {primaryArchetype.description.split('.')[0].toLowerCase()}, but you can shift 
            into {secondaryArchetype.description.split('.')[0].toLowerCase()} when the situation calls for it.
          </p>
        </section>

        {/* Natural Strengths */}
        <section className="strengths-section">
          <h2>Your Natural Strengths</h2>
          <ul className="strengths-list">
            {primaryArchetype.strengths.map((strength, idx) => (
              <li key={idx}>{strength}</li>
            ))}
          </ul>
        </section>

        {/* Friction Points */}
        <section className="friction-section">
          <h2>Common Friction Points</h2>
          
          <div className="friction-item">
            <h3>What exhausts you:</h3>
            <p>{primaryArchetype.frictionPoints.exhausts}</p>
          </div>

          <div className="friction-item">
            <h3>Contexts that don't play to your strengths:</h3>
            <p>{primaryArchetype.frictionPoints.weakContexts}</p>
          </div>

          <div className="friction-item">
            <h3>What happens when you can't operate in your primary mode:</h3>
            <p>{primaryArchetype.frictionPoints.whenBlocked}</p>
          </div>
        </section>

        {/* Compatibility Patterns */}
        <section className="compatibility-section">
          <h2>Compatibility Patterns</h2>
          
          <div className="compatibility-item works-well">
            <h3>Works well with:</h3>
            <p>
              <strong>{primaryArchetype.compatibility.worksWellWith.archetype}</strong>
              <br />
              {primaryArchetype.compatibility.worksWellWith.reason}
            </p>
          </div>

          <div className="compatibility-item potential-friction">
            <h3>Potential friction with:</h3>
            <p>
              <strong>{primaryArchetype.compatibility.potentialFrictionWith.archetype}</strong>
              <br />
              {primaryArchetype.compatibility.potentialFrictionWith.reason}
            </p>
          </div>

          <div className="compatibility-item requires-coordination">
            <h3>Requires intentional coordination with:</h3>
            <p>
              <strong>{primaryArchetype.compatibility.requiresCoordinationWith.archetype}</strong>
              <br />
              {primaryArchetype.compatibility.requiresCoordinationWith.reason}
            </p>
          </div>
        </section>

        {/* Footer Actions */}
        <footer className="results-footer">
          <button 
            className="retake-button"
            onClick={() => navigate('/')}
          >
            Take Assessment Again
          </button>
          <p className="footer-note">
            Remember: This reveals tendencies, not mandates. No position is better than another.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default ResultsPage;
