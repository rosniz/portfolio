/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sidebar: '#0f1319',
        main: '#0a0d14',
        card: '#131720',
        'card-hover': '#181e2a',
        blue: {
          primary: '#2563eb',
          light: '#3b82f6',
          dark: '#1d4ed8',
          muted: '#1e3a6e',
          glow: 'rgba(37,99,235,0.25)',
        },
        red: {
          primary: '#e53e3e',
          light: '#fc5959',
          dark: '#c53030',
          muted: '#5c1a1a',
          glow: 'rgba(229,62,62,0.25)',
        },
        grey: {
          50: '#f9fafb',
          200: '#e5e7eb',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      width: {
        sidebar: '270px',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
