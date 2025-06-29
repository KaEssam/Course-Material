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
        // Flexoki Dark Theme
        background: '#100F0F',
        text: '#CECDC3',
        muted: '#878580',
        accent: '#D0A215',
        secondary: '#4385BE',
        surface: '#1C1B1A',
        border: '#403E3C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
