import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import type { Connection } from '../types';

interface Props {
  connection: Connection;
  onClose: () => void;
  onSent: () => void;
}

export default function SendCreditsModal({ connection, onClose, onSent }: Props) {
  const { credits } = useAuth();
  const [selectedCredits, setSelectedCredits] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!credits || selectedCredits > credits.creditsRemaining) {
      setError('Not enough credits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.sendMoreCredits(connection.id, selectedCredits);
      onSent();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send credits');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-primary rounded-xl shadow-xl max-w-md w-full p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text">
            Send More Credits
          </h2>
          <button
            onClick={onClose}
            className="text-text/50 hover:text-text transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Info */}
        <div className="bg-secondary rounded-lg p-4 text-sm text-text/70">
          <p>
            Send additional credits to <span className="font-medium text-text">{connection.otherProfile?.name}</span> to
            show your appreciation or strengthen the connection.
          </p>
        </div>

        {/* Credit Slider */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-text/80">
            How many credits?
          </label>

          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="5"
              value={selectedCredits}
              onChange={(e) => setSelectedCredits(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
            />

            <div className="flex justify-between text-xs text-text/50">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>

          <div className="bg-secondary rounded-lg p-4 text-center">
            <div className="text-2xl font-semibold text-accent">
              {selectedCredits} credit{selectedCredits > 1 ? 's' : ''}
            </div>
          </div>

          {credits && (
            <div className="text-sm text-text/60 text-center">
              You have <span className="font-medium text-text">{credits.creditsRemaining}</span> credits remaining.
              {selectedCredits <= credits.creditsRemaining && (
                <span className="block mt-1">
                  After this: <span className="font-medium text-text">{credits.creditsRemaining - selectedCredits}</span> remaining
                </span>
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="btn btn-secondary flex-1 py-3"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={loading || !credits || selectedCredits > credits.creditsRemaining}
            className="btn btn-primary flex-1 py-3 disabled:opacity-50"
          >
            {loading ? 'Sending...' : `Send (${selectedCredits})`}
          </button>
        </div>
      </div>
    </div>
  );
}
