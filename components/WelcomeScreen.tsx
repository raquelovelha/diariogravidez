import React from 'react';
import { AppView } from '../types';
import { ArrowRight, BookOpen, Heart, UserPlus } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  onOpenJourney: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onOpenJourney }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center animate-fade-in bg-floral overflow-hidden relative">
      {/* Decorative Flowers (Simulated with divs) */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-dd-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-dd-accent/20 rounded-full blur-3xl animate-pulse delay-700" />
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-dd-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Main Content Card */}
      <div className="z-10 w-full max-w-lg flex flex-col items-center">
        {/* Title Section */}
        <div className="mb-12 relative">
          <h1 className="font-script text-7xl md:text-8xl text-dd-dark leading-tight drop-shadow-sm">
            Diário <br />
            <span className="text-6xl md:text-7xl">da Minha</span> <br />
            Gravidez
          </h1>
          
          {/* Ribbon Subtitle */}
          <div className="relative mt-4 inline-block">
            <div className="bg-dd-accent text-white px-8 py-2 rounded-sm shadow-md transform -rotate-1 relative z-10">
              <p className="text-sm md:text-base font-body tracking-wider uppercase font-bold">
                uma nova história em gestação
              </p>
            </div>
            {/* Ribbon Tails */}
            <div className="absolute -left-4 top-2 w-8 h-8 bg-dd-accent/80 transform rotate-45 -z-10" />
            <div className="absolute -right-4 top-2 w-8 h-8 bg-dd-accent/80 transform rotate-45 -z-10" />
          </div>
        </div>

        {/* Central Illustration Placeholder (Stylized Woman) */}
        <div className="mb-12 relative group">
          <div className="w-48 h-64 bg-dd-secondary rounded-t-full rounded-b-3xl relative overflow-hidden shadow-2xl border-4 border-white/50 transform group-hover:scale-105 transition-transform duration-500">
            {/* Simple face/hair representation */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-[#5D4037]" /> {/* Hair */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#FFCCBC] rounded-full" /> {/* Face */}
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-dd-secondary flex items-center justify-center">
              {/* Belly bump */}
              <div className="w-32 h-32 bg-black/10 rounded-full border-t-2 border-white/20 mt-8" />
            </div>
          </div>
          
          {/* Floating Hearts */}
          <div className="absolute -top-4 -right-4 animate-bounce">
            <Heart size={32} className="text-dd-accent fill-dd-accent" />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button 
            onClick={onStart}
            className="group relative inline-flex items-center justify-center gap-3 bg-dd-primary text-white py-4 rounded-full font-bold text-lg shadow-xl hover:bg-dd-primary/90 hover:-translate-y-1 transition-all duration-300"
          >
            Iniciar Conversa
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={onOpenJourney}
            className="group relative inline-flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm text-dd-primary border-2 border-dd-primary/20 py-4 rounded-full font-bold text-lg hover:bg-white hover:border-dd-primary hover:-translate-y-1 transition-all duration-300 shadow-lg"
          >
            Ver Meu Diário
            <BookOpen size={20} className="group-hover:scale-110 transition-transform" />
          </button>

          <a 
            href="https://mpc.transforme.tech/captura/voluntario/cadastrodeboras"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 bg-dd-accent text-white py-4 rounded-full font-bold text-lg shadow-xl hover:bg-dd-accent/90 hover:-translate-y-1 transition-all duration-300"
          >
            Seja uma Débora
            <UserPlus size={20} className="group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>

      {/* Footer Branding - Iniciativa */}
      <div className="absolute bottom-6 flex flex-col items-center gap-3">
        <p className="text-[10px] text-dd-dark/40 font-body tracking-[0.2em] uppercase">
          Uma iniciativa de:
        </p>
        <div className="flex items-center gap-6 bg-white/30 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/50">
          <img 
            src="https://www.despertadebora.com.br/wp-content/uploads/cropped-logo-registrado-1-PNG-300x157.png.webp" 
            alt="Logo Desperta Débora" 
            className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity"
            referrerPolicy="no-referrer"
          />
          <div className="w-px h-6 bg-dd-dark/10" />
          <img 
            src="https://www.despertadebora.com.br/wp-content/uploads/logo_Logo-P-B-Completa-600x374.png.webp" 
            alt="Logo MPC Brasil" 
            className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
};