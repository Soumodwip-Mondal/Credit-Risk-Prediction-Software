import React, { useState, useEffect } from 'react';
import CreditRiskForm from './components/CreditRiskForm';
import ResultsDisplay from './components/ResultsDisplay';
import InfoSection from './components/InfoSection';
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
            <header className="sticky top-0 z-50 py-4 bg-black/50 backdrop-blur-glass border-b border-white/10 animate-slide-in">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <h1 className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-primary bg-clip-text text-transparent tracking-tight">
                            💳 Credit Risk Predictor
                        </h1>
                        <p className="text-sm md:text-base text-white/75 font-normal">
                            AI-Powered Credit Assessment
                        </p>
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
            <footer className="mt-auto py-12 bg-black/20 backdrop-blur-glass border-t border-white/10 text-center">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-white/75 mb-2">Powered by Machine Learning • React + FastAPI</p>
                    <p className="text-sm text-white/50 max-w-2xl mx-auto leading-relaxed">
                        This tool uses advanced ML algorithms for credit risk assessment.
                        Results are predictions and should be used as one factor in lending decisions.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
