/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // New warm, earthy color palette
        background: '#0F0F0F', // Ultra Dark
        text: {
          primary: '#D6D3CD', // Soft White - main text
          muted: '#8C8C8C', // Gray - descriptions, subtitles, timestamps
          heading: '#EDEAE3', // Light Sand - elegant headers
          code: '#E8E6E3', // Soft White - code text
        },
        accent: {
          orange: '#D56A33', // Warm Orange - primary accent
          yellow: '#F1C076', // Soft Yellow - highlights, constants
          green: '#88A66F', // Muted Green - success states, strings
          gray: '#3D3D3D', // Neutral Gray - borders, separators
        },
        link: {
          hover: '#E8904C', // Pale Orange - link hover state
        },
        code: {
          bg: '#1A1A1A', // Deep Gray - code block background
        },
        surface: '#111111',
        border: '#1e1e1e',
        'surface-hover': '#1a1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'base-text': ['17px', { lineHeight: '1.7', fontWeight: '400' }],
        'base-text-lg': ['18px', { lineHeight: '1.7', fontWeight: '400' }],
        'heading-1': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-2': ['28px', { lineHeight: '1.3', fontWeight: '700' }],
        'heading-3': ['22px', { lineHeight: '1.4', fontWeight: '700' }],
      },
      lineHeight: {
        'relaxed': '1.7',
      },
    },
  },
  plugins: [],
}
