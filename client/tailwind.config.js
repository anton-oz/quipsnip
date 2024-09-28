/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#599beb",
        mainDarker: "#4177ba",
        mainSecondary: "#6059eb",
        bg: "#1a1f23",
        bgSecondary: "#262d33",
        htmlBg: "#27272a",
        success: "#2af72a",
      },
      boxShadow: {
        brutal: "0.3em 0.3em 0 #6059eb",
        brutalGreen: "0.3em 0.3em 0 #29cf48",
      },

      keyframes: {
        slideIn: {
          "0%": {
            transform: "translateY(-1%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        textCycle: {
          "0%": {
            transform: "translateY(0)",
            opacity: "1",
            filter: "blur(0)",
          },
          "40%": {
            transform: "translateY(0)",
            opacity: "1",
            filter: "blur(0)",
            zIndex: "0",
          },
          "50%": {
            transform: "translateY(20%)",
            filter: "blur(5px)",
            opacity: "0",
            zIndex: "-10",
          },
          "90%": {
            transform: "translateY(-20%)",
            filter: "blur(5px)",
            opacity: "0",
            zIndex: "-10",
          },
          "100%": {
            transform: "translateY(0)",
            filter: "blur(0)",
            opacity: "1",
          },
        },
        textCycle2: {
          "0%": {
            transform: "translateY(-20%)",
            filter: "blur(5px)",
            opacity: "0",
          },
          "40%": {
            transform: "translateY(-20%)",
            filter: "blur(5px)",
            opacity: "0",
          },
          "50%": {
            transform: "translateY(0)",
            filter: "blur(0)",
            opacity: "1",
          },
          "90%": {
            transform: "translateY(0)",
            filter: "blur(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(20%)",
            filter: "blur(5px)",
            opacity: "0",
          },
        },
      },
      animation: {
        slideIn: "slideIn 0.2s ease-in",
        textCycle: "textCycle 10s ease-in-out infinite",
        textCycle2: "textCycle2 10s ease-in-out infinite",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
