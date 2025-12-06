# Análise de Completude do SaaS: PerguntaCerta

Esta análise avalia o estado atual do projeto em relação a um produto SaaS (Software as a Service) comercialmente viável e completo.

## 📊 Resumo Executivo

**Status Atual:** 🟡 **MVP Funcional (Ferramenta)**
**Veredito:** O sistema **NÃO** está completo como um SaaS comercial.

Embora a funcionalidade principal (gerar questionários com IA) e a persistência de dados (Supabase) estejam funcionando, faltam os pilares essenciais que transformam uma "ferramenta" em um "negócio" (SaaS).

---

## 🛑 Lacunas Críticas (O que falta para ser um SaaS)

### 1. Monetização e Cobrança (Inexistente)
Atualmente, o sistema é gratuito e ilimitado. Isso significa que você pagará a conta da API do Google Gemini para todos os usuários sem receber nada em troca.
*   **Falta:** Integração com Gateway de Pagamento (Stripe, LemonSqueezy, Asaas).
*   **Falta:** Página de Preços (Pricing Page).
*   **Falta:** Sistema de Assinatura (Free vs Pro) ou Créditos (Pague pelo uso).
*   **Falta:** Webhooks para gerenciar status da assinatura (ativo, cancelado, inadimplente).

### 2. Limites de Uso (Inexistente)
Não há controle sobre o quanto um usuário pode usar a IA.
*   **Risco:** Um único usuário mal-intencionado pode criar um script para gerar milhares de questionários e estourar sua cota/custo da API.
*   **Necessário:** Implementar um sistema de "créditos" ou limites diários/mensais no banco de dados (ex: tabela `profiles` com coluna `credits`).

### 3. Gestão de Conta Avançada
O perfil atual é básico (apenas login/logout).
*   **Falta:** Opção de "Deletar Conta" (requisito legal LGPD/GDPR).
*   **Falta:** Atualização de dados (Nome, Foto/Avatar).
*   **Falta:** Login Social (Google/GitHub) para reduzir fricção no cadastro.

### 4. Aspectos Legais e Institucionais
Para operar comercialmente, você precisa de proteção legal.
*   **Falta:** Termos de Uso (Terms of Service).
*   **Falta:** Política de Privacidade (Privacy Policy).
*   **Falta:** Rodapé institucional com contato/suporte.

### 5. Analytics e Observabilidade
Você está "voando às cegas".
*   **Falta:** Analytics (Google Analytics, PostHog) para saber quantos usuários acessam.
*   **Falta:** Monitoramento de Erros (Sentry) para saber quando o app quebra para um usuário.

---

## ✅ O que já está pronto (Pontos Fortes)

1.  **Core Product:** A geração de questionários com IA está funcional e com boa engenharia de prompt.
2.  **Backend Base:** A estrutura do Supabase (Tabelas, RLS, Auth) está sólida e segura.
3.  **Frontend/UI:** A interface é moderna, responsiva e tem um bom design (Tailwind CSS).
4.  **Histórico:** A funcionalidade de salvar e recuperar histórico está implementada.

---

## 🚀 Plano de Ação Recomendado (Roadmap)

Para transformar este MVP em um SaaS completo, recomendo a seguinte ordem de prioridade:

### Fase 1: Controle de Danos (Imediato)
1.  Criar tabela `profiles` no Supabase.
2.  Adicionar coluna `credits` ou `usage_count` na tabela `profiles`.
3.  Implementar verificação no backend (Edge Function ou RLS) para impedir geração se o limite for atingido.

### Fase 2: Monetização (Curto Prazo)
1.  Escolher um gateway (sugestão: Stripe ou LemonSqueezy pela facilidade).
2.  Criar página de "Upgrade".
3.  Integrar checkout para compra de créditos ou assinatura.

### Fase 3: Profissionalização (Médio Prazo)
1.  Adicionar páginas legais (Termos/Privacidade).
2.  Configurar domínio personalizado.
3.  Adicionar Google Analytics.

---

**Conclusão:** O projeto é uma excelente base técnica, mas precisa da camada de "negócio" (pagamentos e limites) para ser lançado como um produto real.
