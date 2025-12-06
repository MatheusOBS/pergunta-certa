# Configuração do Supabase

Para que o projeto funcione corretamente, você precisa configurar o banco de dados no Supabase. Como não tenho acesso direto para criar tabelas no seu projeto, preparei um script SQL para você.

## Passos para Configuração

1.  Acesse o painel do seu projeto no [Supabase](https://supabase.com/dashboard).
2.  No menu lateral esquerdo, clique em **SQL Editor**.
3.  Clique em **New Query**.
4.  Copie todo o conteúdo do arquivo `supabase_setup.sql` que criei na raiz do seu projeto.
5.  Cole no editor SQL do Supabase.
6.  Clique no botão **Run** (Executar).

## O que o script faz?

*   Cria a tabela `templates` para armazenar os modelos de perguntas.
*   Cria a tabela `history` para salvar o histórico dos usuários.
*   Configura **Row Level Security (RLS)** para proteger seus dados:
    *   `templates`: Leitura pública (todos podem ver).
    *   `history`: Apenas o próprio usuário pode ver, criar e deletar seu histórico.
*   Insere alguns modelos iniciais na tabela `templates`.

## Verificação

Após executar o script, o erro sobre a tabela `templates` deve desaparecer e o histórico começará a funcionar assim que você fizer login.
