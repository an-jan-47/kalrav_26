/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kalrav-dark': '#0f0c15', 
        'kalrav-purple': '#6d28d9',
        'kalrav-accent': '#a855f7', 
        'kalrav-gray': '#1f2937',
      },
      fontFamily: {
        kalrav: ['Kalrav', 'sans-serif'],
        'kalrav-body': ['Kalrav-body', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, transparent, #0f0c15)',
      }
    },
  },
  plugins: [],
}