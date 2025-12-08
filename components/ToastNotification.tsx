import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ToastNotificationProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 transform items-center gap-3 rounded-full bg-stone-900/95 px-6 py-3 text-white shadow-xl backdrop-blur-sm dark:bg-white/95 dark:text-stone-900"
        >
          <CheckCircle className="text-green-400 dark:text-green-600" />
          <p className="text-sm font-bold">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;
