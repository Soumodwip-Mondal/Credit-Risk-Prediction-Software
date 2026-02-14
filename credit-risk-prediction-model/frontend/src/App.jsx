import React, { useState, useEffect } from 'react';
import CreditRiskForm from './components/CreditRiskForm';
import ResultsDisplay from './components/ResultsDisplay';
import InfoSection from './components/InfoSection';
import CreditCardIcon from './components/CreditCardIcon';
import { predictCreditRisk, healthCheck } from './services/api';

function App() {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [apiStatus, setApiStatus] = useState('checking');

    useEffect(() => {
        // Check API health on mount
        const checkHealth = async () => {
            try {
                const health = await healthCheck();
                setApiStatus(health.status === 'healthy' ? 'online' : 'offline');
            } catch (err) {
                setApiStatus('offline');
            }
        };
        checkHealth();
    }, []);

    const handlePrediction = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const result = await predictCreditRisk(formData);
            setResults(result);
            setApiStatus('online');

            // Scroll to results
            setTimeout(() => {
                document.querySelector('.results-container')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        } catch (err) {
            setError(err.message || 'Failed to get prediction. Please ensure the API server is running.');
            setApiStatus('offline');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/15 shadow-lg animate-slide-in">
                <div className="max-w-7xl mx-auto px-6 py-5">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl animate-pulse"></div>
                            <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 p-3 rounded-2xl shadow-lg flex items-center justify-center">
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="drop-shadow-lg"
                                >
                                    <rect x="2" y="5" width="20" height="14" rx="2" />
                                    <line x1="2" y1="10" x2="22" y2="10" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                                Credit Risk Predictor
                            </h1>
                            <p className="text-xs md:text-sm text-white/60 font-medium mt-0.5">
                                AI-Powered Credit Assessment Platform
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Info Section */}
                    <InfoSection />

                    {/* Form Section */}
                    <div className="mb-12 animate-fade-in [animation-delay:0.2s] [animation-fill-mode:both] bg-white/[0.03] backdrop-blur-glass border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-white/[0.06] hover:shadow-2xl hover:-translate-y-0.5">
                        <h2 className="text-3xl font-bold mb-8 text-white">📝 Enter Borrower Details</h2>
                        <CreditRiskForm onSubmit={handlePrediction} loading={loading} />
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="mb-8 bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/30 rounded-2xl p-8 text-center animate-scale-in">
                            <div className="text-5xl mb-4">⚠️</div>
                            <div className="text-xl font-semibold text-red-500 mb-2">{error}</div>
                            <div className="text-white/50 text-sm">
                                {apiStatus === 'offline' && (
                                    <>Make sure the backend API server is accessible</>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Results Section */}
                    {results && <ResultsDisplay results={results} />}
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-auto relative overflow-hidden bg-gradient-to-b from-black/40 to-black/80 backdrop-blur-xl border-t border-white/10">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 pointer-events-none"></div>

                <div className="relative max-w-7xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Brand Section */}
                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                                <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-xl">
                                    <span className="text-2xl">💳</span>
                                </div>
                                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                    Credit Risk Predictor
                                </h3>
                            </div>
                            <p className="text-sm text-white/60 leading-relaxed max-w-xs mx-auto md:mx-0">
                                Advanced ML algorithms for intelligent credit risk assessment and lending decisions.
                            </p>
                        </div>

                        {/* Info Section */}
                        <div className="text-center md:text-right">
                            <h4 className="text-sm font-semibold text-white/80 mb-4 uppercase tracking-wider">Important Note</h4>
                            <p className="text-xs text-white/50 leading-relaxed max-w-xs mx-auto md:ml-auto md:mr-0">
                                Results are AI-generated predictions and should be used as one factor in comprehensive lending decisions.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-6 border-t border-white/10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-xs text-white/40">
                                © 2026 Credit Risk Predictor. All rights reserved.
                            </p>
                            <div className="flex items-center gap-4">
                                <a href="#" className="text-xs text-white/40 hover:text-white/80 transition-colors duration-300">Privacy Policy</a>
                                <span className="text-white/20">•</span>
                                <a href="#" className="text-xs text-white/40 hover:text-white/80 transition-colors duration-300">Terms of Service</a>
                                <span className="text-white/20">•</span>
                                <a href="#" className="text-xs text-white/40 hover:text-white/80 transition-colors duration-300">Contact</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
