/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      colors:{
        "mycyan":"hsl(178, 100%, 50%)",
        "blue-soft": "hsl(215, 51%, 70%)"
      }
    },
  },
  plugins: [],
}
