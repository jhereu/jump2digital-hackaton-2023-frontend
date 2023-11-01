/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: {
          500: "#42b4ca",
        },
        customGreen: {
          500: "#bfde42",
        },
      },
      fontFamily: {
        rickAndMorty: ["RickAndMorty", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
