// src/components/Chatbot.tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

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
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // fast, cheap, excellent quality
        messages: [
          {
            role: 'system',
            content: `You are a calm, warm, professional assistant for AMUN Bright Minds Academy.
Reply briefly, clearly, kindly. Use emojis sparingly.
When appropriate, suggest booking a tour or contacting admissions.`,
          },
          ...messages,
          userMessage,
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      const reply = completion.choices[0]?.message?.content?.trim() ||
        "Sorry, I couldn't respond right now. Feel free to message us directly!";

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      console.error('OpenAI error:', err);
      let friendly = "Oops! Something went wrong. You can reach us directly on WhatsApp!";

      if (err?.status === 429) friendly = "High demand — try again in a minute!";
      if (err?.status === 401 || err?.status === 403) friendly = "API key issue — please check configuration.";

      setMessages(prev => [...prev, { role: 'assistant', content: friendly }]);
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
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full 
                   bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700
                   text-gray-700 dark:text-gray-300 shadow-lg hover:shadow-xl
                   transition-all duration-300 flex items-center justify-center"
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="w-7 h-7" strokeWidth={2.2} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.94 }}
            className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-md h-[75vh] max-h-[680px]
                       bg-white dark:bg-gray-950 rounded-3xl shadow-2xl
                       border border-gray-200/60 dark:border-gray-800/60
                       overflow-hidden flex flex-col backdrop-blur-xl"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gray-50/90 dark:bg-gray-900/90 border-b dark:border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  AI Assistant
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  Powered by ChatGPT • Ask anything about admissions
                </p>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 bg-gray-50/40 dark:bg-gray-950/30">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400">
                  <MessageCircle className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-base font-medium">How can I help today?</p>
                  <p className="text-sm mt-2 opacity-70">
                    Ask about admission, programs, tours, fees...
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-[15px] md:text-base leading-relaxed shadow-sm
                      ${msg.role === 'user'
                        ? 'bg-blue-50 text-blue-900 dark:bg-blue-950/60 dark:text-blue-100 rounded-br-none'
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

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                  placeholder="Ask anything..."
                  className="flex-1 px-5 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 
                             rounded-full text-base md:text-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                             placeholder:text-gray-400 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
                             text-white rounded-full transition-all duration-200 shadow-md
                             disabled:opacity-50 disabled:pointer-events-none flex-shrink-0 min-w-14"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Send className="w-6 h-6" strokeWidth={2.4} />
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