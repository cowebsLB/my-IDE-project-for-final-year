/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#1e1e1e',
          panel: '#252526',
          border: '#3e3e42',
          text: '#cccccc',
          hover: '#2a2d2e',
        }
      }
    },
  },
  plugins: [],
}

