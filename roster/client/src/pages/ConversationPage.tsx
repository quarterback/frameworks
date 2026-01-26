import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import type { Connection, Message } from '../types';
import SendCreditsModal from '../components/SendCreditsModal';

export default function ConversationPage() {
  const { connectionId } = useParams<{ connectionId: string }>();
  const { user, refreshCredits } = useAuth();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [connection, setConnection] = useState<Connection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);

  useEffect(() => {
    if (connectionId) {
      loadConversation();
    }
  }, [connectionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConversation = async () => {
    try {
      const { connection: connData, messages: msgData } = await api.getConnection(
        Number(connectionId)
      );
      setConnection(connData);
      setMessages(msgData);
    } catch (error) {
      console.error('Failed to load conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const { message } = await api.sendMessage(Number(connectionId), newMessage.trim());
      setMessages((prev) => [...prev, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleCreditsSent = async () => {
    setShowCreditsModal(false);
    await loadConversation();
    await refreshCredits();
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-text/50">Loading conversation...</div>
      </div>
    );
  }

  if (!connection) {
    return (
      <div className="text-center py-12">
        <p className="text-text/60">Connection not found.</p>
        <Link to="/connections" className="text-accent hover:underline mt-2 inline-block">
          Back to Connections
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-12rem)]">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-border">
        <button
          onClick={() => navigate('/connections')}
          className="text-text/60 hover:text-text transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <Link
          to={`/profile/${connection.otherProfile?.userId}`}
          className="flex items-center gap-3 flex-1"
        >
          <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden">
            {connection.otherProfile?.photoUrl ? (
              <img
                src={connection.otherProfile.photoUrl}
                alt={connection.otherProfile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-semibold text-text/20">
                {connection.otherProfile?.name?.charAt(0) || '?'}
              </div>
            )}
          </div>
          <div>
            <h1 className="font-medium text-text">
              {connection.otherProfile?.name || 'Unknown'}
            </h1>
            <p className="text-xs text-text/60">
              {connection.otherProfile?.title} @ {connection.otherProfile?.organization}
            </p>
          </div>
        </Link>
      </div>

      {/* Credit Exchange Info */}
      <div className="py-3 border-b border-border">
        <div className="flex items-center justify-center gap-4 text-sm">
          <span className="text-text/60">
            You: <span className="font-medium text-accent">{connection.myCredits} credit{connection.myCredits !== 1 ? 's' : ''}</span>
          </span>
          <span className="text-text/30">|</span>
          <span className="text-text/60">
            Them: <span className="font-medium text-accent">{connection.theirCredits} credit{connection.theirCredits !== 1 ? 's' : ''}</span>
          </span>
          <button
            onClick={() => setShowCreditsModal(true)}
            className="text-accent hover:underline text-sm ml-2"
          >
            + Send more
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 scrollbar-hide">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-text/50">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isMe = message.senderId === user?.id;
            return (
              <div
                key={message.id}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    isMe
                      ? 'bg-accent text-white rounded-br-md'
                      : 'bg-secondary text-text rounded-bl-md'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isMe ? 'text-white/70' : 'text-text/50'
                    }`}
                  >
                    {formatTime(message.createdAt)}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="pt-4 border-t border-border"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="input flex-1"
            disabled={sending}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || sending}
            className="btn btn-primary px-6 disabled:opacity-50"
          >
            {sending ? '...' : 'Send'}
          </button>
        </div>
      </form>

      {/* Send Credits Modal */}
      {showCreditsModal && connection && (
        <SendCreditsModal
          connection={connection}
          onClose={() => setShowCreditsModal(false)}
          onSent={handleCreditsSent}
        />
      )}
    </div>
  );
}
