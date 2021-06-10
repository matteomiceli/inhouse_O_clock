const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
//   purge: {
//     enabled: true,
//     content: [
//         './src/**/*.html',
//         './src/views/*.ejs',
//     ],
// },
  darkMode: false, // or 'media' or 'class',
  theme: {
    extend: {
      backgroundImage: theme => ({
        'league-bg': "url('/img/league_bg.jpg')",
        'league-banner': "url('/img/league-banner.jpg')"
      }),
      fontFamily: {
        body: ['Roboto', 'sans-serif'],
        heading: ['Anton', 'sans-serif']
      },
      colors: {
        'int-red': '#b4200f',
        'int-blue': '#2583ffff',
        'int-blue-light': '#4294ff'
      },
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ['active']
    },
  },
  plugins: [],
}
