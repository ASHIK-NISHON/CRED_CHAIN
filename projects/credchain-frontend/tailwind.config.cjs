/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        cred: {
          primary: '#6366f1',
          primaryDark: '#4f46e5',
          accent: '#a78bfa',
          surface: '#f8fafc',
          ink: '#0f172a',
          muted: '#64748b',
        },
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundSize: {
        'gradient-200': '200% 200%',
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(99, 102, 241, 0.4)',
        'glow-sm': '0 0 20px -5px rgba(99, 102, 241, 0.3)',
        'card': '0 4px 6px -1px rgba(0,0,0,0.06), 0 2px 4px -2px rgba(0,0,0,0.04)',
        'card-hover': '0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)',
      },
    },
  },
  daisyui: {
    themes: [
      {
        credchain: {
          primary: '#6366f1',
          'primary-content': '#ffffff',
          secondary: '#64748b',
          accent: '#a78bfa',
          neutral: '#0f172a',
          'base-100': '#ffffff',
          'base-200': '#f8fafc',
          'base-300': '#f1f5f9',
        },
      },
    ],
    darkTheme: false,
    logs: false,
  },
  plugins: [require('daisyui')],
}
