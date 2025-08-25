'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSend, FiLoader } from 'react-icons/fi';
import Message from './Message';
import { MessageType, ChatMessage, ChatHistoryResponse, SearchRequest, SearchResponse } from '../types/chat';
import { getDeviceId } from '../utils/auth';

export default function ChatInterface() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://unibot-model.onrender.com';

  // Fetch chat history on component mount
  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatHistory = async () => {
    try {
      const deviceId = getDeviceId();
      
      const response = await fetch(`${API_URL}/api/search/chat/history/${deviceId}?limit=20`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data: ChatHistoryResponse = await response.json();
        
        if (data.chatHistory && data.chatHistory.length > 0) {
          // Convert backend messages to frontend format
          const convertedMessages: MessageType[] = data.chatHistory.map((msg, index) => ({
            id: msg._id || index.toString(),
            type: msg.role === 'user' ? 'user' : 'bot',
            content: msg.content,
            timestamp: new Date(msg.timestamp),
            isLoading: false
          }));
          
          setMessages(convertedMessages);
        } else {
          // No history found, show welcome message
          setMessages([{
            id: '1',
            type: 'bot',
            content: "Hello! I'm **UniBot**, your AI guide to OAU admission. How can I help you today?\n\nFeel free to ask me anything about:\n\n* **Admission requirements** and cut-off marks\n* **Application processes** and deadlines\n* **Available courses** and programs\n* **Campus life** and facilities\n* **Scholarships** and financial aid\n\nI'm here to help you navigate your way to OAU! 🎓",
            timestamp: new Date(),
            isLoading: false
          }]);
        }
      } else {
        // Error fetching history, show welcome message
        setMessages([{
          id: '1',
          type: 'bot',
          content: "Hello! I'm **UniBot**, your AI guide to OAU admission. How can I help you today?\n\nFeel free to ask me anything about:\n\n* **Admission requirements** and cut-off marks\n* **Application processes** and deadlines\n* **Available courses** and programs\n* **Campus life** and facilities\n* **Scholarships** and financial aid\n\nI'm here to help you navigate your way to OAU! 🎓",
          timestamp: new Date(),
          isLoading: false
        }]);
      }
    } catch (error) {
      // Error fetching history, show welcome message
      setMessages([{
        id: '1',
        type: 'bot',
        content: "Hello! I'm **UniBot**, your AI guide to OAU admission. How can I help you today?\n\nFeel free to ask me anything about:\n\n* **Admission requirements** and cut-off marks\n* **Application processes** and deadlines\n* **Available courses** and programs\n* **Campus life** and facilities\n* **Scholarships** and financial aid\n\nI'm here to help you navigate your way to OAU! 🎓",
        timestamp: new Date(),
        isLoading: false
      }]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const deviceId = getDeviceId();
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
      const searchRequest: SearchRequest = {
        query: content.trim(),
        deviceId: deviceId
      };

      const response = await fetch(`${API_URL}/api/search/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchRequest),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data: SearchResponse = await response.json();
      
      // Replace loading message with actual response
      let messageResponse = "I'm sorry, I couldn't process your request. Please try again.";
      
      if (data.success && data.enhancedResponse) {
        const { detailedAnswer, summary } = data.enhancedResponse;
      
        // Use detailedAnswer as the primary response, fallback to summary if detailedAnswer is missing
        messageResponse = detailedAnswer || summary || messageResponse;
      }
      
      setMessages(prev => prev.map(msg => 
        msg.isLoading ? {
          ...msg,
          content: messageResponse,
          isLoading: false
        } : msg
      ));

    } catch (error) {
      // Replace loading message with error response
      setMessages(prev => prev.map(msg => 
        msg.isLoading ? {
          ...msg,
          content: "**Sorry!** I'm experiencing some technical difficulties right now. Please try again in a moment.\n\n**Note:** If this problem persists, please check your internet connection and try again.",
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

  // Show loading state while fetching history
  if (isLoadingHistory) {
    return (
      <div className="md:bg-white md:rounded-2xl md:shadow-xl overflow-hidden h-screen md:h-auto">
        <div className="bg-[#2e2e4c] text-white p-4 md:p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white/30 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9ZM19 9H14V4H5V21H19V9Z"/>
                <path d="M8 12H16V14H8V12ZM8 16H16V18H8V16Z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold">UniBot</h2>
              <p className="text-[#b8b9c5] text-xs md:text-sm">OAU Admission Assistant</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-[calc(100vh-180px)] md:h-[500px] lg:h-96">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 border-2 border-[#2e2e4c] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[#2e2e4c]">Loading chat history...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:bg-white md:rounded-2xl md:shadow-xl overflow-hidden h-screen md:h-auto">
      {/* Chat Header */}
      <div className="bg-[#2e2e4c] text-white p-4 md:p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-white/30 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9ZM19 9H14V4H5V21H19V9Z"/>
              <path d="M8 12H16V14H8V12ZM8 16H16V18H8V16Z"/>
            </svg>
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
                <FiLoader className="w-4 h-4 animate-spin" />
                <span className="hidden md:inline">Sending...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <FiSend className="w-4 h-4" />
                <span className="hidden md:inline">Send</span>
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
