// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Scan JavaScript and TypeScript files in the src directory
    './public/index.html', // Scan HTML files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Add any Tailwind CSS plugins here
    // For example, '@tailwindcss/forms' for form styles
  ],
};
