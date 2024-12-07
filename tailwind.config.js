/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        DarkP: "#F2F8EF",
        DarkP2: "#DCD6D1",
        DarkA1: "#CACCC4", 
        DarkA2: "#666F7D",
        DarkA3: "#A9B8B6",
        DarkA4: "#6A7276",
        Destaque: "#FF563C",
      },
      fontFamily: {
        principal: ["Volkhov", "serif"],
        secundaria: ["Manrope", "serif"],
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

