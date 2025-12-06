import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from './services/supabase';
import Home from './pages/Home';
import Templates from './pages/Templates';
import History from './pages/History';
import ProfilePage from './pages/Profile';
import Pricing from './pages/Pricing';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import BottomNav from './components/BottomNav';
import { HistoryItem, Profile as UserProfile } from './types';

// --- Auth Context ---

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, refreshProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// --- History Context (Modified for Supabase) ---
interface HistoryContextType {
  historyItems: HistoryItem[];
  addHistoryItem: (item: Omit<HistoryItem, 'id' | 'user_id' | 'created_at'>) => Promise<void>;
  removeHistoryItem: (id: string) => Promise<void>;
  fetchHistory: () => Promise<void>;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};

const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const { user } = useAuth();

  const fetchHistory = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('history')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching history:', error);
    } else {
      setHistoryItems(data || []);
    }
  };

  useEffect(() => {
    if (user) {
      fetchHistory();
    } else {
      setHistoryItems([]);
    }
  }, [user]);

  const addHistoryItem = async (newItem: Omit<HistoryItem, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('history')
      .insert([{ ...newItem, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error adding history item:', error);
    } else if (data) {
      setHistoryItems((prev) => [data, ...prev]);
    }
  };

  const removeHistoryItem = async (id: string) => {
    const { error } = await supabase
      .from('history')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error removing history item:', error);
    } else {
      setHistoryItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <HistoryContext.Provider value={{ historyItems, addHistoryItem, removeHistoryItem, fetchHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

// --- Main Layout ---
const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="mx-auto max-w-md bg-background-light shadow-2xl dark:bg-background-dark min-h-screen relative">
      <AnimatePresence mode="wait">
        {/* @ts-expect-error Key is needed for AnimatePresence */}
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HistoryProvider>
        <HashRouter>
          <AppContent />
        </HashRouter>
      </HistoryProvider>
    </AuthProvider>
  );
};

export default App;