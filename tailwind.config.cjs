/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        DEFAULT:
          "0 5px 15px 0 rgb(0 0 0 / 0.1), 0 5px 10px -5px rgb(0 0 0 / 0.1)",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
