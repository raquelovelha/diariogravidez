import React, { useState } from 'react';
import { JOURNEY_DATA } from '../constants';
import { WeekInfo } from '../types';
import { BookOpen, X, Heart, Sparkles, ChevronRight, Download } from 'lucide-react'; // Importar Download

// Helper function to format markdown to HTML (duplicated from ChatInterface for self-containment)
const formatMarkdown = (text: string): string => {
  // Bold: **text** -> <strong>text</strong>
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic: *text* -> <em>$1</em>
  formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Detect URLs and wrap them in <a> tags
  formattedText = formattedText.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-dd-secondary hover:underline">$1</a>');
  return formattedText;
};

const cardBackgrounds = [
  'bg-dd-accent/20',
  'bg-dd-light-yellow',
  'bg-dd-light-green',
  'bg-dd-secondary/10',
];

export const JourneyScreen: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<WeekInfo | null>(null);

  const downloadLink = "https://drive.google.com/file/d/1AhWhQLynPfZpofmY-GIHClL3KoNvoTks/view";

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20 animate-fade-in">
      <div className="text-center mb-12 space-y-3">
        <span className="text-dd-primary font-bold tracking-wider text-xs uppercase">Acompanhamento Semanal</span>
        <h2 className="font-script text-5xl text-dd-dark">Diário da Gravidez</h2>
        <p className="text-gray-500 font-light max-w-md mx-auto">
          Clique na semana correspondente para ver o motivo de oração e o desenvolvimento do bebê.
        </p>
      </div>

      {/* Seção de Download do E-book */}
      <div className="mb-10 text-center">
        <p className="text-gray-600 text-base mb-4 max-w-lg mx-auto">
          Para uma jornada ainda mais completa, baixe a versão integral do Diário da Minha Gravidez em formato E-book.
        </p>
        <a 
          href={downloadLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-dd-primary text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg shadow-dd-primary/30 hover:bg-dd-primary/90 hover:-translate-y-1 transition-all duration-300"
        >
          <Download size={20} />
          Baixar o Diário Completo (E-book)
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {JOURNEY_DATA.map((item, index) => {
          const bgColor = cardBackgrounds[index % cardBackgrounds.length];
          return (
            <button
              key={item.week}
              onClick={() => setSelectedWeek(item)}
              className={`group relative ${bgColor} rounded-2xl p-6 shadow-sm hover:shadow-lg border border-transparent hover:border-dd-primary/40 transition-all duration-300 text-left flex flex-col h-48 overflow-hidden`}
            >
              {/* Background Decorativo - Círculo Orgânico */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-white/30 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-125 group-hover:bg-white/50"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/30 rounded-full -ml-8 transition-transform group-hover:scale-125 group-hover:bg-white/50"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                  <span className="inline-block bg-white/70 text-dd-primary text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-white/50">
                    Semana {item.week}
                  </span>
                  <Heart size={16} className="text-white/60 group-hover:text-dd-accent transition-colors fill-current" />
                </div>
                
                <div className="mt-4">
                  <h3 className="font-script text-2xl text-dd-dark mb-1 leading-none group-hover:text-dd-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-body flex items-center gap-1">
                    <BookOpen size={10} className="text-dd-primary" />
                    {item.scripture}
                  </p>
                </div>

                <div className="mt-auto pt-4 flex items-center text-dd-primary text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Ler Devoção <ChevronRight size={14} />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Modal Overlay */}
      {selectedWeek && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-dd-dark/60 backdrop-blur-sm animate-fade-in overflow-y-auto"> {/* Adicionado overflow-y-auto aqui */}
          <div 
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-scale-in relative border border-white/50 my-8" // Adicionado margin vertical
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal com Imagem/Cor */}
            <div className="h-40 bg-gradient-to-br from-dd-primary to-dd-accent relative flex items-center justify-center bg-pattern-dots">
              <div className="absolute inset-0 bg-dd-primary/10 opacity-20"></div> {/* Subtle overlay */}
              <h3 className="font-script text-5xl text-white drop-shadow-md z-10 text-center px-4 leading-tight">
                {selectedWeek.title}
              </h3>
              <button 
                onClick={() => setSelectedWeek(null)}
                className="absolute top-4 right-4 p-2 bg-white/30 hover:bg-white/50 rounded-full text-white transition-colors backdrop-blur-sm"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 -mt-6 bg-white rounded-t-3xl relative z-20 shadow-lg">
              <div className="text-center mb-6">
                <h3 className="font-script text-4xl text-dd-dark leading-tight">Devocional da Semana {selectedWeek.week}</h3>
                <p className="text-gray-500 text-sm mt-2 font-body">Um momento de conexão e oração pelo seu bebê.</p>
              </div>

              <div className="prose prose-orange mx-auto max-w-none"> {/* Removido max-w-none para usar o estilo padrão */}
                <div 
                  className="bg-dd-bg p-6 rounded-2xl border border-dd-primary/20 shadow-sm mb-6 bg-pattern-lines text-gray-700 leading-relaxed font-body text-base"
                  dangerouslySetInnerHTML={{ __html: formatMarkdown(selectedWeek.fullContent) }}
                />

                <div className="flex justify-center mb-6">
                  <span className="bg-white shadow-sm border border-dd-primary/20 text-dd-primary text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-2">
                    <BookOpen size={12} />
                    Meditação Bíblica: {selectedWeek.scripture}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setSelectedWeek(null)}
                className="w-full mt-8 bg-dd-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-dd-primary/90 transition-colors shadow-lg shadow-dd-primary/30 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Amém, eu recebo!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};