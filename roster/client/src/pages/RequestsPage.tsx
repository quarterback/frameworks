import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import type { IntroductionRequest } from '../types';
import AcceptRequestModal from '../components/AcceptRequestModal';

export default function RequestsPage() {
  const { refreshCredits } = useAuth();
  const [activeTab, setActiveTab] = useState<'sent' | 'received'>('received');
  const [sentRequests, setSentRequests] = useState<IntroductionRequest[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<IntroductionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [acceptingRequest, setAcceptingRequest] = useState<IntroductionRequest | null>(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const [sentRes, receivedRes] = await Promise.all([
        api.getSentRequests(),
        api.getReceivedRequests(),
      ]);
      setSentRequests(sentRes.requests);
      setReceivedRequests(receivedRes.requests);
    } catch (error) {
      console.error('Failed to load requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async (requestId: number) => {
    if (!confirm('Are you sure you want to decline this request?')) return;

    try {
      await api.declineRequest(requestId);
      setReceivedRequests((prev) => prev.filter((r) => r.id !== requestId));
    } catch (error) {
      console.error('Failed to decline request:', error);
    }
  };

  const handleAccepted = async () => {
    setAcceptingRequest(null);
    await loadRequests();
    await refreshCredits();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-text/50">Loading requests...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('received')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'received'
              ? 'border-accent text-accent'
              : 'border-transparent text-text/60 hover:text-text'
          }`}
        >
          Received
          {receivedRequests.filter((r) => r.status === 'pending').length > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-accent text-white text-xs rounded-full">
              {receivedRequests.filter((r) => r.status === 'pending').length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'sent'
              ? 'border-accent text-accent'
              : 'border-transparent text-text/60 hover:text-text'
          }`}
        >
          Sent
        </button>
      </div>

      {/* Content */}
      {activeTab === 'received' ? (
        <div className="space-y-4">
          {receivedRequests.length === 0 ? (
            <div className="text-center py-12 text-text/60">
              No introduction requests received yet.
            </div>
          ) : (
            receivedRequests.map((request) => (
              <div key={request.id} className="card">
                <div className="flex gap-4">
                  {/* Photo */}
                  <Link
                    to={`/profile/${request.fromUserId}`}
                    className="w-12 h-12 rounded-full bg-secondary overflow-hidden flex-shrink-0"
                  >
                    {request.fromProfile?.photoUrl ? (
                      <img
                        src={request.fromProfile.photoUrl}
                        alt={request.fromProfile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg font-semibold text-text/20">
                        {request.fromProfile?.name?.charAt(0) || '?'}
                      </div>
                    )}
                  </Link>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/profile/${request.fromUserId}`}
                      className="font-medium text-text hover:text-accent"
                    >
                      {request.fromProfile?.name || 'Unknown'}
                    </Link>
                    <p className="text-sm text-text/60">
                      {request.fromProfile?.title} @ {request.fromProfile?.organization}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="badge badge-accent">
                        Sent: {request.creditsSent} credit{request.creditsSent > 1 ? 's' : ''}
                      </span>
                      <span className="text-xs text-text/50">
                        {formatDate(request.createdAt)}
                      </span>
                    </div>

                    {request.message && (
                      <p className="mt-3 text-sm text-text/70 bg-secondary rounded-lg px-3 py-2">
                        "{request.message}"
                      </p>
                    )}

                    {/* Actions */}
                    {request.status === 'pending' && (
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => setAcceptingRequest(request)}
                          className="btn btn-primary text-sm py-2"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDecline(request.id)}
                          className="btn btn-secondary text-sm py-2"
                        >
                          Decline
                        </button>
                      </div>
                    )}

                    {request.status === 'accepted' && (
                      <div className="flex items-center gap-2 mt-4">
                        <span className="text-green-600 text-sm">Connected</span>
                        <Link
                          to="/connections"
                          className="text-accent text-sm hover:underline"
                        >
                          View conversation
                        </Link>
                      </div>
                    )}

                    {request.status === 'declined' && (
                      <span className="text-text/50 text-sm mt-4 block">Declined</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {sentRequests.length === 0 ? (
            <div className="text-center py-12 text-text/60">
              No introduction requests sent yet.
              <Link to="/browse" className="text-accent hover:underline block mt-2">
                Browse professionals
              </Link>
            </div>
          ) : (
            sentRequests.map((request) => (
              <div key={request.id} className="card">
                <div className="flex gap-4">
                  {/* Photo */}
                  <Link
                    to={`/profile/${request.toUserId}`}
                    className="w-12 h-12 rounded-full bg-secondary overflow-hidden flex-shrink-0"
                  >
                    {request.toProfile?.photoUrl ? (
                      <img
                        src={request.toProfile.photoUrl}
                        alt={request.toProfile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg font-semibold text-text/20">
                        {request.toProfile?.name?.charAt(0) || '?'}
                      </div>
                    )}
                  </Link>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/profile/${request.toUserId}`}
                      className="font-medium text-text hover:text-accent"
                    >
                      {request.toProfile?.name || 'Unknown'}
                    </Link>
                    <p className="text-sm text-text/60">
                      {request.toProfile?.title} @ {request.toProfile?.organization}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="badge badge-accent">
                        You sent: {request.creditsSent} credit{request.creditsSent > 1 ? 's' : ''}
                      </span>
                      {request.theirCredits && (
                        <span className="badge badge-secondary">
                          They sent: {request.theirCredits} credit{request.theirCredits > 1 ? 's' : ''}
                        </span>
                      )}
                      <span className="text-xs text-text/50">
                        {formatDate(request.createdAt)}
                      </span>
                    </div>

                    {request.message && (
                      <p className="mt-3 text-sm text-text/70 bg-secondary rounded-lg px-3 py-2">
                        "{request.message}"
                      </p>
                    )}

                    {/* Status */}
                    <div className="mt-4">
                      {request.status === 'pending' && (
                        <span className="text-amber-600 text-sm">Waiting for response</span>
                      )}
                      {request.status === 'accepted' && (
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 text-sm">Connected</span>
                          <Link
                            to="/connections"
                            className="text-accent text-sm hover:underline"
                          >
                            View conversation
                          </Link>
                        </div>
                      )}
                      {request.status === 'declined' && (
                        <span className="text-text/50 text-sm">Declined</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Accept Modal */}
      {acceptingRequest && (
        <AcceptRequestModal
          request={acceptingRequest}
          onClose={() => setAcceptingRequest(null)}
          onAccepted={handleAccepted}
        />
      )}
    </div>
  );
}
