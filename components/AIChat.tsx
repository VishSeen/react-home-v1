import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, X, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { GenerateContentResponse } from '@google/genai';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', role: 'assistant', text: "Welcome. I am the digital concierge for this portfolio. How may I assist you with Mr. Seen's work today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const stream = await sendMessageToGemini(userMsg.text);
      
      const botMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: botMsgId, role: 'assistant', text: '' }]);

      let fullText = '';
      
      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullText += c.text;
          setMessages(prev => 
            prev.map(msg => msg.id === botMsgId ? { ...msg, text: fullText } : msg)
          );
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', text: "I apologize, but I am unable to connect to the service at this moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-6 w-[340px] md:w-[380px] h-[500px] bg-[#F5F5F0]/90 backdrop-blur-xl border border-primary/5 shadow-2xl rounded-sm flex flex-col overflow-hidden animate-scale-reveal">
          {/* Header */}
          <div className="p-5 border-b border-primary/5 flex justify-between items-center bg-white/40">
            <span className="font-serif italic text-lg text-primary">Concierge</span>
            <button onClick={() => setIsOpen(false)} className="text-primary/40 hover:text-primary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`text-[10px] uppercase tracking-widest mb-2 text-secondary/60`}>
                  {msg.role === 'user' ? 'You' : 'Concierge'}
                </div>
                <div className={`max-w-[85%] text-sm leading-7 ${
                  msg.role === 'user' 
                    ? 'text-primary font-medium' 
                    : 'text-secondary font-light'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-1 pl-1">
                 <div className="w-1 h-1 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                 <div className="w-1 h-1 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                 <div className="w-1 h-1 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-5 border-t border-primary/5 bg-white/40">
            <div className="flex gap-2 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your inquiry..."
                className="w-full bg-transparent text-primary text-sm focus:outline-none placeholder:text-primary/20 placeholder:italic placeholder:font-serif"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="text-primary hover:text-accent disabled:opacity-30 transition-colors"
              >
                <Send size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 bg-[#1A1A1A] text-[#F5F5F0] rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-500 shadow-lg"
        >
           <Sparkles size={18} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
};