import { GoogleGenAI, Content, Part } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const sendMessageToGemini = async (
  history: Message[],
  userMessage: string,
  contextoSemana?: string // NOVO: Recebe o texto do diárioData
): Promise<string> => {
  try {
    const recentHistory = history.slice(-10);
    
    const contents: Content[] = recentHistory.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text } as Part],
    }));

    contents.push({
      role: 'user',
      parts: [{ text: userMessage } as Part],
    });

    // Criamos uma instrução personalizada que junta a base com o conteúdo da semana
    const instrucaoFinal = contextoSemana 
      ? `${SYSTEM_INSTRUCTION}\n\nCONTEÚDO OFICIAL DESTA SEMANA (Use isso para guiar sua resposta):\n${contextoSemana}`
      : SYSTEM_INSTRUCTION;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: instrucaoFinal, // Agora ela sabe o conteúdo do PDF!
        temperature: 0.7,
      },
    });

    return response.text || "Desculpe, querida, tive um pequeno momento de silêncio. Podemos tentar orar novamente?";
  } catch (error) {
    console.error("Erro ao falar com a assistente:", error);
    return "Minha querida, houve uma falha na conexão. Verifique sua internet e tente novamente.";
  }
};