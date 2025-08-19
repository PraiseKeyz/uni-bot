'use client';

import { useState } from 'react';
import Preloader from './components/Preloader';
import ChatInterface from './components/ChatInterface';
import WelcomeMessage from './components/WelcomeMessage';

type AppState = 'preloader' | 'welcome' | 'chat';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('preloader');

  const handlePreloaderComplete = () => {
    setAppState('welcome');
  };

  const handleWelcomeComplete = () => {
    setAppState('chat');
  };

  if (appState === 'preloader') {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  if (appState === 'welcome') {
    return <WelcomeMessage onStart={handleWelcomeComplete} />;
  }

  // Chat state - full screen on mobile, centered with margins on desktop
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Desktop and Tablet: Centered with margins */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <ChatInterface />
          </div>
        </div>
      </div>

      {/* Mobile: Full screen chat */}
      <div className="md:hidden">
        <ChatInterface />
      </div>
    </div>
  );
}
