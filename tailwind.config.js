/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "neutral-base": "#020014",
        "neutrals-100": "#ECECF2",
        "neutrals-200": "#D6D6E1",
        "neutrals-300": "#B1B3C8",
        "neutrals-400": "#878BA9",
        "neutrals-500": "#686C8F",
        "neutrals-600": "#535576",
        "neutrals-800": "#3B3C51",
        "neutrals-900": "#2C2C3B",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};
