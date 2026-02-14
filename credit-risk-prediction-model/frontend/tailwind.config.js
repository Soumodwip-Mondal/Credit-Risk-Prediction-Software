/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Custom color palette matching existing design
                'accent': {
                    DEFAULT: '#667eea',
                    light: '#8b9df6',
                },
                'poor': '#ef4444',
                'average': '#f59e0b',
                'good': '#10b981',
                'excellent': '#06b6d4',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'gradient-secondary': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'gradient-success': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'gradient-dark': 'linear-gradient(135deg, #0a0614 0%, #1a1428 50%, #0f0a1e 100%)',
            },
            backdropBlur: {
                'glass': '10px',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(102, 126, 234, 0.4)',
            },
            keyframes: {
                fadeIn: {
                    from: {
                        opacity: '0',
                        transform: 'translateY(10px)',
                    },
                    to: {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                slideIn: {
                    from: {
                        opacity: '0',
                        transform: 'translateX(-20px)',
                    },
                    to: {
                        opacity: '1',
                        transform: 'translateX(0)',
                    },
                },
                scaleIn: {
                    from: {
                        opacity: '0',
                        transform: 'scale(0.9)',
                    },
                    to: {
                        opacity: '1',
                        transform: 'scale(1)',
                    },
                },
                pulse: {
                    '0%, 100%': {
                        opacity: '0.5',
                    },
                    '50%': {
                        opacity: '1',
                    },
                },
                spin: {
                    to: {
                        transform: 'rotate(360deg)',
                    },
                },
                shimmer: {
                    from: {
                        left: '-100%',
                    },
                    to: {
                        left: '100%',
                    },
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-in': 'slideIn 0.5s ease-out',
                'scale-in': 'scaleIn 0.5s ease-out',
                'pulse-bg': 'pulse 8s ease-in-out infinite',
                'spin': 'spin 0.8s linear infinite',
                'shimmer': 'shimmer 0.5s',
            },
        },
    },
    plugins: [],
}
