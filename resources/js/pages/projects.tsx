import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import StarField from '@/components/star-field';

interface Project {
    id: number;
    company: string | null;
    link: string | null;
    year: number | null;
    title: string;
    type: string | null;
    tech: string[] | null;
    description: string | null;
}

interface ProjectsProps {
    projects?: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects = [] }) => {
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
            <Head title='Projects Archive'/>

            <StarField isDark={isDark} />

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
            
            <main id="home" className="relative z-10 max-w-7xl mx-auto px-10 pt-20 pb-32 flex flex-col items-center text-center">
                <div className="mb-16 text-left">
                    <h1 className="text-4xl font-bold mb-4 tracking-tight">Archive</h1>
                    <p className="opacity-60 max-w-2xl">A complete list of things I’ve built, ranging from full-scale applications to small experiments.</p>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        {/* TABLE HEADER – DESKTOP ONLY */}
                        <thead className="hidden md:table-header-group">
                            <tr
                                className={`text-xs uppercase tracking-widest border-b
                                ${isDark ? 'border-white/10 text-white/40' : 'border-slate-200 text-slate-400'}`}
                            >
                                <th className="py-4 font-bold">Project</th>
                                <th className="py-4 font-bold">Description</th>
                                <th className="py-4 font-bold">Company</th>
                                <th className="py-4 font-bold">Built with</th>
                                <th className="py-4 font-bold text-right">Link</th>
                            </tr>
                        </thead>

                        <tbody>
                        {projects.map((project, i) => (
                            <tr
                            key={i}
                            className={`group border-b transition-colors
                            ${isDark ? 'border-white/5 hover:bg-white/5' : 'border-slate-100 hover:bg-slate-50'}`}
                            >
                            {/* YEAR + PROJECT */}
                                <td className="py-6 align-top">
                                    <div className="relative pl-6">
                                        {/* Timeline dot */}
                                        <span className="absolute left-0 top-2 w-2 h-2 rounded-full bg-emerald-500"></span>

                                        {/* Year */}
                                        <span className="block text-[10px] font-mono tracking-widest opacity-40 mb-1">
                                            {project.year || '2025'}
                                        </span>

                                        {/* Project title */}
                                        <h4 className="font-bold text-lg leading-tight group-hover:text-emerald-500 transition-colors">
                                            {project.title}
                                        </h4>

                                        {/* Mobile description */}
                                        <p className="md:hidden mt-2 text-sm opacity-70 leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* Mobile Company */}
                                        <p className="md:hidden mt-2 group-hover:text-emerald-500 text-sm opacity-70 leading-relaxed">
                                            {project.company}
                                        </p>

                                        {/* Mobile tech */}
                                        <div className="md:hidden flex flex-wrap gap-1 mt-2">
                                            {(project.tech || []).map((t, idx) => (
                                                <span
                                                key={idx}
                                                className={`text-[10px] px-2 py-0.5 rounded-full border
                                                ${isDark ? 'border-white/10 text-white/50' : 'border-slate-200 text-slate-500'}`}
                                                >
                                                {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </td>

                                {/* DESCRIPTION (DESKTOP ONLY) */}
                                <td className="py-6 hidden md:table-cell align-top px-2">
                                    <span className="text-base opacity-70">
                                        {project.description}
                                    </span>
                                </td>

                                <td className="py-6 hidden md:table-cell align-top">
                                    <span className="text-base opacity-70">
                                        {project.company}
                                    </span>
                                </td>

                            {/* TECH STACK (DESKTOP ONLY) */}
                                <td className="py-6 hidden md:table-cell align-top">
                                    <div className="flex flex-wrap gap-2">
                                    {(project.tech || []).map((t, idx) => (
                                        <span
                                            key={idx}
                                            className={`text-[11px] px-2 py-0.5 rounded-full border
                                            ${isDark ? 'border-white/10 text-white/60' : 'border-slate-200 text-slate-600'}`}
                                        >
                                        {t}
                                        </span>
                                    ))}
                                    </div>
                                </td>

                            {/* VIEW BUTTON */}
                                <td className="py-6 text-right align-top">
                                    {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2
                                        rounded-full text-xs font-bold uppercase tracking-widest
                                        border border-emerald-500/30 text-emerald-500
                                        hover:bg-emerald-500 hover:text-white transition-all"
                                    >
                                        View
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                        </svg>
                                    </a>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </main>

        </div>
    );
    
}
export default Projects;