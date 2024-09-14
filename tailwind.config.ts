import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // To use Material UI's preflight instead (CssBaseline)
  },
  plugins: [],
};

export default config;
