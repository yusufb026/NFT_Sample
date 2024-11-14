/* global module */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}', './hooks/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      Satoshi: ['Satoshi', 'Helvetica', 'Arial', 'sans-serif'],
      mono: defaultTheme.fontFamily.mono,
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1160px',
      xl: '1366px',
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '20px',
      xl: '24px',
      xxl: '32px',
      xxxl: '64px',
      jumbo: '48px',
      jumbo2: '72px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    colors: {
      ...defaultTheme.colors,
      mainChainTheme: {
        100: '#754f9c66',
        200: '#1B45F5',
      },
      green: {
        100: '#DAF6EB',
        200: '#BDEFDB',
        300: '#8CE3BF',
        400: '#63D9A9',
        500: '#3ACF92',
        600: '#29A874',
        700: '#1F7F58',
        800: '#165A3E',
        900: '#0D3525',
      },
      red: {
        100: '#FFD1D6',
        200: '#FFADB5',
        300: '#FF707E',
        400: '#FF3D50',
        600: '#D10014',
        700: '#9E000F',
        800: '#70000B',
        900: '#420006',
      },
      gray: {
        50: '#F4F4F4',
        100: '#E8E8E8',
        200: '#D6D6D6',
        300: '#B8B8B8',
        400: '#9E9E9E',
        500: '#858585',
        600: '#696969',
        700: '#696969',
        800: '#383838',
        900: '#212121',
        950: '#141414',
      },
      black: {
        25: '#00000040',
        50: '#0000000F',
        75: '#000000BF',
        80: '#000000CC',
        100: '#000000',
      },
      white: {
        0: '#00000000',
        30: '#FFFFFF1E',
        100: '#FFFFFF',
      },
      yellow: {
        300: '#FFE270',
        500: '#FFCE0A',
        600: '#D1A700',
      },
      orange: {
        100: '#FFEDD1',
        300: '#FFC770',
        400: '#FFB33D',
        500: '#FF9F0A',
        600: '#D17F00',
        800: '#704400',
        900: '#422800',
      },
      blue: {
        200: '#ADD6FF',
        300: '#70b7ff',
        400: '#3D9EFF',
        500: '#0A84FF',
      },
      indigo: {
        300: '#8583EC',
        400: '#5957E5',
        600: '#3949AB',
      },
      purple: {
        400: '#B558E4',
      },
    },
    extend: {
      animation: {
        fadeIn: 'fadeIn 2s ease-in-out',
        translate: 'translateY 1s ease-in-out',
      },
      keyframes: (theme) => ({
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        translateY: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50px)' },
        },
      }),
      backgroundImage: {
        astronaut:
          "url('https://assets.leapwallet.io/dashboard/images/backgrounds/astro-blur.png')",
        'gradient-radial': 'radial-gradient(circle at 75%, var(--tw-gradient-stops))',
        'gradient-radial-2': 'radial-gradient(circle at 90% -20%, var(--tw-gradient-stops))',
        overview:
          "url('https://assets.leapwallet.io/dashboard/images/backgrounds/overview-bg.png')",
        chains: "url('https://assets.leapwallet.io/dashboard/images/backgrounds/chains-bg.png')",
        chainsHeader:
          "url('https://assets.leapwallet.io/dashboard/images/backgrounds/chain-headers-bg.svg')",
        notifications:
          "url('https://assets.leapwallet.io/dashboard/images/backgrounds/notifications-bg.png')",
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
}

