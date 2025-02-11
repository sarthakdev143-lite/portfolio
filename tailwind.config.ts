import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      textShadow: {
        'white-glow': '0rem 0rem 0.45rem white',
        'glow': '0 0 1rem rgba(238, 238, 238, 0.075)',
        'heading-shine': '0 0 2.5rem gold',
        'heading-stylish': '0 0 2.5rem rgb(255, 0, 128)',
      },
      boxShadow: {
        'custom-white': '0 0.5rem 1rem rgba(255, 255, 255, 0.3)',
        'custom-dual': '0.1rem 0.1rem 1.5rem grey, -0.1rem -0.1rem 1.5rem white',
        'custom-dbc-black': "0 0.4rem 0.6rem rgb(0, 0, 0), 0 0.1rem 0.3rem rgba(0, 0, 0, 0.3)",
      },
      fontSize: {
        'stylish-heading': 'clamp(7rem, 11vw + 4rem, 15rem)',
        'stylish-subheading': 'clamp(1.2rem, 2.5vw + 0.75rem, 3rem)',
      },
      spacing: {
        'word-space-05': '5rem',
      },
      screens: {
        'ss': '310px',
      }
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
      addUtilities({
        '.text-shadow-white-glow': {
          textShadow: '0rem 0rem 0.45rem white',
        },
      });
    },
  ],
} satisfies Config;
