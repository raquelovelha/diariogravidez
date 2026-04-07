import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Inicializa a API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const sendMessageToGemini = async (
  history: any[], 
  userMessage: string, 
  contextoSemana?: string
): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const instrucaoCompleta = contextoSemana 
      ? `${SYSTEM_INSTRUCTION}\n\n[CONTEXTO DA SEMANA ATUAL]: ${contextoSemana}`
      : SYSTEM_INSTRUCTION;

    const cleanHistory = history
      .map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }],
      }))
      .filter((m, i) => !(i === 0 && m.role === 'model'));

    // Montamos o comando final combinando as REGRAS + a PERGUNTA atual
    const comandoFinal = `[REGRAS E MANUAL]: ${instrucaoCompleta}\n\n[PERGUNTA DA MAMÃE]: ${userMessage}\n\nPor favor, forneça a resposta completa, incluindo a oração da semana mencionada no manual.`;

    const contents = [
      ...cleanHistory.slice(-4), // Histórico anterior (máximo 4 mensagens)
      { 
        role: "user", 
        parts: [{ text: comandoFinal }] // Enviamos as regras e a pergunta juntas como a última mensagem
      }
    ];

    const result = await model.generateContent({
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000, 
      }
    });

    const response = await result.response;
    return response.text();

  } catch (error: any) {
    console.error("Erro Gemini 3 Preview:", error);
    return "Minha querida, tive um probleminha na conexão. Pode repetir a pergunta? 🙏";
  }
};