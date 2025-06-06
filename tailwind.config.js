/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          serif: ['var(--font-serif)'],
          sans: ['var(--font-geist-sans)'],
          mono: ['var(--font-geist-mono)'],
        },
        keyframes: {
          shine: {
            '0%': { backgroundPosition: '100%' },
            '100%': { backgroundPosition: '-100%' },
          },
        },
        animation: {
          shine: 'shine 5s linear infinite',
        },
      },
    },
    plugins: [],
  }