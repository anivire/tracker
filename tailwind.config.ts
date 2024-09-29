import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F2ECEF',
        foreground: '#FCF8FA',
        surface: '#ECE7E9',
        fill: '#C0BBBD',
        accent: '#1E1C1D',
        'accent-gradient': '#847B80',
        'tracker-white': '#F2ECEF',
        'tracker-gray': '#847B80',
        'tracker-pink': '#EE59A4',
        'tracker-light-pink': '#FAE8F2',
      },
    },
  },
  plugins: [],
};
export default config;
