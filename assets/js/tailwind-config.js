// ==========================================================================
// AI Engineer Portfolio - Tailwind CSS Configuration Extension
// ==========================================================================

if (typeof tailwind !== 'undefined') {
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          mono: ['JetBrains Mono', 'monospace'],
        },
        colors: {
          dark: '#08090A',
          card: '#0F1112',
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        },
        animation: {
          'fade-in': 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          'shimmer': 'shimmer 8s linear infinite',
          'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          shimmer: {
            '0%': { backgroundPosition: '-1000px 0' },
            '100%': { backgroundPosition: '1000px 0' },
          }
        }
      }
    }
  };
}
