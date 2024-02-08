/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
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
