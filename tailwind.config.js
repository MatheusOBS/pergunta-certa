/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./App.tsx"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#137fec', // Azul do Balão
                'primary-dark': '#0c5fb8', // Darker blue
                accent: '#ef4444', // Vermelho do Alvo
                'background-light': '#f6f7f8',
                'background-dark': '#101922',
                'card-light': '#ffffff',
                'card-dark': '#192736',
                'text-light': '#1F2937',
                'text-dark': '#F9FAFB',
            },
            fontFamily: {
                display: ['Manrope', 'sans-serif'],
            },
            borderRadius: {
                DEFAULT: '0.25rem',
                lg: '0.5rem',
                xl: '0.75rem',
                full: '9999px',
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                fadeIn: 'fadeIn 0.5s ease-out forwards',
                progress: 'progress 2s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                progress: {
                    '0%': { left: '-40%' },
                    '100%': { left: '100%' },
                },
            },
        },
    },
    plugins: [],
}
