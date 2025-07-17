/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "weather-teal":"#065e81",
        "weather-teal-offset": "#084861"
      }
    },
  },
  plugins: [],
}

