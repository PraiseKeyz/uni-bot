'use client';

interface WelcomeMessageProps {
  onStart: () => void;
}

const quickOptions = [
  {
    id: 'admission-requirements',
    title: '📋 Admission Requirements',
    description: 'Learn about entry requirements for your desired course'
  },
  {
    id: 'application-process',
    title: '📝 Application Process',
    description: 'Step-by-step guide to applying to OAU'
  },
  {
    id: 'course-information',
    title: '🎓 Course Information',
    description: 'Explore available courses and their details'
  },
  {
    id: 'campus-life',
    title: '🏫 Campus Life',
    description: 'Discover what life is like at OAU'
  },
  {
    id: 'financial-aid',
    title: '💰 Financial Aid',
    description: 'Scholarships and funding opportunities'
  },
  {
    id: 'general-inquiry',
    title: '❓ General Inquiry',
    description: 'Ask any other questions about OAU'
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
              <span className="text-2xl md:text-3xl lg:text-4xl">🎓</span>
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
                  <div className="text-xl md:text-2xl lg:text-3xl mb-2">{option.title.split(' ')[0]}</div>
                  <div className="font-medium text-gray-800 mb-1 text-sm md:text-base lg:text-lg">
                    {option.title.split(' ').slice(1).join(' ')}
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
