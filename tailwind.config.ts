import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

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

        // ─── YouClean CRM case study — ported from the Figma Make @theme block.
        // None of these keys collide with anything above; scoped in practice
        // to the `.crm-case-study` page via the classes that use them.
        ink:    '#0a1a1f',
        deep: {
          DEFAULT: '#003648',
          600: '#145a70',
          700: '#0a4457',
        },
        brand: {
          DEFAULT: '#00d17c',
          600: '#00b86e',
          '050': '#e6faf1',
        },
        paper: {
          DEFAULT: '#fbfaf7',
          100: '#f4f2ec',
        },
        line: '#e4e1d8',
        mist: '#93a4a8',
        // Bare string values here would *replace* Tailwind's built-in 50–950
        // scale instead of adding to it (v3 behaviour, unlike the Tailwind v4
        // @theme block this was ported from) — silently breaking every
        // amber-500/rose-600/etc. class in the case study. Spreading the
        // stock scale and only overriding DEFAULT keeps both working: bare
        // `bg-amber`/`text-rose` use our brand hex, every numbered shade
        // still resolves to Tailwind's real palette.
        amber: { ...colors.amber, DEFAULT: '#f59e0b' },
        rose:  { ...colors.rose,  DEFAULT: '#e5484d' },
      },
      fontFamily: {
        display:    ['"Playfair Display"', 'serif'],
        cormorant:  ['"Cormorant Garamond"', 'serif'],
        fraunces:   ['Fraunces', 'serif'],
        instrument: ['"Instrument Sans"', 'sans-serif'],
        work:       ['"Work Sans"', 'sans-serif'],
        opensans:   ['"Open Sans"', 'sans-serif'],
        // `mono` is unused anywhere else in the portfolio — safe to redefine
        // wholesale for the YouClean CRM case study's data typography.
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontWeight: {
        // Tailwind v4 bare numeric font-weight utilities (font-500, font-600…)
        // used throughout the ported Figma Make code — v3 needs them named.
        '500': '500',
        '600': '600',
        '700': '700',
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
