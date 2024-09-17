/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#599beb",
        mainSecondary: "#6059eb",
        bg: "#1a1f23",
        bgSecondary: "#262d33",
      },
      boxShadow: {
        brutal: "0.3em 0.3em 0 #6059eb",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(-1%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        slideIn: "slideIn 0.2s ease-in",
      },
    },
  },
  plugins: [],
};
