import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message } from "../src/types";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const sendMessageToGemini = async (
  history: Message[],
  userMessage: string,
  contextoSemana?: string
): Promise<string> => {
  try {
    // Usando o nome do modelo sem o prefixo 'models/' para maior compatibilidade
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", 
      systemInstruction: contextoSemana 
        ? `${SYSTEM_INSTRUCTION}\n\nCONTEÚDO DO PDF PARA ESTA SEMANA:\n${contextoSemana}`
        : SYSTEM_INSTRUCTION,
    });

    // Filtra o histórico: remove mensagens iniciais do 'model' 
    // O Gemini exige que a primeira mensagem seja sempre 'user'
    const chatHistory = history
      .map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }],
      }))
      .filter((msg, index, array) => {
        const firstUserIndex = array.findIndex(m => m.role === 'user');
        return index >= firstUserIndex && firstUserIndex !== -1;
      });

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      }
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();

  } catch (error: any) {
    console.error("Erro detalhado Gemini:", error);
    
    if (error.message?.includes('429')) {
      throw new Error("429");
    }
    
    return "Minha querida, tive um probleminha técnico na conexão com a Mãe Débora. Pode tentar falar comigo de novo?";
  }
};