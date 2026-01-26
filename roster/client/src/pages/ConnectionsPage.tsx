import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import type { Connection } from '../types';

export default function ConnectionsPage() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    try {
      const { connections: data } = await api.getConnections();
      setConnections(data);
    } catch (error) {
      console.error('Failed to load connections:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days === 1) return '1 day ago';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-text/50">Loading connections...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-semibold text-text">
        Active Connections ({connections.length})
      </h1>

      {connections.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text/60">No connections yet.</p>
          <p className="text-sm text-text/50 mt-2">
            Send introduction requests to start connecting with professionals.
          </p>
          <Link
            to="/browse"
            className="btn btn-primary mt-4 inline-block"
          >
            Browse Professionals
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {connections.map((connection) => (
            <Link
              key={connection.id}
              to={`/connections/${connection.id}`}
              className="card block hover:border-accent/30 transition-colors"
            >
              <div className="flex gap-4">
                {/* Photo */}
                <div className="w-12 h-12 rounded-full bg-secondary overflow-hidden flex-shrink-0">
                  {connection.otherProfile?.photoUrl ? (
                    <img
                      src={connection.otherProfile.photoUrl}
                      alt={connection.otherProfile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg font-semibold text-text/20">
                      {connection.otherProfile?.name?.charAt(0) || '?'}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-text">
                        {connection.otherProfile?.name || 'Unknown'}
                      </h3>
                      <p className="text-sm text-text/60">
                        {connection.otherProfile?.title}
                      </p>
                    </div>
                    {connection.lastMessage && (
                      <span className="text-xs text-text/50">
                        {formatTime(connection.lastMessage.createdAt)}
                      </span>
                    )}
                  </div>

                  {connection.lastMessage ? (
                    <p className="text-sm text-text/60 mt-2 truncate">
                      {connection.lastMessage.content}
                    </p>
                  ) : (
                    <p className="text-sm text-text/50 mt-2 italic">
                      Start the conversation...
                    </p>
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
