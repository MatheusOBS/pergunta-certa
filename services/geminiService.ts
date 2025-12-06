import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || 'demo-key-not-configured';
const ai = new GoogleGenAI({ apiKey });
export const isGeminiConfigured = !!process.env.API_KEY;

export const generateQuestionnaire = async (projectType: string, startNumber: number = 1): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Engenharia de Prompt Avançada para maximizar a qualidade e utilidade das perguntas
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
      - Comece a numeração em ${startNumber} (ex: "${startNumber}. Pergunta...").
      - Retorne APENAS a lista numerada pura, sem introduções, sem títulos e sem conclusões.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }
    return text.trim();
  } catch (error) {
    console.error("Error generating questionnaire:", error);
    throw error;
  }
};