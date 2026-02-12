module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: 'var(--color-orange)',
        pale_orange: 'var(--color-pale_orange)',
        black: 'var(--color-black)',
        white: 'var(--color-white)',
      },
    },
  },
  plugins: [],
};
