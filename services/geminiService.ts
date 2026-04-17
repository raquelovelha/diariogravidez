import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from "../constants";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Definimos um tipo para o retorno organizado
interface GeminiResponse {
  texto: string;
  sugestoes: string[];
}

export const sendMessageToGemini = async (
  history: any[], 
  userMessage: string, 
  contextoSemana?: string
): Promise<GeminiResponse> => {
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

    const ehPrimeiraMensagem = cleanHistory.length === 0;

    // Comando para forçar a IA a gerar as sugestões no final
    const formatoSugestoes = `\n\n[IMPORTANTE]: Ao final da resposta, adicione uma linha EXATAMENTE assim: "SUGESTOES: sugestao1, sugestao2, sugestao3". Crie 3 sugestões curtas (máximo 4 palavras) baseadas no contexto atual.`;

    let comandoFinal = "";

    if (ehPrimeiraMensagem) {
      comandoFinal = `[REGRAS E MANUAL]: ${instrucaoCompleta}${formatoSugestoes}\n\n[PERGUNTA DA MAMÃE]: ${userMessage}\n\nForneça a resposta completa do manual.`;
    } else {
      comandoFinal = `[REGRAS E MANUAL]: ${instrucaoCompleta}${formatoSugestoes}\n\n[MENSAGEM DA MAMÃE]: ${userMessage}\n\n[INSTRUÇÃO]: Modo conversa curta. Não repita o manual. Foque no acolhimento e sentimentos.`;
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

    const fullResponse = result.response.text();

    // --- LÓGICA DE SEPARAÇÃO ---
    // Procuramos a palavra-chave SUGESTOES: para dividir o texto
    const parts = fullResponse.split(/SUGESTOES:/i);
    const textoLimpo = parts[0].trim();
    const sugestoesRaw = parts[1] ? parts[1].split(",") : [];
    
    // Limpamos espaços e pontos finais das sugestões
    const sugestoesFormatadas = sugestoesRaw
      .map(s => s.trim().replace(/\.$/, ""))
      .filter(s => s.length > 0)
      .slice(0, 3); // Garantimos apenas 3

    return {
      texto: textoLimpo,
      sugestoes: sugestoesFormatadas
    };

  } catch (error: any) {
    console.error("Erro Gemini 3 Preview:", error);
    return {
      texto: "Minha querida, tive um probleminha na conexão. Pode repetir a pergunta? 🙏",
      sugestoes: ["Tentar novamente", "Oração da semana", "Falar com suporte"]
    };
  }
};