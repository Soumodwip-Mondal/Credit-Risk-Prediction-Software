import React, { useState } from 'react';

const InfoSection = () => {
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div className="mb-8">
            {/* How to Use */}
            <div
                className="mb-4 bg-white/[0.03] backdrop-blur-glass border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-white/[0.06] hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer select-none"
                onClick={() => toggleSection('usage')}
            >
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white m-0">ℹ️ How to Use This Tool</h3>
                    <span className="text-2xl font-light text-accent transition-transform duration-300 hover:scale-125">
                        {activeSection === 'usage' ? '−' : '+'}
                    </span>
                </div>
                {activeSection === 'usage' && (
                    <div className="mt-6 pt-6 border-t border-white/10 text-white/75 leading-relaxed animate-fade-in">
                        <ul className="list-none p-0">
                            {[
                                { label: 'Age:', desc: 'Enter borrower\'s age (18-100 years)' },
                                { label: 'Income:', desc: 'Annual income in Indian Rupees (₹)' },
                                { label: 'Loan Amount:', desc: 'Total loan amount requested' },
                                { label: 'Loan Tenure:', desc: 'Duration of the loan in months' },
                                { label: 'Avg DPD:', desc: 'Average number of days past due on previous loans' },
                                { label: 'Delinquency Ratio:', desc: 'Percentage of delinquent accounts (0-100%)' },
                                { label: 'Credit Utilization:', desc: 'Percentage of available credit being used' },
                                { label: 'Open Accounts:', desc: 'Number of currently active loan accounts' },
                                { label: 'Residence Type:', desc: 'Whether residence is owned, rented, or mortgaged' },
                                { label: 'Loan Purpose:', desc: 'Reason for taking the loan' },
                                { label: 'Loan Type:', desc: 'Whether the loan is secured or unsecured' },
                            ].map((item, idx) => (
                                <li key={idx} className="py-2 pl-6 relative before:content-['▸'] before:absolute before:left-0 before:text-accent">
                                    <strong>{item.label}</strong> {item.desc}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* About the AI Model */}
            <div
                className="mb-4 bg-white/[0.03] backdrop-blur-glass border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-white/[0.06] hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer select-none"
                onClick={() => toggleSection('model')}
            >
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white m-0">🧠 About the AI Model</h3>
                    <span className="text-2xl font-light text-accent transition-transform duration-300 hover:scale-125">
                        {activeSection === 'model' ? '−' : '+'}
                    </span>
                </div>
                {activeSection === 'model' && (
                    <div className="mt-6 pt-6 border-t border-white/10 text-white/75 leading-relaxed animate-fade-in">
                        <p className="mb-4">This credit risk predictor uses a <strong>Logistic Regression model</strong> optimized with advanced techniques:</p>
                        <ul className="list-none p-0">
                            {[
                                { label: '93% Accuracy:', desc: 'Highly reliable predictions' },
                                { label: '94% Recall:', desc: 'Excellent at identifying high-risk borrowers' },
                                { label: 'SMOTE Tomek:', desc: 'Addresses class imbalance in training data' },
                                { label: 'Optuna Optimization:', desc: 'Hyperparameters tuned for maximum performance' },
                                { label: 'Feature Engineering:', desc: 'Includes derived metrics like loan-to-income ratio' },
                            ].map((item, idx) => (
                                <li key={idx} className="py-2 pl-6 relative before:content-['▸'] before:absolute before:left-0 before:text-accent">
                                    <strong>{item.label}</strong> {item.desc}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4">The model reduces false negatives by 15% compared to baseline approaches, making it ideal for banking and fintech applications.</p>
                    </div>
                )}
            </div>

            {/* Technology Stack */}
            <div
                className="mb-4 bg-white/[0.03] backdrop-blur-glass border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:bg-white/[0.06] hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer select-none"
                onClick={() => toggleSection('tech')}
            >
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white m-0">⚙️ Technology Stack</h3>
                    <span className="text-2xl font-light text-accent transition-transform duration-300 hover:scale-125">
                        {activeSection === 'tech' ? '−' : '+'}
                    </span>
                </div>
                {activeSection === 'tech' && (
                    <div className="mt-6 pt-6 border-t border-white/10 text-white/75 leading-relaxed animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { label: 'Frontend:', value: 'React 18 with Vite' },
                                { label: 'Backend:', value: 'FastAPI (Python)' },
                                { label: 'ML Framework:', value: 'Scikit-learn' },
                                { label: 'Styling:', value: 'Tailwind CSS' },
                            ].map((item, idx) => (
                                <div key={idx} className="p-4 bg-accent/5 rounded-xl border-l-4 border-accent">
                                    <strong className="block text-white mb-2">{item.label}</strong>
                                    <span className="text-white/75">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfoSection;
