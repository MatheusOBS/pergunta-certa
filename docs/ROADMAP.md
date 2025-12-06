# Roadmap do Produto: Pergunta Certa

Este documento detalha o status atual do desenvolvimento e os próximos passos para o lançamento comercial do SaaS.

## 📊 Status Atual
**Fase:** MVP Funcional (Alpha)

O núcleo do produto está completo e operacional:
- [x] Geração de questionários via IA (Gemini)
- [x] Autenticação e Banco de Dados (Supabase)
- [x] Interface do Usuário (React + Tailwind)
- [x] Histórico de questionários

## 🚀 Próximos Passos (Backlog)

### 1. Monetização e Limites
- [ ] Implementar integração completa com Stripe (Checkout e Webhooks).
- [ ] Criar sistema de créditos/cotas por usuário no Supabase.
- [ ] Desenvolver página de Pricing e Upgrade.

### 2. Gestão de Conta
- [ ] Permitir exclusão de conta (LGPD).
- [ ] Adicionar upload de avatar e edição de perfil.
- [ ] Implementar Login Social (Google/GitHub).

### 3. Institucional
- [ ] Redigir Termos de Uso e Política de Privacidade.
- [ ] Configurar domínio personalizado.
- [ ] Implementar Analytics (PostHog/Google Analytics).

## 📝 Notas Técnicas
- A arquitetura atual utiliza RLS (Row Level Security) no Supabase para garantir isolamento dos dados.
- O frontend está hospedado no GitHub Pages, mas pode ser migrado para Vercel/Netlify para melhor performance de Edge Functions se necessário.
