import React, { useState, useEffect } from 'react'; // Adicionado useEffect
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { WelcomeScreen } from './components/WelcomeScreen';
import { JourneyScreen } from './components/JourneyScreen';
import { AppView } from './types';

// IMPORTAÇÃO DAS LOGOS DOS ASSETS
import appleIcon from './assets/apple-touch-icon.png';
import favicon from './assets/favicon.ico';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.WELCOME);

  // LÓGICA PARA INJETAR OS ÍCONES NO NAVEGADOR
  useEffect(() => {
    // Atualiza o favicon
    const linkFavicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (linkFavicon) {
      linkFavicon.href = favicon;
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = favicon;
      document.head.appendChild(link);
    }

    // Atualiza o ícone do Apple/Celular
    const linkApple = document.querySelector("link[rel~='apple-touch-icon']") as HTMLLinkElement;
    if (linkApple) {
      linkApple.href = appleIcon;
    } else {
      const link = document.createElement('link');
      link.rel = 'apple-touch-icon';
      link.href = appleIcon;
      document.head.appendChild(link);
    }
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