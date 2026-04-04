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
    /* Centraliza tudo horizontalmente com items-center */
    <div className="min-h-screen bg-dd-bg text-gray-800 font-body flex flex-col items-center">
      
      {currentView !== AppView.WELCOME && (
        <Header currentView={currentView} onChangeView={setCurrentView} />
      )}
      
      {/* MUDANÇA AQUI:
          - max-w-none: No celular não impõe limite fixo além do container
          - md:max-w-6xl: No computador, permite que o conteúdo se espalhe até 1152px
          - w-full: Garante que use todo o espaço disponível
      */}
      <main className={`w-full ${currentView === AppView.WELCOME ? 'max-w-none' : 'max-w-md md:max-w-4xl mx-auto py-6 px-4'}`}>
        {renderContent()}
      </main>
      
    </div>
  );
};

export default App;