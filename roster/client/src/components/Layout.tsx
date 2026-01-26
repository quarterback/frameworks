import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { credits, profile } = useAuth();
  const location = useLocation();

  const navLinks = [
    { to: '/browse', label: 'Browse' },
    { to: '/requests', label: 'Requests' },
    { to: '/connections', label: 'Connections' },
    { to: '/my-profile', label: 'Profile' },
  ];

  const getDaysUntilRefresh = () => {
    if (!credits?.refreshDate) return 0;
    const now = new Date();
    const refresh = new Date(credits.refreshDate);
    const diff = Math.ceil((refresh.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-primary z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/browse" className="text-xl font-semibold text-text">
              Roster
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive ? 'text-text' : 'text-text/60 hover:text-text'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Credits Badge */}
            {credits && (
              <div className="hidden sm:flex items-center space-x-2 text-sm">
                <span className="text-accent font-medium">
                  {credits.creditsRemaining} credits
                </span>
                <span className="text-text/40">|</span>
                <span className="text-text/60">
                  Refresh in {getDaysUntilRefresh()} days
                </span>
              </div>
            )}

            {/* Mobile Profile Avatar */}
            <NavLink
              to="/my-profile"
              className="md:hidden w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-text/70"
            >
              {profile?.name?.charAt(0) || 'U'}
            </NavLink>
          </div>
        </div>

        {/* Mobile Credits Bar */}
        {credits && (
          <div className="sm:hidden border-t border-border px-4 py-2 flex items-center justify-center space-x-2 text-sm bg-secondary/50">
            <span className="text-accent font-medium">
              {credits.creditsRemaining} credits remaining
            </span>
            <span className="text-text/40">•</span>
            <span className="text-text/60">
              Refresh in {getDaysUntilRefresh()} days
            </span>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-primary border-t border-border">
        <div className="flex items-center justify-around h-16">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.to);
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`flex flex-col items-center justify-center flex-1 h-full ${
                  isActive ? 'text-accent' : 'text-text/50'
                }`}
              >
                <span className="text-xs font-medium">{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Spacer for mobile bottom nav */}
      <div className="md:hidden h-16" />
    </div>
  );
}
