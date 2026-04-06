import 'dotenv/config';
import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { pipeline } from '@xenova/transformers';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Inicializa o extrator de embeddings local (baixa o modelo na primeira vez)
let extractor;

async function gerarEmbedding(texto) {
  if (!extractor) {
    extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  
  const output = await extractor(texto, { pooling: 'mean', normalize: true });
  return Array.from(output.data); // Converte para array simples
}

async function extrairTextoPDF(caminho) {
  const data = new Uint8Array(fs.readFileSync(caminho));
  const pdf = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;
  let textoCompleto = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    textoCompleto += content.items.map(item => item.str).join(" ") + " ";
  }
  return textoCompleto;
}

function chunkText(text, size = 600) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size) {
    const chunk = text.slice(i, i + size).trim();
    if (chunk.length > 20) chunks.push(chunk);
  }
  return chunks;
}

async function processar() {
  console.log("🤖 Carregando modelo de IA local (sem APIs externas)...");
  const texto = await extrairTextoPDF("./conteudo_pdf/diario_completo.pdf");
  const chunks = chunkText(texto);
  console.log(`🧩 ${chunks.length} blocos prontos.`);

  for (let i = 0; i < chunks.length; i++) {
    try {
      process.stdout.write(`➡️ Processando ${i + 1}/${chunks.length}... `);
      const embedding = await gerarEmbedding(chunks[i]);

      const { error } = await supabase.from("documentos_pdf").insert({
        conteudo: chunks[i],
        metadados: { origem: "diario", indice: i },
        embedding: embedding,
      });

      if (error) throw error;
      console.log("✅ OK");
    } catch (err) {
      console.error(`❌ Erro no bloco ${i}:`, err.message);
    }
  }
  console.log("\n🎉 MISSÃO CUMPRIDA! Seu banco está abastecido.");
}

processar();