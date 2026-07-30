/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core brand green from the mock (dark forest green used in
        // buttons, footer, and the project spotlight panel)
        brand: {
          50: '#eef4f1',
          100: '#d6e6de',
          200: '#a9ccbb',
          300: '#7bb298',
          400: '#4d9875',
          500: '#2f7d5c',
          600: '#1f5f45', // primary buttons / links
          700: '#164a36', // headings accent, footer bg
          800: '#0f3527',
          900: '#0a251b',
        },
        ink: {
          900: '#111827', // headings
          600: '#4b5563', // body copy
          400: '#9ca3af', // muted / captions
        },
        surface: {
          light: '#f5f7f6', // alternating section background
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}
