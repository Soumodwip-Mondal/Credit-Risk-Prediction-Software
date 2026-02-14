import React from 'react';

const ResultsDisplay = ({ results }) => {
    if (!results) return null;

    const getRatingColor = (rating) => {
        switch (rating) {
            case 'Poor': return '#ef4444';
            case 'Average': return '#f59e0b';
            case 'Good': return '#10b981';
            case 'Excellent': return '#06b6d4';
            default: return '#ffffff';
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
        <div className="results-container mt-12 animate-scale-in">
            <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-primary bg-clip-text text-transparent">
                📊 Credit Assessment Results
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Credit Score - Main Feature */}
                <div className="bg-white/[0.03] backdrop-blur-glass border-2 border-accent/30 rounded-2xl p-8 text-center transition-all duration-300 relative overflow-hidden
                    hover:-translate-y-1 hover:shadow-2xl hover:border-accent/40
                    before:content-[''] before:absolute before:inset-0 before:-left-full before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:transition-all before:duration-500 hover:before:left-full
                    bg-gradient-to-br from-accent/10 to-purple-600/10">
                    <div
                        className="w-44 h-44 mx-auto mb-6 rounded-full border-[8px] flex flex-col items-center justify-center bg-black/20 relative shadow-[0_0_30px_rgba(102,126,234,0.3)]"
                        style={{ borderColor: getRatingColor(results.rating) }}
                    >
                        <div className="text-6xl font-extrabold leading-none bg-gradient-primary bg-clip-text text-transparent">
                            {results.credit_score}
                        </div>
                        <div className="text-sm text-white/75 mt-2 font-semibold tracking-widest uppercase">
                            Credit Score
                        </div>
                    </div>
                    <div
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xl text-white shadow-lg"
                        style={{ background: getRatingColor(results.rating) }}
                    >
                        <span className="text-2xl">{getRatingEmoji(results.rating)}</span>
                        <span>{results.rating}</span>
                    </div>
                </div>

                {/* Default Probability */}
                <div className="bg-white/[0.03] backdrop-blur-glass border border-white/10 rounded-2xl p-8 text-center transition-all duration-300 relative overflow-hidden
                    hover:-translate-y-1 hover:shadow-2xl hover:border-accent/40
                    before:content-[''] before:absolute before:inset-0 before:-left-full before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:transition-all before:duration-500 hover:before:left-full">
                    <div className="text-5xl mb-4" style={{ filter: 'drop-shadow(0 0 10px rgba(102, 126, 234, 0.3))' }}>⚠️</div>
                    <div className="text-sm text-white/75 mb-2 font-semibold tracking-widest uppercase">
                        Default Probability
                    </div>
                    <div className="text-5xl font-extrabold text-accent-light mb-2">
                        {results.default_probability_percentage}
                    </div>
                    <div className="text-sm text-white/50 italic">
                        Likelihood of loan default
                    </div>
                </div>

                {/* Loan to Income Ratio */}
                <div className="bg-white/[0.03] backdrop-blur-glass border border-white/10 rounded-2xl p-8 text-center transition-all duration-300 relative overflow-hidden
                    hover:-translate-y-1 hover:shadow-2xl hover:border-accent/40
                    before:content-[''] before:absolute before:inset-0 before:-left-full before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:transition-all before:duration-500 hover:before:left-full">
                    <div className="text-5xl mb-4" style={{ filter: 'drop-shadow(0 0 10px rgba(102, 126, 234, 0.3))' }}>💰</div>
                    <div className="text-sm text-white/75 mb-2 font-semibold tracking-widest uppercase">
                        Loan-to-Income Ratio
                    </div>
                    <div className="text-5xl font-extrabold text-accent-light mb-2">
                        {results.loan_to_income_ratio}
                    </div>
                    <div className="text-sm text-white/50 italic">
                        {results.loan_to_income_ratio > 3 ? 'High leverage' :
                            results.loan_to_income_ratio > 2 ? 'Moderate leverage' : 'Low leverage'}
                    </div>
                </div>
            </div>

            {/* Interpretation Guide */}
            <div className="mt-8 bg-white/[0.03] backdrop-blur-glass border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-white/[0.06] hover:shadow-2xl hover:-translate-y-0.5 animate-fade-in [animation-delay:0.3s] [animation-fill-mode:both]">
                <h3 className="text-2xl font-bold mb-6 text-white">📖 Understanding Your Results</h3>
                <div className="grid gap-6">
                    <div className="p-4 bg-white/[0.02] rounded-xl border-l-4 border-accent">
                        <strong className="block text-white mb-2 text-lg">Credit Score (300-900)</strong>
                        <p className="text-white/75 leading-relaxed m-0">
                            A numerical representation of creditworthiness. Higher scores indicate lower risk and better loan terms.
                        </p>
                    </div>
                    <div className="p-4 bg-white/[0.02] rounded-xl border-l-4 border-accent">
                        <strong className="block text-white mb-2 text-lg">Default Probability</strong>
                        <p className="text-white/75 leading-relaxed m-0">
                            The likelihood that the borrower will fail to repay the loan. Lower percentages are better.
                        </p>
                    </div>
                    <div className="p-4 bg-white/[0.02] rounded-xl border-l-4 border-accent">
                        <strong className="block text-white mb-2 text-lg">Credit Rating</strong>
                        <p className="text-white/75 leading-relaxed m-0">
                            <span style={{ color: '#ef4444' }}>Poor (300-500)</span>,{' '}
                            <span style={{ color: '#f59e0b' }}>Average (500-650)</span>,{' '}
                            <span style={{ color: '#10b981' }}>Good (650-750)</span>,{' '}
                            <span style={{ color: '#06b6d4' }}>Excellent (750-900)</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsDisplay;
