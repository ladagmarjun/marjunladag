import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

const Projects: React.FC<[]> = () => { 
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
        { link: '', year: 2025,title: 'DMS Store', type: 'Mobile App', tech: ['React Native', 'Expo Go', 'Firebase', 'JavaScript'], desc: 'View store orders, credit balance, and place orders.' },
        { link: 'https://play.google.com/store/apps/details?id=com.rackapp.dmsdealer', year: 2025,title: 'DMS Dealer', type: 'Mobile App', tech: ['React Native', 'Expo Go', 'Firebase', 'JavaScript'], desc: 'View sales, stock levels, and purchase records.' },
        { link: 'https://play.google.com/store/apps/details?id=com.rackapp.dmsstock', year: 2025,title: 'DMS Stock', type: 'Mobile App', tech: ['React Native', 'Expo Go', 'Firebase', 'JavaScript'], desc: 'View Stock levels.' },
        { link: 'https://play.google.com/store/apps/details?id=com.rackapp.dmsops', year: 2025,title: 'DMS OPS', type: 'Mobile App', tech: ['React Native', 'Expo Go', 'Firebase', 'JavaScript'], desc: 'The Outlet Tagging feature ensures accurate association of sales agents, products, and transactions with specific outlets.' },
        { link: 'https://dmsbusinesscare.com/', year: 2024, title: 'Dealer Management System', type: 'Web App', tech: ['Laravel', 'Vue.js', 'Inertia', 'Tailwind', 'MySQL', 'Firebase'], desc: 'Handles product tracking, sales and reports.' },
        { link: 'https://play.google.com/store/apps/details?id=com.rackapp.dmsagent', year: 2024,title: 'DMS POS', type: 'Mobile App', tech: ['React Native', 'Expo Go', 'Firebase', 'JavaScript'], desc: 'Manage sales, product tracking and generate sales records in real-time.' },
        { link: '', year: 2024, title: 'RackMotors', type: 'Web App', tech: ['Laravel', 'Vue.js', 'Inertia', 'Tailwind', 'MySQL'], desc: 'Manage sales, product tracking and generate sales records in real-time.' },
        { link: '', year: 2023, title: 'RackPOS', type: 'Web App', tech: ['Laravel', 'Vue.js', 'Inertia', 'Bootstrap', 'MySQL'], desc: 'Manage sales, product tracking and generate sales records in real-time.' },
        { link: '', year: 2022, title: 'QCLI Sales and Inventory Management System', type: 'Web App', tech: ['Laravel', 'Vue.js', 'Inertia', 'Tailwinf', 'MySQL'], desc: 'Manage sales, product tracking and generate sales records in real-time.' },
        { link: '', year: 2021, title: 'QCLI Sales and Inventory Management System', type: 'Windows App', tech: ['VB.NET', 'MySQL'], desc: 'Manage sales, product tracking and generate sales records in real-time.' },
       ];


    return (
        <div className={`${isDark ? 'bg-[#050505] text-white' : 'bg-[#fafafa] text-slate-900'} min-h-screen font-sans transition-colors duration-500 selection:bg-emerald-500/30 scroll-smooth pb-32`}>
            <Head  title='Projects Archive'/>

            <Link 
                href="/" 
                className={`fixed top-10 left-10 md:left-24 z-[60] group flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all ${isDark ? 'text-white/50 hover:text-emerald-500' : 'text-slate-400 hover:text-emerald-600'}`}
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
            <div className={`fixed right-0 top-0 h-full w-16 border-l hidden lg:flex flex-col items-center py-10 z-50 transition-colors ${isDark ? 'border-white/10 bg-[#050505]' : 'border-slate-200 bg-white'}`}>
                <div className={`rotate-90 origin-center whitespace-nowrap tracking-[0.2em] text-sm font-bold uppercase mt-32 ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                    Marjun Ladag — 2026
                </div>
            </div>

            
            <main id="home" className="relative max-w-7xl mx-auto px-10 pt-20 pb-32 flex flex-col items-center text-center">
                <div className="mb-16 text-left">
                    <h1 className="text-4xl font-bold mb-4 tracking-tight">Archive</h1>
                    <p className="opacity-60 max-w-2xl">A complete list of things I’ve built, ranging from full-scale applications to small experiments.</p>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className={`text-xs uppercase tracking-widest border-b ${isDark ? 'border-white/10 text-white/40' : 'border-slate-200 text-slate-400'}`}>
                                <th className="py-4 font-bold">Year</th>
                                <th className="py-4 font-bold">Project</th>
                                <th className="py-4 font-bold hidden md:table-cell">Built with</th>
                                <th className="py-4 font-bold text-right">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project, i) => (
                                <tr 
                                    key={i} 
                                    className={`group border-b transition-colors ${isDark ? 'border-white/5 hover:bg-white/5' : 'border-slate-100 hover:bg-slate-50'}`}
                                >
                                    {/* Year */}
                                    <td className="py-6 text-sm font-mono opacity-40">
                                        {project.year || '2025'}
                                    </td>

                                    {/* Project Name & Mobile Tech */}
                                    <td className="py-6">
                                        <div className="flex flex-col">
                                            <span className={`font-bold text-base group-hover:text-emerald-500 transition-colors`}>
                                                {project.title}
                                            </span>
                                            <span className="text-xs opacity-50 md:hidden mt-1 italic">
                                                {project.tech.join(' · ')}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Tech Stack (Desktop Only) */}
                                    <td className="py-6 hidden md:table-cell">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((t, idx) => (
                                                <span key={idx} className={`text-[11px] px-2 py-0.5 rounded-full border ${isDark ? 'border-white/10 text-white/60' : 'border-slate-200 text-slate-600'}`}>
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </td>

                                    {/* Link Icon */}
                                    {project.link && 
                                        <td 
                                            className="py-6 text-right">
                                            <a 
                                                href={project.link || '#'} 
                                                target='_blank'
                                                className="inline-flex items-center gap-1 text-sm font-bold text-emerald-500 hover:underline"
                                            >
                                                <span className="hidden sm:inline">View</span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
                                        </td>
                                    }
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