import React from 'react';

const InfoSection = () => {
    const cards = [
        {
            icon: 'hub',
            title: 'Seamless Integration',
            description: 'Our SDK connects directly with your legacy SQL databases or modern cloud warehouses in minutes.',
            linkText: 'Integration Guide',
            iconBg: 'bg-indigo-50 dark:bg-primary/20',
            iconGradient: 'from-primary/10',
            iconColor: 'text-primary',
            linkColor: 'text-primary',
        },
        {
            icon: 'psychology',
            title: 'Neural Architecture',
            description: 'Deep learning models trained on curated financial datasets ensuring unbiased and precise outcomes.',
            linkText: 'Explore Models',
            iconBg: 'bg-purple-50 dark:bg-purple-500/20',
            iconGradient: 'from-secondary/10',
            iconColor: 'text-secondary dark:text-purple-400',
            linkColor: 'text-secondary dark:text-purple-400',
        },
        {
            icon: 'security',
            title: 'Enterprise Security',
            description: 'SOC2 Type II compliant with end-to-end AES-256 encryption for all sensitive borrower data.',
            linkText: 'Security Policy',
            iconBg: 'bg-teal-50 dark:bg-accent-teal/20',
            iconGradient: 'from-teal-500/10',
            iconColor: 'text-teal-600 dark:text-accent-teal',
            linkColor: 'text-teal-600 dark:text-accent-teal',
        },
    ];

    return (
        <section id="info-section" className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-12">
            {cards.map((card, idx) => (
                <div
                    key={idx}
                    className="glass-card p-10 md:p-12 rounded-3xl md:rounded-4xl group"
                >
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl ${card.iconBg} flex items-center justify-center mb-8 md:mb-10 relative overflow-hidden`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.iconGradient} to-transparent dark:hidden`}></div>
                        <span className={`material-symbols-outlined text-4xl ${card.iconColor} relative z-10`}>{card.icon}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-black dark:font-bold text-dark-charcoal dark:text-white mb-4 md:mb-5">
                        {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-8 md:mb-10 font-normal">
                        {card.description}
                    </p>

                    {/* Link */}
                    <a className={`inline-flex items-center gap-2 ${card.linkColor} font-bold text-sm group-hover:gap-4 transition-all cursor-pointer`} href="#">
                        {card.linkText} <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </a>
                </div>
            ))}
        </section>
    );
};

export default InfoSection;
