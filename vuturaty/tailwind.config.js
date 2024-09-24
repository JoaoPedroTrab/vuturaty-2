/** @type {import('tailwindcss').Config} */

const colors = require('./src/config/colors').default;

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'oswald': ['Oswald', 'sans-serif'],
      },
      boxShadow: {
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      transitionProperty: {
        'all': 'all',
      },
      colors: {
        primary: {
          blue:{
            main: colors.primary.blue.dark,
            light: colors.primary.blue.light,
            dark: colors.primary.blue.dark,
          },
          yellow:{
            main: colors.primary.yellow,
            light: colors.primary.yellow,
          },
          },
        neutral:{
          white: colors.neutral.white,
          gray:{
            50: colors.neutral.gray[50],
            100: colors.neutral.gray[100],
            200: colors.neutral.gray[200],
            300: colors.neutral.gray[300],
            400: colors.neutral.gray[400],
            500: colors.neutral.gray[500],
            600: colors.neutral.gray[600],
            700: colors.neutral.gray[700],
            800: colors.neutral.gray[800],
            900: colors.neutral.gray[900],
          },
          },
        accent:{
          green: colors.accent.green,
          red: colors.accent.red,
        },
        },
        },
        },
  variants: {
    extend: {
      scale: ['hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
  safelist: [
    {
      pattern: /bg-(\[#.+\]|primary-.|neutral-.)/,
    },
    {
      pattern: /text-(\[#.+\]|primary-.|neutral-.)/,
    },
    {
      pattern: /hover:bg-(\[#.+\]|primary-.|neutral-.)/,
    },
  ],
}