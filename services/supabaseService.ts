// services/supabaseService.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const hfKey = import.meta.env.VITE_HUGGINGFACE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function buscarContextoNoPDF(pergunta: string): Promise<string> {
  try {
    if (!pergunta || !hfKey) return "";

    const response = await fetch(
      "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
      {
        headers: { 
          Authorization: `Bearer ${hfKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: pergunta }),
      }
    );

    if (!response.ok) return "";

    const embedding = await response.json();
    if (!Array.isArray(embedding)) return "";

    const { data: documents, error } = await supabase.rpc("buscar_trechos_pdf", {
      query_embedding: embedding,
      match_threshold: 0.25,
      match_count: 5,
    });

    if (error) return "";

    return documents?.map((doc: any) => doc.conteudo).join("\n\n") || "";
  } catch (err) {
    console.warn("Busca PDF indisponível:", err);
    return "";
  }
}