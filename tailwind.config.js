/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sarala: ['"Sarala"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
