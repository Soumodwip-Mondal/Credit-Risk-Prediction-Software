import React, { useState, useEffect } from 'react';
import CreditRiskForm from './components/CreditRiskForm';
import ResultsDisplay from './components/ResultsDisplay';
import InfoSection from './components/InfoSection';
import { predictCreditRisk, healthCheck } from './services/api';
import './App.css';

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
        <div className="app">
            {/* Header */}
            <header className="app-header">
                <div className="container">
                    <div className="header-content">
                        <h1 className="app-title">
                            💳 Credit Risk Predictor
                        </h1>
                        <p className="app-subtitle">
                            AI-Powered Credit Assessment
                        </p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="app-main">
                <div className="container">
                    {/* Info Section */}
                    <InfoSection />

                    {/* Form Section */}
                    <div className="form-section card">
                        <h2 className="section-title">📝 Enter Borrower Details</h2>
                        <CreditRiskForm onSubmit={handlePrediction} loading={loading} />
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="error-card card scale-in">
                            <div className="error-icon">⚠️</div>
                            <div className="error-message">{error}</div>
                            <div className="error-hint">
                                {apiStatus === 'offline' && (
                                    <>Make sure the FastAPI server is running on <code>http://localhost:8000</code></>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Results Section */}
                    {results && <ResultsDisplay results={results} />}
                </div>
            </main>

            {/* Footer */}
            <footer className="app-footer">
                <div className="container">
                    <p>Powered by Machine Learning • React + FastAPI</p>
                    <p className="footer-note">
                        This tool uses advanced ML algorithms for credit risk assessment.
                        Results are predictions and should be used as one factor in lending decisions.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
