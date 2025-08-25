'use client';

import { MessageType } from '../types/chat';
import { createFormattedMessage } from '../utils/formatResponse';
import { FiUser, FiMessageSquare } from 'react-icons/fi';

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (message.isLoading) {
    return (
      <div className="flex items-start space-x-2 md:space-x-3 lg:space-x-4">
        <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-[#2e2e4c] rounded-full flex items-center justify-center flex-shrink-0">
          <FiMessageSquare className="text-white w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
        </div>
        <div className="flex-1">
          <div className="bg-gray-100 rounded-2xl rounded-tl-md px-3 md:px-4 lg:px-5 py-2 md:py-3 lg:py-4 max-w-[280px] md:max-w-md lg:max-w-lg">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1 ml-1">
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    );
  }

  if (message.type === 'user') {
    return (
      <div className="flex items-start space-x-2 md:space-x-3 lg:space-x-4 justify-end">
        <div className="flex-1 max-w-[280px] md:max-w-md lg:max-w-lg">
          <div className="bg-[#2e2e4c] text-white rounded-2xl rounded-tr-md px-3 md:px-4 lg:px-5 py-2 md:py-3 lg:py-4">
            <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
          </div>
          <div className="text-xs text-gray-500 mt-1 mr-1 text-right">
            {formatTime(message.timestamp)}
          </div>
        </div>
        <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-[#2e2e4c] rounded-full flex items-center justify-center flex-shrink-0">
          <FiUser className="text-white w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
        </div>
      </div>
    );
  }

  // Bot message with formatting
  return (
    <div className="flex items-start space-x-2 md:space-x-3 lg:space-x-4">
      <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-[#2e2e4c] rounded-full flex items-center justify-center flex-shrink-0">
        <FiMessageSquare className="text-white w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
      </div>
      <div className="flex-1 max-w-[280px] md:max-w-md lg:max-w-lg">
        <div className="bg-gray-100 rounded-2xl rounded-tl-md px-3 md:px-4 lg:px-5 py-2 md:py-3 lg:py-4">
          {createFormattedMessage(message.content)}
        </div>
        <div className="text-xs text-gray-500 mt-1 ml-1">
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
}
