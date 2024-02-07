/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "neutral-base": "#020014",
        "neutrals-200": "#D6D6E1",
        "neutrals-600": "#535576",
        "neutrals-800": "#3B3C51",
      },
    },
  },
  plugins: [],
};
