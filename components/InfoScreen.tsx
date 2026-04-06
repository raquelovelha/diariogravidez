import React from 'react';
import { Heart, MessageCircle, ArrowLeft } from 'lucide-react';

// Se você estiver usando abas no App.tsx, receba a função para mudar de aba via props
interface InfoScreenProps {
  setActiveTab?: (tab: string) => void;
}

export const InfoScreen: React.FC<InfoScreenProps> = ({ setActiveTab }) => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-slate-50/30 px-4 pt-8 pb-20 animate-fade-in font-sans">
      {/* Card Principal */}
      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-dd-primary/5 max-w-lg w-full border border-gray-100">
        
        <div className="flex justify-center mb-6">
          <div className="bg-dd-primary/10 p-4 rounded-full">
            <Heart className="text-dd-primary" size={32} fill="currentColor" />
          </div>
        </div>

        <h2 className="font-serif text-3xl text-dd-dark mb-6 text-center italic">
          Sobre o Diário
        </h2>
        
        <div className="space-y-6 text-gray-600 text-base leading-relaxed text-left">
          <p>
            O <strong>Diário da Minha Gravidez</strong> é um movimento do Desperta Débora e MPC para apoiar você em cada passo desta jornada milagrosa.
          </p>
          
          <div className="bg-dd-primary/5 p-4 rounded-2xl border-l-4 border-dd-primary">
            <p className="text-sm italic">
              "Eu te louvo porque me fizeste de modo especial e admirável." 
              <span className="block font-bold mt-1 text-dd-primary">— Salmos 139:14</span>
            </p>
          </div>

          <p>
            Aqui você encontra meditações semanais, dicas de saúde e o apoio da <strong>Mãe Débora</strong>, nossa assistente de fé.
          </p>
        </div>

        {/* Área de Ações e Botões */}
        <div className="flex flex-col gap-3 mt-10">
          <button 
            onClick={() => setActiveTab?.('chat')}
            className="w-full bg-dd-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-dd-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} />
            Conversar com a Mãe Débora
          </button>

          <button 
            onClick={() => setActiveTab?.('home')} // Ou a aba inicial
            className="w-full text-gray-400 text-sm font-medium py-2 flex items-center justify-center gap-1 hover:text-dd-primary transition-colors"
          >
            <ArrowLeft size={14} />
            Voltar para o início
          </button>
        </div>
      </div>
      
      {/* Rodapé informativo */}
      <p className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest text-center">
        Uma iniciativa Desperta Débora & MPC
      </p>
    </div>
  );
};