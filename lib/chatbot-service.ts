const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cepa-backend-production.up.railway.app';

export interface ChatMessage {
  id: string;
  message_type: 'user' | 'assistant';
  content: string;
  source_document_name?: string;
  source_document_url?: string;
  source_document_type?: string;
  confidence?: number;
  created_at: string;
}

export interface ChatSession {
  id: string;
  session_title?: string;
  started_at: string;
  last_activity: string;
  is_active: boolean;
  message_count?: number;
  messages?: ChatMessage[];
  created_at: string;
  updated_at: string;
}

export interface ChatQuery {
  query: string;
  session_id?: string;
}

export interface ChatResponse {
  session_id: string;
  user_message_id: string;
  assistant_message_id: string;
  answer: string;
  source_document_name: string;
  source_document_url: string;
  source_document_type: string;
  confidence: number;
  timestamp: string;
}

class ChatbotService {
  private async fetchWithErrorHandling(url: string, options?: RequestInit): Promise<any> {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async sendMessage(query: string, sessionId?: string): Promise<ChatResponse> {
    const payload: ChatQuery = { query };
    if (sessionId) {
      payload.session_id = sessionId;
    }

    return this.fetchWithErrorHandling(`${API_BASE_URL}/chatbot/chat/`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async getSession(sessionId: string): Promise<ChatSession> {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/chatbot/sessions/${sessionId}/`);
  }

  async createSession(): Promise<ChatSession> {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/chatbot/sessions/`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
  }

  async getSessions(): Promise<ChatSession[]> {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/chatbot/sessions/`);
  }

  async updateSession(sessionId: string, data: Partial<ChatSession>): Promise<ChatSession> {
    return this.fetchWithErrorHandling(`${API_BASE_URL}/chatbot/sessions/${sessionId}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.fetchWithErrorHandling(`${API_BASE_URL}/chatbot/sessions/${sessionId}/`, {
      method: 'DELETE',
    });
  }
}

export const chatbotService = new ChatbotService();

