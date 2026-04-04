import React from 'react';

export const InfoScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center animate-fade-in">
      <h2 className="font-script text-4xl text-dd-dark mb-4">Informações do Projeto</h2>
      <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto font-body">
        Aqui você encontraria mais detalhes sobre o "Projeto Gestantes" e o movimento Desperta Débora.
        Esta tela está em desenvolvimento.
      </p>
    </div>
  );
};