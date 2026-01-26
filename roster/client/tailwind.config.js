/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#F5F5F5',
        text: '#1A1A1A',
        accent: '#2B4C7E',
        charcoal: '#333333',
        border: '#E5E5E5',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
