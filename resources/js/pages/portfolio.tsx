import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

interface PortfolioProps {
    status?: string;
}

const Portfolio: React.FC<PortfolioProps> = ({ status = 'Available' }) => {
    // Initialize theme from localStorage or default to dark
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') setIsDark(false);
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        localStorage.setItem('theme', newTheme ? 'light' : 'dark');
    };

    const projects = [
        { title: 'Dealer Management System', type: 'Web App', tech: ['Laravel', 'Vue.js', 'Inertia', 'Tailwind', 'MySQL', 'Firebase'], desc: 'Handles product tracking, sales and reports.' },
        { title: 'DMS POS', type: 'Mobile App', tech: ['React Native', 'Expo Go', 'Firebase', 'JavaScript'], desc: 'Manage sales, product tracking and generate sales records in real-time.' },
        { title: 'DMS Dealer', type: 'Mobile App', tech: ['React Native', 'Expo Go', 'Firebase', 'JavaScript'], desc: 'View sales, stock levels, and purchase records.' },
        { title: 'DMS Stock', type: 'Mobile App', tech: ['React Native', 'Expo Go', 'Firebase', 'JavaScript'], desc: 'View Stock levels.' },
        { title: 'DMS Store', type: 'Mobile App', tech: ['React Native', 'Expo Go', 'Firebase', 'JavaScript'], desc: 'View store orders, credit balance, and place orders.' },
    ];

    const experience = [
        { role: 'FullStack Developer', company: 'RackApp IT Solutions', years: '2023 - 2025' },
        { role: 'Software Engineer', company: 'Quality Cluc Leather Inc', years: '2021 - 2023' },
        { role: 'IT Specialist', company: 'WeDo Inc', years: '2019 - 2021' },
        { role: 'Part-time Web Developer', company: 'Rootplus Technology Services', years: '2015 - 2017' },
    ];

    return (
        <div className={`${isDark ? 'bg-[#050505] text-white' : 'bg-[#fafafa] text-slate-900'} min-h-screen font-sans transition-colors duration-500 selection:bg-emerald-500/30 scroll-smooth pb-32`}>
            <Head title="Marjun Ladag | Portfolio" />

            {/* THEME TOGGLE */}
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

            {/* Vertical Sidebar Decor */}
            <div className={`fixed right-0 top-0 h-full w-16 border-l hidden lg:flex flex-col items-center py-10 z-50 transition-colors ${isDark ? 'border-white/10 bg-[#050505]' : 'border-slate-200 bg-white'}`}>
                <div className={`rotate-90 origin-center whitespace-nowrap tracking-[0.2em] text-sm font-bold uppercase mt-32 ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                    Marjun Ladag — 2026
                </div>
            </div>

            {/* HERO SECTION - REFINED */}
            <main id="home" className="relative max-w-7xl mx-auto px-10 pt-20 pb-32 flex flex-col items-center text-center">
                
                {/* Name & Badge */}
                <div className="mb-8 relative group">
                    {/* Glowing background effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    
                    <div className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 transition-transform duration-500 group-hover:scale-105 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                        <img 
                            src="/MarjunLadag.jpg"// Replace with your actual photo URL
                            alt="Marjun Ladag" 
                            className="w-full h-full object-cover  transition-all duration-700"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-emerald-500 uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-3">
                        FullStack Developer
                    </p>
                    <h2 className={`text-3xl md:text-4xl font-bold tracking-tighter transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Marjun Ladag
                    </h2>
                </div>

                {/* Full Width Description */}
                <div className="max-w-4xl">
                    <p className={`text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        I build high-performance web and mobile apps with Laravel and React Native, turning complex logic into world-class user experiences.
                    </p>
                </div>

                {/* Primary CTA */}
                <div className="flex flex-col items-center gap-8">

                    {/* Links Below CTA */}
                  <div className="flex gap-10 items-center justify-center">
                        {[
                            { 
                                label: 'GitHub', 
                                url: 'https://github.com/midorima09', 
                                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> 
                            },
                            { 
                                label: 'LinkedIn', 
                                url: 'https://www.linkedin.com/in/marjun-ladag-44a178182/', 
                                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> 
                            },{ 
                                label: 'Facebook', 
                                url: 'https://www.facebook.com/ladagmarjun/', 
                                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> 
                            }
                        ].map((link) => (
                            <a 
                                key={link.label} 
                                href={link.url} 
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.label}
                                className={`transition-all duration-300 hover:scale-125 hover:text-emerald-500 ${isDark ? 'text-white/40' : 'text-slate-400'}`}
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </main>

            {/* EXPERIENCE & PROJECTS COMBINED */}
            <section id="work" className={`max-w-7xl mx-auto px-10 py-24 border-t transition-colors ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                <div className="grid lg:grid-cols-2 gap-20">
                    {/* Experience Column */}
                    <div>
                        <h2 className="text-2xl font-bold mb-12 tracking-tight flex items-center gap-3">
                            <span className="text-emerald-500">/</span> Experience
                        </h2>
                        <div className="space-y-10">
                            {experience.map((exp, i) => (
                                <div key={i} className="group relative pl-8 border-l border-emerald-500/20">
                                    <div className="absolute w-2 h-2 bg-emerald-500 rounded-full -left-[5px] top-2 group-hover:scale-150 transition-transform"></div>
                                    <h4 className="text-xl font-bold">{exp.role}</h4>
                                    <p className="text-emerald-500 font-medium mb-2">{exp.company}</p>
                                    <span className="text-[10px] uppercase tracking-widest opacity-50">{exp.years}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Apps & Web Column */}
                    <div>
                        <h2 className="text-2xl font-bold mb-12 tracking-tight flex items-center gap-3">
                            <span className="text-emerald-500">/</span> Recent Projects
                        </h2>
                        <div className="grid gap-6">
                            {projects.map((project, i) => (
                                <div key={i} className={`p-6 rounded-2xl border transition-all group ${isDark ? 'bg-white/5 border-white/5 hover:border-emerald-500/50' : 'bg-white border-slate-200 shadow-sm hover:border-emerald-500/50'}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] uppercase font-bold text-emerald-500">{project.type}</span>
                                        <div className="flex gap-2">
                                            {project.tech.map(t => <span key={t} className="text-[12px] opacity-40">{t}</span>)}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-500 transition-colors">{project.title}</h3>
                                    <p className={`text-sm opacity-60`}>{project.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* SKILLS SECTION */}
            <section id="skills" className={`max-w-7xl mx-auto px-10 py-24 border-t transition-colors ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Skills</h2>
                    <p className={`text-[10px] uppercase tracking-[0.3em] font-bold ${isDark ? 'text-emerald-500/60' : 'text-emerald-600'}`}>
                        My Technical Expertise & Stack
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {[
                        { 
                            name: 'Laravel', 
                            color: 'group-hover:border-red-500/50 group-hover:bg-red-500/5', 
                            src: '/skillslogo/laravel.png' 
                        },
                        { 
                            name: 'Vue.js', 
                            color: 'group-hover:border-emerald-500/50 group-hover:bg-emerald-500/5', 
                            src: '/skillslogo/vue.png' 
                        },
                        { 
                            name: 'Firebase', 
                            color: 'group-hover:border-orange-500/50 group-hover:bg-orange-500/5', 
                            src: '/skillslogo/firebase.png' 
                        },
                        { 
                            name: 'React', 
                            color: 'group-hover:border-cyan-400/50 group-hover:bg-cyan-400/5', 
                            src: '/skillslogo/react.png' 
                        },
                        { 
                            name: 'Tailwind', 
                            color: 'group-hover:border-sky-400/50 group-hover:bg-sky-400/5', 
                            src: '/skillslogo/tailwindcsslogo.png' 
                        },
                        { 
                            name: 'MySQL', 
                            color: 'group-hover:border-blue-400/50 group-hover:bg-blue-400/5', 
                            src: '/skillslogo/mysql.png' 
                        },
                        { 
                            name: 'ASP.NET', 
                            color: 'group-hover:border-purple-400/50 group-hover:bg-purple-400/5', 
                            src: '/skillslogo/asp-net.png' 
                        },
                        { 
                            name: 'Expo', 
                            color: 'group-hover:border-slate-400/50 group-hover:bg-slate-400/5', 
                            src: '/skillslogo/logo-expo-light.png',
                            srcLight: '/skillslogo/logo-expo.png'
                        },
                    ].map((skill) => {
                        const displayImage = (isDark || !skill.srcLight) ? skill.src : skill.srcLight;

                        return (
                            <div 
                                key={skill.name} 
                                className={`group relative p-10 rounded-3xl border transition-all duration-500 flex flex-col items-center justify-center gap-6 ${skill.color} ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}
                            >
                                <div className="w-12 h-12 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                                    <img 
                                        src={displayImage}
                                        alt={skill.name}
                                        className={`w-full h-full object-contain transition-all duration-500 ${isDark ? 'opacity-50 group-hover:opacity-100 grayscale group-hover:grayscale-0' : 'opacity-90 group-hover:opacity-100'}`}
                                        onError={(e) => {
                                            e.currentTarget.src = "https://via.placeholder.com/100?text=Logo";
                                        }}
                                    />
                                </div>
                                
                                <span className={`text-[11px] font-black tracking-[0.2em] uppercase transition-colors ${isDark ? 'text-white/20 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-900'}`}>
                                    {skill.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* FLOATING DOCK */}
            <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 border px-2 py-2 rounded-full flex items-center gap-1 z-50 shadow-2xl transition-all ${isDark ? 'bg-[#111111]/80 backdrop-blur-xl border-white/10' : 'bg-white/80 backdrop-blur-xl border-slate-200'}`}>
                {['Home', 'Work', 'skills'].map((item) => (
                    <a 
                        key={item} 
                        href={`#${item.toLowerCase()}`} 
                        className={`px-5 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition hover:bg-emerald-500/10 hover:text-emerald-500 ${isDark ? 'text-white' : 'text-slate-900'}`}
                    >
                        {item}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;