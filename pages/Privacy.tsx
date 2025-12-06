import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Privacy: React.FC = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 pb-24 min-h-screen bg-background-light dark:bg-background-dark"
        >
            <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center text-stone-500 hover:text-primary transition-colors"
            >
                <ArrowLeft size={20} className="mr-2" /> Voltar
            </button>

            <div className="prose dark:prose-invert max-w-none">
                <h1 className="text-2xl font-bold mb-6 text-stone-900 dark:text-white">Política de Privacidade</h1>

                <p className="text-sm text-stone-500 mb-8">Última atualização: {new Date().toLocaleDateString()}</p>

                <h3>1. Coleta de Dados</h3>
                <p>Coletamos informações que você nos fornece diretamente (como email para cadastro) e dados de uso automático (como logs de acesso) para melhorar o serviço.</p>

                <h3>2. Uso das Informações</h3>
                <p>Usamos seus dados para: fornecer e manter o serviço, processar pagamentos, enviar comunicações importantes e prevenir fraudes.</p>

                <h3>3. Compartilhamento de Dados</h3>
                <p>Não vendemos seus dados pessoais. Compartilhamos dados apenas com prestadores de serviço essenciais (como processadores de pagamento Stripe e provedores de IA) para operar o sistema.</p>

                <h3>4. Segurança</h3>
                <p>Implementamos medidas de segurança para proteger seus dados, mas nenhum método de transmissão pela Internet é 100% seguro.</p>

                <h3>5. Seus Direitos</h3>
                <p>Você tem o direito de acessar, corrigir ou excluir seus dados pessoais. Entre em contato conosco para exercer esses direitos.</p>

                <h3>6. Cookies</h3>
                <p>Usamos cookies para manter sua sessão ativa e lembrar suas preferências.</p>

                <div className="mt-12 p-4 bg-stone-100 dark:bg-gray-800 rounded-xl text-sm text-stone-600 dark:text-stone-400">
                    <p>Para questões de privacidade, contate: privacidade@perguntacerta.com</p>
                </div>
            </div>
        </motion.div>
    );
};

export default Privacy;
