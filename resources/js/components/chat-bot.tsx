import React, { useState, useRef, useEffect } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatBotProps {
    isDark: boolean;
}

export default function ChatBot({ isDark }: ChatBotProps) {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hey! I'm Marjun's AI assistant, feel free to ask me anything about Marjun 😊" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, open]);

    const getCsrfToken = () => {
        return (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '';
    };

    const send = async () => {
        const text = input.trim();
        if (!text || loading) return;

        const userMsg: Message = { role: 'user', content: text };
        const history = messages.filter(m => m.role !== 'assistant' || messages.indexOf(m) > 0);

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    message: text,
                    history: history.map(m => ({ role: m.role, content: m.content })),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error ?? 'Something went wrong');
            }

            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
            setMessages(prev => [...prev, { role: 'assistant', content: message }]);
        } finally {
            setLoading(false);
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };

    return (
        <>
            {/* Floating button */}
            <button
                onClick={() => setOpen(o => !o)}
                aria-label="Open AI chat"
                className={`fixed bottom-28 right-6 md:right-10 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 border
                    ${isDark
                        ? 'bg-emerald-500 border-emerald-400 text-white hover:bg-emerald-400'
                        : 'bg-emerald-500 border-emerald-400 text-white hover:bg-emerald-600'
                    }`}
            >
                {open ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    /* Robot icon */
                    <svg className="w-7 h-7" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <rect x="16" y="20" width="32" height="26" rx="5" fill="white" opacity="0.95"/>
                        <rect x="22" y="28" width="8" height="8" rx="2" fill="#10b981"/>
                        <rect x="34" y="28" width="8" height="8" rx="2" fill="#10b981"/>
                        <rect x="26" y="40" width="12" height="3" rx="1.5" fill="#10b981"/>
                        <rect x="30" y="12" width="4" height="8" rx="2" fill="white" opacity="0.95"/>
                        <circle cx="32" cy="11" r="3" fill="white" opacity="0.95"/>
                        <rect x="6" y="28" width="6" height="10" rx="3" fill="white" opacity="0.8"/>
                        <rect x="52" y="28" width="6" height="10" rx="3" fill="white" opacity="0.8"/>
                    </svg>
                )}
            </button>

            {/* Chat window */}
            {open && (
                <div
                    className={`fixed bottom-48 right-6 md:right-10 z-[60] w-[340px] sm:w-[380px] rounded-2xl border shadow-2xl flex flex-col overflow-hidden transition-all duration-300
                        ${isDark
                            ? 'bg-[#111111] border-white/10'
                            : 'bg-white border-slate-200'
                        }`}
                    style={{ maxHeight: '480px' }}
                >
                    {/* Header */}
                    <div className={`flex items-center gap-3 px-4 py-3 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                        <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6" viewBox="0 0 64 64" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <rect x="16" y="20" width="32" height="26" rx="5" fill="white" opacity="0.95"/>
                                <rect x="22" y="28" width="8" height="8" rx="2" fill="#10b981"/>
                                <rect x="34" y="28" width="8" height="8" rx="2" fill="#10b981"/>
                                <rect x="26" y="40" width="12" height="3" rx="1.5" fill="#10b981"/>
                                <rect x="30" y="12" width="4" height="8" rx="2" fill="white" opacity="0.95"/>
                                <circle cx="32" cy="11" r="3" fill="white" opacity="0.95"/>
                                <rect x="6" y="28" width="6" height="10" rx="3" fill="white" opacity="0.8"/>
                                <rect x="52" y="28" width="6" height="10" rx="3" fill="white" opacity="0.8"/>
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-bold">Marjun's Assistant</p>
                        </div>
                        <div className="ml-auto flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className={`text-[10px] ${isDark ? 'text-white/40' : 'text-slate-400'}`}>Online</span>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: '280px', maxHeight: '320px' }}>
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed
                                        ${msg.role === 'user'
                                            ? 'bg-emerald-500 text-white rounded-br-sm'
                                            : isDark
                                                ? 'bg-white/10 text-white/90 rounded-bl-sm'
                                                : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className={`rounded-2xl rounded-bl-sm px-4 py-3 ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
                                    <div className="flex gap-1 items-center h-4">
                                        <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-white/40' : 'bg-slate-400'}`} style={{ animationDelay: '0ms' }} />
                                        <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-white/40' : 'bg-slate-400'}`} style={{ animationDelay: '150ms' }} />
                                        <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-white/40' : 'bg-slate-400'}`} style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div className={`px-3 py-3 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                        <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition-colors
                            ${isDark
                                ? 'bg-white/5 border-white/10 focus-within:border-emerald-500/50'
                                : 'bg-slate-50 border-slate-200 focus-within:border-emerald-500/50'
                            }`}>
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={onKeyDown}
                                placeholder="Ask me anything..."
                                maxLength={1000}
                                className={`flex-1 bg-transparent text-sm outline-none placeholder:opacity-40
                                    ${isDark ? 'text-white' : 'text-slate-900'}`}
                            />
                            <button
                                onClick={send}
                                disabled={!input.trim() || loading}
                                className="text-emerald-500 hover:text-emerald-400 disabled:opacity-30 transition-colors shrink-0"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
