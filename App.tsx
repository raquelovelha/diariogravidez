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
      // AppView.INFO foi removido para focar no conteúdo do Diário.
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
    <div className="min-h-screen bg-dd-bg text-gray-800 font-body">
      {currentView !== AppView.WELCOME && (
        <Header currentView={currentView} onChangeView={setCurrentView} />
      )}
      
      <main className={`container mx-auto ${currentView !== AppView.WELCOME ? 'py-6' : ''}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;