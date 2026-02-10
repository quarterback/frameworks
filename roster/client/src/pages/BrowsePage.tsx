import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import type { Profile } from '../types';

const EXPERTISE_FILTERS = [
  'All',
  'Service Design',
  'Product Design',
  'Engineering',
  'Research',
  'Data Science',
  'Product Management',
];

const AVAILABILITY_FILTERS = [
  { value: '', label: 'All availability' },
  { value: 'mentorship', label: 'Mentorship' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'office-hours', label: 'Office Hours' },
];

export default function BrowsePage() {
  const [professionals, setProfessionals] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [expertiseFilter, setExpertiseFilter] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  useEffect(() => {
    loadProfessionals();
  }, [expertiseFilter, availabilityFilter]);

  const loadProfessionals = async () => {
    try {
      const filters: { expertise?: string; availability?: string } = {};
      if (expertiseFilter !== 'All') filters.expertise = expertiseFilter;
      if (availabilityFilter) filters.availability = availabilityFilter;

      const { professionals: data } = await api.getProfessionals(filters);
      setProfessionals(data);
    } catch (error) {
      console.error('Failed to load professionals:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAvailabilityLabel = (availability: string) => {
    switch (availability) {
      case 'mentorship':
        return 'Mentorship';
      case 'collaboration':
        return 'Collaboration';
      case 'office-hours':
        return 'Office Hours';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-text/50">Loading professionals...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Expertise Filter */}
        <div className="flex-1">
          <label className="block text-xs font-medium text-text/50 mb-2">Expertise</label>
          <div className="flex flex-wrap gap-2">
            {EXPERTISE_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setExpertiseFilter(filter)}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  expertiseFilter === filter
                    ? 'bg-accent text-white border-accent'
                    : 'bg-primary text-text/70 border-border hover:border-accent/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Availability Filter */}
        <div className="sm:w-48">
          <label className="block text-xs font-medium text-text/50 mb-2">Availability</label>
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="input py-2"
          >
            {AVAILABILITY_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-text/50">
        {professionals.length} professional{professionals.length !== 1 ? 's' : ''} found
      </p>

      {/* Professional Cards Grid */}
      {professionals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text/60">No professionals found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {professionals.map((professional) => (
            <Link
              key={professional.id}
              to={`/profile/${professional.userId}`}
              className="professional-card group"
            >
              {/* Photo */}
              <div className="aspect-square bg-secondary overflow-hidden">
                {professional.photoUrl ? (
                  <img
                    src={professional.photoUrl}
                    alt={professional.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-semibold text-text/20">
                    {professional.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-text truncate">{professional.name}</h3>
                <p className="text-sm text-text/70 truncate">
                  {professional.title}
                </p>
                <p className="text-sm text-text/50 truncate">
                  @ {professional.organization}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-text/50">Rep:</span>
                    <span className="text-sm font-medium text-accent">
                      {professional.reputation ?? 50}
                    </span>
                  </div>
                  {professional.availability !== 'none' && (
                    <span className="badge badge-accent">
                      {getAvailabilityLabel(professional.availability)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
