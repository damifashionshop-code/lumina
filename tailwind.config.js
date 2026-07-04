/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cosmos: '#f3effc',
        indigoDeep: '#ffffff',
        lavender: '#8a7cc9',
        champagne: '#4a3f8c',
        gold: '#6b5bb5',
        pearl: '#3f3574'
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif']
      },
      keyframes: {
        floatSlow: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        glowPulse: { '0%, 100%': { opacity: '0.55' }, '50%': { opacity: '1' } },
        spinSlow: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } }
      },
      animation: {
        floatSlow: 'floatSlow 7s ease-in-out infinite',
        glowPulse: 'glowPulse 4s ease-in-out infinite',
        spinSlow: 'spinSlow 40s linear infinite',
        fadeUp: 'fadeUp 0.8s ease-out both'
      }
    }
  },
  plugins: []
};
