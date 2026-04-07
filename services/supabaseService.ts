import { createClient } from '@supabase/supabase-js';
import { HfInference } from '@huggingface/inference';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const hfKey = import.meta.env.VITE_HUGGINGFACE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
const hf = new HfInference(hfKey);

/**
 * Busca trechos do PDF usando Hugging Face para embeddings
 * e Supabase para busca vetorial (RPC).
 */
export async function buscarContextoNoPDF(pergunta: string): Promise<string> {
  try {
    if (!pergunta) return "";

    // 1. Gerar o embedding (vetor) da pergunta via Hugging Face
    // Usamos o modelo 'all-MiniLM-L6-v2' que é leve e preciso
    const embedding = await hf.featureExtraction({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      inputs: pergunta,
    }) as number[];

    // 2. Chamar a função no banco de dados (RPC)
    // Importante: a função deve estar no schema 'public'
    const { data: documents, error } = await supabase.rpc('buscar_trechos_pdf', {
      query_embedding: embedding,
      match_threshold: 0.3, 
      match_count: 8,       
    });

    if (error) {
      console.error("Erro RPC Supabase:", error.message);
      return "";
    }

    if (documents && documents.length > 0) {
      return documents
        .map((doc: any) => doc.conteudo?.trim() || "")
        .filter((text: string) => text.length > 0)
        .join('\n\n');
    }

    return "";
  } catch (err) {
    console.error("Erro crítico na busca (HF + Supabase):", err);
    return "";
  }
}