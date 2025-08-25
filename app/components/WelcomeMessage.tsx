'use client';

import { FiFileText, FiEdit3, FiBookOpen, FiHome, FiDollarSign, FiHelpCircle } from 'react-icons/fi';

interface WelcomeMessageProps {
  onStart: () => void;
}

const quickOptions = [
  {
    id: 'admission-requirements',
    title: 'Admission Requirements',
    description: 'Learn about entry requirements for your desired course',
    icon: FiFileText
  },
  {
    id: 'application-process',
    title: 'Application Process',
    description: 'Step-by-step guide to applying to OAU',
    icon: FiEdit3
  },
  {
    id: 'course-information',
    title: 'Course Information',
    description: 'Explore available courses and their details',
    icon: FiBookOpen
  },
  {
    id: 'campus-life',
    title: 'Campus Life',
    description: 'Discover what life is like at OAU',
    icon: FiHome
  },
  {
    id: 'financial-aid',
    title: 'Financial Aid',
    description: 'Scholarships and funding opportunities',
    icon: FiDollarSign
  },
  {
    id: 'general-inquiry',
    title: 'General Inquiry',
    description: 'Ask any other questions about OAU',
    icon: FiHelpCircle
  }
];

export default function WelcomeMessage({ onStart }: WelcomeMessageProps) {
  const handleQuickOption = (optionId: string) => {
    // This will be handled by the chat interface
    onStart();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-[#2e2e4c] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"/>
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Welcome to UniBot!
            </h2>
            <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
              I'm here to help you navigate your journey to Obafemi Awolowo University (OAU). 
              Whether you're just starting to think about university or you're in the middle of your application, 
              I can provide guidance, answer questions, and help you make informed decisions.
            </p>
          </div>

          <div className="mb-6 md:mb-8">
            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-4 text-center">
              What would you like to know about today?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
              {quickOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleQuickOption(option.id)}
                  className="p-3 md:p-4 lg:p-5 text-left bg-[#f0f1f5] hover:bg-[#e8e9ed] border border-[#d1d3e0] rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105"
                >
                  <div className="text-[#2e2e4c] mb-2">
                    <option.icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                  </div>
                  <div className="font-medium text-gray-800 mb-1 text-sm md:text-base lg:text-lg">
                    {option.title}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base text-gray-600">
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onStart}
              className="w-full md:w-auto px-6 md:px-8 lg:px-10 py-3 md:py-4 bg-[#2e2e4c] text-white font-semibold rounded-xl hover:bg-[#1a1a2e] transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              Start Chatting with UniBot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
