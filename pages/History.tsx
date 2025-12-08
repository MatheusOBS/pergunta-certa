import React from 'react';
import { useHistory } from '../contexts/HistoryContext';
import { Trash2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const History: React.FC = () => {
  const { historyItems, removeHistoryItem } = useHistory();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 pb-24"
    >
      <h1 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">Histórico</h1>

      {historyItems.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <Clock size={48} className="mx-auto mb-4 opacity-50" />
          <p>Nenhum histórico encontrado.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {historyItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                layout
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {item.project_type}
                  </span>
                  <button
                    onClick={() => removeHistoryItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-sm text-text-light dark:text-text-dark line-clamp-3 mb-2">
                  {item.content}
                </p>
                <div className="text-xs text-gray-400">
                  {new Date(item.created_at).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default History;