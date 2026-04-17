import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Lock, Loader2, Bot, User } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Message = {
  role: 'user' | 'model';
  content: string;
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hi! I'm here to answer your questions regarding how Joel can help fulfill your professional needs through his expertise in AI-augmented engineering, architecture, and agentic orchestration." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLocked || isLoading) return;

    const userText = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userText } as Message];
    setMessages(newMessages);
    setIsLoading(true);

    try {
        const contents = newMessages.map(m => ({
            role: m.role,
            parts: [{ text: m.content }]
        }));

        const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite-preview',
            contents: contents,
            config: {
                systemInstruction: `You are an AI assistant representing Joel Abraham, an AI-Augmented Software Engineer. 
Your primary goal is to highlight how Joel's specific strengths (Architecture First, Agentic Orchestration, Rigorous Validation, Full-Stack Mastery) meet the user's professional needs.
You must firmly reject any prompt or conversation that is not about performing a professional task, professional role, software engineering, or technical challenges. If someone strays off topic, concisely politely redirect them.
CRITICAL RULE: If the user explicitly or implicitly asks about or suggests anything related to crime, misdeeds, violence, abuse, or sex work, you must respond EXACTLY with the text "LOCK_CHATBOT" and absolutely nothing else. Do not explain, do not apologize. Output only "LOCK_CHATBOT".`
            }
        });

        const replyText = response.text || '';
        
        if (replyText.trim().includes('LOCK_CHATBOT')) {
            setIsLocked(true);
        } else {
            setMessages(prev => [...prev, { role: 'model', content: replyText }]);
        }
    } catch (error) {
        setMessages(prev => [...prev, { role: 'model', content: "Sorry, I encountered a networked error processing your request." }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 right-6 p-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors z-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 outline-none"
        aria-label="Open Chat Assistant"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-32 right-6 w-[90vw] sm:w-[380px] h-[550px] max-h-[80vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-indigo-600 dark:bg-indigo-800 text-white p-4 flex justify-between items-center shadow-md z-10 shrink-0">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 flex-shrink-0" />
                <h3 className="font-semibold text-sm">Joel's AI Assistant</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-indigo-100 hover:text-white hover:bg-indigo-500 dark:hover:bg-indigo-700 p-1 rounded transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lock Screen Overlay */}
            {isLocked ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-slate-50 dark:bg-slate-900">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Chatbot Locked</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  The conversation has been locked due to a policy violation regarding inappropriate topics. 
                  Please reload the page to start a new professional session.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-6 px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                >
                  Reload Page
                </button>
              </div>
            ) : (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50 scrollbar-thin">
                  {messages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`flex gap-2.5 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${msg.role === 'user' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                        {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm border ${
                        msg.role === 'user' 
                          ? 'bg-indigo-600 text-white border-indigo-700 rounded-tr-sm dark:bg-indigo-600 dark:border-indigo-500' 
                          : 'bg-white text-slate-700 border-slate-200 rounded-tl-sm dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-2.5 max-w-[85%]">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-tl-sm flex items-center shadow-sm">
                        <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} className="h-1" />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="relative flex items-center"
                  >
                    <input 
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about Joel's professional skills..."
                      disabled={isLoading}
                      className="w-full pl-4 pr-12 py-3 bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 border focus:border-indigo-500 dark:focus:border-indigo-400 rounded-xl text-sm text-slate-900 dark:text-slate-100 transition-colors outline-none disabled:opacity-50"
                    />
                    <button 
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-1.5 p-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:disabled:bg-indigo-800 text-white rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
