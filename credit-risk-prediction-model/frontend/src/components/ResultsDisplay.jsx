import React from 'react';
import './ResultsDisplay.css';

const ResultsDisplay = ({ results }) => {
    if (!results) return null;

    const getRatingColor = (rating) => {
        switch (rating) {
            case 'Poor': return 'var(--color-poor)';
            case 'Average': return 'var(--color-average)';
            case 'Good': return 'var(--color-good)';
            case 'Excellent': return 'var(--color-excellent)';
            default: return 'var(--color-text-primary)';
        }
    };

    const getRatingEmoji = (rating) => {
        switch (rating) {
            case 'Poor': return '😟';
            case 'Average': return '😐';
            case 'Good': return '😊';
            case 'Excellent': return '🎉';
            default: return '📊';
        }
    };

    return (
        <div className="results-container scale-in">
            <h2 className="results-title">📊 Credit Assessment Results</h2>

            <div className="results-grid">
                {/* Credit Score - Main Feature */}
                <div className="result-card credit-score-card">
                    <div className="score-circle" style={{ borderColor: getRatingColor(results.rating) }}>
                        <div className="score-value">{results.credit_score}</div>
                        <div className="score-label">Credit Score</div>
                    </div>
                    <div className="rating-badge" style={{ background: getRatingColor(results.rating) }}>
                        <span className="rating-emoji">{getRatingEmoji(results.rating)}</span>
                        <span className="rating-text">{results.rating}</span>
                    </div>
                </div>

                {/* Default Probability */}
                <div className="result-card">
                    <div className="result-icon">⚠️</div>
                    <div className="result-label">Default Probability</div>
                    <div className="result-value">{results.default_probability_percentage}</div>
                    <div className="result-description">
                        Likelihood of loan default
                    </div>
                </div>

                {/* Loan to Income Ratio */}
                <div className="result-card">
                    <div className="result-icon">💰</div>
                    <div className="result-label">Loan-to-Income Ratio</div>
                    <div className="result-value">{results.loan_to_income_ratio}</div>
                    <div className="result-description">
                        {results.loan_to_income_ratio > 3 ? 'High leverage' :
                            results.loan_to_income_ratio > 2 ? 'Moderate leverage' : 'Low leverage'}
                    </div>
                </div>
            </div>

            {/* Interpretation Guide */}
            <div className="interpretation-card card">
                <h3 className="interpretation-title">📖 Understanding Your Results</h3>
                <div className="interpretation-grid">
                    <div className="interpretation-item">
                        <strong>Credit Score (300-900)</strong>
                        <p>A numerical representation of creditworthiness. Higher scores indicate lower risk and better loan terms.</p>
                    </div>
                    <div className="interpretation-item">
                        <strong>Default Probability</strong>
                        <p>The likelihood that the borrower will fail to repay the loan. Lower percentages are better.</p>
                    </div>
                    <div className="interpretation-item">
                        <strong>Credit Rating</strong>
                        <p><span style={{ color: 'var(--color-poor)' }}>Poor (300-500)</span>,
                            <span style={{ color: 'var(--color-average)' }}> Average (500-650)</span>,
                            <span style={{ color: 'var(--color-good)' }}> Good (650-750)</span>,
                            <span style={{ color: 'var(--color-excellent)' }}> Excellent (750-900)</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsDisplay;
