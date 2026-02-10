const API_BASE = '/api';

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('roster_token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request<{ token: string; user: { id: number; email: string; name?: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (email: string, password: string, name: string) =>
    request<{ token: string; user: { id: number; email: string; name: string } }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }),

  getMe: () =>
    request<{ user: { id: number; email: string; name?: string } }>('/auth/me'),

  // Profile
  createProfile: (data: {
    name: string;
    title: string;
    organization: string;
    location: string;
    bio: string;
    photoUrl?: string;
    availability: string;
    website?: string;
    github?: string;
    linkedin?: string;
    expertise: string[];
  }) =>
    request<{ profile: import('../types').Profile }>('/profile/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateProfile: (data: Partial<{
    name: string;
    title: string;
    organization: string;
    location: string;
    bio: string;
    photoUrl?: string;
    availability: string;
    website?: string;
    github?: string;
    linkedin?: string;
    expertise: string[];
  }>) =>
    request<{ profile: import('../types').Profile }>('/profile/update', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getMyProfile: () =>
    request<{ profile: import('../types').Profile | null }>('/profile/me'),

  getProfile: (userId: number) =>
    request<{ profile: import('../types').Profile }>(`/profile/${userId}`),

  // Professionals (Browse)
  getProfessionals: (filters?: { expertise?: string; availability?: string }) => {
    const params = new URLSearchParams();
    if (filters?.expertise) params.append('expertise', filters.expertise);
    if (filters?.availability) params.append('availability', filters.availability);
    const query = params.toString() ? `?${params.toString()}` : '';
    return request<{ professionals: import('../types').Profile[] }>(`/professionals${query}`);
  },

  // Credits
  getCreditsStatus: () =>
    request<import('../types').CreditsStatus>('/credits/status'),

  // Requests
  sendRequest: (toUserId: number, credits: number, message?: string) =>
    request<{ success: boolean; creditsRemaining: number; isConnected: boolean; connectionId?: number }>('/requests/send', {
      method: 'POST',
      body: JSON.stringify({ toUserId, credits, message }),
    }),

  acceptRequest: (requestId: number, credits: number) =>
    request<{ success: boolean; connectionId: number }>('/requests/accept', {
      method: 'POST',
      body: JSON.stringify({ requestId, credits }),
    }),

  declineRequest: (requestId: number) =>
    request<{ success: boolean }>('/requests/decline', {
      method: 'POST',
      body: JSON.stringify({ requestId }),
    }),

  getSentRequests: () =>
    request<{ requests: import('../types').IntroductionRequest[] }>('/requests/sent'),

  getReceivedRequests: () =>
    request<{ requests: import('../types').IntroductionRequest[] }>('/requests/received'),

  // Connections
  getConnections: () =>
    request<{ connections: import('../types').Connection[] }>('/connections'),

  getConnection: (connectionId: number) =>
    request<{ connection: import('../types').Connection; messages: import('../types').Message[] }>(`/connections/${connectionId}`),

  sendMessage: (connectionId: number, content: string) =>
    request<{ message: import('../types').Message }>('/messages/send', {
      method: 'POST',
      body: JSON.stringify({ connectionId, content }),
    }),

  sendMoreCredits: (connectionId: number, credits: number) =>
    request<{ success: boolean; creditsRemaining: number }>('/connections/add-credits', {
      method: 'POST',
      body: JSON.stringify({ connectionId, credits }),
    }),
};
