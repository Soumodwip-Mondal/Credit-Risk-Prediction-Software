import React from 'react';

const CreditCardIcon = () => {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
        >
            {/* Card background with gradient */}
            <defs>
                <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="chipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#FCD34D', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#F59E0B', stopOpacity: 1 }} />
                </linearGradient>
            </defs>

            {/* Card shape */}
            <rect
                x="4"
                y="16"
                width="56"
                height="36"
                rx="4"
                fill="url(#cardGradient)"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="0.5"
            />

            {/* Magnetic stripe */}
            <rect
                x="4"
                y="24"
                width="56"
                height="6"
                fill="rgba(0, 0, 0, 0.3)"
            />

            {/* Chip */}
            <rect
                x="12"
                y="34"
                width="10"
                height="8"
                rx="1"
                fill="url(#chipGradient)"
                stroke="rgba(0, 0, 0, 0.2)"
                strokeWidth="0.5"
            />
            <line x1="14" y1="35" x2="14" y2="41" stroke="rgba(0, 0, 0, 0.2)" strokeWidth="0.3" />
            <line x1="16" y1="35" x2="16" y2="41" stroke="rgba(0, 0, 0, 0.2)" strokeWidth="0.3" />
            <line x1="18" y1="35" x2="18" y2="41" stroke="rgba(0, 0, 0, 0.2)" strokeWidth="0.3" />
            <line x1="20" y1="35" x2="20" y2="41" stroke="rgba(0, 0, 0, 0.2)" strokeWidth="0.3" />

            {/* Contactless payment symbol */}
            <path
                d="M 48 34 Q 50 36 48 38"
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
            />
            <path
                d="M 51 32 Q 54 36 51 40"
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
            />
            <path
                d="M 54 30 Q 58 36 54 42"
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
            />

            {/* Card numbers (abstract dots) */}
            <circle cx="28" cy="44" r="0.8" fill="rgba(255, 255, 255, 0.7)" />
            <circle cx="31" cy="44" r="0.8" fill="rgba(255, 255, 255, 0.7)" />
            <circle cx="34" cy="44" r="0.8" fill="rgba(255, 255, 255, 0.7)" />
            <circle cx="37" cy="44" r="0.8" fill="rgba(255, 255, 255, 0.7)" />
        </svg>
    );
};

export default CreditCardIcon;
