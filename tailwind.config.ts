import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'warm-white': '#fafaf9',
        'stone-ink': '#111110',
        'stone-mid': '#5a5954',
        'stone-muted': '#a09d97',
        rust: '#bf6853',
        'deep-green': '#113546',
        lavender: '#e5dfee',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        fraunces: ['Fraunces', 'serif'],
        instrument: ['"Instrument Sans"', 'sans-serif'],
        work: ['"Work Sans"', 'sans-serif'],
        opensans: ['"Open Sans"', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
