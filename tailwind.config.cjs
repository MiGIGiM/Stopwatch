/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      }
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/forms'),],
  daisyui: {
    themes: ["cmyk"]
  }
}