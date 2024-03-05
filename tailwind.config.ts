import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        us: '0.6875rem', // 11px
        ss: '0.8125rem', // 13px
        sl: '0.9375rem', // 15px
        md: '1.125rem', // 18px
        '1.5xl': '1.375rem', // 22px
      },
      colors: {
        raspberry: {
          50: '#fce9ef',
          100: '#f9d2de',
          200: '#f6bcce',
          300: '#f6bcce',
          400: '#f08fad',
          500: '#ec789c',
          600: '#e9628c',
          700: '#e64b7b',
          800: '#e3356b',
          900: '#e01e5a',
          DEFAULT: '#e01e5a',
        },
        link: {
          DEFAULT: '#1264A3',
        },
      },
      boxShadow: {
        light: '0 1px 0 0 rgba(0, 0, 0, 0.2)',
      },
      height: {
        12.5: '3.125rem',
      },
      opacity: {
        1: '0.01',
        2: '0.02',
        3: '0.03',
        4: '0.04',
        7: '0.07',
        15: '.15',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#333333',
              foreground: '#ffffff',
            },
          },
          layout: {
            radius: {
              small: '2px',
              medium: '4px',
              large: '8px',
            },
          },
        },
      },
    }),
  ],
}
export default config
