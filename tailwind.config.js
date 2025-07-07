/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Modern minimal color system
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',

        // Surface colors
        surface: {
          DEFAULT: 'rgb(var(--surface))',
          hover: 'rgb(var(--surface-hover))',
          active: 'rgb(var(--surface-active))',
        },

        // Border colors
        border: {
          DEFAULT: 'rgb(var(--border))',
          hover: 'rgb(var(--border-hover))',
        },

        // Text hierarchy
        text: {
          DEFAULT: 'rgb(var(--text-primary))',
          primary: 'rgb(var(--text-primary))',
          secondary: 'rgb(var(--text-secondary))',
          muted: 'rgb(var(--text-muted))',
          inverse: 'rgb(var(--text-inverse))',
        },

        // Gruvbox colors
        red: 'rgb(var(--red))',
        orange: 'rgb(var(--orange))',
        yellow: 'rgb(var(--yellow))',
        green: 'rgb(var(--green))',
        aqua: 'rgb(var(--aqua))',
        blue: 'rgb(var(--blue))',
        purple: 'rgb(var(--purple))',

        // Accent colors (mapped to Gruvbox)
        accent: {
          DEFAULT: 'rgb(var(--orange))',
          primary: 'rgb(var(--orange))',
          secondary: 'rgb(var(--aqua))',
          muted: 'rgb(var(--orange))',
        },

        // Semantic colors (mapped to Gruvbox)
        success: 'rgb(var(--green))',
        warning: 'rgb(var(--yellow))',
        error: 'rgb(var(--red))',

        // Code colors
        code: {
          bg: 'rgb(var(--code-bg))',
          text: 'rgb(var(--code-text))',
          border: 'rgb(var(--code-border))',
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.7' }],
        'lg': ['1.125rem', { lineHeight: '1.7' }],
        'xl': ['1.25rem', { lineHeight: '1.6' }],
        '2xl': ['1.5rem', { lineHeight: '1.5' }],
        '3xl': ['1.875rem', { lineHeight: '1.4' }],
        '4xl': ['2.25rem', { lineHeight: '1.3' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },

      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },

      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },

      boxShadow: {
        'soft': '0 2px 8px 0 rgb(0 0 0 / 0.08)',
        'medium': '0 4px 16px 0 rgb(0 0 0 / 0.12)',
        'large': '0 8px 32px 0 rgb(0 0 0 / 0.16)',
        'glow': '0 0 0 1px rgb(var(--accent-primary) / 0.2), 0 4px 16px rgb(var(--accent-primary) / 0.1)',
      },

      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 1px rgb(var(--accent-primary) / 0.2)' },
          '50%': { boxShadow: '0 0 0 1px rgb(var(--accent-primary) / 0.4), 0 0 16px rgb(var(--accent-primary) / 0.2)' },
        },
      },
    },
  },
  plugins: [],
}
