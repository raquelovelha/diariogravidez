// backend/server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenAI } from "@google/genai"; // Gemini 3.0

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Inicializa o client Gemini com a chave do .env
const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// Endpoint que o React vai chamar
app.post("/api/chat", async (req, res) => {
  try {
    const { mensagem, contexto } = req.body;

    if (!mensagem) return res.status(400).json({ erro: "Mensagem não enviada" });

    // Monta o conteúdo final: contexto + mensagem do usuário
    const contents = contexto
      ? `Contexto:\n${contexto}\n\nPergunta da usuária: ${mensagem}`
      : mensagem;

    // Chamada Gemini 3.0
    const response = await gemini.models.generateContent({
      model: "gemini-3-flash-preview", // modelo atualizado
      contents,
      temperature: 0.7,
    });

    res.json({ resposta: response.text });

  } catch (err) {
    console.error("Erro Gemini:", err);
    res.status(500).json({ resposta: "Ops! Tive um probleminha técnico 🙏" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend Gemini rodando em http://localhost:${PORT}`));