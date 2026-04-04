import React, { useState } from 'react';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { WelcomeScreen } from './components/WelcomeScreen';
import { JourneyScreen } from './components/JourneyScreen';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.WELCOME);

  const renderContent = () => {
    switch (currentView) {
      case AppView.WELCOME:
        return (
          <WelcomeScreen 
            onStart={() => setCurrentView(AppView.CHAT)} 
            onOpenJourney={() => setCurrentView(AppView.JOURNEY)}
          />
        );
      case AppView.CHAT:
        return <ChatInterface />;
      case AppView.JOURNEY:
        return <JourneyScreen />;
      default:
        return (
          <WelcomeScreen 
            onStart={() => setCurrentView(AppView.CHAT)} 
            onOpenJourney={() => setCurrentView(AppView.JOURNEY)}
          />
        );
    }
  };

  return (
    /* Adicionamos flex e justify-center para que o app fique centralizado no computador */
    <div className="min-h-screen bg-dd-bg text-gray-800 font-body flex flex-col items-center">
      
      {currentView !== AppView.WELCOME && (
        <Header currentView={currentView} onChangeView={setCurrentView} />
      )}
      
      {/* Ajustes abaixo:
        - max-w-md: Limita a largura ao tamanho de um celular (aprox. 450px)
        - w-full: Garante que ele use a largura disponível até o limite acima
        - px-4: Adiciona um respiro nas laterais para não encostar na borda
      */}
      <main className={`w-full max-w-md mx-auto flex-1 ${currentView !== AppView.WELCOME ? 'py-6 px-4' : ''}`}>
        {renderContent()}
      </main>
      
    </div>
  );
};

export default App;