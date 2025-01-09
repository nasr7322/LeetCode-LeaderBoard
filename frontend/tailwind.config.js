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
    },
  },
  plugins: [],
};