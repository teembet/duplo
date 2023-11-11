module.exports = {
  content: ["./src/**/*.{html,ts,tsx,js,jsx,md,mdx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        blue: {
          main: "#264ABC",
          light: "#587EE0",
          dark: "#0B315E",
          faint: "#F6FAFF",
        },
        black: "#1a1a1a",
        white: "#FFFFFF",
        gray: {
          200: "#F5F5F4",
          300: "#EAEAEA",
          400: "#CCCCCC",
          500: "#999999",
          600: "#555555",
          700: "#333333",
          background: "#FAFAFB",
          main_40: "#A5A5A5",
          main_10: "#FAFAFB",
          main_80: "#3E3833",
        },
        magenta: {
          main: "#B00075",
          light: "#FF00AB",
          dark: "#631E4C",
          lighter: "#E845B2",
          faint: "#F194D2",
          fainter: "#FDDFF3",
        },
        orange: {
          main: "#FF9D01",
          light: "#FF9D01",
          dark: "#865200",
          lighter: "#FAAC2F",
          faint: "#FBBD59",
          fainter: "#FDD79B",
        },
        red: {
          main: "#F52100",
          light: "#FF4747",
          dark: "#CC0000",
          lighter: "#FF9999",
          faint: "#FFCCCC",
          fainter: "#FFEBEB",
        },
        green: {
          main: "#109373",
          light: "#8FE74B",
          dark: "#52A216",
          lighter: "#B0EE81",
          faint: "#DDF8C9",
          fainter: "#F4FDED",
        },
        yellow: {
          main: "#FDC300",
          light: "#FFDE5C",
          dark: "#CCA300",
          lighter: "#FFEB99",
          faint: "#FFF5CC",
          fainter: "#FFFAE5",
        },
      },
      boxShadow: {
        custom: "0px 2px 4px rgba(217, 217, 217, 0.25)",
      },
      fontFamily: {
        heroNew: ["Hero New", "sans-serif"],
        foundersGrotesk: ["Founders Grotesk", "sans-serif"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5%)" },
        },
      },
    },
  },
  plugins: [],
};
