/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette — calm, trustworthy, educational
        ink: {
          DEFAULT: '#1a2332',
          light: '#2d3f55',
          lighter: '#4a6080',
        },
        teal: {
          50: '#f0faf8',
          100: '#ccf0ea',
          200: '#99e0d5',
          300: '#66d1bf',
          400: '#33c1aa',
          500: '#0d9f88',
          600: '#0a7f6d',
          700: '#086052',
          800: '#054036',
          900: '#02201b',
        },
        sand: {
          50: '#fdf9f4',
          100: '#f8f0e3',
          200: '#f1e1c7',
          300: '#e9d2ab',
          400: '#e2c38f',
          DEFAULT: '#d4a96a',
        },
        // Semantic colors
        cost: {
          free: '#059669',
          freemium: '#d97706',
          paid: '#7c3aed',
          open_source: '#2563eb',
        },
        evidence: {
          strong: '#059669',
          supported: '#2563eb',
          mixed: '#d97706',
          philosophical: '#7c3aed',
        },
        verified: '#059669',
        pending: '#d97706',
        warning: '#dc2626',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.7' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.15' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'sm': '0.375rem',
        DEFAULT: '0.5rem',
        'md': '0.625rem',
        'lg': '0.875rem',
        'xl': '1.125rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.12), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
        'modal': '0 20px 60px -15px rgb(0 0 0 / 0.25)',
      },
      maxWidth: {
        'content': '72rem',
        'reading': '65ch',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-down': 'slideDown 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

