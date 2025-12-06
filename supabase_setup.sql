-- Create templates table
CREATE TABLE IF NOT EXISTS public.templates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    content TEXT, -- The actual prompt content or query
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create history table
CREATE TABLE IF NOT EXISTS public.history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    project_type TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.history ENABLE ROW LEVEL SECURITY;

-- Policies for templates
-- Everyone can view templates
CREATE POLICY "Public templates are viewable by everyone" 
ON public.templates FOR SELECT 
USING (true);

-- Policies for history
-- Users can view their own history
CREATE POLICY "Users can view their own history" 
ON public.history FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert their own history
CREATE POLICY "Users can insert their own history" 
ON public.history FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own history
CREATE POLICY "Users can delete their own history" 
ON public.history FOR DELETE 
USING (auth.uid() = user_id);

-- Insert some default templates
INSERT INTO public.templates (title, description, icon, content) VALUES
('Onboarding de Funcionários', 'Perguntas essenciais para integrar novos colaboradores.', 'Lightbulb', 'Onboarding de Funcionários'),
('Pesquisa de Satisfação', 'Avalie a satisfação do cliente com seu produto ou serviço.', 'MessageSquare', 'Pesquisa de Satisfação'),
('Briefing de Projeto', 'Perguntas para alinhar expectativas antes de iniciar um projeto.', 'PenTool', 'Briefing de Projeto'),
('Feedback de Evento', 'Colete opiniões sobre eventos corporativos ou workshops.', 'Calendar', 'Feedback de Evento'),
('Levantamento de Requisitos', 'Perguntas técnicas para entender as necessidades do sistema.', 'Code', 'Levantamento de Requisitos'),
('Newsletter Signup', 'Perguntas para segmentar sua audiência na inscrição.', 'Mail', 'Newsletter Signup');
