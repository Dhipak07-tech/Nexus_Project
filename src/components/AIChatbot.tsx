import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export function AIChatbot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: '1', 
      sender: 'ai', 
      text: "Hey there! 👋 I'm Kiru, your friendly IT assistant. How can I help you today? I can check ticket statuses or even create a new one for you!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { 
      id: Date.now().toString(), 
      sender: 'user', 
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // We only keep the last 10 messages for context to avoid huge payloads
    const history = messages.slice(-10);
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage.text, 
          history: history,
          userId: user?.uid || 'anonymous' 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail || data?.error || 'Unknown server error');
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'ai',
        text: data.response || 'I am sorry, I could not process that request.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error: any) {
      console.error('Error fetching AI response:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `⚠️ Error: ${error.message || 'Please try again later.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 bg-white/90 dark:bg-sn-dark/95 backdrop-blur-md rounded-2xl shadow-2xl w-80 sm:w-[400px] flex flex-col border border-white/20 overflow-hidden animate-in slide-in-from-bottom-4 duration-300" style={{ height: '550px' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-sn-green to-emerald-600 text-sn-dark p-5 flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-3">
              <div className="bg-sn-dark/10 p-2 rounded-lg">
                <Bot size={22} className="text-sn-dark" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Kiru AI</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-sn-dark rounded-full animate-pulse" />
                  <span className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Online Assistant</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-1 hover:bg-black/10 rounded-full transition-colors focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 dark:bg-gray-950/50 flex flex-col space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3.5 rounded-2xl text-sm shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-sn-green text-sn-dark font-medium rounded-tr-none' 
                      : 'bg-white dark:bg-gray-800 border border-sn-border text-gray-800 dark:text-gray-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] mt-1 text-muted-foreground font-medium px-1 uppercase">{msg.timestamp}</span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="flex flex-col max-w-[85%] items-start">
                  <div className="p-3.5 rounded-2xl text-sm bg-white dark:bg-gray-800 border border-sn-border text-gray-800 dark:text-gray-200 rounded-tl-none flex items-center space-x-2">
                    <Loader2 size={16} className="animate-spin text-sn-green" />
                    <span className="font-medium">Kiru is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-sn-border bg-white dark:bg-sn-dark/50">
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800/50 border border-sn-border rounded-xl px-2 py-1 focus-within:ring-2 focus-within:ring-sn-green/50 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border-none px-3 py-2 text-sm focus:outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-lg bg-sn-green text-sn-dark hover:brightness-110 disabled:opacity-50 disabled:grayscale transition-all active:scale-95"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[9px] text-center mt-2 text-muted-foreground/60 uppercase font-bold tracking-widest">Powered by Gemini 1.5 Flash</p>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-sn-green text-sn-dark p-4 rounded-2xl shadow-2xl hover:brightness-110 focus:outline-none transform hover:scale-105 transition-all animate-bounce flex items-center space-x-2"
        >
          <MessageSquare size={24} />
          <span className="font-bold text-sm pr-1">Chat with Kiru</span>
        </button>
      )}
    </div>
  );
}

