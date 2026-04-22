import React, { useState } from 'react';
import { AppView, WeekInfo } from '../types'; 
import { JOURNEY_DATA } from '../diarioData'; 
import { X, Heart, MessageCircle, BookOpen } from 'lucide-react';

const formatMarkdown = (text: string): string => {
  if (!text) return '';
  return text.trim()
    .replace(/^>\s?(.*)$/gm, '<blockquote class="border-l-4 border-orange-400 pl-6 italic text-gray-600 my-8 py-3 bg-orange-50/40 text-lg md:text-xl rounded-r-lg">$1</blockquote>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-dd-dark text-xl block mt-10 mb-2 uppercase tracking-wide">$1</strong>')
    .replace(/\*(.*?)\*/g, '<span class="text-dd-primary font-semibold">$1</span>')
    .split('\n\n')
    .map(para => para.trim() ? `<p class="mb-5 leading-relaxed text-gray-700 text-lg md:text-xl text-left">${para}</p>` : '')
    .join('');
};

const cardBackgrounds = ['bg-dd-accent/20', 'bg-dd-light-yellow', 'bg-dd-light-green', 'bg-dd-secondary/10'];

export const JourneyScreen: React.FC<{ onChangeView?: (view: AppView) => void }> = ({ onChangeView }) => {
  const [selectedWeek, setSelectedWeek] = useState<WeekInfo | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20 font-body">
      <div className="text-center mb-12 pt-10">
        <span className="text-dd-primary font-bold tracking-[0.2em] text-xs uppercase">Acompanhamento Semanal</span>
        <h2 className="font-script text-6xl text-dd-dark mt-2">Diário da Gravidez</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {JOURNEY_DATA.map((item, index) => (
          <button
            key={item.week}
            onClick={() => setSelectedWeek(item)}
            className={`${cardBackgrounds[index % 4]} group relative rounded-3xl p-6 min-h-[220px] flex flex-col justify-between text-left shadow-sm hover:shadow-xl transition-all border border-white/50`}
          >
            <div className="flex justify-between items-start">
              <span className="bg-white/90 text-dd-primary text-[10px] font-bold uppercase px-2 py-1 rounded-md shadow-sm">
                {typeof item.week === 'number' ? `Semana ${item.week}` : item.week}
              </span>
              <Heart size={18} className="text-dd-primary/30 group-hover:text-dd-primary transition-colors" />
            </div>
            
            <div className="mt-4 flex-1">
              <h3 className="font-script text-3xl text-dd-dark leading-tight group-hover:text-dd-primary transition-colors mb-2">
                {item.title}
              </h3>
              
              <div className="flex items-start gap-2 p-2 bg-white/40 rounded-xl border border-white/20">
                <BookOpen size={14} className="text-dd-primary shrink-0 mt-0.5" />
                <span className="text-xs md:text-[13px] text-dd-dark/70 font-medium leading-snug italic">
                  {item.scripture}
                </span>
              </div>
            </div>

            <div className="mt-4 text-[10px] font-bold text-dd-primary uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
              Clique para ler →
            </div>
          </button>
        ))}
      </div>

      {selectedWeek && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] w-full md:max-w-5xl shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
            <button 
              onClick={() => setSelectedWeek(null)} 
              className="absolute top-6 right-8 z-[110] p-2 bg-black/5 hover:bg-black/10 rounded-full text-gray-400 transition-all"
            >
              <X size={28}/>
            </button>
            
            {/* CABEÇALHO DO MODAL - CORRIGIDO PARA MÁXIMA LEITURA */}
            <div className="h-44 md:h-56 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center shrink-0 px-12 text-center border-b border-orange-200">
              <div className="flex flex-col items-center">
                <span className="text-orange-600/60 uppercase tracking-[0.3em] text-xs font-black mb-3">
                   {typeof selectedWeek.week === 'number' ? `Semana ${selectedWeek.week}` : selectedWeek.week}
                </span>
                <h3 className="font-script text-5xl md:text-7xl text-orange-950 leading-tight">
                  {selectedWeek.title}
                </h3>
                <div className="h-1 w-12 bg-orange-400/30 rounded-full mt-4"></div>
              </div>
            </div>

            <div className="p-8 md:p-16 -mt-10 bg-white rounded-t-[3.5rem] flex flex-col flex-1 overflow-hidden">
              <div className="overflow-y-auto pr-4 flex-1 custom-scrollbar">
                <div 
                  className="max-w-3xl mx-auto w-full antialiased" 
                  dangerouslySetInnerHTML={{ __html: formatMarkdown(selectedWeek.fullContent) }} 
                />
              </div>
              
              <div className="mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-center gap-6 shrink-0">
                <button 
                  onClick={() => setSelectedWeek(null)} 
                  className="w-full md:w-64 bg-orange-500 text-white py-4 rounded-2xl font-bold text-xl shadow-lg hover:bg-orange-600 transition-all active:scale-95"
                >
                  Amém, eu recebo!
                </button>
                <button 
                  onClick={() => { 
                    setSelectedWeek(null); 
                    if (onChangeView) onChangeView(AppView.CHAT); 
                  }} 
                  className="text-orange-600 font-bold flex items-center gap-2 hover:underline text-lg transition-all"
                >
                  <MessageCircle size={24} /> Perguntar para a Mãe Débora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};