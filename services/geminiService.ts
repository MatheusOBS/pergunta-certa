import { supabase } from './supabase';

export const generateQuestionnaire = async (projectType: string, startNumber: number = 1): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-questions', {
      body: { projectType, startNumber },
    });

    if (error) {
      console.error("Error invoking Supabase function:", error);
      throw new Error(`Failed to invoke generate-questions function: ${error.message}`);
    }

    if (!data || !data.questionnaire) {
      throw new Error("Invalid response from Supabase function");
    }

    return data.questionnaire.trim();
  } catch (error) {
    console.error("Error generating questionnaire:", error);
    throw error;
  }
};
