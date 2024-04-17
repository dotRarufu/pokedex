/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,svelte}'],

  theme: {
    extend: {
      colors: {
        text: {
          50: 'hsl(6, 77%, 5%)',
          100: 'hsl(9, 80%, 10%)',
          200: 'hsl(8, 80%, 20%)',
          300: 'hsl(8, 80%, 30%)',
          400: 'hsl(8, 80%, 40%)',
          500: 'hsl(8, 80%, 50%)',
          600: 'hsl(8, 80%, 60%)',
          700: 'hsl(8, 80%, 70%)',
          800: 'hsl(8, 80%, 80%)',
          900: 'hsl(9, 80%, 90%)',
          950: 'hsl(9, 77%, 95%)',
        },
        background: {
          50: 'hsl(5, 85%, 5%)',
          100: 'hsl(4, 84%, 10%)',
          200: 'hsl(5, 84%, 20%)',
          300: 'hsl(5, 86%, 30%)',
          400: 'hsl(5, 85%, 40%)',
          500: 'hsl(5, 85%, 50%)',
          600: 'hsl(5, 85%, 60%)',
          700: 'hsl(5, 86%, 70%)',
          800: 'hsl(5, 84%, 80%)',
          900: 'hsl(4, 84%, 90%)',
          950: 'hsl(5, 85%, 95%)',
        },
      },
      fontFamily: {
        sans: [
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
    },
  },
  plugins: [],
};
