import InputError from '@/components/input-error';
import AppLogo from '@/components/app-logo';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setIsDark(savedTheme !== 'light');
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    };

    const inputClass = `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-300 ${
        isDark
            ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/60 focus:bg-white/[0.07]'
            : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500/60'
    }`;

    const labelClass = `text-[11px] font-bold uppercase tracking-[0.2em] ${
        isDark ? 'text-white/50' : 'text-slate-500'
    }`;

    return (
        <div
            className={`relative flex min-h-screen items-center justify-center overflow-hidden px-6 font-sans transition-colors duration-500 selection:bg-emerald-500/30 ${
                isDark ? 'bg-[#050505] text-white' : 'bg-[#fafafa] text-slate-900'
            }`}
        >
            <Head title="Log in" />

            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

            {/* Theme toggle */}
            <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`fixed right-8 top-8 z-50 rounded-full border p-3 shadow-xl transition-all hover:scale-110 ${
                    isDark
                        ? 'border-white/10 bg-white/5 text-yellow-400'
                        : 'border-slate-200 bg-white text-slate-700'
                }`}
            >
                {isDark ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
            </button>

            {/* Back home */}
            <Link
                href="/"
                className={`fixed left-8 top-8 z-50 flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all hover:text-emerald-500 ${
                    isDark ? 'text-white/40' : 'text-slate-400'
                }`}
            >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                Back
            </Link>

            {/* Card */}
            <div className="relative w-full max-w-md">
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-20 blur" />

                <div
                    className={`relative rounded-3xl border p-8 shadow-2xl backdrop-blur-xl sm:p-10 ${
                        isDark
                            ? 'border-white/10 bg-white/[0.03]'
                            : 'border-slate-200 bg-white'
                    }`}
                >
                    {/* Brand */}
                    <div className="mb-8 flex flex-col items-center text-center">
                        {/* <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                            <AppLogo />
                        </div> */}
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500">
                            Welcome back
                        </p>
                        <h1 className="text-2xl font-bold tracking-tight">Log in to your account</h1>
                        <p className={`mt-2 text-sm ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                            Enter your email and password to continue
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm font-medium text-emerald-500">
                            {status}
                        </div>
                    )}

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-5"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className={labelClass}>
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="email@example.com"
                                        className={inputClass}
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className={labelClass}>
                                            Password
                                        </label>
                                        {canResetPassword && (
                                            <Link
                                                href={request()}
                                                tabIndex={5}
                                                className="text-xs font-medium text-emerald-500 transition-colors hover:text-emerald-400"
                                            >
                                                Forgot password?
                                            </Link>
                                        )}
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="Password"
                                        className={inputClass}
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <label className={`flex cursor-pointer items-center gap-3 text-sm ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                                    <input
                                        id="remember"
                                        name="remember"
                                        type="checkbox"
                                        tabIndex={3}
                                        className="h-4 w-4 rounded border-white/20 bg-transparent accent-emerald-500"
                                    />
                                    Remember me
                                </label>

                                <button
                                    type="submit"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                                >
                                    {processing && (
                                        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                    )}
                                    Log in
                                </button>

                                
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}
