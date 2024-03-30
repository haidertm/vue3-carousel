/** @type {import('tailwindcss').Config} */

const safeList = [
  ...[2, 3, 4, 6, 9, 10, 11].map((n) => `space-x-${ n }`)
]

export default {
  safelist: safeList,
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      spacing: {
        '9': '2.25rem', // Add this line
        '10': '2.5rem'
      }
    }
  },
  plugins: []
}

