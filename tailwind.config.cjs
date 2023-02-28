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
      },
      animation: {
        rotate: 'rotate 1s ease-in-out',
      },
      keyframes: {
        rotate: {
          '0%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(-30deg)',
          },
          '75%': {
            transform: 'rotate(30deg)',
          },
        },
      },
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/forms'),],
  daisyui: {
    themes: ["cmyk", "dracula"],
  }
}