// testModels.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

async function listarModelos() {
  try {
    const modelos = await genAI.listModels();
    console.log("Modelos disponíveis:", modelos);
  } catch (error) {
    console.error("Erro ao listar modelos:", error);
  }
}

listarModelos();