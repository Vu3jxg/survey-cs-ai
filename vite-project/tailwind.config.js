/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lavender: "#E6E6FA", 
        purple: {
          500: '#6B21A8', 
          700: '#4C1D95',
        },
      },
      boxShadow: {
        'neon-lavender': '0 0 10px rgba(230, 230, 250, 0.8), 0 0 20px rgba(230, 230, 250, 0.6), 0 0 30px rgba(230, 230, 250, 0.4)',
        'neon-purple': '0 0 10px rgba(107, 33, 168, 0.8), 0 0 20px rgba(107, 33, 168, 0.6), 0 0 30px rgba(107, 33, 168, 0.4)',
      },
      textShadow: {
        'neon-lavender': '0 0 5px rgba(230, 230, 250, 0.8), 0 0 10px rgba(230, 230, 250, 0.6), 0 0 15px rgba(230, 230, 250, 0.4)',
        'neon-purple': '0 0 5px rgba(107, 33, 168, 0.8), 0 0 10px rgba(107, 33, 168, 0.6), 0 0 15px rgba(107, 33, 168, 0.4)',
      },
      fontSize: {
        '4xl': '2.25rem', 
        '5xl': '3rem', 
      },
      spacing: {
        'watermark-logo-width': '200px',
        'watermark-logo-margin': '10px',
        'watermark-text-size': '24px',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        slide: 'slide 40s linear infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
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
