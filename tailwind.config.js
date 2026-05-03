/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        site: {
          bg: '#0b0f14',
          panel: '#0f1620',
          text: 'rgba(255,255,255,0.92)',
          muted: 'rgba(255,255,255,0.68)',
          border: 'rgba(255,255,255,0.10)',
          accent: 'rgba(99,179,237,0.95)',
          'accent-2': 'rgba(129,230,217,0.85)',
        },
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        site: '14px',
        'site-sm': '10px',
      },
      maxWidth: {
        container: '1100px',
        hero: '980px',
      },
    },
  },
  plugins: [],
}
