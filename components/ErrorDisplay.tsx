import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
  details?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, details }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center p-4 m-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 rounded-lg shadow-md"
    >
      <AlertTriangle className="w-12 h-12 text-red-500 dark:text-red-300 mb-4" />
      <h2 className="text-xl font-bold text-red-800 dark:text-red-200">{message}</h2>
      {details && <p className="text-sm text-red-600 dark:text-red-400 mt-2">{details}</p>}
    </motion.div>
  );
};

export default ErrorDisplay;
