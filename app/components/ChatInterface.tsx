'use client';

import { useState, useRef, useEffect } from 'react';
import Message from './Message';
import { MessageType } from '../types/chat';

export default function ChatInterface() {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm UniBot, your AI guide to OAU admission. How can I help you today? Feel free to ask me anything about admission requirements, application processes, courses, campus life, or any other questions you might have!",
      timestamp: new Date(),
      isLoading: false
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: MessageType = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
      isLoading: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Add a loading message from the bot
    const loadingMessage: MessageType = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: '',
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, loadingMessage]);

    try {
      // Simulate API call - replace with actual API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content.trim(),
          conversationHistory: messages.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Replace loading message with actual response
      setMessages(prev => prev.map(msg => 
        msg.isLoading ? {
          ...msg,
          content: data.response || "I'm sorry, I couldn't process your request. Please try again.",
          isLoading: false
        } : msg
      ));

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Replace loading message with error response
      setMessages(prev => prev.map(msg => 
        msg.isLoading ? {
          ...msg,
          content: "I'm sorry, I'm experiencing some technical difficulties right now. Please try again in a moment.",
          isLoading: false
        } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  const quickQuestions = [
    "What are the admission requirements for Medicine?",
    "How do I apply for OAU?",
    "What courses are available?",
    "Tell me about campus life",
    "Are there scholarships available?"
  ];

  return (
    <div className="md:bg-white md:rounded-2xl md:shadow-xl overflow-hidden h-screen md:h-auto">
      {/* Chat Header */}
      <div className="bg-[#2e2e4c] text-white p-4 md:p-6">
        <div className="flex items-center space-x-3">
                     <div className="w-8 h-8 md:w-10 md:h-10 bg-white/30 rounded-full flex items-center justify-center">
            <span className="text-lg md:text-xl">🤖</span>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold">UniBot</h2>
            <p className="text-[#b8b9c5] text-xs md:text-sm">OAU Admission Assistant</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 h-[calc(100vh-180px)] md:h-[500px] lg:h-96">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 md:px-6 pb-4">
          <p className="text-sm text-gray-600 mb-3">Quick questions you might want to ask:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="px-3 py-2 text-sm bg-[#f0f1f5] text-[#2e2e4c] rounded-full hover:bg-[#e8e9ed] transition-colors duration-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="border-t border-gray-200 p-4 md:p-6 bg-white">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about OAU admission..."
                         className="flex-1 px-4 py-3 border border-[#2e2e4c]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2e2e4c]/30 text-[#2e2e4c] focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 md:px-6 py-3 bg-[#2e2e4c] text-white font-semibold rounded-xl hover:bg-[#1a1a2e] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden md:inline">Sending...</span>
              </div>
            ) : (
              <span className="hidden md:inline">Send</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
