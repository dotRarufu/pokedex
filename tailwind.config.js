/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,svelte}"],

  theme: {
    extend: {
      colors: {
        text: {
          500: "#050315",
        },
        background: {
          100: "hsl(0, 0%, 96%)",
          200: " hsl(0, 0%, 86%)",
        },
        primary: {
          500: "hsl(225, 3%, 70%)",
          400: "hsl(210, 2%, 26%)",
          300: "hsl(220, 1%, 45%)",
          200: "hsl(220, 1%, 55%)",
        },
      },
      fontSize: {
        h3: "3.157rem", // 50.52px
        h4: "2.369rem", //37.9 px
        h5: "1.777rem", // 28.43px
        h6: "1.333rem", // 21.33px
      },
      fontFamily: {
        sans: [
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
};
