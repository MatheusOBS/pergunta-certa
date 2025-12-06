import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, LogOut, Moon, Sun, Mail } from 'lucide-react';
import { useAuth } from '../App';
import { supabase } from '../services/supabase';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference or local storage
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Link de login enviado para seu email!');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (!user) {
    return (
      <div className="p-6 pb-24 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold mb-2 text-center text-text-light dark:text-text-dark">Bem-vindo</h1>
          <p className="text-gray-500 text-center mb-8">Faça login para salvar seu histórico</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary outline-none text-text-light dark:text-text-dark"
                  placeholder="seu@email.com"
                  required
                />
                <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Entrar com Link Mágico'}
            </button>

            {message && (
              <p className="text-sm text-center text-green-600 mt-2">{message}</p>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 pb-24"
    >
      <h1 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">Perfil</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6 flex items-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
          <User size={32} />
        </div>
        <div>
          <h2 className="font-bold text-lg text-text-light dark:text-text-dark">Usuário</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
        <h3 className="text-lg font-bold mb-4 text-text-light dark:text-text-dark">Plano Atual</h3>
        <div className="flex justify-between items-center mb-2 text-text-light dark:text-text-dark">
          <span>Créditos</span>
          <span className="font-bold text-primary text-xl">{profile?.credits ?? 0}</span>
        </div>
        <div className="flex justify-between items-center mb-4 text-text-light dark:text-text-dark">
          <span>Nível</span>
          <span className="capitalize font-medium">{profile?.tier || 'Free'}</span>
        </div>
        <button
          onClick={() => navigate('/pricing')}
          className="w-full py-2 bg-accent text-white rounded-lg font-bold shadow-md hover:bg-red-600 transition-colors"
        >
          Comprar Créditos
        </button>
      </div>

      <div className="space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
        >
          <div className="flex items-center text-text-light dark:text-text-dark">
            {darkMode ? <Sun size={20} className="mr-3 text-gray-500" /> : <Moon size={20} className="mr-3 text-gray-500" />}
            <span>Tema {darkMode ? 'Claro' : 'Escuro'}</span>
          </div>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group"
        >
          <div className="flex items-center text-red-500">
            <LogOut size={20} className="mr-3" />
            <span>Sair</span>
          </div>
        </button>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        <Link to="/terms" className="hover:underline hover:text-primary transition-colors">Termos de Uso</Link>
        <span className="mx-2">•</span>
        <Link to="/privacy" className="hover:underline hover:text-primary transition-colors">Privacidade</Link>
      </div>
    </motion.div>
  );
};

export default Profile;