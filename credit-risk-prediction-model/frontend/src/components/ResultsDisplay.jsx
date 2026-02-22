import React from 'react';

const ResultsDisplay = ({ results }) => {
    if (!results) return null;

    const getRatingColor = (rating) => {
        switch (rating) {
            case 'Poor': return '#ef4444';
            case 'Average': return '#f59e0b';
            case 'Good': return '#10b981';
            case 'Excellent': return '#06b6d4';
            default: return '#10b981';
        }
    };

    const getRatingLabel = (rating) => {
        switch (rating) {
            case 'Poor': return 'HIGH RISK';
            case 'Average': return 'MODERATE RISK';
            case 'Good': return 'TIER 2 LOW RISK';
            case 'Excellent': return 'TIER 1 LOW RISK';
            default: return rating?.toUpperCase() || 'N/A';
        }
    };

    const getRatingIcon = (rating) => {
        switch (rating) {
            case 'Poor': return 'gpp_bad';
            case 'Average': return 'shield';
            case 'Good': return 'verified';
            case 'Excellent': return 'verified_user';
            default: return 'verified_user';
        }
    };

    const getRatingDescription = (rating) => {
        switch (rating) {
            case 'Poor': return 'The applicant shows elevated risk patterns. Additional review and collateral may be required before proceeding.';
            case 'Average': return 'The applicant shows moderate financial patterns. Standard lending terms recommended with periodic review.';
            case 'Good': return 'The applicant demonstrates solid financial reliability with manageable risk based on historical modeling.';
            case 'Excellent': return 'Based on historical neural mapping, this applicant sits in the 98th percentile of reliable borrowers. Liquidity ratios exceed baseline by 4.2x.';
            default: return 'Assessment complete. Review the detailed metrics for comprehensive analysis.';
        }
    };

    const getRatingBadgeColors = (rating) => {
        switch (rating) {
            case 'Poor': return 'bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400';
            case 'Average': return 'bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20 text-amber-600 dark:text-amber-400';
            case 'Good': return 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400';
            case 'Excellent': return 'bg-emerald-50 dark:bg-accent-teal/10 border-emerald-100 dark:border-accent-teal/20 text-emerald-600 dark:text-accent-teal';
            default: return 'bg-emerald-50 dark:bg-accent-teal/10 border-emerald-100 dark:border-accent-teal/20 text-emerald-600 dark:text-accent-teal';
        }
    };

    // Calculate gauge offset for SVG circle
    const score = results.credit_score || 750;
    const maxScore = 900;
    const minScore = 300;
    const percentage = Math.min(Math.max((score - minScore) / (maxScore - minScore), 0), 1);
    const circumference = 2 * Math.PI * 44;
    const offset = circumference * (1 - percentage);
    const confidencePercent = Math.round(percentage * 100);

    const ratingColor = getRatingColor(results.rating);
    const defaultProb = results.default_probability_percentage || '12.5%';
    const loanToIncomeRatio = results.loan_to_income_ratio || '2.4';

    return (
        <section id="results-section" className="results-container max-w-7xl mx-auto px-6 md:px-8 mb-32 md:mb-48 animate-scale-in">
            {/* Section Header */}
            <div className="flex items-center gap-6 md:gap-10 mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-black text-dark-charcoal dark:text-white whitespace-nowrap">Output Analytics</h2>
                <div className="h-px flex-grow bg-slate-200 dark:bg-white/5"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
                {/* ── Large Gauge Card ── */}
                <div className="lg:col-span-8 glass-container rounded-3xl md:rounded-4xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 relative overflow-hidden">
                    <div className="space-y-8 md:space-y-10 flex-1 z-10">
                        <div>
                            <span className="text-slate-500 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.25em]">Aggregated Score</span>
                            <div className="text-7xl md:text-9xl font-black text-dark-charcoal dark:text-white mt-2 md:mt-4 tracking-tighter">{score}</div>
                        </div>

                        {/* Rating Badge */}
                        <div className={`inline-flex items-center gap-3 md:gap-4 px-6 md:px-8 py-3 md:py-3.5 rounded-xl md:rounded-2xl border font-black text-base md:text-lg tracking-wide ${getRatingBadgeColors(results.rating)}`}>
                            <span className="material-symbols-outlined text-2xl md:text-3xl">{getRatingIcon(results.rating)}</span>
                            {getRatingLabel(results.rating)}
                        </div>

                        <p className="text-slate-500 dark:text-slate-400 max-w-md leading-relaxed text-base md:text-lg font-normal">
                            {getRatingDescription(results.rating)}
                        </p>
                    </div>

                    {/* SVG Gauge */}
                    <div className="relative w-56 h-56 md:w-72 md:h-72 shrink-0 z-10">
                        <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl" viewBox="0 0 100 100">
                            <circle
                                className="text-slate-100 dark:text-white/5"
                                cx="50" cy="50" r="44"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="8"
                            />
                            <circle
                                cx="50" cy="50" r="44"
                                fill="transparent"
                                stroke={ratingColor}
                                strokeWidth="8"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                                style={{ filter: `drop-shadow(0 0 8px ${ratingColor}40)` }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Confidence</span>
                            <span className="text-4xl md:text-5xl font-black text-dark-charcoal dark:text-white">{confidencePercent}%</span>
                        </div>
                    </div>
                </div>

                {/* ── Small Stat Cards ── */}
                <div className="lg:col-span-4 flex flex-col gap-8 md:gap-10">
                    {/* Default Probability */}
                    <div className="glass-stat rounded-3xl md:rounded-4xl p-8 md:p-10 flex-1 relative overflow-hidden">
                        <div className="relative z-10 flex items-center gap-6 md:gap-8">
                            <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-red-500/10 flex items-center justify-center text-rose-500 dark:text-red-400 border border-rose-100 dark:border-red-500/20 shadow-sm dark:shadow-none shrink-0">
                                <span className="material-symbols-outlined text-3xl">analytics</span>
                            </div>
                            <div>
                                <div className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Default Probability</div>
                                <div className="text-3xl md:text-4xl font-black text-dark-charcoal dark:text-white">{defaultProb}</div>
                            </div>
                        </div>
                        {/* Mini bar chart */}
                        <div className="absolute bottom-0 left-0 w-full h-16 flex items-end gap-1 px-10 opacity-30 dark:opacity-20">
                            <div className="w-full bg-rose-200 dark:bg-red-400 rounded-t-lg h-2/3"></div>
                            <div className="w-full bg-rose-200 dark:bg-red-400 rounded-t-lg h-1/2"></div>
                            <div className="w-full bg-rose-200 dark:bg-red-400 rounded-t-lg h-3/4"></div>
                            <div className="w-full bg-rose-200 dark:bg-red-400 rounded-t-lg h-1/4"></div>
                            <div className="w-full bg-rose-200 dark:bg-red-400 rounded-t-lg h-1/3"></div>
                        </div>
                    </div>

                    {/* Loan-to-Income Ratio */}
                    <div className="glass-stat rounded-3xl md:rounded-4xl p-8 md:p-10 flex-1 relative overflow-hidden">
                        <div className="relative z-10 flex items-center gap-6 md:gap-8">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-primary/10 flex items-center justify-center text-primary dark:text-primary border border-indigo-100 dark:border-primary/20 shadow-sm dark:shadow-none shrink-0">
                                <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                            </div>
                            <div>
                                <div className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Income Multiple</div>
                                <div className="text-3xl md:text-4xl font-black text-dark-charcoal dark:text-white">{loanToIncomeRatio}x</div>
                            </div>
                        </div>
                        {/* Mini bar chart */}
                        <div className="absolute bottom-0 left-0 w-full h-16 flex items-end gap-1 px-10 opacity-30 dark:opacity-20">
                            <div className="w-full bg-indigo-200 dark:bg-primary rounded-t-lg h-1/4"></div>
                            <div className="w-full bg-indigo-200 dark:bg-primary rounded-t-lg h-2/4"></div>
                            <div className="w-full bg-indigo-200 dark:bg-primary rounded-t-lg h-1/2"></div>
                            <div className="w-full bg-indigo-200 dark:bg-primary rounded-t-lg h-full"></div>
                            <div className="w-full bg-indigo-200 dark:bg-primary rounded-t-lg h-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResultsDisplay;
