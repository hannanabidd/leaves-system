const colors = require('tailwindcss/colors')

module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",   
    ],
    theme: {
      extend: {
        colors: {
          sky: colors.sky,
          teal: colors.teal,
        },
      },
    },
    plugins: [
      // ...
      
      // require('@tailwindcss/forms'),
    ],
  }