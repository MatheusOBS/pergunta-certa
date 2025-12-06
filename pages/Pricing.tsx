import React from 'react';
import { Check, Zap, Star, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing: React.FC = () => {
    const handleSubscribe = (plan: string) => {
        // Aqui você colocará o link do Stripe
        let paymentLink = '';

        switch (plan) {
            case 'pro':
                paymentLink = 'https://buy.stripe.com/test_dRm8wI6cF1lR5Akbq6e3e07';
                break;
            case 'credits_10':
                paymentLink = 'https://buy.stripe.com/test_dRmbIU1Wpc0v9QAeCie3e06';
                break;
            default:
                return;
        }

        if (paymentLink) {
            window.open(paymentLink, '_blank');
        } else {
            alert('Link de pagamento não configurado. Consulte o README_SAAS.md');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 pb-24 min-h-screen bg-background-light dark:bg-background-dark"
        >
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white mb-2">
                    Invista na sua <span className="text-primary">Produtividade</span>
                </h1>
                <p className="text-stone-500 dark:text-stone-400">
                    Escolha o plano ideal para gerar questionários ilimitados.
                </p>
            </div>

            {/* Credit Packs */}
            <div className="mb-12">
                <h2 className="text-xl font-bold text-stone-800 dark:text-white mb-4 flex items-center gap-2">
                    <Zap className="text-yellow-500" size={24} />
                    Pacotes de Créditos
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-stone-100 dark:border-gray-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                        MAIS POPULAR
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-stone-900 dark:text-white">10 Créditos</h3>
                            <p className="text-sm text-stone-500">Sem validade. Use quando quiser.</p>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl font-bold text-stone-900 dark:text-white">R$ 19,90</span>
                        </div>
                    </div>
                    <button
                        onClick={() => handleSubscribe('credits_10')}
                        className="w-full py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl font-bold hover:opacity-90 transition-opacity"
                    >
                        Comprar Agora
                    </button>
                </div>
            </div>

            {/* Subscription Plans */}
            <h2 className="text-xl font-bold text-stone-800 dark:text-white mb-4 flex items-center gap-2">
                <Star className="text-primary" size={24} />
                Assinaturas Mensais
            </h2>

            <div className="grid gap-6">
                {/* Free Plan */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-stone-200 dark:border-gray-700 opacity-75">
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">Free</h3>
                    <div className="text-3xl font-bold text-stone-900 dark:text-white mb-4">R$ 0<span className="text-sm font-normal text-stone-500">/mês</span></div>
                    <ul className="space-y-3 mb-6">
                        <li className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-300">
                            <Check size={16} className="text-green-500" /> 3 Créditos iniciais
                        </li>
                        <li className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-300">
                            <Check size={16} className="text-green-500" /> Histórico básico
                        </li>
                    </ul>
                    <button disabled className="w-full py-3 bg-stone-100 dark:bg-gray-700 text-stone-400 rounded-xl font-bold cursor-not-allowed">
                        Plano Atual
                    </button>
                </div>

                {/* Pro Plan */}
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-2xl p-6 border-2 border-primary relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-sm">
                        RECOMENDADO
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">Pro</h3>
                    <div className="text-3xl font-bold text-stone-900 dark:text-white mb-4">R$ 49,90<span className="text-sm font-normal text-stone-500">/mês</span></div>
                    <ul className="space-y-3 mb-6">
                        <li className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-300">
                            <Check size={16} className="text-green-500" /> <strong>50 Créditos</strong> mensais
                        </li>
                        <li className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-300">
                            <Check size={16} className="text-green-500" /> Acesso a novos modelos
                        </li>
                        <li className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-300">
                            <Check size={16} className="text-green-500" /> Suporte prioritário
                        </li>
                    </ul>
                    <button
                        onClick={() => handleSubscribe('pro')}
                        className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark transition-colors"
                    >
                        Assinar Pro
                    </button>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-xs text-stone-400 flex items-center justify-center gap-1">
                    <Shield size={12} /> Pagamento seguro via Stripe
                </p>
            </div>
        </motion.div>
    );
};

export default Pricing;
