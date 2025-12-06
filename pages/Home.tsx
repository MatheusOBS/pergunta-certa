import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { generateQuestionnaire } from '../services/geminiService';
import { useHistory, useAuth } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../services/supabase';

// Componente do Logo CSS Puro
const AppLogo = () => (
  <div className="relative flex size-32 items-center justify-center animate-float">
    {/* Alvo Vermelho (Camadas) */}
    <div className="absolute inset-0 rounded-full bg-accent shadow-lg"></div>
    <div className="absolute inset-4 rounded-full bg-white dark:bg-background-dark"></div>
    <div className="absolute inset-8 rounded-full bg-accent"></div>
    <div className="absolute inset-12 rounded-full bg-white dark:bg-background-dark"></div>
    <div className="absolute inset-[3.5rem] rounded-full bg-accent"></div>

    {/* Balão Azul */}
    <div className="glossy-bubble absolute -bottom-2 -right-2 flex size-20 items-center justify-center rounded-3xl rounded-bl-none border-2 border-white/20 transform rotate-[-5deg] z-10">
      <span className="text-5xl font-bold text-white drop-shadow-md">?</span>
    </div>
  </div>
);

const Home: React.FC = () => {
  const location = useLocation();
  const { addHistoryItem } = useHistory();
  const { user, profile, refreshProfile } = useAuth();

  const [projectType, setProjectType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [hasGenerated, setHasGenerated] = useState(false);
  const [nextStartNumber, setNextStartNumber] = useState(1);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (location.state && (location.state as any).prefill) {
      setProjectType((location.state as any).prefill);
    }
  }, [location.state]);

  const handleGenerate = async () => {
    if (!projectType.trim()) return;

    if (!user) {
      alert('Por favor, faça login na aba Perfil para gerar questionários.');
      return;
    }

    if (profile && profile.credits <= 0) {
      alert('Você não tem créditos suficientes. Atualize seu plano.');
      return;
    }

    setIsLoading(true);
    setResult('');
    setHasGenerated(false);
    setNextStartNumber(1);

    try {
      const text = await generateQuestionnaire(projectType, 1);

      // Deduct credit
      const { error } = await supabase.rpc('deduct_credit', { user_id: user.id });
      if (error) {
        console.error('Error deducting credit:', error);
      } else {
        await refreshProfile();
      }

      setResult(text);
      setHasGenerated(true);
      setNextStartNumber(11);
    } catch (error) {
      alert('Falha ao gerar. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateMore = async () => {
    if (!projectType.trim()) return;

    setIsLoading(true);

    try {
      const text = await generateQuestionnaire(projectType, nextStartNumber);
      setResult((prev) => prev + '\n' + text);
      setNextStartNumber((prev) => prev + 10);
    } catch (error) {
      alert('Falha ao gerar mais perguntas. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
  };

  const handleSave = () => {
    addHistoryItem({
      project_type: projectType,
      content: result,
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col overflow-x-hidden bg-background-light pb-24 dark:bg-background-dark"
    >
      <div className={`flex flex-col p-4 transition-all duration-500 ${hasGenerated ? 'pt-8' : 'flex-grow justify-center pt-0'}`}>

        {/* Header Section com Logo */}
        <div className={`flex flex-col items-center justify-center text-center transition-all duration-500 ${hasGenerated ? 'scale-75 mb-6' : 'mb-10 scale-100'}`}>
          <div className="mb-6">
            <AppLogo />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Pergunta<span className="text-primary">Certa</span>
            <span className="text-accent">.</span>
          </h1>
          {!hasGenerated && (
            <p className="mt-3 max-w-xs text-center text-stone-500 dark:text-stone-400">
              Crie questionários de onboarding perfeitos em segundos com Inteligência Artificial.
            </p>
          )}
        </div>

        {/* Input Section */}
        <div className="mx-auto w-full max-w-sm space-y-4">
          <div className="relative">
            <input
              id="project-type"
              type="text"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              placeholder="O que você vai criar hoje?"
              className="form-input w-full rounded-2xl border-stone-200 bg-white px-5 py-4 text-center text-lg text-stone-900 shadow-sm placeholder:text-stone-400 focus:border-primary focus:ring-primary dark:border-[#233648] dark:bg-[#192736] dark:text-white dark:placeholder:text-stone-500"
            />
            {!hasGenerated && projectType.length === 0 && (
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 dark:text-stone-600">
                <span className="material-symbols-outlined">search</span>
              </div>
            )}
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !projectType.trim()}
            className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-[#4facfe] px-5 py-3 text-lg font-bold text-white shadow-md shadow-primary/30 transition-all hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none active:scale-[0.98]"
          >
            {isLoading && !hasGenerated ? (
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined">auto_awesome</span>
            )}
            {isLoading && !hasGenerated ? 'Criando...' : 'Gerar Questionário'}
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="mx-auto mt-8 flex w-full max-w-sm flex-col items-center justify-center space-y-3 rounded-2xl bg-white p-6 text-center shadow-sm dark:bg-[#192736]">
            <p className="text-base font-medium text-stone-700 dark:text-stone-300">
              {hasGenerated ? 'Pensando em mais perguntas...' : 'Analisando seu projeto...'}
            </p>
            <div className="relative h-2 w-full max-w-xs overflow-hidden rounded-full bg-stone-100 dark:bg-[#233648]">
              <div className="absolute h-full w-1/3 animate-[progress_1s_ease-in-out_infinite] rounded-full bg-accent"></div>
            </div>
          </div>
        )}

        {/* Result Section */}
        {hasGenerated && (
          <div className="mx-auto mt-8 w-full max-w-sm animate-[fadeIn_0.5s_ease-out] space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Resultado
              </h2>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Português (BR)
              </span>
            </div>

            <textarea
              readOnly
              value={result}
              rows={12}
              className="form-textarea w-full resize-none rounded-2xl border-stone-200 bg-white p-5 text-base leading-relaxed text-stone-700 shadow-sm focus:border-primary focus:ring-primary dark:border-[#233648] dark:bg-[#192736] dark:text-stone-300"
            />

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCopy}
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-bold text-stone-700 transition-colors hover:bg-stone-50 active:scale-[0.98] dark:border-[#233648] dark:bg-[#192736] dark:text-white dark:hover:bg-[#233648]"
              >
                <span className="material-symbols-outlined text-xl">content_copy</span>
                Copiar
              </button>
              <button
                onClick={handleSave}
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white shadow-md shadow-accent/20 transition-colors hover:bg-red-600 active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-xl">save</span>
                Salvar
              </button>
            </div>

            <button
              onClick={handleGenerateMore}
              disabled={isLoading}
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed border-stone-300 bg-transparent px-5 py-3 text-sm font-bold text-stone-500 transition-all hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.98] dark:border-stone-700 dark:text-stone-400 dark:hover:border-primary dark:hover:text-primary"
            >
              <span className="material-symbols-outlined">add_circle</span>
              Gerar mais 10 perguntas
            </button>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 transform items-center gap-3 rounded-full bg-stone-900/95 px-6 py-3 text-white shadow-xl backdrop-blur-sm dark:bg-white/95 dark:text-stone-900 animate-[fadeIn_0.3s_ease-out]">
          <span className="material-symbols-outlined text-green-400 dark:text-green-600">check_circle</span>
          <p className="text-sm font-bold">Salvo com sucesso!</p>
        </div>
      )}
    </motion.div>
  );
};

export default Home;