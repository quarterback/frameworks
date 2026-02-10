import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, Profile, CreditsStatus, AuthContextType } from '../types';
import { api } from '../utils/api';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [credits, setCredits] = useState<CreditsStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem('roster_token');
      if (!token) {
        setLoading(false);
        return;
      }

      const { user: userData } = await api.getMe();
      setUser(userData);

      try {
        const { profile: profileData } = await api.getMyProfile();
        setProfile(profileData);

        if (profileData) {
          const creditsData = await api.getCreditsStatus();
          setCredits(creditsData);
        }
      } catch {
        // Profile doesn't exist yet
        setProfile(null);
      }
    } catch {
      localStorage.removeItem('roster_token');
      setUser(null);
      setProfile(null);
      setCredits(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const login = async (email: string, password: string) => {
    const { token, user: userData } = await api.login(email, password);
    localStorage.setItem('roster_token', token);
    setUser(userData);

    try {
      const { profile: profileData } = await api.getMyProfile();
      setProfile(profileData);

      if (profileData) {
        const creditsData = await api.getCreditsStatus();
        setCredits(creditsData);
      }
    } catch {
      setProfile(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('roster_token');
    setUser(null);
    setProfile(null);
    setCredits(null);
  };

  const refreshCredits = async () => {
    try {
      const creditsData = await api.getCreditsStatus();
      setCredits(creditsData);
    } catch (error) {
      console.error('Failed to refresh credits:', error);
    }
  };

  const refreshProfile = async () => {
    try {
      const { profile: profileData } = await api.getMyProfile();
      setProfile(profileData);
    } catch (error) {
      console.error('Failed to refresh profile:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        credits,
        loading,
        login,
        logout,
        refreshCredits,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
