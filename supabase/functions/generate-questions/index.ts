import { GoogleGenerativeAI } from "npm:@google/generative-ai";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { projectType, startNumber } = await req.json();

    if (!projectType) {
      return new Response(JSON.stringify({ error: 'projectType is required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in Supabase secrets.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Atue como um Especialista Sênior em Produtos Digitais, UX e Estratégia de Conteúdo.
      Seu objetivo é criar um questionário de briefing profundo e estratégico para um projeto do tipo: "${projectType}".

      CONTEXTO: As respostas deste questionário serão utilizadas posteriormente por uma Inteligência Artificial para gerar o produto final completo (seja código, design, texto ou estratégia) com pouca ou nenhuma intervenção humana extra.

      Por isso, as perguntas NÃO podem ser genéricas. Elas devem ser cirúrgicas para extrair:
      1. A "Alma" do projeto (Tom de voz, estilo visual, filosofia).
      2. Especificações Técnicas e Funcionais detalhadas.
      3. Público-Alvo e Dores específicas que o projeto resolve.
      4. Diferenciais competitivos e referências obrigatórias.

      REGRAS DE SAÍDA:
      - Gere exatamente 10 perguntas.
      - As perguntas devem ser em Português (pt-BR).
      - Comece a numeração em ${startNumber || 1} (ex: "${startNumber || 1}. Pergunta...").
      - Retorne APENAS a lista numerada pura, sem introduções, sem títulos e sem conclusões.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return new Response(JSON.stringify({ questionnaire: text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
