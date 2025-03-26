/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          blue: {
            50: '#f0f5ff',
            100: '#e6f2ff',
            200: '#c9e2ff',
            300: '#a5d1ff',
            400: '#7fbcff',
            500: '#4da4ff',
            600: '#2b8cff',
            700: '#1275ff',
            800: '#0066ff',
            900: '#0052cc'
          }
        }
      },
    },
    plugins: [],
  }