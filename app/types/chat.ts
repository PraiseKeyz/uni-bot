export interface MessageType {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isLoading: boolean;
}

export interface ConversationHistory {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
  conversationHistory: ConversationHistory[];
}

export interface ChatResponse {
  response: string;
  error?: string;
}

// Backend API Types
export interface ChatMessage {
  _id?: string;
  deviceId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  query?: string;
}

export interface ChatHistoryResponse {
  success: boolean;
  deviceId: string;
  chatHistory: ChatMessage[];
  totalCount: number;
  timestamp: string;
}

export interface SearchRequest {
  query: string;
  deviceId: string;
}

export interface SearchResponse {
  success: boolean;
  enhancedResponse?: {
    detailedAnswer: string;
    summary: string;
  };
  error?: string;
}
