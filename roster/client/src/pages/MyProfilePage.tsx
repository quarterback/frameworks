import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const EXPERTISE_OPTIONS = [
  'Service Design',
  'Product Design',
  'Engineering',
  'Research',
  'Data Science',
  'Product Management',
  'Design Systems',
  'Accessibility',
  'Civic Tech',
  'Fintech',
  'Healthcare',
  'DevOps',
  'Machine Learning',
  'Mobile Development',
  'Frontend',
  'Backend',
  'Policy',
  'Strategy',
  'Operations',
  'Marketing',
];

const AVAILABILITY_OPTIONS = [
  { value: 'mentorship', label: 'Open to mentorship' },
  { value: 'collaboration', label: 'Looking for collaborators' },
  { value: 'office-hours', label: 'Office hours' },
  { value: 'none', label: 'Not available' },
];

export default function MyProfilePage() {
  const { profile, credits, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    title: profile?.title || '',
    organization: profile?.organization || '',
    location: profile?.location || '',
    bio: profile?.bio || '',
    photoUrl: profile?.photoUrl || '',
    availability: profile?.availability || 'mentorship',
    website: profile?.website || '',
    github: profile?.github || '',
    linkedin: profile?.linkedin || '',
    expertise: profile?.expertise || [],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleExpertiseToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.includes(skill)
        ? prev.expertise.filter((s) => s !== skill)
        : [...prev.expertise, skill],
    }));
  };

  const handleSave = async () => {
    if (formData.expertise.length === 0) {
      setError('Please select at least one area of expertise');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await api.updateProfile(formData);
      await refreshProfile();
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
        return 'Not available';
    }
  };

  const getDaysUntilRefresh = () => {
    if (!credits?.refreshDate) return 0;
    const now = new Date();
    const refresh = new Date(credits.refreshDate);
    const diff = Math.ceil((refresh.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  };

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-text/60">Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-semibold text-text">Your Profile</h1>

      {isEditing ? (
        // Edit Mode
        <div className="card space-y-6">
          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-text/80 mb-1">
              Photo URL
            </label>
            <input
              type="url"
              value={formData.photoUrl}
              onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
              className="input"
              placeholder="https://example.com/your-photo.jpg"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-text/80 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-text/80 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input"
              required
            />
          </div>

          {/* Organization */}
          <div>
            <label className="block text-sm font-medium text-text/80 mb-1">
              Organization
            </label>
            <input
              type="text"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="input"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-text/80 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="input"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-text/80 mb-1">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="input min-h-[120px] resize-none"
              maxLength={500}
              required
            />
            <p className="text-xs text-text/50 mt-1 text-right">
              {formData.bio.length}/500
            </p>
          </div>

          {/* Expertise */}
          <div>
            <label className="block text-sm font-medium text-text/80 mb-3">
              Expertise
            </label>
            <div className="flex flex-wrap gap-2">
              {EXPERTISE_OPTIONS.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleExpertiseToggle(skill)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                    formData.expertise.includes(skill)
                      ? 'bg-accent text-white border-accent'
                      : 'bg-primary text-text/70 border-border hover:border-accent/50'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-text/80 mb-3">
              Availability
            </label>
            <div className="space-y-2">
              {AVAILABILITY_OPTIONS.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="availability"
                    value={option.value}
                    checked={formData.availability === option.value}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value as 'mentorship' | 'collaboration' | 'office-hours' | 'none' })}
                    className="w-4 h-4 text-accent"
                  />
                  <span className="text-sm text-text/80">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-text/80">
              Links
            </label>
            <div>
              <label className="block text-xs text-text/50 mb-1">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="input"
                placeholder="https://yourwebsite.com"
              />
            </div>
            <div>
              <label className="block text-xs text-text/50 mb-1">GitHub</label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="input"
                placeholder="https://github.com/username"
              />
            </div>
            <div>
              <label className="block text-xs text-text/50 mb-1">LinkedIn</label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="input"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-secondary flex-1 py-3"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn btn-primary flex-1 py-3 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      ) : (
        // View Mode
        <>
          <div className="card space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Photo */}
              <div className="w-24 h-24 rounded-xl bg-secondary overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                {profile.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-semibold text-text/20">
                    {profile.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl font-semibold text-text">{profile.name}</h2>
                <p className="text-text/70 mt-1">
                  {profile.title} @ {profile.organization}
                </p>
                <p className="text-text/50 text-sm mt-1">{profile.location}</p>

                <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start">
                  <span className="text-sm text-text/60">
                    Reputation: <span className="font-medium text-accent">{profile.reputation ?? 50}</span>
                  </span>
                  {profile.availability !== 'none' && (
                    <span className="badge badge-accent">
                      {getAvailabilityLabel(profile.availability)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Credits Status */}
            <div className="bg-secondary rounded-lg p-4">
              <h3 className="text-sm font-medium text-text/50 mb-2">Credits Status</h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-semibold text-accent">
                    {credits?.creditsRemaining ?? 0}
                  </span>
                  <span className="text-text/60 ml-1">of {credits?.creditsTotal ?? 10}</span>
                </div>
                <span className="text-sm text-text/60">
                  Refreshes in {getDaysUntilRefresh()} days
                </span>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-sm font-medium text-text/50 uppercase tracking-wider mb-2">
                About
              </h3>
              <p className="text-text/80">{profile.bio}</p>
            </div>

            {/* Expertise */}
            <div>
              <h3 className="text-sm font-medium text-text/50 uppercase tracking-wider mb-2">
                Expertise
              </h3>
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
                <h3 className="text-sm font-medium text-text/50 uppercase tracking-wider mb-2">
                  Links
                </h3>
                <div className="space-y-1">
                  {profile.website && (
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-accent hover:underline text-sm"
                    >
                      {profile.website.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-accent hover:underline text-sm"
                    >
                      GitHub
                    </a>
                  )}
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-accent hover:underline text-sm"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-secondary w-full py-3"
            >
              Edit Profile
            </button>
          </div>

          {/* Sign Out */}
          <button
            onClick={handleLogout}
            className="btn btn-outline w-full py-3 text-text/60 hover:text-text"
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  );
}
