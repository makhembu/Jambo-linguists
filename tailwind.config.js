/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // class-based dark mode
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // adjust to your app directory
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        jambo: {
          50: 'var(--color-jambo-50)',
          100: 'var(--color-jambo-100)',
          200: 'var(--color-jambo-200)',
          300: 'var(--color-jambo-300)',
          400: 'var(--color-jambo-400)',
          500: 'var(--color-jambo-500)',
          600: 'var(--color-jambo-600)',
          700: 'var(--color-jambo-700)',
          800: 'var(--color-jambo-800)',
          900: 'var(--color-jambo-900)',
          950: 'var(--color-jambo-950)',
        },
        brandOrange: 'var(--color-brand-orange)',
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'ui-serif', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
