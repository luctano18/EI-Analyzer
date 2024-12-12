/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px'
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem'
      },
      fontSize: {
        'xxs': '0.625rem',
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem'
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      colors: {
        earth: {
          100: '#FFF5E6',
          200: '#FFE5CC',
          300: '#FFD4B3',
          400: '#FFC299',
          500: '#FFB380',
          600: '#D4691E',
        },
      },
      backgroundImage: {
        'kente-pattern': 'repeating-linear-gradient(45deg, rgba(251, 191, 36, 0.1) 0px, rgba(251, 191, 36, 0.1) 10px, transparent 10px, transparent 20px)',
        'mud-cloth': 'linear-gradient(45deg, rgba(251, 191, 36, 0.05) 25%, transparent 25%, transparent 50%, rgba(251, 191, 36, 0.05) 50%, rgba(251, 191, 36, 0.05) 75%, transparent 75%, transparent)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')
  ],
};