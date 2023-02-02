/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    gridTemplateColumns: {
      'fill-25': 'repeat(auto-fit)',
    },
    extend: {},
    colors: {
      primaryColor: '#21E6C1',
      secondaryColor: '#278EA5',
      backgroundColor: '#3b3b3b',
      blackColor: '#4F4F4F',
      whiteColor: '#ffffff',
      darkGrayColor: '#858584',
      ligthGrayColor: '#EFF0F4',
      black: '#000000',
      mint: '#00FFF6',
      darkBlue: '#071E3D',
      lightGray: '#B4B4B4',
      transparent: 'transparent',
      green: '#38E54D',
      red: '#FF0032',
      greenLight: '#A8E890',
      redLight: '#F15412',
    },
  },
  plugins: [],
};
