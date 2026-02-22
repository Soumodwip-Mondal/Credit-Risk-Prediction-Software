import React, { useState } from 'react';

const CreditRiskForm = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        age: '',
        income: '',
        loan_amount: '',
        loan_tenure_months: '',
        avg_dpd_per_delinquency: '',
        delinquency_ratio: '',
        credit_utilization_ratio: '',
        num_open_accounts: '',
        residence_type: 'Owned',
        loan_purpose: 'Home',
        loan_type: 'Secured'
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? '' : parseFloat(value) || 0) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiData = {
            age: formData.age || 28,
            income: formData.income || 1200000,
            loan_amount: formData.loan_amount || 2560000,
            loan_tenure_months: formData.loan_tenure_months || 36,
            avg_dpd_per_delinquency: formData.avg_dpd_per_delinquency || 20,
            delinquency_ratio: formData.delinquency_ratio || 30,
            credit_utilization_ratio: formData.credit_utilization_ratio || 30,
            num_open_accounts: formData.num_open_accounts || 2,
            residence_type: formData.residence_type,
            loan_purpose: formData.loan_purpose,
            loan_type: formData.loan_type
        };
        onSubmit(apiData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-14 md:space-y-16">

            {/* ── Section 01: Personal Profile ── */}
            <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xs font-black text-dark-charcoal dark:text-white">01</span>
                    <h4 className="text-lg font-bold text-dark-charcoal dark:text-white">Personal Profile</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Legal Full Name</label>
                        <input type="text" placeholder="e.g. Alexander Hamilton" className="input-premium" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Applicant Age</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="32" className="input-premium" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Education Level</label>
                        <select name="loan_type" value={formData.loan_type} onChange={handleChange} className="input-premium">
                            <option value="Secured">Post-Graduate</option>
                            <option value="Secured">Graduate</option>
                            <option value="Unsecured">Undergraduate</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Dependents</label>
                        <input type="number" name="num_open_accounts" value={formData.num_open_accounts} onChange={handleChange} placeholder="2" className="input-premium" />
                    </div>
                </div>
            </div>

            {/* ── Section 02: Financial Standing ── */}
            <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xs font-black text-dark-charcoal dark:text-white">02</span>
                    <h4 className="text-lg font-bold text-dark-charcoal dark:text-white">Financial Standing</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Annual Gross Income</label>
                        <input type="number" name="income" value={formData.income} onChange={handleChange} placeholder="$120,000" className="input-premium" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Existing Debts</label>
                        <input type="number" name="delinquency_ratio" value={formData.delinquency_ratio} onChange={handleChange} placeholder="$18,000" className="input-premium" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Credit Utilization (%)</label>
                        <input type="number" name="credit_utilization_ratio" value={formData.credit_utilization_ratio} onChange={handleChange} placeholder="30" className="input-premium" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Home Ownership</label>
                        <select name="residence_type" value={formData.residence_type} onChange={handleChange} className="input-premium">
                            <option value="Owned">Own</option>
                            <option value="Rented">Rent</option>
                            <option value="Mortgage">Mortgage</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Employment Duration</label>
                        <select name="loan_tenure_months" value={formData.loan_tenure_months || '36'} onChange={(e) => setFormData(prev => ({ ...prev, loan_tenure_months: parseInt(e.target.value) }))} className="input-premium">
                            <option value="24">1-2 Years</option>
                            <option value="36">3-5 Years</option>
                            <option value="60">5-10 Years</option>
                            <option value="120">10+ Years</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Avg DPD (Days Past Due)</label>
                        <input type="number" name="avg_dpd_per_delinquency" value={formData.avg_dpd_per_delinquency} onChange={handleChange} placeholder="20" className="input-premium" />
                    </div>
                </div>
            </div>

            {/* ── Section 03: Lending Particulars ── */}
            <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xs font-black text-dark-charcoal dark:text-white">03</span>
                    <h4 className="text-lg font-bold text-dark-charcoal dark:text-white">Lending Particulars</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Requested Amount</label>
                        <input type="number" name="loan_amount" value={formData.loan_amount} onChange={handleChange} placeholder="$750,000" className="input-premium" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Loan Intent</label>
                        <select name="loan_purpose" value={formData.loan_purpose} onChange={handleChange} className="input-premium">
                            <option value="Home">Real Estate</option>
                            <option value="Personal">Expansion</option>
                            <option value="Auto">Operational</option>
                            <option value="Education">Education</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Repayment Term</label>
                        <select className="input-premium">
                            <option>60 Months</option>
                            <option>120 Months</option>
                            <option>180 Months</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* ── Submit Button ── */}
            <div className="pt-6 md:pt-8">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 md:py-6 rounded-2xl btn-premium text-white font-black text-lg md:text-xl tracking-widest uppercase shadow-2xl shadow-primary/20 hover:scale-[1.005] active:scale-[0.995] transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-4">
                            <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                            ANALYZING...
                        </span>
                    ) : (
                        'ANALYZE RISK PORTFOLIO'
                    )}
                </button>
            </div>
        </form>
    );
};

export default CreditRiskForm;
