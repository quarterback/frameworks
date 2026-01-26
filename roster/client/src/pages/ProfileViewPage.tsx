import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import type { Profile } from '../types';
import IntroductionModal from '../components/IntroductionModal';

export default function ProfileViewPage() {
  const { userId } = useParams<{ userId: string }>();
  const { user, refreshCredits } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const isOwnProfile = user?.id === Number(userId);

  useEffect(() => {
    if (userId) {
      loadProfile();
    }
  }, [userId]);

  const loadProfile = async () => {
    try {
      const { profile: data } = await api.getProfile(Number(userId));
      setProfile(data);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIntroductionSent = async () => {
    setShowModal(false);
    setRequestSent(true);
    await refreshCredits();
  };

  const getAvailabilityLabel = (availability: string) => {
    switch (availability) {
      case 'mentorship':
        return 'Open to mentorship';
      case 'collaboration':
        return 'Looking for collaborators';
      case 'office-hours':
        return 'Offers office hours';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-text/50">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-text/60">Profile not found.</p>
        <Link to="/browse" className="text-accent hover:underline mt-2 inline-block">
          Back to Browse
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-text/60 hover:text-text mb-6 transition-colors"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="card space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Photo */}
          <div className="w-32 h-32 rounded-xl bg-secondary overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-semibold text-text/20">
                {profile.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-semibold text-text">{profile.name}</h1>
            <p className="text-text/70 mt-1">
              {profile.title} @ {profile.organization}
            </p>
            <p className="text-text/50 text-sm mt-1">{profile.location}</p>

            <div className="flex flex-wrap gap-3 mt-4 justify-center sm:justify-start">
              <div className="flex items-center space-x-1">
                <span className="text-sm text-text/50">Reputation:</span>
                <span className="font-semibold text-accent">{profile.reputation ?? 50}</span>
              </div>
              {profile.availability !== 'none' && (
                <span className="badge badge-accent">
                  {getAvailabilityLabel(profile.availability)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div>
          <h2 className="text-sm font-medium text-text/50 uppercase tracking-wider mb-2">
            About
          </h2>
          <p className="text-text/80 leading-relaxed">{profile.bio}</p>
        </div>

        {/* Expertise */}
        <div>
          <h2 className="text-sm font-medium text-text/50 uppercase tracking-wider mb-2">
            Expertise
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.expertise.map((skill) => (
              <span key={skill} className="badge badge-secondary">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        {(profile.website || profile.github || profile.linkedin) && (
          <div>
            <h2 className="text-sm font-medium text-text/50 uppercase tracking-wider mb-2">
              Links
            </h2>
            <div className="space-y-2">
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-accent hover:underline"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  {profile.website.replace(/^https?:\/\//, '')}
                </a>
              )}
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-accent hover:underline"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  {profile.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-accent hover:underline"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        {!isOwnProfile && (
          <div className="pt-4 border-t border-border">
            {requestSent ? (
              <div className="text-center text-text/60">
                Introduction request sent! Waiting for response.
              </div>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary w-full py-3"
              >
                Send Introduction Request
              </button>
            )}
          </div>
        )}

        {isOwnProfile && (
          <div className="pt-4 border-t border-border">
            <Link to="/my-profile" className="btn btn-secondary w-full py-3 text-center block">
              Edit Your Profile
            </Link>
          </div>
        )}
      </div>

      {/* Introduction Modal */}
      {showModal && profile && (
        <IntroductionModal
          profile={profile}
          onClose={() => setShowModal(false)}
          onSent={handleIntroductionSent}
        />
      )}
    </div>
  );
}
