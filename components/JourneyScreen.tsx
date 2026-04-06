// components/JourneyScreen.tsx
import React, { useState } from 'react';
import { WeekInfo, AppView } from '../types';
import { JOURNEY_DATA } from '../constants';
import { BookOpen, X, Heart, MessageCircle } from 'lucide-react';

// --- Função de Formatação Robusta ---
const formatMarkdown = (text: string): string => {
  if (!text) return '';
  // Remove espaços extras e quebras de linha desnecessárias que quebram o layout
  let formatted = text.trim().replace(/\s+/g, ' ');

  return formatted
    .replace(/^>\s?(.*)$/gm, '<blockquote class="border-l-4 border-dd-primary/40 pl-4 italic text-gray-600 my-6 py-2 bg-gray-50">$1</blockquote>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-dd-dark text-xl block mt-8 mb-2">$1</strong>')
    .replace(/\*(.*?)\*/g, '<span class="text-dd-primary font-semibold">$1</span>')
    .split('\n\n')
    .map(para => para.trim() ? `<p class="mb-5 leading-relaxed text-gray-700 text-lg md:text-xl">${para}</p>` : '')
    .join('');
};

const cardBackgrounds = ['bg-dd-accent/20', 'bg-dd-light-yellow', 'bg-dd-light-green', 'bg-dd-secondary/10'];

export const JourneyScreen: React.FC<{ onChangeView?: (view: AppView) => void }> = ({ onChangeView }) => {
  const [selectedWeek, setSelectedWeek] = useState<WeekInfo | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20 animate-fade-in font-body">
      {/* Cabeçalho */}
      <div className="text-center mb-12 pt-6">
        <span className="text-dd-primary font-bold tracking-wider text-xs uppercase tracking-[0.2em]">Acompanhamento Semanal</span>
        <h2 className="font-script text-6xl text-dd-dark mt-2">Diário da Gravidez</h2>
      </div>

      {/* Grid de semanas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {JOURNEY_DATA.map((item, index) => (
          <button
            key={item.week}
            onClick={() => setSelectedWeek(item)}
            className={`${cardBackgrounds[index % 4]} group relative rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all h-52 overflow-hidden flex flex-col justify-between text-left border border-white/50 hover:scale-[1.02]`}
          >
            <div className="flex justify-between items-start">
              <span className="bg-white/90 text-dd-primary text-xs font-bold uppercase px-3 py-1 rounded-lg shadow-sm">
                Semana {item.week}
              </span>
              <Heart size={18} className="text-dd-primary/30 group-hover:text-dd-primary transition-colors" />
            </div>
            <div>
              <h3 className="font-script text-3xl text-dd-dark leading-tight group-hover:text-dd-primary transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-500 font-medium italic">
                <BookOpen size={14} className="text-dd-primary" />
                {item.scripture}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal de conteúdo CORRIGIDO PARA PC */}
      {selectedWeek && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-dd-dark/60 backdrop-blur-sm">
          {/* LARGURA AUMENTADA: md:max-w-4xl (aprox 900px) */}
          <div className="bg-white rounded-[2.5rem] w-full md:max-w-4xl shadow-2xl relative animate-scale-in flex flex-col max-h-[90vh] border border-white/20">
            
            {/* Botão de fechar flutuante mais visível */}
            <button 
              onClick={() => setSelectedWeek(null)} 
              className="absolute top-6 right-6 z-10 p-2 bg-black/10 hover:bg-black/20 rounded-full text-white transition-all"
            >
              <X size={24}/>
            </button>

            {/* Header Laranja com altura generosa no PC */}
            <div className="h-40 md:h-56 bg-gradient-to-br from-dd-primary to-dd-accent flex items-center justify-center px-10 text-center shrink-0">
              <h3 className="font-script text-5xl md:text-7xl text-white drop-shadow-lg">
                {selectedWeek.title}
              </h3>
            </div>

            {/* Conteúdo com margens amplas e texto grande */}
            <div className="p-8 md:p-16 -mt-10 bg-white rounded-t-[3rem] relative shadow-2xl flex flex-col flex-1 overflow-hidden">
              <div className="overflow-y-auto pr-6 custom-scrollbar flex-1">
                <style>{`
                  .drop-cap::first-letter {
                    float: left;
                    font-size: 5.5rem;
                    line-height: 0.7;
                    padding-top: 12px;
                    padding-right: 18px;
                    color: #E67E22;
                    font-family: 'Great Vibes', cursive;
                  }
                  .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                  .custom-scrollbar::-webkit-scrollbar-thumb { background: #E67E22; border-radius: 10px; }
                `}</style>

                <div
                  className="drop-cap text-gray-700 antialiased text-justify md:text-left"
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdown(selectedWeek.fullContent)
                  }}
                />
              </div>

              {/* Ações Inferiores */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center gap-4 shrink-0">
                <button 
                  onClick={() => setSelectedWeek(null)} 
                  className="w-full md:w-2/3 bg-dd-primary text-white py-5 rounded-2xl font-bold text-xl shadow-lg hover:bg-dd-primary/90 transition-all hover:scale-[1.01]"
                >
                  Amém, eu recebo!
                </button>
                <button
                  onClick={() => { setSelectedWeek(null); onChangeView?.(AppView.CHAT); }}
                  className="text-dd-primary font-bold text-base flex items-center justify-center gap-2 hover:underline"
                >
                  <MessageCircle size={22} /> Ficou com dúvida? Pergunte para a Mãe Débora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};