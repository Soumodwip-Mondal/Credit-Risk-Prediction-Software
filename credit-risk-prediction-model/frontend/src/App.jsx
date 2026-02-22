import React, { useState, useEffect } from 'react';
import CreditRiskForm from './components/CreditRiskForm';
import ResultsDisplay from './components/ResultsDisplay';
import InfoSection from './components/InfoSection';
import CreditCardIcon from './components/CreditCardIcon';
import { predictCreditRisk } from './services/api';

function App() {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : true; // default dark
    });

    // Sync dark mode class with <html>
    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        // Also update body background for immediate visual feedback
        document.body.style.backgroundColor = darkMode ? '#0a0e1a' : '#F8FAFC';
        document.body.style.color = darkMode ? '#e2e8f0' : '#64748B';
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);


    const handlePrediction = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const result = await predictCreditRisk(formData);
            setResults(result);

            setTimeout(() => {
                document.querySelector('.results-container')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        } catch (err) {
            setError(err.message || 'Failed to get prediction. Please ensure the API server is running.');
        } finally {
            setLoading(false);
        }
    };

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const toggleTheme = () => setDarkMode(prev => !prev);

    return (
        <div className="min-h-screen font-display transition-colors duration-300">

            {/* ═══════════════════════════════════════════════════ */}
            {/*                   NAVBAR                           */}
            {/* ═══════════════════════════════════════════════════ */}
            <nav className="fixed top-0 w-full z-50 glass-nav border-b border-white/40 dark:border-white/5 px-6 md:px-8 py-4 md:py-5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="btn-premium p-2 rounded-xl shadow-lg shadow-indigo-100 dark:shadow-primary/20">
                            <span className="material-symbols-outlined text-white text-2xl block">credit_score</span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-black text-dark-charcoal dark:text-white tracking-tight">
                            Credit Risk <span className="text-primary">AI</span>
                        </h2>
                    </div>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-8 md:gap-10">
                        <a onClick={() => scrollTo('info-section')} className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-dark-charcoal dark:hover:text-white transition-colors cursor-pointer">Platform</a>
                        <a onClick={() => scrollTo('info-section')} className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-dark-charcoal dark:hover:text-white transition-colors cursor-pointer">Methodology</a>
                        <a onClick={() => scrollTo('info-section')} className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-dark-charcoal dark:hover:text-white transition-colors cursor-pointer">Security</a>
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="relative w-14 h-7 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors duration-300 flex items-center p-1 cursor-pointer"
                        aria-label="Toggle dark mode"
                    >
                        <div className={`w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300 ${darkMode ? 'translate-x-7' : 'translate-x-0'}`}>
                            {darkMode ? (
                                <span className="material-symbols-outlined text-slate-700" style={{ fontSize: '14px' }}>dark_mode</span>
                            ) : (
                                <span className="material-symbols-outlined text-amber-500" style={{ fontSize: '14px' }}>light_mode</span>
                            )}
                        </div>
                    </button>
                </div>
            </nav>

            {/* ═══════════════════════════════════════════════════ */}
            {/*                    MAIN                            */}
            {/* ═══════════════════════════════════════════════════ */}
            <main className="relative overflow-hidden">

                {/* ── Hero Section ── */}
                <section id="hero-section" className="aurora-hero pt-40 md:pt-48 pb-24 md:pb-32 px-6 md:px-8">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
                        <div className="space-y-8 md:space-y-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-primary/10 border border-indigo-100/50 dark:border-primary/20 text-indigo-600 dark:text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                                <span className="material-symbols-outlined text-sm">auto_awesome</span> Institutional Grade AI
                            </div>
                            <h1 className="text-5xl lg:text-[5.5rem] font-black leading-[1.05] tracking-tight text-dark-charcoal dark:text-white">
                                Predict Credit Risk <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">with Precision.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed font-normal">
                                Transform your lending portfolio with neural-driven insights. Our platform analyzes 500+ data points in real-time to deliver the world's most accurate credit profiles.
                            </p>
                            <div className="flex flex-wrap gap-4 md:gap-5">
                                <button
                                    onClick={() => scrollTo('form-section')}
                                    className="px-8 md:px-10 py-4 md:py-5 rounded-2xl btn-premium text-white font-bold text-base md:text-lg shadow-2xl shadow-indigo-200 dark:shadow-primary/20"
                                >
                                    Request Demo
                                </button>
                                <button
                                    onClick={() => scrollTo('info-section')}
                                    className="px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-dark-charcoal dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm dark:shadow-none"
                                >
                                    Whitepaper
                                </button>
                            </div>
                        </div>

                        {/* Floating Credit Card */}
                        <CreditCardIcon />
                    </div>
                </section>

                {/* Section Divider */}
                <div className="section-divider"></div>

                {/* ── Info Cards ── */}
                <InfoSection />

                {/* Section Divider */}
                <div className="section-divider"></div>

                {/* ── Form Section ── */}
                <section id="form-section" className="max-w-7xl mx-auto px-6 md:px-8 py-12">
                    <div className="glass-container p-8 md:p-16 rounded-3xl md:rounded-4xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 dark:bg-primary/5 blur-[100px] -mr-48 -mt-48"></div>
                        <div className="mb-12 md:mb-16 relative z-10">
                            <h2 className="text-3xl md:text-4xl font-black text-dark-charcoal dark:text-white tracking-tight mb-3">Assessment Engine</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-2xl">Input applicant parameters below for a comprehensive risk analysis powered by our latest core.</p>
                        </div>
                        <CreditRiskForm onSubmit={handlePrediction} loading={loading} />
                    </div>
                </section>

                {/* Section Divider */}
                <div className="section-divider"></div>

                {/* ── Error Display ── */}
                {error && (
                    <section className="max-w-5xl mx-auto px-6 md:px-8 mb-16">
                        <div className="glass-container rounded-3xl md:rounded-4xl p-8 text-center animate-scale-in">
                            <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-red-500/10 flex items-center justify-center text-rose-500 dark:text-red-400 mx-auto mb-4">
                                <span className="material-symbols-outlined text-3xl">error</span>
                            </div>
                            <div className="text-xl font-bold text-rose-500 dark:text-red-400 mb-2">{error}</div>
                        </div>
                    </section>
                )}

                {/* ── Results Section ── */}
                {results && <ResultsDisplay results={results} />}
            </main>

            {/* ═══════════════════════════════════════════════════ */}
            {/*                   FOOTER                           */}
            {/* ═══════════════════════════════════════════════════ */}
            <footer className="bg-[#F8FAFC] dark:bg-[#0a0e1a] border-t border-slate-100 dark:border-white/5 pt-14 pb-0">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    {/* Top grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 pb-10">
                        {/* Brand */}
                        <div className="md:col-span-1 space-y-4">
                            <div className="flex items-center gap-2.5">
                                <div className="btn-premium p-1.5 rounded-lg">
                                    <span className="material-symbols-outlined text-white text-lg block">credit_score</span>
                                </div>
                                <h2 className="text-base font-black text-dark-charcoal dark:text-white tracking-tight">Credit Risk AI</h2>
                            </div>
                            <p className="text-slate-400 dark:text-slate-500 text-xs leading-relaxed">
                                Leading the force of automated credit risk assessment solutions, building an optimised attribute blueprint.
                            </p>
                        </div>

                        {/* Platform */}
                        <div className="md:col-span-1">
                            <h4 className="text-dark-charcoal dark:text-slate-300 font-black mb-5 uppercase text-[10px] tracking-[0.18em]">Platform</h4>
                            <ul className="space-y-3 text-xs font-medium text-slate-500 dark:text-slate-500">
                                <li><a onClick={() => scrollTo('info-section')} className="hover:text-primary dark:hover:text-indigo-400 transition-colors cursor-pointer">How to Use</a></li>
                                <li><a onClick={() => scrollTo('info-section')} className="hover:text-primary dark:hover:text-indigo-400 transition-colors cursor-pointer">API Reference</a></li>
                                <li><a onClick={() => scrollTo('form-section')} className="hover:text-primary dark:hover:text-indigo-400 transition-colors cursor-pointer">Enterprise</a></li>
                                <li><a onClick={() => scrollTo('hero-section')} className="hover:text-primary dark:hover:text-indigo-400 transition-colors cursor-pointer">Pricing</a></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="md:col-span-1">
                            <h4 className="text-dark-charcoal dark:text-slate-300 font-black mb-5 uppercase text-[10px] tracking-[0.18em]">Company</h4>
                            <ul className="space-y-3 text-xs font-medium text-slate-500 dark:text-slate-500">
                                <li><a onClick={() => scrollTo('info-section')} className="hover:text-primary dark:hover:text-indigo-400 transition-colors cursor-pointer">About Us</a></li>
                                <li><a onClick={() => scrollTo('info-section')} className="hover:text-primary dark:hover:text-indigo-400 transition-colors cursor-pointer">Case Studies</a></li>
                                <li><a onClick={() => scrollTo('info-section')} className="hover:text-primary dark:hover:text-indigo-400 transition-colors cursor-pointer">Consult</a></li>
                                <li><a onClick={() => scrollTo('hero-section')} className="hover:text-primary dark:hover:text-indigo-400 transition-colors cursor-pointer">Security</a></li>
                            </ul>
                        </div>

                        {/* Subscribe */}
                        <div className="md:col-span-1">
                            <h4 className="text-dark-charcoal dark:text-slate-300 font-black mb-5 uppercase text-[10px] tracking-[0.18em]">Subscribe</h4>
                            <div className="relative">
                                <input
                                    className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-xs font-medium text-dark-charcoal dark:text-white focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 pr-10"
                                    placeholder="An email address"
                                    type="email"
                                />
                                <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-primary hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined font-bold" style={{ fontSize: '16px' }}>arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom disclaimer bar — full width, flush */}
                    <div className="border-t border-slate-200 dark:border-white/5 -mx-6 md:-mx-10 px-6 md:px-10 py-5">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                            <p className="text-[9px] text-slate-400 dark:text-slate-600 uppercase tracking-widest font-semibold leading-relaxed max-w-2xl">
                                DISCLAIMER: THIS PLATFORM PROVIDES AI-GENERATED RISK ASSESSMENTS USING ML PRECISION DATA MODELS. CREDIT RISK SCORES ARE ESTIMATES; NOT FINANCIAL ADVICE. ALWAYS VERIFY WITH CERTIFIED FINANCIAL ADVISORS. © 2024 CREDIT RISK AI — ALL RIGHTS RESERVED.
                            </p>
                            <div className="flex gap-6 text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 whitespace-nowrap">
                                <a onClick={() => scrollTo('hero-section')} className="hover:text-primary dark:hover:text-indigo-400 transition-colors cursor-pointer">Privacy</a>
                                <a onClick={() => scrollTo('info-section')} className="hover:text-primary dark:hover:text-indigo-400 transition-colors cursor-pointer">Compliance</a>
                                <a onClick={() => scrollTo('hero-section')} className="hover:text-primary dark:hover:text-indigo-400 transition-colors cursor-pointer">Terms</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
