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

export default function CreateProfilePage() {
  const { refreshProfile, refreshCredits } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    organization: '',
    location: '',
    bio: '',
    photoUrl: '',
    availability: 'mentorship',
    website: '',
    github: '',
    linkedin: '',
    expertise: [] as string[],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExpertiseToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.includes(skill)
        ? prev.expertise.filter((s) => s !== skill)
        : [...prev.expertise, skill],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.expertise.length === 0) {
      setError('Please select at least one area of expertise');
      setLoading(false);
      return;
    }

    try {
      await api.createProfile(formData);
      await refreshProfile();
      await refreshCredits();
      navigate('/browse');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-text">Create Your Professional Profile</h1>
          <p className="text-text/60 mt-2">Tell others about yourself and what you're looking for.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-text/80 mb-1">
              Photo URL (optional)
            </label>
            <input
              type="url"
              value={formData.photoUrl}
              onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
              className="input"
              placeholder="https://example.com/your-photo.jpg"
            />
            <p className="text-xs text-text/50 mt-1">
              Paste a URL to your professional photo
            </p>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-text/80 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input"
              placeholder="Your full name"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-text/80 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input"
              placeholder="e.g., Design Director"
              required
            />
          </div>

          {/* Organization */}
          <div>
            <label className="block text-sm font-medium text-text/80 mb-1">
              Organization <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="input"
              placeholder="e.g., Stripe"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-text/80 mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="input"
              placeholder="e.g., San Francisco, CA"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-text/80 mb-1">
              Bio <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="input min-h-[120px] resize-none"
              placeholder="Tell others about yourself, your experience, and what you're passionate about..."
              maxLength={500}
              required
            />
            <p className="text-xs text-text/50 mt-1 text-right">
              {formData.bio.length}/500 characters
            </p>
          </div>

          {/* Expertise */}
          <div>
            <label className="block text-sm font-medium text-text/80 mb-3">
              Expertise <span className="text-red-500">*</span>
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
              Availability <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {AVAILABILITY_OPTIONS.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="availability"
                    value={option.value}
                    checked={formData.availability === option.value}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-4 h-4 text-accent border-border focus:ring-accent"
                  />
                  <span className="text-sm text-text/80">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-text/80">
              Links (optional)
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

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full py-3 disabled:opacity-50"
          >
            {loading ? 'Creating Profile...' : 'Create Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
