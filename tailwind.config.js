/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Growth Core
      colors: {
        ink: '#0A0A0A',
        forest: '#0E2E1F',
        accent: '#C6FF4D',
        paper: '#FAF7E8',
        muted: '#A7A7A7',
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
    },
  },
  plugins: [],
}
