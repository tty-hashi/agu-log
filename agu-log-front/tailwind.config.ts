import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gray: {
          100: '#f1f1f1',
          200: '#d6d6d6',
          300: '#afafaf',
          400: '#898989',
          500: '#656565',
          600: '#434343',
          700: '#242424',
        },
        // レッドスケール
        red: {
          100: '#fdd8d8',
          200: '#fdd8d8',
          300: '#fba1a2',
          400: '#f95e61',
          500: '#D91B24',
          600: '#991016',
          700: '#5e0609',
          800: '#2b0102',
        },
        link: '#0f83fd',
      },
    },
  },
  plugins: [],
} satisfies Config
