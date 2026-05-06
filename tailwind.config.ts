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
        display:    ['"Playfair Display"', 'serif'],
        cormorant:  ['"Cormorant Garamond"', 'serif'],
        fraunces:   ['Fraunces', 'serif'],
        instrument: ['"Instrument Sans"', 'sans-serif'],
        work:       ['"Work Sans"', 'sans-serif'],
        opensans:   ['"Open Sans"', 'sans-serif'],
      },
      transitionTimingFunction: {
        'out-expo':  'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-expo':   'cubic-bezier(0.64, 0, 0.78, 0)',
        'spring':    'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee:  'marquee 30s linear infinite',
        'fade-up': 'fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
} satisfies Config
