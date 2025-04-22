/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backfaceVisibility: {
        hidden: 'hidden',
      },
    },
  },
  plugins: [],
  safelist: ['rotate-y-180'],
};
