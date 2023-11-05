/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        blue: "#377DFF",
        green: "#38CB89",
        red: "#FF5630",
        yellow: "#FFA600",
        teal: "#56CCF2",
        dark: "#333333",
        grey: {
          muted: "#CCCCCC",
          dark: "#8F8F8F",
          mid: "#B2B2B2",
        },
      },
      fontFamily: {
        sans: ["Cera Pro", "sans-serif"],
      },
    },
  },
  plugins: [],
};
