import React from 'react';

const CreditCardIcon = () => {
    return (
        <div className="relative flex justify-center items-center">
            {/* Glow Background */}
            <div className="absolute shape-blob w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>

            {/* Card */}
            <div className="relative w-full max-w-[480px] aspect-[1.6/1] rounded-[2.5rem] dark:rounded-2xl frosted-3d-card p-10 dark:p-8 flex flex-col justify-between overflow-hidden">

                {/* Top Row */}
                <div className="flex justify-between items-start">
                    {/* Light: Terminal icon   Dark: Contactless icon */}
                    <div className="w-16 h-16 dark:w-auto dark:h-auto rounded-2xl bg-gradient-to-br from-white/80 to-white/20 dark:from-transparent dark:to-transparent flex items-center justify-center border border-white/50 dark:border-none shadow-lg dark:shadow-none">
                        <span className="material-symbols-outlined text-4xl text-primary dark:text-white/80 hidden dark:inline">contactless</span>
                        <span className="material-symbols-outlined text-4xl text-primary dark:hidden">terminal</span>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-white/40 mb-1 font-black dark:font-normal">Model Status</div>
                        <div className="text-sm font-black dark:font-bold text-primary dark:text-accent-teal">OPTIMIZED CORE</div>
                    </div>
                </div>

                {/* Bottom Content */}
                <div className="space-y-6 dark:space-y-4">
                    <div className="text-3xl dark:text-2xl font-mono tracking-widest dark:tracking-[0.2em] text-dark-charcoal/90 dark:text-white/90">
                        <span className="dark:hidden">RISK_NODE_V9</span>
                        <span className="hidden dark:inline">**** **** **** 8842</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-[10px] dark:text-[8px] uppercase tracking-widest text-slate-500 dark:text-white/40 font-black dark:font-normal">Authorized by</div>
                            <div className="text-lg dark:text-sm font-bold dark:font-medium uppercase tracking-wider text-dark-charcoal dark:text-white">
                                <span className="dark:hidden">AI Engine Lambda</span>
                                <span className="hidden dark:inline">Neural Core v4.0</span>
                            </div>
                        </div>
                        {/* Light: colored circles   Dark: lock icon */}
                        <div className="flex -space-x-3 dark:hidden">
                            <div className="w-10 h-10 rounded-full bg-emerald-400 border-2 border-white/50"></div>
                            <div className="w-10 h-10 rounded-full bg-primary border-2 border-white/50"></div>
                        </div>
                        <div className="hidden dark:flex w-12 h-12 rounded-full bg-gradient-to-tr from-white/10 to-white/30 items-center justify-center backdrop-blur-md">
                            <span className="material-symbols-outlined text-white/80">lock</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditCardIcon;
