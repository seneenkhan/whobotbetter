/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        text: '#ffffff',
        'neon-green': '#39FF14',
        'neon-green-dark': '#1F8A0F',
        'neon-green-light': '#7AFF4D',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { 'box-shadow': '0 0 5px #39FF14' },
          '100%': { 'box-shadow': '0 0 20px #39FF14' },
        }
      },
      fontFamily: {
        'sci-fi': ['"Share Tech Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}