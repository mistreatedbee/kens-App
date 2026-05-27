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
        accent: '#FFB547',
        fg: 'var(--fg)',
        muted: 'var(--fg-muted)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
      },
      animation: {
        'blob': 'blob 8s infinite alternate ease-in-out',
        'blob-slow': 'blob 12s 3s infinite alternate ease-in-out',
      },
      keyframes: {
        blob: {
          '0%':   { transform: 'translate(0px,   0px)   scale(1)'    },
          '33%':  { transform: 'translate(25px,  -35px) scale(1.06)' },
          '66%':  { transform: 'translate(-20px,  20px) scale(0.96)' },
          '100%': { transform: 'translate(0px,   0px)   scale(1)'    },
        },
      },
    },
  },
  plugins: [],
}
