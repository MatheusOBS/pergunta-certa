export interface Template {
  id: string;
  title: string;
  description: string;
  icon: string;
  content: string;
  created_at?: string;
}

export interface HistoryItem {
  id: string;
  user_id: string;
  project_type: string;
  content: string;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  credits: number;
  tier: 'free' | 'pro';
  created_at: string;
}

export interface NavigationState {
  currentTab: 'home' | 'history' | 'templates' | 'profile';
}