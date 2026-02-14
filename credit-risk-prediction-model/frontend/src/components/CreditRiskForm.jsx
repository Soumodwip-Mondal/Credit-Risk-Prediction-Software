import React, { useState } from 'react';

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

    const inputClasses = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-inter text-base transition-all duration-300 outline-none focus:bg-white/10 focus:border-accent focus:ring-4 focus:ring-accent/20 placeholder:text-white/50";
    const labelClasses = "block mb-2 text-white/75 text-sm font-medium tracking-wide";

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Age */}
                <div className="mb-6">
                    <label htmlFor="age" className={labelClasses}>Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        min="18"
                        max="100"
                        required
                        className={inputClasses}
                    />
                </div>

                {/* Income */}
                <div className="mb-6">
                    <label htmlFor="income" className={labelClasses}>Income (₹)</label>
                    <input
                        type="number"
                        id="income"
                        name="income"
                        value={formData.income}
                        onChange={handleChange}
                        min="0"
                        step="1000"
                        required
                        className={inputClasses}
                    />
                </div>

                {/* Loan Amount */}
                <div className="mb-6">
                    <label htmlFor="loan_amount" className={labelClasses}>Loan Amount (₹)</label>
                    <input
                        type="number"
                        id="loan_amount"
                        name="loan_amount"
                        value={formData.loan_amount}
                        onChange={handleChange}
                        min="0"
                        step="1000"
                        required
                        className={inputClasses}
                    />
                </div>

                {/* Loan to Income Ratio (Calculated) */}
                <div className="mb-6">
                    <label className={labelClasses}>Loan to Income Ratio</label>
                    <div className="bg-accent/10 border border-accent/30 rounded-xl px-4 py-3 flex items-center justify-center min-h-[48px]">
                        <span className="text-lg font-semibold text-accent-light" style={{ textShadow: '0 0 10px rgba(102, 126, 234, 0.3)' }}>
                            {loanToIncomeRatio}
                        </span>
                    </div>
                </div>

                {/* Loan Tenure */}
                <div className="mb-6">
                    <label htmlFor="loan_tenure_months" className={labelClasses}>Loan Tenure (months)</label>
                    <input
                        type="number"
                        id="loan_tenure_months"
                        name="loan_tenure_months"
                        value={formData.loan_tenure_months}
                        onChange={handleChange}
                        min="1"
                        max="360"
                        required
                        className={inputClasses}
                    />
                </div>

                {/* Average DPD */}
                <div className="mb-6">
                    <label htmlFor="avg_dpd_per_delinquency" className={labelClasses}>Avg DPD</label>
                    <input
                        type="number"
                        id="avg_dpd_per_delinquency"
                        name="avg_dpd_per_delinquency"
                        value={formData.avg_dpd_per_delinquency}
                        onChange={handleChange}
                        min="0"
                        required
                        className={inputClasses}
                    />
                </div>

                {/* Delinquency Ratio */}
                <div className="mb-6">
                    <label htmlFor="delinquency_ratio" className={labelClasses}>Delinquency Ratio (%)</label>
                    <input
                        type="number"
                        id="delinquency_ratio"
                        name="delinquency_ratio"
                        value={formData.delinquency_ratio}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        required
                        className={inputClasses}
                    />
                </div>

                {/* Credit Utilization Ratio */}
                <div className="mb-6">
                    <label htmlFor="credit_utilization_ratio" className={labelClasses}>Credit Utilization (%)</label>
                    <input
                        type="number"
                        id="credit_utilization_ratio"
                        name="credit_utilization_ratio"
                        value={formData.credit_utilization_ratio}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        required
                        className={inputClasses}
                    />
                </div>

                {/* Open Accounts */}
                <div className="mb-6">
                    <label htmlFor="num_open_accounts" className={labelClasses}>Open Loan Accounts</label>
                    <input
                        type="number"
                        id="num_open_accounts"
                        name="num_open_accounts"
                        value={formData.num_open_accounts}
                        onChange={handleChange}
                        min="1"
                        max="10"
                        required
                        className={inputClasses}
                    />
                </div>

                {/* Residence Type */}
                <div className="mb-6">
                    <label htmlFor="residence_type" className={labelClasses}>Residence Type</label>
                    <select
                        id="residence_type"
                        name="residence_type"
                        value={formData.residence_type}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                    >
                        <option value="Owned">Owned</option>
                        <option value="Rented">Rented</option>
                        <option value="Mortgage">Mortgage</option>
                    </select>
                </div>

                {/* Loan Purpose */}
                <div className="mb-6">
                    <label htmlFor="loan_purpose" className={labelClasses}>Loan Purpose</label>
                    <select
                        id="loan_purpose"
                        name="loan_purpose"
                        value={formData.loan_purpose}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                    >
                        <option value="Education">Education</option>
                        <option value="Home">Home</option>
                        <option value="Auto">Auto</option>
                        <option value="Personal">Personal</option>
                    </select>
                </div>

                {/* Loan Type */}
                <div className="mb-6">
                    <label htmlFor="loan_type" className={labelClasses}>Loan Type</label>
                    <select
                        id="loan_type"
                        name="loan_type"
                        value={formData.loan_type}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                    >
                        <option value="Secured">Secured</option>
                        <option value="Unsecured">Unsecured</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className="w-full mt-8 px-8 py-4 bg-gradient-primary text-white rounded-xl text-lg font-semibold shadow-lg relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
                before:content-[''] before:absolute before:inset-0 before:-left-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-full"
                disabled={loading}
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-4">
                        <span className="w-5 h-5 border-2 border-white/20 border-t-accent rounded-full animate-spin"></span>
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
