import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warmRice: '#F7F6F2',
        obsidian: '#1A1918',
        charcoal: '#262524',
        subtleGray: '#73716B',
        cinnabar: '#8C2D19',
        matteGold: '#C2A675',
        stoneBorder: '#E7E5E4'
      },
      fontFamily: {
        serif: ['Noto Serif TC', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Noto Sans TC', 'sans-serif'],
      },
      boxShadow: {
        'oriental': '0 10px 30px -10px rgba(26, 25, 24, 0.08)',
        'oriental-hover': '0 20px 40px -15px rgba(140, 45, 25, 0.12)',
      }
    },
  },
  plugins: [],
};

export default config;
