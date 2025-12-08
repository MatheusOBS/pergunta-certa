import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { HistoryItem } from '../types';
import { useAuth } from './AuthContext';

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

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
