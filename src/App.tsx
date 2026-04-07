import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { WelcomeScreen } from './components/WelcomeScreen';
import { JourneyScreen } from './components/JourneyScreen';
import { InfoScreen } from './components/InfoScreen'; 
import { AppView } from './types';

// Ajuste para buscar assets que estão fora da pasta src
import appleIcon from '../assets/apple-touch-icon.png';
import favicon from '../assets/favicon.ico';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.WELCOME);

  useEffect(() => {
    const linkFavicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (linkFavicon) linkFavicon.href = favicon;
    const linkApple = document.querySelector("link[rel~='apple-touch-icon']") as HTMLLinkElement;
    if (linkApple) linkApple.href = appleIcon;
  }, []);

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
        return <JourneyScreen onChangeView={(view) => setCurrentView(view)} />;
      case AppView.INFO: 
        return <InfoScreen setActiveTab={(tab) => setCurrentView(tab as AppView)} />;
      default:
        return <WelcomeScreen onStart={() => setCurrentView(AppView.CHAT)} onOpenJourney={() => setCurrentView(AppView.JOURNEY)} />;
    }
  };

  return (
    <div className="min-h-screen bg-dd-bg text-gray-800 font-body flex flex-col items-center">
      {currentView !== AppView.WELCOME && (
        <Header currentView={currentView} onChangeView={setCurrentView} />
      )}
      <main className={`w-full ${currentView === AppView.WELCOME ? 'max-w-none' : 'max-w-md md:max-w-4xl mx-auto py-6 px-4'}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;