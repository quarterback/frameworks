import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateProfilePage from './pages/CreateProfilePage';
import BrowsePage from './pages/BrowsePage';
import ProfileViewPage from './pages/ProfileViewPage';
import RequestsPage from './pages/RequestsPage';
import ConnectionsPage from './pages/ConnectionsPage';
import ConversationPage from './pages/ConversationPage';
import MyProfilePage from './pages/MyProfilePage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text/50">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function RequireProfile({ children }: { children: React.ReactNode }) {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text/50">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return <Navigate to="/create-profile" replace />;
  }

  return <>{children}</>;
}

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-text mb-2">Roster</h1>
          <div className="animate-pulse text-text/50">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/browse" replace /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/browse" replace /> : <RegisterPage />} />

      <Route
        path="/create-profile"
        element={
          <PrivateRoute>
            <CreateProfilePage />
          </PrivateRoute>
        }
      />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <RequireProfile>
              <Layout />
            </RequireProfile>
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/browse" replace />} />
        <Route path="browse" element={<BrowsePage />} />
        <Route path="profile/:userId" element={<ProfileViewPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="connections" element={<ConnectionsPage />} />
        <Route path="connections/:connectionId" element={<ConversationPage />} />
        <Route path="my-profile" element={<MyProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/browse" replace />} />
    </Routes>
  );
}

export default App;
