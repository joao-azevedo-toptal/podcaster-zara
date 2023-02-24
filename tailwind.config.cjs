/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        DEFAULT:
          "0 5px 15px 0 rgb(0 0 0 / 0.1), 0 5px 10px -5px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
