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
      },
      boxShadow: {
        'custom-white': '0 0.5rem 1rem rgba(255, 255, 255, 0.3)',
        'custom-dual': '0.1rem 0.1rem 1.5rem grey, -0.1rem -0.1rem 1.5rem white',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
      addUtilities({
        '.text-shadow-white-glow': {
          textShadow: '0rem 0rem 0.45rem white',
        },
      });
    },
  ],
} satisfies Config;
