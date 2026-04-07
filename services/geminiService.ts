import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const sendMessageToGemini = async (
  history: any[], 
  userMessage: string, 
  contextoSemana?: string
): Promise<string> => {
  try {
    const instrucaoCompleta = contextoSemana 
      ? `${SYSTEM_INSTRUCTION}\n\nCONTEXTO DO DIÁRIO:\n${contextoSemana}`
      : SYSTEM_INSTRUCTION;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { role: "user", parts: [{ text: `[INSTRUÇÃO]: ${instrucaoCompleta}` }] },
        ...history.slice(-6).map(m => ({
          role: m.role === 'model' ? 'model' : 'user',
          parts: [{ text: m.text }]
        })),
        { role: "user", parts: [{ text: userMessage }] }
      ],
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    return response.text() || "Desculpe, não consegui processar sua mensagem.";

  } catch (error: any) {
    console.error("Erro Gemini:", error);
    
    // Tratamento para Servidor Lotado (503)
    if (error.message?.includes('503') || error.status === 503) {
      return "Minha querida, recebi muitas visitas agora e precisei de um fôlego. Pode tentar falar comigo de novo em 1 ou 2 minutinhos? 🙏";
    }

    // Tratamento para Muitas Requisições (429)
    if (error.message?.includes('429')) {
      return "Estou conversando com muitas mamães agora! Vamos esperar um minutinho? Já te respondo com todo carinho. 🌸";
    }
    
    return "Minha querida, tive um probleminha técnico na conexão. Pode repetir a pergunta? 🙏";
  }
};