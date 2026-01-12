import React, { useState, useEffect, useRef } from 'react';

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { role: 'user' as const, text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });

        const data = await res.json();

      if (!res.ok) {
        // Prefer the server-provided error message when available (helps with missing API key etc.)
        const errMsg = data?.error || data?.details || `Server error: ${res.status}`;
        setMessages((m) => [...m, { role: 'assistant', text: `Error: ${errMsg}` }]);
        return;
      }

      const { reply } = data;
      setMessages((m) => [...m, { role: 'assistant', text: reply }]);
    } catch (err) {
      setMessages((m) => [...m, { role: 'assistant', text: 'Sorry — there was an error reaching the AI service.' }]);
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div>
      {/* Floating AI button (full circle) */}
      <div className="fixed bottom-6 right-6 z-50 group">
        {/* Tooltip / summary shown on hover (also available via title for accessibility) */}
        <div className="hidden group-hover:block absolute bottom-full mb-2 right-0 w-max bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-200 px-3 py-2 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
          AI Assistant — Ask about admissions, programs, fees, visiting hours, and policies
        </div>

        <button
          onClick={() => setOpen((s) => !s)}
          aria-label="Open AI assistant — Ask about admissions, programs, fees, visiting hours, and policies"
          title="AI Assistant — Ask about admissions, programs, fees, visiting hours, and policies"
          className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-black dark:bg-black dark:text-white shadow-2xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-black/20 transition"
        >
          {/* Chat bubble icon */}
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M8 10h.01M12 10h.01M16 10h.01" />
          </svg>
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40" 
            onClick={() => setOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-800">
              {messages.length === 0 && (
                <div className="text-sm text-gray-600 dark:text-gray-300">Ask any question about admissions, programs, or visiting the campus.</div>
              )}

              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded-lg px-4 py-2 max-w-[80%] ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'}`}>
                    {m.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="text-sm text-gray-500">AI is typing…</div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-3 items-center">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
                placeholder="Ask the assistant..."
                aria-label="Ask the assistant"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
