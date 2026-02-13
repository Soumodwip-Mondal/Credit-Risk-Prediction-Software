import React, { useState } from 'react';
import './CreditRiskForm.css';

const CreditRiskForm = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        age: 28,
        income: 1200000,
        loan_amount: 2560000,
        loan_tenure_months: 36,
        avg_dpd_per_delinquency: 20,
        delinquency_ratio: 30,
        credit_utilization_ratio: 30,
        num_open_accounts: 2,
        residence_type: 'Owned',
        loan_purpose: 'Home',
        loan_type: 'Secured'
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const loanToIncomeRatio = formData.income > 0
        ? (formData.loan_amount / formData.income).toFixed(2)
        : '0.00';

    return (
        <form onSubmit={handleSubmit} className="credit-form">
            <div className="grid grid-cols-3">
                {/* Age */}
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        min="18"
                        max="100"
                        required
                    />
                </div>

                {/* Income */}
                <div className="form-group">
                    <label htmlFor="income">Income (₹)</label>
                    <input
                        type="number"
                        id="income"
                        name="income"
                        value={formData.income}
                        onChange={handleChange}
                        min="0"
                        step="1000"
                        required
                    />
                </div>

                {/* Loan Amount */}
                <div className="form-group">
                    <label htmlFor="loan_amount">Loan Amount (₹)</label>
                    <input
                        type="number"
                        id="loan_amount"
                        name="loan_amount"
                        value={formData.loan_amount}
                        onChange={handleChange}
                        min="0"
                        step="1000"
                        required
                    />
                </div>

                {/* Loan to Income Ratio (Calculated) */}
                <div className="form-group">
                    <label>Loan to Income Ratio</label>
                    <div className="calculated-field">
                        <span className="ratio-value">{loanToIncomeRatio}</span>
                    </div>
                </div>

                {/* Loan Tenure */}
                <div className="form-group">
                    <label htmlFor="loan_tenure_months">Loan Tenure (months)</label>
                    <input
                        type="number"
                        id="loan_tenure_months"
                        name="loan_tenure_months"
                        value={formData.loan_tenure_months}
                        onChange={handleChange}
                        min="1"
                        max="360"
                        required
                    />
                </div>

                {/* Average DPD */}
                <div className="form-group">
                    <label htmlFor="avg_dpd_per_delinquency">Avg DPD</label>
                    <input
                        type="number"
                        id="avg_dpd_per_delinquency"
                        name="avg_dpd_per_delinquency"
                        value={formData.avg_dpd_per_delinquency}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </div>

                {/* Delinquency Ratio */}
                <div className="form-group">
                    <label htmlFor="delinquency_ratio">Delinquency Ratio (%)</label>
                    <input
                        type="number"
                        id="delinquency_ratio"
                        name="delinquency_ratio"
                        value={formData.delinquency_ratio}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        required
                    />
                </div>

                {/* Credit Utilization Ratio */}
                <div className="form-group">
                    <label htmlFor="credit_utilization_ratio">Credit Utilization (%)</label>
                    <input
                        type="number"
                        id="credit_utilization_ratio"
                        name="credit_utilization_ratio"
                        value={formData.credit_utilization_ratio}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        required
                    />
                </div>

                {/* Open Accounts */}
                <div className="form-group">
                    <label htmlFor="num_open_accounts">Open Loan Accounts</label>
                    <input
                        type="number"
                        id="num_open_accounts"
                        name="num_open_accounts"
                        value={formData.num_open_accounts}
                        onChange={handleChange}
                        min="1"
                        max="10"
                        required
                    />
                </div>

                {/* Residence Type */}
                <div className="form-group">
                    <label htmlFor="residence_type">Residence Type</label>
                    <select
                        id="residence_type"
                        name="residence_type"
                        value={formData.residence_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="Owned">Owned</option>
                        <option value="Rented">Rented</option>
                        <option value="Mortgage">Mortgage</option>
                    </select>
                </div>

                {/* Loan Purpose */}
                <div className="form-group">
                    <label htmlFor="loan_purpose">Loan Purpose</label>
                    <select
                        id="loan_purpose"
                        name="loan_purpose"
                        value={formData.loan_purpose}
                        onChange={handleChange}
                        required
                    >
                        <option value="Education">Education</option>
                        <option value="Home">Home</option>
                        <option value="Auto">Auto</option>
                        <option value="Personal">Personal</option>
                    </select>
                </div>

                {/* Loan Type */}
                <div className="form-group">
                    <label htmlFor="loan_type">Loan Type</label>
                    <select
                        id="loan_type"
                        name="loan_type"
                        value={formData.loan_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="Secured">Secured</option>
                        <option value="Unsecured">Unsecured</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className="btn-primary submit-btn"
                disabled={loading}
            >
                {loading ? (
                    <span className="loading-content">
                        <span className="spinner"></span>
                        Analyzing...
                    </span>
                ) : (
                    '🎯 Calculate Risk'
                )}
            </button>
        </form>
    );
};

export default CreditRiskForm;
