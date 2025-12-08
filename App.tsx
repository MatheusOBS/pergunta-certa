import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Templates from './pages/Templates';
import History from './pages/History';
import ProfilePage from './pages/Profile';
import Pricing from './pages/Pricing';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import BottomNav from './components/BottomNav';
import { AuthProvider } from './contexts/AuthContext';
import { HistoryProvider } from './contexts/HistoryContext';
import ErrorBoundary from './components/ErrorBoundary';

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
          <ErrorBoundary>
            <AppContent />
          </ErrorBoundary>
        </HashRouter>
      </HistoryProvider>
    </AuthProvider>
  );
};

export default App;
