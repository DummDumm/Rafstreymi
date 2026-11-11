/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        // Deep green taken from the Rafstreymi logo
        brand: {
          50: '#eff6f2',
          100: '#d9e9e0',
          200: '#b3d3c2',
          300: '#84b69e',
          400: '#56967a',
          500: '#377a5e',
          600: '#27624a',
          700: '#1d4d3a',
          800: '#163b2d',
          900: '#0f2a20',
          950: '#0a1d16',
        },
        // Warm "lights on" accent
        glow: {
          100: '#fff3cf',
          200: '#ffe49a',
          300: '#ffd465',
          400: '#ffc233',
          500: '#f5a800',
        },
        ink: '#10201a',
        mist: '#f3f7f4',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['Figtree', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,32,26,0.04), 0 14px 34px -18px rgba(16,32,26,0.22)',
        lift: '0 2px 4px rgba(16,32,26,0.05), 0 24px 48px -20px rgba(16,32,26,0.3)',
      },
    },
  },
  plugins: [],
}
