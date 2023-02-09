/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    gridTemplateColumns: {
      'fill-25': 'repeat(auto-fit, 350px)',
    },
    extend: {},
    colors: {
      primaryColor: '#21E6C1',
      secondaryColor: '#278EA5',
      backgroundColor: '#2B2B2B',
      blackColor: '#4F4F4F',
      whiteColor: '#ffffff',
      darkGrayColor: '#858584',
      ligthGrayColor: '#EFF0F4',
      ligthGrayColorHover: '#474A56',
      black: '#000000',
      mint: '#00FFF6',
      mintHover: '#278EA5',
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
