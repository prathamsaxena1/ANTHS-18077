/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Your custom theme extensions
      colors: {
        // Example hotel-themed colors
        'hotel-primary': '#0F4C81',    // Deep blue
        'hotel-accent': '#E8C547',     // Gold accent
      },
      fontFamily: {
        // Example custom fonts
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}