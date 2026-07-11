import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import StarField from '@/components/star-field';
import CustomCursor from '@/components/custom-cursor';

interface Experience {
    id: number;
    role: string;
    company: string | null;
    years: string | null;
    location: string | null;
    description: string[] | null;
    tech: string[] | null;
}

interface ExperienceProps {
    experience?: Experience[];
}

const Experience: React.FC<ExperienceProps> = ({ experience = [] }) => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') setIsDark(false);
        else setIsDark(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    return (
        <div className={`${isDark ? 'text-white' : 'bg-[#fafafa] text-slate-900'} min-h-screen font-sans transition-colors duration-500 selection:bg-emerald-500/30 scroll-smooth pb-32`}>
            <Head title="Experience" />

            <StarField isDark={isDark} />
            <CustomCursor />

            <Link
                href="/"
                className={`fixed top-10 left-10 md:left-24 z-[60] group flex items-center gap-2 text-sm font-bold uppercase tracking-widest rounded p-2 transition-all ${isDark ? 'text-white/50 hover:text-emerald-500 bg-white/5 backdrop-blur-sm' : 'text-slate-400 hover:text-emerald-600 bg-white'}`}
            >
                <svg
                    className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back
            </Link>
            <button
                onClick={toggleTheme}
                className={`fixed top-8 right-10 md:right-24 z-[60] p-3 rounded-full border transition-all hover:scale-110 shadow-xl ${isDark ? 'bg-white/5 border-white/10 text-yellow-400' : 'bg-white border-slate-200 text-slate-700'}`}
            >
                {isDark ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
            </button>

            <main id="home" className="relative z-10 max-w-3xl mx-auto px-10 pt-20 pb-32">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Experience</h1>
                    <p className="text-lg opacity-60 max-w-2xl">
                        A timeline of the roles I've held and the teams I've built with.
                    </p>
                </div>

                <div className="relative border-l border-emerald-500/20 pl-8 space-y-12">
                    {experience.map((exp, i) => (
                        <div key={i} className="group relative">
                            {/* Timeline dot */}
                            <span className="absolute -left-[41px] top-1.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/10 group-hover:scale-125 transition-transform" />

                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                                <span className="text-xs font-mono uppercase tracking-widest opacity-40">
                                    {exp.years || '—'}
                                </span>
                                {exp.location && (
                                    <span className="text-xs font-mono uppercase tracking-widest opacity-40">
                                        {exp.location}
                                    </span>
                                )}
                            </div>
                            <h4 className="mt-2 text-2xl md:text-3xl font-bold leading-tight group-hover:text-emerald-500 transition-colors">
                                {exp.role}
                            </h4>
                            {exp.company && (
                                <p className="text-lg text-emerald-500 font-medium italic mt-1">{exp.company}</p>
                            )}

                            {exp.description && exp.description.length > 0 && (
                                <ul className="mt-4 space-y-2.5">
                                    {exp.description.map((line, idx) => (
                                        <li key={idx} className="flex gap-3 text-base md:text-lg opacity-70 leading-relaxed">
                                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                            <span>{line}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {exp.tech && exp.tech.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {exp.tech.map((t) => (
                                        <span
                                            key={t}
                                            className={`text-xs px-3 py-1 rounded-full border ${isDark ? 'border-white/10 text-white/50' : 'border-slate-200 text-slate-500'}`}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Experience;
