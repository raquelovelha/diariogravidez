import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Busca trechos do PDF baseados em similaridade vetorial.
 * Ajustado para capturar devocionais longos e manter a precisão.
 */
export async function buscarContextoNoPDF(pergunta: string): Promise<string> {
  try {
    // Chamada à função RPC no Supabase
    const { data: documents, error } = await supabase.rpc('buscar_trechos_pdf', {
      input_text: pergunta,
      // Aumentamos para 0.3 para evitar que traga textos de outras semanas
      match_threshold: 0.3, 
      // Aumentamos para 8 trechos para garantir que a reflexão completa seja capturada
      match_count: 8,       
    });

    if (error) {
      console.error("Erro RPC Supabase:", error);
      return "";
    }

    if (documents && documents.length > 0) {
      // Unimos os trechos com quebra de linha dupla para um layout limpo no Diário
      // Removemos o "---" para não poluir o visual do modal
      return documents
        .map((doc: any) => doc.conteudo.trim())
        .join('\n\n');
    }

    return "";
  } catch (error) {
    console.error("Erro na busca do Supabase:", error);
    return "";
  }
}