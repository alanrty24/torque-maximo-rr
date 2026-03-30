import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#ea841f',
        'primary-dark': '#c0581b',
        'primary-light': '#F69E36',
        'background-light': '#ffffff',
        'background-dark': '#0a0a0a',
        'slate-custom': '#1a1a1a',
        silver: '#c0c0c0',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
};

export default config;
