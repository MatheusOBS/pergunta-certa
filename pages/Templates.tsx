import React, { useEffect, useState } from 'react';
import { Search, Lightbulb, PenTool, Calendar, MessageSquare, Code, Mail } from 'lucide-react';
import { supabase } from '../services/supabase';
import { motion } from 'framer-motion';
import { Template } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  Lightbulb: <Lightbulb size={24} />,
  PenTool: <PenTool size={24} />,
  Calendar: <Calendar size={24} />,
  MessageSquare: <MessageSquare size={24} />,
  Code: <Code size={24} />,
  Mail: <Mail size={24} />,
};

const Templates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from('templates')
        .select('*');

      if (error) {
        console.error('Error fetching templates:', error);
      } else {
        setTemplates(data || []);
      }
      setLoading(false);
    };

    fetchTemplates();
  }, []);

  const filteredTemplates = templates.filter(template =>
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 pb-24"
    >
      <h1 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">Modelos</h1>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar modelos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-none shadow-sm text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary outline-none"
        />
        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
      </div>

      {loading ? (
        <div className="text-center py-10">Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredTemplates.map((template) => (
            <button
              key={template.id}
              className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="p-3 bg-primary/10 text-primary rounded-lg mr-4">
                {iconMap[template.icon] || <Lightbulb size={24} />}
              </div>
              <div>
                <h3 className="font-semibold text-text-light dark:text-text-dark mb-1">{template.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{template.description}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Templates;