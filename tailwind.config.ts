import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          charcoal: "#171B18",   
          forest: "#243B2F",     
          sage: "#9EAF91",       
          cream: "#E6E9D8",      
          sand: "#C7AE8A",
          lime: "#C5F078",
        },
      },
    },
  },
  plugins: [],
};
export default config;