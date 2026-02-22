/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#667eea",
                "secondary": "#764ba2",
                "dark-charcoal": "#1E293B",
                "accent-teal": "#06b6d4",
                "background-light": "#F8FAFC",
                "background-dark": "#0a0e1a",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.5rem",
                "lg": "1rem",
                "xl": "1.5rem",
                "2xl": "2rem",
                "3xl": "2.5rem",
                "4xl": "3.5rem",
                "full": "9999px"
            },
            keyframes: {
                shimmer: {
                    '0%': { transform: 'translateX(-100%) rotate(45deg)' },
                    '100%': { transform: 'translateX(100%) rotate(45deg)' },
                },
                'pulse-dot': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.4' },
                },
                fadeIn: {
                    from: { opacity: '0', transform: 'translateY(10px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    from: { opacity: '0', transform: 'scale(0.95)' },
                    to: { opacity: '1', transform: 'scale(1)' },
                },
            },
            animation: {
                'shimmer': 'shimmer 3s infinite',
                'pulse-dot': 'pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'scale-in': 'scaleIn 0.5s ease-out forwards',
            },
        },
    },
    plugins: [],
}
