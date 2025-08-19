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
