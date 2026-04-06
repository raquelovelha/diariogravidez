import { useRef } from 'react';
import { buscarContextoNoPDF } from '../../services/supabaseService'; // ajuste o caminho conforme necessário

export const usePDFContext = () => {
  const cache = useRef<Record<string, string>>({});

  const getContext = async (query: string) => {
    if (cache.current[query]) return cache.current[query];
    const result = await buscarContextoNoPDF(query);
    if (result) cache.current[query] = result;
    return result;
  };

  return { getContext };
};