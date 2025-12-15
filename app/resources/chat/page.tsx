'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, Trash2, ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { chatbotService, ChatMessage, ChatResponse, ChatSession } from '@/lib/chatbot-service';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load session if sessionId exists in localStorage
    const savedSessionId = localStorage.getItem('chatbot_session_id');
    if (savedSessionId) {
      loadSession(savedSessionId);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadSession = async (id: string) => {
    try {
      const sessionData = await chatbotService.getSession(id);
      setSession(sessionData);
      setSessionId(id);
      setMessages(sessionData.messages || []);
    } catch (err) {
      console.error('Error loading session:', err);
      // If session doesn't exist, clear it
      localStorage.removeItem('chatbot_session_id');
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);

    // Add user message immediately
    const tempUserMessage: ChatMessage = {
      id: `temp-${Date.now()}`,
      message_type: 'user',
      content: userMessage,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMessage]);
    setLoading(true);

    try {
      const response: ChatResponse = await chatbotService.sendMessage(userMessage, sessionId || undefined);

      // Update session ID if this was a new session
      if (!sessionId) {
        setSessionId(response.session_id);
        localStorage.setItem('chatbot_session_id', response.session_id);
      }

      // Replace temp message with real user message
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== tempUserMessage.id);
        const newMessages = [
          ...filtered,
          {
            id: response.user_message_id,
            message_type: 'user',
            content: userMessage,
            created_at: response.timestamp,
          },
          {
            id: response.assistant_message_id,
            message_type: 'assistant',
            content: response.answer,
            source_document_name: response.source_document_name,
            source_document_url: response.source_document_url,
            source_document_type: response.source_document_type,
            confidence: response.confidence,
            created_at: response.timestamp,
          },
        ];
        // Keep only the latest 5 message pairs (10 messages)
        return newMessages.slice(-10);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      // Remove temp message on error
      setMessages((prev) => prev.filter((m) => m.id !== tempUserMessage.id));
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setSessionId(null);
    setSession(null);
    localStorage.removeItem('chatbot_session_id');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/resources"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#800020] p-3 rounded-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl font-bold text-gray-900">CEPA Assistant</h1>
                  <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-1 rounded">ALPHA</span>
                </div>
                <p className="text-gray-600">Ask me anything about CEPA and parliamentary proceedings in Uganda</p>
              </div>
            </div>
            {messages.length > 0 && (
              <Button
                onClick={handleNewChat}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                New Chat
              </Button>
            )}
          </div>
        </div>

        {/* Alpha Disclaimer Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-1 rounded">ALPHA VERSION</span>
                <p className="text-sm font-medium text-amber-900">This feature is in alpha testing</p>
              </div>
              <p className="text-sm text-amber-800">
                This AI assistant is still under development and may provide inaccurate or incomplete information. 
                Please verify important information from official sources and report any issues you encounter.
              </p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <Card className="shadow-lg">
          <CardContent className="p-0">
            {/* Messages Area */}
            <div className="h-[600px] overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-20">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h2 className="text-xl font-semibold mb-2">Start a conversation</h2>
                  <p className="text-sm max-w-md mx-auto">
                    I can help you find information about CEPA's work, publications, parliamentary proceedings, and more.
                    Try asking me a question!
                  </p>
                  <p className="text-xs text-amber-600 mt-3 font-medium">
                    ⚠️ Alpha Version: Responses may contain errors. Please verify important information.
                  </p>
                  <div className="mt-6 space-y-2">
                    <p className="text-xs text-gray-400 font-medium">SUGGESTED QUESTIONS:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {[
                        "What is CEPA?",
                        "Tell me about parliamentary accountability",
                        "What publications does CEPA have?",
                      ].map((question) => (
                        <button
                          key={question}
                          onClick={() => setInput(question)}
                          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.message_type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg p-4 ${
                      message.message_type === 'user'
                        ? 'bg-[#800020] text-white'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    {message.message_type === 'assistant' && message.source_document_name && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">
                          <span className="font-medium">Source:</span> {message.source_document_name}
                        </p>
                        {message.source_document_url && (
                          <a
                            href={message.source_document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#800020] hover:underline inline-flex items-center gap-1"
                          >
                            View document
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                        {message.confidence && (
                          <p className="text-xs text-gray-400 mt-1">
                            Confidence: {Math.round(message.confidence * 100)}%
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                  <p className="font-medium mb-1">Error</p>
                  <p>{error}</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex gap-3">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleTextareaChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={loading}
                  rows={1}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="bg-[#800020] hover:bg-[#800020]/90 text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

