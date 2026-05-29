/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        surface: 'var(--surface)',
        primary: '#005C99',
        secondary: '#0F7ACB',
        lightblue: '#59D0F9',
        accent: '#7AC943',
        fg: 'var(--fg)',
        muted: 'var(--fg-muted)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
        serif: ['Poppins', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
