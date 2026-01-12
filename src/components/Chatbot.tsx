// src/components/Chatbot.tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
          maxOutputTokens: 320,
          temperature: 0.75,
        },
        systemInstruction: `You are a calm, warm and professional assistant for AMUN Bright Minds Academy. 
Answer briefly, clearly, kindly. Use emojis sparingly. 
When appropriate suggest booking a tour or contacting admissions.`,
      });

      const chat = model.startChat({
        history: messages.map((msg) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
      });

      const result = await chat.sendMessage(input.trim());
      const reply = result.response.text().trim() || 
        "I'm having trouble responding right now… Please try again or reach out to us directly! 😊";

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      console.error('Gemini error:', err);
      
      let friendlyMessage = "Oops! Something went wrong. Feel free to message us directly ❤️";
      
      if (err?.status === 429 || err?.message?.includes('quota')) {
        friendlyMessage = "Too many requests right now — let's try again in a minute! ⏳";
      } else if (err?.status === 401 || err?.status === 403) {
        friendlyMessage = "Authentication issue — please check your API key configuration.";
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: friendlyMessage },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Bubble */}
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full 
                   bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900
                   backdrop-blur-md border border-white/30 dark:border-gray-700/50
                   shadow-[0_8px_32px_-8px_rgba(59,130,246,0.4)]
                   flex items-center justify-center transition-all duration-300"
        aria-label="Open school assistant"
      >
        <MessageCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" strokeWidth={2.2} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed bottom-28 right-6 z-50 w-[min(92vw,420px)] h-[min(80vh,680px)]
                       bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl
                       rounded-3xl shadow-2xl border border-gray-200/40 dark:border-gray-800/40
                       overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/60 dark:from-gray-900 dark:to-gray-950
                            border-b border-gray-200/60 dark:border-gray-800/60 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg tracking-tight">
                  AMUN Assistant
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  Ask anything about admissions, programs & tours
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 bg-gradient-to-b from-transparent to-gray-50/40 dark:to-gray-950/30">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400">
                  <MessageCircle className="w-12 h-12 mb-4 opacity-40" />
                  <p className="text-sm">How can I help you today?</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm
                      ${msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
                      }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-gray-950/60 backdrop-blur-sm">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                  placeholder="Ask anything..."
                  className="flex-1 px-5 py-3.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 
                             rounded-full text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30
                             placeholder:text-gray-400 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
                             text-white rounded-full transition-all duration-200 shadow-md
                             disabled:opacity-50 disabled:pointer-events-none flex-shrink-0"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" strokeWidth={2.4} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}