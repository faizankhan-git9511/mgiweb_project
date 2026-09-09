/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#f97316", // Worker Orange
        "primary-dark": "#ea580c",
        "primary-container": "#f97316",
        "on-primary": "#ffffff",
        "secondary": "#0f172a", // Civic Navy/Slate
        "secondary-container": "#dae2fd",
        "on-secondary": "#ffffff",
        "tertiary": "#10b981", // Verified Emerald
        "tertiary-container": "#00b07a",
        "on-tertiary": "#ffffff",
        "surface": "#f8fafc",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#eff4ff",
        "surface-container": "#e5eeff",
        "surface-container-high": "#dce9ff",
        "background": "#f8fafc",
        "on-background": "#0b1c30",
        "on-surface": "#0b1c30",
        "on-surface-variant": "#584237",
        "outline": "#8c7164",
        "outline-variant": "#e0c0b1",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
        display: ['Bricolage Grotesque', 'sans-serif'],
        heading: ['Bricolage Grotesque', 'sans-serif'],
      },
      borderRadius: {
        'DEFAULT': '1rem',
        'lg': '2rem',
        'xl': '3rem',
        'full': '9999px',
      }
    },
  },
  plugins: [],
}
