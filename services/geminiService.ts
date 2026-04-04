import { GoogleGenAI, Content, Part } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message } from "../types";

// Initialize the client securely using the environment variable
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (
  history: Message[],
  userMessage: string
): Promise<string> => {
  try {
    // Format history for the API
    // We limit history to the last 10 messages to save context window and keep focus
    const recentHistory = history.slice(-10);
    
    // Construct the contents array correctly
    const contents: Content[] = recentHistory.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text } as Part],
    }));

    // Add the new user message
    contents.push({
      role: 'user',
      parts: [{ text: userMessage } as Part],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Warm but consistent
      },
    });

    return response.text || "Desculpe, querida, tive um pequeno momento de silêncio. Podemos tentar orar novamente?";
  } catch (error) {
    console.error("Erro ao falar com a assistente:", error);
    return "Minha querida, houve uma falha na conexão. Verifique sua internet e tente novamente. Estou aqui aguardando.";
  }
};