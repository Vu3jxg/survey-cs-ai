/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lavender: "#E6E6FA", // Define lavender color if not already defined
        purple: {
          500: '#6B21A8', // Example color for purple
          700: '#4C1D95', // Example color for purple
        },
      },
      boxShadow: {
        'neon-lavender': '0 0 10px rgba(230, 230, 250, 0.8), 0 0 20px rgba(230, 230, 250, 0.6), 0 0 30px rgba(230, 230, 250, 0.4)', // Neon lavender effect
        'neon-purple': '0 0 10px rgba(107, 33, 168, 0.8), 0 0 20px rgba(107, 33, 168, 0.6), 0 0 30px rgba(107, 33, 168, 0.4)', // Neon purple effect
      },
      textShadow: {
        'neon-lavender': '0 0 5px rgba(230, 230, 250, 0.8), 0 0 10px rgba(230, 230, 250, 0.6), 0 0 15px rgba(230, 230, 250, 0.4)', // Neon lavender text shadow effect
        'neon-purple': '0 0 5px rgba(107, 33, 168, 0.8), 0 0 10px rgba(107, 33, 168, 0.6), 0 0 15px rgba(107, 33, 168, 0.4)', // Neon purple text shadow effect
      },
      fontSize: {
        '4xl': '2.25rem', // Customize the size if needed
        '5xl': '3rem', // Customize the size if needed
      },
      spacing: {
        'watermark-logo-width': '200px',
        'watermark-logo-margin': '10px',
        'watermark-text-size': '24px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // Add text-shadow plugin
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-neon-lavender': {
          textShadow: '0 0 5px rgba(230, 230, 250, 0.8), 0 0 10px rgba(230, 230, 250, 0.6), 0 0 15px rgba(230, 230, 250, 0.4)',
        },
        '.text-shadow-neon-purple': {
          textShadow: '0 0 5px rgba(107, 33, 168, 0.8), 0 0 10px rgba(107, 33, 168, 0.6), 0 0 15px rgba(107, 33, 168, 0.4)',
        },
      });
    },
  ],
  darkMode: 'class',
}
