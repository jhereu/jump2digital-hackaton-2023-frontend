/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: {
          // Rick and Morty logo blue
          500: "#42b4ca",
          600: "#2f94a7",
          // lighter
          300: "#b3e1ea",
          // darker
          800: "#0c252a",
          900: "#174a54",
        },
        customGreen: {
          // Rick and Morty logo green
          500: "#bfde42",
          // lighter
          300: "#e5f2b3",
          // darker
          900: "#526211",
        },
      },
      fontFamily: {
        rickAndMorty: ["RickAndMorty", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
