import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from "../constants";

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
      .filter((m, index) => !(index === 0 && m.role === 'model'));

    // --- LÓGICA DE INTELIGÊNCIA DE FLUXO ---
    const ehPrimeiraMensagem = cleanHistory.length === 0;

    let comandoFinal = "";

    if (ehPrimeiraMensagem) {
      // Se for a primeira vez que ela fala a semana, manda o "Pacote Completo"
      comandoFinal = `[REGRAS E MANUAL]: ${instrucaoCompleta}\n\n[PERGUNTA DA MAMÃE]: ${userMessage}\n\nPor favor, forneça a resposta completa, incluindo a oração da semana mencionada no manual, os 5 pilares e o link de cadastro.`;
    } else {
      // Se já houver conversa, ela entra no "Modo Acolhimento Curto"
      comandoFinal = `[REGRAS E MANUAL]: ${instrucaoCompleta}\n\n[MENSAGEM DA MAMÃE]: ${userMessage}\n\n[INSTRUÇÃO]: Agora estamos em uma conversa contínua. NÃO repita os 5 pilares, NÃO repita o link de cadastro e NÃO repita a oração completa se já foi dita. Seja breve, acolhedora e foque no sentimento atual dela.`;
    }

    const contents = [
      ...cleanHistory.slice(-4),
      { 
        role: "user", 
        parts: [{ text: comandoFinal }] 
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