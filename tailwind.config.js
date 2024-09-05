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
        'gradient-bg': 'gradientBG 5s ease infinite',
      },
      keyframes: {
        gradientBG: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-animation':
          'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
