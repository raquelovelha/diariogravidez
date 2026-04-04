import React from 'react';
import { AppView } from '../types';
import { ArrowRight, BookOpen, UserPlus } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  onOpenJourney: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onOpenJourney }) => {
  return (
    /* Reduzi py-10 para py-6 no computador para ganhar espaço vertical */
    <div className="flex flex-col items-center justify-between min-h-screen px-4 text-center animate-fade-in bg-floral overflow-hidden relative py-6 md:py-8">
      
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-dd-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-dd-accent/20 rounded-full blur-3xl animate-pulse delay-700" />
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-dd-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Conteúdo Principal */}
      <div className="z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-center md:justify-around gap-6 md:gap-10 mt-2 md:mt-0">
        
        {/* LADO ESQUERDO: Título e Nova Imagem */}
        <div className="flex flex-col items-center md:items-start max-w-xl">
          {/* Título: Reduzi md:text-7xl para md:text-6xl e lg para 7xl */}
          <div className="mb-5 md:mb-6 relative text-center md:text-left">
            <h1 className="font-script text-5xl md:text-6xl lg:text-7xl text-dd-dark leading-tight drop-shadow-sm">
              Diário <br />
              <span className="text-4xl md:text-5xl lg:text-6xl">da Minha</span> <br />
              Gravidez
            </h1>
            
            <div className="relative mt-3 inline-block">
              <div className="bg-dd-accent text-white px-5 md:px-6 py-1.5 rounded-sm shadow-md transform -rotate-1 relative z-10">
                <p className="text-[10px] md:text-xs lg:text-sm font-body tracking-wider uppercase font-bold">
                  uma nova história em gestação
                </p>
              </div>
              <div className="absolute -left-3 top-1.5 w-6 h-6 bg-dd-accent/80 transform rotate-45 -z-10" />
              <div className="absolute -right-3 top-1.5 w-6 h-6 bg-dd-accent/80 transform rotate-45 -z-10" />
            </div>
          </div>

          {/* Nova Imagem - Link Atualizado e Tamanho Reduzido */}
          <div className="mb-6 md:mb-0 relative group flex justify-center items-center">
            <img 
              src="https://i.ibb.co/zWsYGh5z/E-book-Diario-da-Minha-Gravidez-P-gina-01-Imagem-0001.jpg" 
              alt="Capa Diário da Minha Gravidez" 
              className="w-40 h-auto md:w-56 lg:w-64 object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl rounded-2xl border-2 border-white/50"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* LADO DIREITO: Card de Botões - Tornando-o mais compacto */}
        <div className="flex flex-col gap-3 w-full max-w-xs md:max-w-[320px] z-20 bg-white/10 md:bg-white/40 md:p-7 md:rounded-[2rem] md:backdrop-blur-md md:shadow-2xl md:border md:border-white/50">
          <h2 className="hidden md:block font-display text-xl text-dd-dark mb-3 font-bold">Olá, mamãe! ✨</h2>
          
          <button 
            onClick={onStart}
            className="group relative inline-flex items-center justify-center gap-2.5 bg-dd-primary text-white py-3 md:py-3.5 rounded-full font-bold text-base shadow-xl hover:bg-dd-primary/90 hover:-translate-y-0.5 transition-all"
          >
            Iniciar Conversa
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={onOpenJourney}
            className="group relative inline-flex items-center justify-center gap-2.5 bg-white/80 backdrop-blur-sm text-dd-primary border-2 border-dd-primary/20 py-3 md:py-3.5 rounded-full font-bold text-base hover:border-dd-primary hover:-translate-y-0.5 transition-all shadow-lg"
          >
            Ver Meu Diário
            <BookOpen size={18} className="group-hover:scale-110 transition-transform" />
          </button>

          <a 
            href="https://mpc.transforme.tech/captura/voluntario/cadastrodeboras"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2.5 bg-dd-accent text-white py-3 md:py-3.5 rounded-full font-bold text-base shadow-xl hover:bg-dd-accent/90 hover:-translate-y-0.5 transition-all"
          >
            Seja uma Débora
            <UserPlus size={18} className="group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>

      {/* Rodapé - Reduzi tamanhos md: */}
      <div className="w-full flex flex-col items-center gap-2 mt-6 md:mt-4">
        <p className="text-[9px] md:text-[10px] text-dd-dark/40 font-body tracking-[0.2em] uppercase">
          Uma iniciativa de:
        </p>
        <div className="flex items-center gap-4 md:gap-6 bg-white/40 backdrop-blur-sm px-5 py-2.5 rounded-2xl border border-white/50">
          <img 
            src="https://www.despertadebora.com.br/wp-content/uploads/cropped-logo-registrado-1-PNG-300x157.png.webp" 
            alt="Logo Desperta Débora" 
            className="h-7 md:h-9 object-contain opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="w-px h-5 md:h-7 bg-dd-dark/10" />
          <img 
            src="https://www.despertadebora.com.br/wp-content/uploads/logo_Logo-P-B-Completa-600x374.png.webp" 
            alt="Logo MPC Brasil" 
            className="h-7 md:h-9 object-contain opacity-80"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
};