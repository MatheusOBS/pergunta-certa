import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Terms: React.FC = () => {
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
                <h1 className="text-2xl font-bold mb-6 text-stone-900 dark:text-white">Termos de Uso</h1>

                <p className="text-sm text-stone-500 mb-8">Última atualização: {new Date().toLocaleDateString()}</p>

                <h3>1. Aceitação dos Termos</h3>
                <p>Ao acessar e usar o PerguntaCerta, você concorda em cumprir estes Termos de Uso e todas as leis aplicáveis.</p>

                <h3>2. Uso do Serviço</h3>
                <p>O PerguntaCerta fornece geração de questionários assistida por IA. Você concorda em não usar o serviço para qualquer finalidade ilegal ou proibida.</p>

                <h3>3. Contas e Assinaturas</h3>
                <p>Para acessar certos recursos, você pode precisar criar uma conta. Você é responsável por manter a confidencialidade de sua conta. Assinaturas e créditos são cobrados antecipadamente e não são reembolsáveis, exceto conforme exigido por lei.</p>

                <h3>4. Propriedade Intelectual</h3>
                <p>O conteúdo gerado pela IA é fornecido para seu uso. O software, design e marca PerguntaCerta são propriedade exclusiva de nossos desenvolvedores.</p>

                <h3>5. Limitação de Responsabilidade</h3>
                <p>O PerguntaCerta é fornecido "como está". Não garantimos que o serviço será ininterrupto ou livre de erros. Em nenhum caso seremos responsáveis por danos indiretos ou incidentais.</p>

                <h3>6. Alterações</h3>
                <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. O uso continuado do serviço após alterações constitui aceitação dos novos termos.</p>

                <div className="mt-12 p-4 bg-stone-100 dark:bg-gray-800 rounded-xl text-sm text-stone-600 dark:text-stone-400">
                    <p>Dúvidas? Entre em contato conosco pelo email suporte@perguntacerta.com</p>
                </div>
            </div>
        </motion.div>
    );
};

export default Terms;
