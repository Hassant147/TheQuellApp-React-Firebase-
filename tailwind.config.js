/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width:{
        '90':'90%',
        '85':"85%"
      },
      fontSize:{
        '66':'66px',
        '46':'46px'
      },
      transform: ['hover', 'focus'], // Enable transform on hover and focus
      colors: {
        'color': '#F5F5FA', // Define your custom color
        'purple1':'#9747FF',
      },
    },
    fontFamily: {
      'manrope': ['Manrope', 'sans-serif'],
      'poppins': ['Poppins', 'sans-serif'],
    },
    boxShadow: {
      'custom': '-10px -10px 20px 0px #FFF, 10px 10px 20px 0px rgba(170, 170, 204, 0.50), 5px 5px 10px 0px rgba(170, 170, 204, 0.25), -5px -5px 10px 0px rgba(255, 255, 255, 0.50)',
      'bcustom': '-10px -10px 20px 0px #FFF, 10px 10px 20px 0px rgba(170, 170, 204, 0.50), 5px 5px 10px 0px rgba(170, 170, 204, 0.25), -5px -5px 10px 0px rgba(255, 255, 255, 0.50)',
    },
  },
  plugins: [],
}
