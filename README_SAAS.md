# Implementação SaaS - Fase 1: Limites e Perfis

Implementei a primeira fase da transformação do seu projeto em um SaaS. Agora o sistema suporta perfis de usuário, contagem de créditos e bloqueio de uso quando os créditos acabam.

## 🚀 Como Ativar as Mudanças

Para que o sistema de créditos funcione, você precisa atualizar o banco de dados.

1.  Acesse o painel do seu projeto no [Supabase](https://supabase.com/dashboard).
2.  Vá em **SQL Editor** -> **New Query**.
3.  Copie todo o conteúdo do arquivo `supabase_saas_migration.sql` (na raiz do projeto).
4.  Cole no editor e clique em **Run**.

## 📋 O que mudou?

### Banco de Dados
*   **Nova Tabela `profiles`**: Armazena os créditos e o plano do usuário.
*   **Trigger Automático**: Assim que um usuário se cadastra, ele ganha automaticamente **3 créditos grátis**.
*   **Segurança**: Função protegida para descontar créditos apenas quando o usuário realmente usa a IA.

### Frontend
*   **Home**: Agora verifica se o usuário tem créditos antes de gerar. Se tiver, desconta 1 crédito após o sucesso.
*   **Perfil**: Mostra o saldo de créditos e o plano atual (Free/Pro).
*   **Bloqueio**: Se os créditos acabarem, o usuário é impedido de gerar novos questionários e vê um alerta.

---

# Fase 2: Monetização (Configuração)

Adicionei a página de preços (`/pricing`) e a lógica de redirecionamento para pagamento.

## Como configurar o Stripe

1.  Crie uma conta no [Stripe](https://stripe.com).
2.  No Dashboard do Stripe, vá em **Catálogo de Produtos**.
3.  Crie um produto chamado "10 Créditos" e defina o preço (ex: R$ 19,90).
4.  Crie um **Link de Pagamento** para este produto.
5.  Copie a URL do link (começa com `https://buy.stripe.com/...`).
6.  Abra o arquivo `pages/Pricing.tsx` no seu projeto.
7.  Substitua a URL de exemplo pela sua URL real:
    ```typescript
    case 'credits_10':
      paymentLink = 'SUA_URL_DO_STRIPE_AQUI';
    ```
8.  Repita o processo para o plano "Pro" se desejar.

## Como entregar os créditos (Automação)

Como não temos um servidor backend dedicado, a maneira mais fácil de entregar os créditos após o pagamento é usando uma automação (Zapier, Make ou n8n) ou Supabase Edge Functions.

**Sugestão (Make.com + Supabase):**
1.  Crie um cenário no Make que escuta o webhook do Stripe (`checkout.session.completed`).
2.  Adicione uma ação do Supabase para atualizar a tabela `profiles`.
3.  Busque o usuário pelo email (que vem do Stripe) e some +10 no campo `credits`.
