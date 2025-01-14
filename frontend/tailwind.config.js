/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        leetcode: {
          text: '#eff1f6ff',
          dark: '#1a1a1a',
          button: '#2cbb5d',
          hover: '#2bad58',
          easy: '#00b8a3',
          medium: '#ffc01e',
          hard: '#ff375f',
        },
      },
      keyframes: {
        gradient: {
          '0%': { color: '#00b8a3' },
          '25%': { color: '#ffc01e' },
          '50%': { color: '#ff375f' },
          '75%': { color: '#ffc01e' },
          '100%': { color: '#00b8a3' },
        },
        gradientbg: {
          '0%': { background: '#00b8a3' },
          '25%': { background: '#ffc01e' },
          '50%': { background: '#ff375f' },
          '75%': { background: '#ffc01e' },
          '100%': { background: '#00b8a3' },
        },
      },
      animation: {
        gradient: 'gradient 10s ease-in infinite',
        gradientbg: 'gradientbg 10s ease-in infinite',
      },
    },
  },
  plugins: [],
};