/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "#ECE7DD",
        paper: "#F4F0E8",
        forest: "#1F2A24",
        ink: "#16201B",
        moss: "#4A5340",
        slate: "#5B6E78",
        coral: "#E2553B",
        clay: "#C9583C",
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Hanken Grotesk", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Space Mono", "monospace"],
        jp: ["var(--font-jp-sans)", "sans-serif"],
        jpserif: ["var(--font-jp-serif)", "serif"],
      },
      letterSpacing: {
        label: "0.28em",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "30%": { transform: "translate(3%, -15%)" },
          "50%": { transform: "translate(12%, 9%)" },
          "70%": { transform: "translate(-9%, 4%)" },
          "90%": { transform: "translate(4%, -8%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        grain: "grain 8s steps(6) infinite",
      },
    },
  },
  plugins: [],
};
