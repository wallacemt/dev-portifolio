/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
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
        primary90: '#FF2F00',
        primary80: '#F9370B',
        primary70: '#FF481F',
        neutral10: '#E5E5E5',
        neutral80: '#333333',
        neutral90: '#1A1A1A',
      },
      fontFamily: {
        principal: ["Volkhov", "serif"],
        secundaria: ["Manrope", "serif"],
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [
    typography
  ],
  
}

