import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import ChatBot from '@/components/chat-bot';
import StarField from '@/components/star-field';


interface Project {
    id: number;
    link: string | null;
    year: number | null;
    title: string;
    type: string | null;
    tech: string[] | null;
    description: string | null;
}

interface Experience {
    id: number;
    role: string;
    company: string | null;
    years: string | null;
}

interface Skill {
    id: number;
    name: string;
    color: string | null;
    src: string | null;
    src_light: string | null;
}

interface PortfolioProps {
    projects?: Project[];
    experience?: Experience[];
    skills?: Skill[];
}

const Portfolio: React.FC<PortfolioProps> = ({ projects = [], experience = [], skills = [] }) => {
    // Initialize theme from localStorage or default to dark
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
            <Head />

            {/* BACKGROUND */}
            <StarField isDark={isDark} />

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
            {/* <div className={`fixed right-0 top-0 h-full w-16 border-l hidden lg:flex flex-col items-center py-10 z-50 transition-colors ${isDark ? 'border-white/10 bg-[#050505]' : 'border-slate-200 bg-white'}`}>
                <div className={`rotate-90 origin-center whitespace-nowrap tracking-[0.2em] text-sm font-bold uppercase mt-32 ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                    Marjun Ladag — 2026
                </div>
            </div> */}

            {/* HERO SECTION - REFINED */}
            <main id="home" className="relative z-10 max-w-7xl mx-auto px-10 pt-20 pb-32 flex flex-col items-center text-center">
                
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
                    <h2 className={`text-3xl md:text-4xl font-bold tracking-tighter transition-colors ${isDark ? 'text-white drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'text-slate-900'}`}>
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
                                url: 'https://github.com/ladagmarjun',
                                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            },
                            {
                                label: 'LinkedIn',
                                url: 'https://www.linkedin.com/in/marjun-ladag-44a178182/',
                                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            },
                            {
                                label: 'WhatsApp',
                                url: 'https://wa.me/639358123724',
                                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            },
                            {
                                label: 'Viber',
                                url: 'viber://chat?number=639915682108',
                                icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.398.002C9.473.028 5.082.344 2.988 2.234 1.358 3.862.808 6.25.748 9.15c-.06 2.9-.13 8.332 5.098 9.85h.005l-.005 2.26s-.033.87.54 1.046c.694.21 1.1-.447 1.763-1.163.364-.393.866-.971 1.245-1.41 3.43.288 6.066-.372 6.366-.469.693-.225 4.614-.727 5.252-5.934.659-5.372-.32-8.765-2.063-10.295l-.002-.002C17.463.663 14.816-.043 11.398.002zm.064 1.714h.013c2.913-.04 5.148.534 6.625 1.85 1.47 1.315 2.282 3.966 1.72 8.577-.52 4.297-3.66 4.598-4.243 4.786-.246.08-2.612.665-5.57.47 0 0-2.208 2.662-2.898 3.354-.108.108-.232.15-.315.13-.12-.03-.152-.165-.15-.365l.015-3.27c-4.371-1.216-4.11-5.812-4.059-8.27.054-2.46.503-4.479 1.857-5.825C6.24 2.047 9.66 1.741 11.462 1.716zm.18 2.467c-.214-.001-.43.01-.647.033-1.403.153-2.654.74-3.576 1.732-.93.997-1.37 2.36-1.241 3.826.131 1.47.8 2.74 1.846 3.59.993.808 2.27 1.205 3.62 1.123 1.347-.082 2.56-.63 3.418-1.548.854-.914 1.284-2.14 1.207-3.547-.077-1.405-.657-2.652-1.632-3.524-.836-.746-1.883-1.152-3.003-1.18-.006 0-.013 0-.019-.002l.027.497zm-.038 1.5c.873.02 1.7.34 2.338.922.753.672 1.196 1.62 1.254 2.714.058 1.094-.289 2.098-.977 2.831-.684.733-1.616 1.153-2.659 1.217-.848.052-1.656-.204-2.348-.738-.742-.601-1.215-1.501-1.315-2.55-.101-1.049.232-2.06.9-2.782.664-.718 1.598-1.148 2.698-1.268.037-.004.073-.006.109-.01v.013c.004-.35.004-.066.004-.066-.004-.278-.004-.28.004-.278l-.008-.005z"/></svg>
                            },
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
            <section id="work" className={`relative z-10 max-w-7xl mx-auto px-10 py-24 border-t transition-colors ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
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
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
  {projects.map((project, i) => (
    <div
      key={i}
      className={`p-6 rounded-2xl border transition-all group
        ${isDark 
          ? 'bg-white/5 border-white/5 hover:border-emerald-500/50' 
          : 'bg-white border-slate-200 shadow-sm hover:border-emerald-500/50'}`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2 sm:gap-0">
        <span className="text-[10px] uppercase font-bold text-emerald-500">{project.type}</span>
        <div className="flex flex-wrap gap-2">
          {(project.tech || []).map(t => (
            <span key={t} className="text-[12px] opacity-40">{t}</span>
          ))}
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-emerald-500 transition-colors">
        {project.title}
      </h3>
      <p className="text-sm sm:text-base opacity-60">{project.description}</p>
    </div>
  ))}
</div>
                        <div className="mt-8 flex justify-center">
                            <a href="/projects" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-emerald-500 transition-all">
                                View All Projects
                                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {/* SKILLS SECTION */}
            <section id="skills" className={`relative z-10 max-w-7xl mx-auto px-10 py-24 border-t transition-colors ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Skills</h2>
                    <p className={`text-[10px] uppercase tracking-[0.3em] font-bold ${isDark ? 'text-emerald-500/60' : 'text-emerald-600'}`}>
                        My Technical Expertise & Stack
                    </p>
                </div>

                {(() => {
                    const di = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
                    const skillGroups = [
                        {
                            label: 'Featured',
                            items: [
                                { name: 'PHP',          icon: `${di}/php/php-original.svg` },
                                { name: 'JavaScript',   icon: `${di}/javascript/javascript-original.svg` },
                                { name: 'Laravel',      icon: `${di}/laravel/laravel-original.svg` },
                                { name: 'React',        icon: `${di}/react/react-original.svg` },
                                { name: 'Vue.js',       icon: `${di}/vuejs/vuejs-original.svg` },
                                { name: 'React Native', icon: `${di}/react/react-original.svg` },
                                { name: 'Tailwind CSS', icon: `${di}/tailwindcss/tailwindcss-original.svg` },
                                { name: 'MySQL',        icon: `${di}/mysql/mysql-original.svg` },
                            ],
                        },
                        {
                            label: 'Languages',
                            items: [
                                { name: 'PHP',          icon: `${di}/php/php-original.svg` },
                                { name: 'JavaScript',   icon: `${di}/javascript/javascript-original.svg` },
                                { name: 'Python',       icon: `${di}/python/python-original.svg` },
                                { name: 'TypeScript',   icon: `${di}/typescript/typescript-original.svg` },
                                { name: 'VB.NET',       icon: `${di}/dot-net/dot-net-original.svg` },
                            ],
                        },
                        {
                            label: 'Frontend',
                            items: [
                                { name: 'HTML5',        icon: `${di}/html5/html5-original.svg` },
                                { name: 'CSS3',         icon: `${di}/css3/css3-original.svg` },
                                { name: 'Bootstrap',    icon: `${di}/bootstrap/bootstrap-original.svg` },
                                { name: 'Tailwind CSS', icon: `${di}/tailwindcss/tailwindcss-original.svg` },
                                { name: 'jQuery',       icon: `${di}/jquery/jquery-original.svg` },
                                { name: 'React',        icon: `${di}/react/react-original.svg` },
                                { name: 'Vue.js 3',     icon: `${di}/vuejs/vuejs-original.svg` },
                                { name: 'TypeScript',   icon: `${di}/typescript/typescript-original.svg` },
                                { name: 'AJAX',         icon: `${di}/javascript/javascript-original.svg` },
                            ],
                        },
                        {
                            label: 'Backend',
                            items: [
                                { name: 'Laravel',      icon: `${di}/laravel/laravel-original.svg` },
                                { name: 'ASP.NET',      icon: `${di}/dotnetcore/dotnetcore-original.svg` },
                                { name: 'Node.js',      icon: `${di}/nodejs/nodejs-original.svg` },
                                { name: 'Flask',        icon: `${di}/flask/flask-original.svg` },
                                { name: 'Express.js',   icon: `${di}/express/express-original.svg` },
                            ],
                        },
                        {
                            label: 'Mobile',
                            items: [
                                { name: 'React Native', icon: `${di}/react/react-original.svg` },
                            ],
                        },
                        {
                            label: 'Databases',
                            items: [
                                { name: 'MySQL',        icon: `${di}/mysql/mysql-original.svg` },
                                { name: 'PostgreSQL',   icon: `${di}/postgresql/postgresql-original.svg` },
                                { name: 'SQLite',       icon: `${di}/sqlite/sqlite-original.svg` },
                            ],
                        },
                        {
                            label: 'Cloud & API',
                            items: [
                                { name: 'Firebase',     icon: `${di}/firebase/firebase-plain.svg` },
                                { name: 'GraphQL',      icon: `${di}/graphql/graphql-plain.svg` },
                                { name: 'Postman',      icon: `${di}/postman/postman-original.svg` },
                                { name: 'Git',          icon: `${di}/git/git-original.svg` },
                            ],
                        },
                    ];

                    return (
                        <div className="space-y-10">
                            {skillGroups.map((group) => (
                                <div key={group.label}>
                                    <p className={`text-xs uppercase tracking-widest font-bold mb-4 ${isDark ? 'text-white/30' : 'text-slate-400'}`}>
                                        {group.label}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {group.items.map((skill) => (
                                            <div
                                                key={group.label + skill.name}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 hover:scale-105 hover:border-emerald-500/50
                                                    ${isDark
                                                        ? 'bg-white/5 border-white/10 text-white/80 hover:text-white'
                                                        : 'bg-white border-slate-200 text-slate-700 shadow-sm hover:text-slate-900'
                                                    }`}
                                            >
                                                <img
                                                    src={skill.icon}
                                                    alt={skill.name}
                                                    className="w-4 h-4 object-contain"
                                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                />
                                                <span>{skill.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })()}
            </section>

            {/* FLOATING DOCK */}
            <div
                className={`fixed bottom-10 left-1/2 -translate-x-1/2 border px-2 py-2 rounded-full flex items-center gap-1 z-50 shadow-2xl backdrop-blur-md
                ${isDark ? 'bg-[#111111]/80 backdrop-blur-xl border-white/10' : 'bg-white/80 backdrop-blur-xl border-slate-200'}`}
            >
                {['Home', 'Work', 'Skills'].map((item) => (
                    <motion.button
                    key={item}
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    onClick={() => {
                        document
                        .getElementById(item.toLowerCase())
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`
                        px-5 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold
                        hover:bg-emerald-500/10 hover:text-emerald-500
                        ${isDark ? 'text-white' : 'text-slate-900'}
                    `}
                    >
                    {item}
                    </motion.button>
                ))}
                </div>

            {/* AI CHATBOT */}
            <ChatBot isDark={isDark} />
        </div>
    );
};

export default Portfolio;