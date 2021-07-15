const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
//   purge: {
//     enabled: true,
//     content: [
//         './src/**/*.html',
//         './src/views/*.ejs',
//         './src/public/js/*.js',
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
        body: ['Noto Sans JP', 'sans-serif'],
        heading: ['Anton', 'sans-serif']
      },
      colors: {
        'int-red': '#b4200f',
        'int-red-light': '',
        'int-blue': '#2583ffff',
        'int-blue-light': '#59a1ff'
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
