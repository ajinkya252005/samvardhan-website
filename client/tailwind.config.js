/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // We are adding a new font called "bebas"
        'bebas': ['"Bebas Neue"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}