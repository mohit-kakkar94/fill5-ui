/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: "320px",
      },
      keyframes: {
        breakApart: {
          "0%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "scale(0.5) rotate(10deg)",
            opacity: "0.5",
          },
          "100%": {
            transform: "scale(0) rotate(90deg)",
            opacity: "0",
          },
        },
        riseFade: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-20px)" },
        },
      },
      animation: {
        fadeOut: "breakApart 0.95s forwards",
        riseFade: "riseFade 1s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
