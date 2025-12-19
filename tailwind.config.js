/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#050505", // Very deep black
          charcoal: "#121212", // Surface
          purple: "#7c3aed", // Neon Purple
          blue: "#0ea5e9", // Neon Blue
          gold: "#fbbf24", // Gold
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'], // Bold artistic font
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/noise.svg')", // We'll need a noise texture or similar if detailed
      }
    },
  },
  plugins: [],
}
