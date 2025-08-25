'use client';

import { useEffect, useState } from 'react';
import { FiZap } from 'react-icons/fi';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Start progress immediately
    setProgress(1);
    
    // Show text after a short delay
    const textTimer = setTimeout(() => setShowText(true), 500);
    
    // Simulate loading progress
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 15 + 5, 100);
        console.log('Progress:', newProgress); // Debug log
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          // Wait a bit before transitioning
          setTimeout(onComplete, 800);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => {
      clearTimeout(textTimer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-[#2e2e4c] flex items-center justify-center">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="mb-6 md:mb-8 lg:mb-10">
                     <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-[#2e2e4c] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 animate-pulse">
            <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 animate-fade-in">
            UniBot
          </h1>
                     <p className="text-lg md:text-xl lg:text-2xl text-[#b8b9c5] animate-fade-in-delay">
            OAU Admission Assistant
          </p>
        </div>

        {/* Loading Bar */}
        <div className="w-64 md:w-80 lg:w-96 mx-auto mb-6">
          <div className="bg-white/30 rounded-full h-2 md:h-3 overflow-hidden shadow-inner">
            <div 
              className="bg-white h-full rounded-full transition-all duration-300 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center mt-3">
            <span className="text-white text-base md:text-lg font-semibold bg-white/10 px-3 py-1 rounded-full">
            {Math.max(0, Math.min(100, Math.round(progress)))}%
            </span>
          </div>
        </div>

        {/* Loading Text */}
        {showText && (
          <div className="animate-fade-in-up">
                         <p className="text-[#b8b9c5] text-base md:text-lg lg:text-xl mb-2">
              Initializing your admission guide...
            </p>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
