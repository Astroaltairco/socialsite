/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'gradient-shift': 'gradient-shift 4s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-subtle': 'float-subtle 3s ease-in-out infinite',
        'float-fast': 'float-fast 2s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'golden-glow': 'golden-glow 4s ease-in-out infinite',
        'scroll-left': 'scroll-left var(--scroll-speed) linear infinite',
        'scroll-right': 'scroll-right var(--scroll-speed) linear infinite',
        'shine': 'shine 8s ease-in-out infinite'
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-subtle': {
          '0%, 100%': { transform: 'translateY(0) rotate(0)' },
          '25%': { transform: 'translateY(-2px) rotate(0.5deg)' },
          '75%': { transform: 'translateY(2px) rotate(-0.5deg)' },
        },
        'float-fast': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.01)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.4' },
        },
        'golden-glow': {
          '0%, 100%': {
            opacity: '0.2',
            filter: 'brightness(1) blur(8px)',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.3',
            filter: 'brightness(1.1) blur(10px)',
            transform: 'scale(1.01)',
          },
        },
        'scroll-left': {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(calc(-100% / 3), 0, 0)' },
        },
        'scroll-right': {
          '0%': { transform: 'translate3d(calc(-100% / 3), 0, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
        'shine': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    function({ addUtilities, addComponents }) {
      addUtilities({
        '.scroll-smooth': { 'scroll-behavior': 'smooth' },
        '.transform-gpu': {
          'transform': 'translate3d(0, 0, 0)',
          'backface-visibility': 'hidden',
          'perspective': '1000',
          'transform-style': 'preserve-3d',
          'will-change': 'transform'
        },
        '.mask-fade-x': {
          'mask-image': 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          '-webkit-mask-image': 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        },
        '.gradient-text': {
          'background': 'linear-gradient(to right, var(--tw-gradient-stops))',
          '-webkit-background-clip': 'text',
          'color': 'transparent'
        }
      });
      
      addComponents({
        '.btn-gradient': {
          '@apply inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-base font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg shadow-purple-500/25': {}
        },
        '.btn-outline': {
          '@apply inline-flex items-center px-6 py-3 rounded-lg bg-white/5 text-white text-base font-medium hover:bg-white/10 transition-all duration-200 backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20': {}
        },
        '.glass-card': {
          '@apply relative rounded-xl bg-white/5 p-6 backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300': {}
        },
        '.section-gradient': {
          '@apply absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/50 to-[#030014]': {}
        },
        '.gradient-glow': {
          '@apply absolute -inset-[1px] rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur': {}
        }
      });
    }
  ]
} 