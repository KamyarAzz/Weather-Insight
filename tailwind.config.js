/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-white": "rgba(255, 255, 255, 0.45)",
      },
      animation: {
        fadeInUp: "fadeInUp 0.5s ease-in-out",
      },
      keyframes: {
        fadeInUp: {
          "0%": {opacity: "0", transform: "translateY(10px)"},
          "100%": {opacity: "1", transform: "translateY(0)"},
        },
      },
    },
  },
  plugins: [],
};
