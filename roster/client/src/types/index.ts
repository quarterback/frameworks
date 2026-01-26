export interface User {
  id: number;
  email: string;
  name?: string;
}

export interface Profile {
  id: number;
  userId: number;
  name: string;
  title: string;
  organization: string;
  location: string;
  bio: string;
  photoUrl?: string;
  availability: 'mentorship' | 'collaboration' | 'office-hours' | 'none';
  website?: string;
  github?: string;
  linkedin?: string;
  expertise: string[];
  reputation?: number;
  createdAt?: string;
}

export interface CreditsStatus {
  creditsRemaining: number;
  creditsTotal: number;
  refreshDate: string;
}

export interface IntroductionRequest {
  id: number;
  fromUserId: number;
  toUserId: number;
  creditsSent: number;
  message?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  fromProfile?: Profile;
  toProfile?: Profile;
  theirCredits?: number;
}

export interface Connection {
  id: number;
  userAId: number;
  userBId: number;
  userACredits: number;
  userBCredits: number;
  createdAt: string;
  otherProfile?: Profile;
  lastMessage?: Message;
  myCredits?: number;
  theirCredits?: number;
}

export interface Message {
  id: number;
  connectionId: number;
  senderId: number;
  content: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  credits: CreditsStatus | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshCredits: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
