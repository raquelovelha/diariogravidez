import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onChangeView }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-dd-primary/10">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => onChangeView(AppView.WELCOME)}
        >
          {/* Logo Desperta Débora */}
          <div className="bg-white p-1 rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300">
            <img 
              src="https://www.despertadebora.com.br/wp-content/uploads/cropped-logo-registrado-1-PNG-300x157.png.webp" 
              alt="Logo Desperta Débora" 
              className="h-8 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-script text-2xl text-dd-dark leading-none group-hover:text-dd-primary transition-colors">
              Diário da Minha Gravidez
            </h1>
            <p className="text-[10px] text-gray-500 font-body tracking-[0.2em] uppercase mt-0.5">
              Desperta Débora & MPC
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-2 sm:gap-6 text-sm font-body">
          {[
            { id: AppView.JOURNEY, label: 'Diário' },
            { id: AppView.CHAT, label: 'Conversar' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`relative px-2 py-1 transition-colors duration-300 ${
                currentView === item.id 
                  ? 'text-dd-primary font-bold' 
                  : 'text-gray-500 hover:text-dd-primary'
              }`}
            >
              {item.label}
              {currentView === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-dd-primary rounded-full animate-fade-in" />
              )}
            </button>
          ))}
          
          <a 
            href="https://mpc.transforme.tech/captura/voluntario/cadastrodeboras"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 bg-dd-accent/10 text-dd-accent px-3 py-1.5 rounded-full font-bold hover:bg-dd-accent hover:text-white transition-all duration-300"
          >
            Seja uma Débora
          </a>
        </nav>
      </div>
    </header>
  );
};