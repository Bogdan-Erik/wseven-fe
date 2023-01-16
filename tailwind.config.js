/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
      },
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'white': '#ffffff',
      'black': '#000000',
      'light-green': '#bfffa933',
      'light-red': '#ffa9a933',
      'green': '#00AD1C',
      'eerie-black': '#19152a',
      'chinese-black': '#0e0e1c',
      'red': '#DF0000',
      'light-white': '#ffffff33',
      'light-grey': '#999999',
      'dark-bg': '#000012',
      'light-white-2': '#ffffff99',
      'transparent': 'transparent',
      'rgba-grey': 'rgba(255, 255, 255, 0.6)',
      'rgba-grey-01': 'rgba(255, 255, 255, 0.1)',
      'rgba-grey-02': 'rgba(255, 255, 255, 0.2)',
      'rgba-grey-06': 'rgba(255, 255, 255, 0.6)',
      'rgba-grey-007': 'rgba(255, 255, 255, 0.07)',
      'rgba-grey-08': 'rgba(255, 255, 255, 0.8)',
      'rgba-grey-03': 'rgba(0, 0, 18, 0.3)',
      'rgba-grey-dark-03': 'rgba(0, 0, 18, 0.3)',
      'rgba-grey-dark-08': 'rgba(0, 0, 18, 0.8)',
      'rgba-grey-dark-09': 'rgba(0, 0, 18, 0.9)',
      'rgba-white-05': 'rgba(255, 255, 255, 0.5)',
      'rgba-transparent-02': 'rgba(0, 0, 0, 0.1)',
      'gradient-blue-start': '#22C2CC',
      'gradient-purple-end': '#C900FF',
      'whitesmoke': '#d9d9d9',
      stone: colors.warmGray,
      sky: colors.lightBlue,
      neutral: colors.trueGray,
      gray: colors.coolGray,
      slate: colors.blueGray,
      violet: colors.violet

    },
    fontFamily: {
      'poppins': ['Poppins'],
      'body': ['"Poppins"'],
      'icomoon': ['icomoon']
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '2_5xl': '1.75rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '5_2xl': '3.5rem',
      '6xl': '4rem',
      '7xl': '15rem',
    },
    container: {

      // default breakpoints but with 40px removed
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1260px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
