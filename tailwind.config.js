/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gradient-1': '#3a4fd6',
        'gradient-2': '#ce4db6',
        'gradient-3': '#ae93f0',
        'gradient-4': '#1289cd',
        'gradient-5': '#1bbbd2',
      },
      animation: {
        'gradient-bg': 'gradientBG 15s ease infinite',
      },
      keyframes: {
        gradientBG: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-animation':
          'linear-gradient(135deg, var(--gradient-1), var(--gradient-2), var(--gradient-3), var(--gradient-4), var(--gradient-5))',
        'custom-gradient':
          'linear-gradient(90deg, #3a4fd6, #ce4db6, #ae93f0, #1289cd, #1bbbd2)',
      },
      fontFamily: {
        viaoda: ['"Viaoda Libre"', 'serif'], // Lägg till din Google Font här
      },
      boxShadow: {
        'game-over':
          '0 0 0 10px rgba(255, 255, 255, 0.8), 0 0 15px 15px rgba(255, 255, 255, 0.6)',
      },
    },
  },
  plugins: [],
}
