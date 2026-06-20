const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Demo users for when backend is not available
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'admin@nayepankh.org': {
    password: 'Admin@123',
    user: { id: '1', name: 'Super Admin', email: 'admin@nayepankh.org', role: 'SUPER_ADMIN' },
  },
  'manager@nayepankh.org': {
    password: 'Admin@123',
    user: { id: '2', name: 'Admin Manager', email: 'manager@nayepankh.org', role: 'ADMIN' },
  },
  'volunteer@nayepankh.org': {
    password: 'Volunteer@123',
    user: { id: '3', name: 'Demo Volunteer', email: 'volunteer@nayepankh.org', role: 'VOLUNTEER' },
  },
};

interface FetchOptions extends RequestInit {
  token?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  private async tryFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { token, ...fetchOptions } = options;
    const authToken = token || this.getToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
      ...fetchOptions.headers,
    };

    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchOptions,
      headers,
      credentials: 'include',
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${res.status}`);
    }

    return res.json();
  }

  async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    try {
      return await this.tryFetch<T>(endpoint, options);
    } catch (err) {
      // If backend is unreachable, check demo token for /auth/me
      if (endpoint === '/auth/me') {
        const demoUser = this.getDemoUser();
        if (demoUser) return { data: demoUser } as T;
      }
      throw err;
    }
  }

  private getDemoUser(): User | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('demo_user');
    if (raw) return JSON.parse(raw);
    return null;
  }

  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const token = this.getToken();
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      body: formData,
      credentials: 'include',
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Upload failed' }));
      throw new Error(error.message);
    }
    return res.json();
  }

  // Auth — tries real backend first, falls back to demo login
  login = async (data: { email: string; password: string }): Promise<{ data: { user: User; accessToken: string } }> => {
    try {
      return await this.tryFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) });
    } catch {
      // Demo login fallback
      const demo = DEMO_USERS[data.email.toLowerCase()];
      if (demo && demo.password === data.password) {
        const fakeToken = 'demo-token-' + Date.now();
        if (typeof window !== 'undefined') {
          localStorage.setItem('demo_user', JSON.stringify(demo.user));
        }
        return { data: { user: demo.user, accessToken: fakeToken } };
      }
      throw new Error('Invalid email or password');
    }
  };

  register = (data: { name: string; email: string; password: string; role?: string }) =>
    this.fetch('/auth/register', { method: 'POST', body: JSON.stringify(data) });

  verifyOTP = (data: { email: string; otp: string }) =>
    this.fetch<{ data: { user: User; accessToken: string } }>('/auth/verify-otp', { method: 'POST', body: JSON.stringify(data) });

  getMe = () => this.fetch<{ data: User }>('/auth/me');

  logout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('demo_user');
    }
    return this.fetch('/auth/logout', { method: 'POST' }).catch(() => ({ success: true }));
  };

  forgotPassword = (email: string) =>
    this.fetch('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) });

  // Public
  getImpactStats = () => this.fetch<{ data: ImpactStats }>('/impact');
  getProjects = (params?: string) => this.fetch<{ data: Project[]; pagination?: Pagination }>(`/projects${params ? `?${params}` : ''}`);
  getProject = (id: string) => this.fetch<{ data: Project }>(`/projects/${id}`);
  getEvents = (params?: string) => this.fetch<{ data: Event[]; pagination?: Pagination }>(`/events${params ? `?${params}` : ''}`);
  getEvent = (id: string) => this.fetch<{ data: Event }>(`/events/${id}`);
  getGallery = (params?: string) => this.fetch<{ data: GalleryItem[] }>(`/gallery${params ? `?${params}` : ''}`);
  getTestimonials = () => this.fetch<{ data: Testimonial[] }>('/testimonials');
  getNews = (params?: string) => this.fetch<{ data: NewsArticle[] }>(`/news${params ? `?${params}` : ''}`);
  getTeam = () => this.fetch<{ data: TeamMember[] }>('/team');
  getCampaigns = () => this.fetch<{ data: DonationCampaign[] }>('/donations/campaigns');
  search = (q: string) => this.fetch<{ data: SearchResults }>(`/search?q=${encodeURIComponent(q)}`);
  subscribeNewsletter = (email: string) =>
    this.fetch('/newsletter', { method: 'POST', body: JSON.stringify({ email }) });

  // Donations
  createDonation = (data: DonationInput) =>
    this.fetch('/donations', { method: 'POST', body: JSON.stringify(data) });

  // Volunteers
  createVolunteer = (formData: FormData) => this.upload('/volunteers', formData);
  getMyProfile = () => this.fetch<{ data: Volunteer }>('/volunteers/me');
  getVolunteers = (params?: string) => this.fetch<{ data: Volunteer[]; pagination?: Pagination }>(`/volunteers${params ? `?${params}` : ''}`);
  approveVolunteer = (id: string, status: string) =>
    this.fetch(`/volunteers/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });

  registerForEvent = (eventId: string) =>
    this.fetch(`/events/${eventId}/register`, { method: 'POST' });

  // Admin
  getDashboard = () => this.fetch<{ data: DashboardData }>('/dashboard');
  getDonations = (params?: string) => this.fetch<{ data: Donation[] }>(`/donations${params ? `?${params}` : ''}`);
  getTasks = () => this.fetch<{ data: Task[] }>('/tasks');
  getCertificates = () => this.fetch<{ data: Certificate[] }>('/certificates');
  getAnnouncements = () => this.fetch<{ data: Announcement[] }>('/announcements');
}

export const api = new ApiClient(API_URL);

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'VOLUNTEER' | 'VISITOR';
  volunteer?: Volunteer;
}

export interface Volunteer {
  id: string;
  fullName: string;
  gender: string;
  phone: string;
  city: string;
  state: string;
  status: string;
  totalHours: number;
  profilePhoto?: string;
  skills: string[];
  interests: string[];
  documents?: Document[];
  tasks?: Task[];
  certificates?: Certificate[];
  achievements?: Achievement[];
  eventRegistrations?: { event: Event }[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDesc?: string;
  category: string;
  status: string;
  impactMetrics?: Record<string, number>;
  images: string[];
  featured: boolean;
  location?: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  location: string;
  status: string;
  images: string[];
  featured: boolean;
  maxAttendees?: number;
  _count?: { registrations: number };
}

export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  type: string;
  status: string;
  createdAt: string;
}

export interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  image?: string;
}

export interface DonationInput {
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  amount: number;
  type?: string;
  campaignId?: string;
  message?: string;
  isAnonymous?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  url: string;
  type: string;
  description?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  photo?: string;
  rating: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  author?: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  isBoard: boolean;
}

export interface ImpactStats {
  volunteers: number;
  projectsCompleted: number;
  eventsConducted: number;
  fundsRaised: number;
  livesImpacted: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  dueDate?: string;
  hours?: number;
}

export interface Certificate {
  id: string;
  title: string;
  description?: string;
  url?: string;
  issuedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  createdAt: string;
}

export interface DashboardData {
  widgets: {
    totalVolunteers: number;
    activeVolunteers: number;
    eventsConducted: number;
    donationAmount: number;
    projectsRunning: number;
  };
  charts: {
    volunteerGrowth: { month: string; count: number }[];
    donationAnalytics: { month: string; total: number }[];
  };
  recent: {
    volunteers: Volunteer[];
    donations: Donation[];
  };
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SearchResults {
  projects: Project[];
  events: Event[];
  news: NewsArticle[];
}

export interface Document {
  id: string;
  title: string;
  url: string;
  type: string;
}
