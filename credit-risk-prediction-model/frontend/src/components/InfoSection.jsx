import React, { useState } from 'react';
import './InfoSection.css';

const InfoSection = () => {
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div className="info-section">
            <div className="info-card card" onClick={() => toggleSection('usage')}>
                <div className="info-header">
                    <h3>ℹ️ How to Use This Tool</h3>
                    <span className="toggle-icon">{activeSection === 'usage' ? '−' : '+'}</span>
                </div>
                {activeSection === 'usage' && (
                    <div className="info-content fade-in">
                        <ul>
                            <li><strong>Age:</strong> Enter borrower's age (18-100 years)</li>
                            <li><strong>Income:</strong> Annual income in Indian Rupees (₹)</li>
                            <li><strong>Loan Amount:</strong> Total loan amount requested</li>
                            <li><strong>Loan Tenure:</strong> Duration of the loan in months</li>
                            <li><strong>Avg DPD:</strong> Average number of days past due on previous loans</li>
                            <li><strong>Delinquency Ratio:</strong> Percentage of delinquent accounts (0-100%)</li>
                            <li><strong>Credit Utilization:</strong> Percentage of available credit being used</li>
                            <li><strong>Open Accounts:</strong> Number of currently active loan accounts</li>
                            <li><strong>Residence Type:</strong> Whether residence is owned, rented, or mortgaged</li>
                            <li><strong>Loan Purpose:</strong> Reason for taking the loan</li>
                            <li><strong>Loan Type:</strong> Whether the loan is secured or unsecured</li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="info-card card" onClick={() => toggleSection('model')}>
                <div className="info-header">
                    <h3>🧠 About the AI Model</h3>
                    <span className="toggle-icon">{activeSection === 'model' ? '−' : '+'}</span>
                </div>
                {activeSection === 'model' && (
                    <div className="info-content fade-in">
                        <p>This credit risk predictor uses a <strong>Logistic Regression model</strong> optimized with advanced techniques:</p>
                        <ul>
                            <li><strong>93% Accuracy:</strong> Highly reliable predictions</li>
                            <li><strong>94% Recall:</strong> Excellent at identifying high-risk borrowers</li>
                            <li><strong>SMOTE Tomek:</strong> Addresses class imbalance in training data</li>
                            <li><strong>Optuna Optimization:</strong> Hyperparameters tuned for maximum performance</li>
                            <li><strong>Feature Engineering:</strong> Includes derived metrics like loan-to-income ratio</li>
                        </ul>
                        <p>The model reduces false negatives by 15% compared to baseline approaches, making it ideal for banking and fintech applications.</p>
                    </div>
                )}
            </div>

            <div className="info-card card" onClick={() => toggleSection('tech')}>
                <div className="info-header">
                    <h3>⚙️ Technology Stack</h3>
                    <span className="toggle-icon">{activeSection === 'tech' ? '−' : '+'}</span>
                </div>
                {activeSection === 'tech' && (
                    <div className="info-content fade-in">
                        <div className="tech-grid">
                            <div className="tech-item">
                                <strong>Frontend:</strong> React 18 with Vite
                            </div>
                            <div className="tech-item">
                                <strong>Backend:</strong> FastAPI (Python)
                            </div>
                            <div className="tech-item">
                                <strong>ML Framework:</strong> Scikit-learn
                            </div>
                            <div className="tech-item">
                                <strong>Styling:</strong> Modern CSS with Glassmorphism
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfoSection;
