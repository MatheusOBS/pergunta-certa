import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Home', icon: 'home', path: '/' },
    { name: 'Histórico', icon: 'history', path: '/history' },
    { name: 'Modelos', icon: 'library_books', path: '/templates' },
    { name: 'Perfil', icon: 'person', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200 bg-background-light/95 backdrop-blur-sm dark:border-stone-800 dark:bg-background-dark/95">
      <div className="mx-auto flex h-20 max-w-md items-stretch justify-around px-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex flex-1 flex-col items-center justify-center gap-1.5 p-2 transition-colors ${
              isActive(item.path)
                ? 'text-primary'
                : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
            }`}
          >
            <span
              className={`material-symbols-outlined text-2xl ${
                isActive(item.path) ? 'material-symbols-filled' : ''
              }`}
            >
              {item.icon}
            </span>
            <span className={`text-xs ${isActive(item.path) ? 'font-bold' : 'font-medium'}`}>
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;