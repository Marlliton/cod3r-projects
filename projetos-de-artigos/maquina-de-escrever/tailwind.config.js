/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "animar-cursor": {
          "0%": {
            color: "rgb(124 58 237)",
          },
          "100%": {
            color: "rgba(0,0,0,0)",
          },
        },
      },
      animation: {
        "animar-cursor": "animar-cursor .8s infinite",
      },
    },
  },
  plugins: [],
};
