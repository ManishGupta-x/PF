/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: { 
      fontFamily: {
         'chakra': ['Chakra Petch', 'sans-serif'],
        'geo': ['Geo', 'cursive'],
        'kanit': ['Kanit', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
        'quantico': ['Quantico', 'sans-serif'],
        'signika': ['Signika', 'sans-serif'],
        'silkscreen': ['Silkscreen', 'monospace'],
        'geist-sans': ['var(--font-geist-sans)', 'sans-serif'],
        'geist-mono': ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        // Portfolio Color Palette
        'cream': '#ede0d4',
        'light-tan': '#e6ccb2',
        'medium-tan': '#ddb892',
        'brown': '#b08968',
        'dark-brown': '#7f5539',
        'accent-brown': '#9c6644',
        
        // Semantic Colors
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        
        // Component Colors
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        
        portfolio: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#ede0d4', // cream
          300: '#e6ccb2', // light-tan
          400: '#ddb892', // medium-tan
          500: '#b08968', // brown
          600: '#9c6644', // accent-brown
          700: '#7f5539', // dark-brown
          800: '#654329',
          900: '#4a321f',
          950: '#2d1e13',
        },
        
        // Gradient Colors
        gradient: {
          from: '#ede0d4',
          via: '#e6ccb2',
          to: '#ddb892',
        },
      },
      
    
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      
      borderRadius: {
        'lg': 'var(--radius)',
        'md': 'calc(var(--radius) - 2px)',
        'sm': 'calc(var(--radius) - 4px)',
      },
      
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'portfolio': '0 4px 6px -1px rgba(127, 85, 57, 0.1), 0 2px 4px -1px rgba(127, 85, 57, 0.06)',
        'portfolio-lg': '0 10px 15px -3px rgba(127, 85, 57, 0.1), 0 4px 6px -2px rgba(127, 85, 57, 0.05)',
        'portfolio-xl': '0 20px 25px -5px rgba(127, 85, 57, 0.1), 0 10px 10px -5px rgba(127, 85, 57, 0.04)',
      },
      
      backdropBlur: {
        'xs': '2px',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'bounce-soft': 'bounceSoft 2s infinite',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'portfolio-gradient': 'linear-gradient(135deg, #ede0d4 0%, #e6ccb2 50%, #ddb892 100%)',
        'portfolio-gradient-dark': 'linear-gradient(135deg, #7f5539 0%, #9c6644 50%, #b08968 100%)',
      },
      
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--muted-foreground)',
            '--tw-prose-headings': 'var(--primary)',
            '--tw-prose-lead': 'var(--muted-foreground)',
            '--tw-prose-links': 'var(--accent)',
            '--tw-prose-bold': 'var(--primary)',
            '--tw-prose-counters': 'var(--muted-foreground)',
            '--tw-prose-bullets': 'var(--muted-foreground)',
            '--tw-prose-hr': 'var(--border)',
            '--tw-prose-quotes': 'var(--primary)',
            '--tw-prose-quote-borders': 'var(--border)',
            '--tw-prose-captions': 'var(--muted-foreground)',
            '--tw-prose-code': 'var(--accent)',
            '--tw-prose-pre-code': 'var(--muted-foreground)',
            '--tw-prose-pre-bg': 'var(--muted)',
            '--tw-prose-th-borders': 'var(--border)',
            '--tw-prose-td-borders': 'var(--border)',
          },
        },
      },
      
      screens: {
        'xs': '475px',
        '3xl': '1680px',
      },
      
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    // Custom plugin for portfolio-specific utilities
    function({ addUtilities, addComponents, theme }) {
      const newUtilities = {
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.text-pretty': {
          'text-wrap': 'pretty',
        },
        '.section-padding': {
          padding: 'var(--section-padding) 0',
        },
        '.card-padding': {
          padding: 'var(--card-padding)',
        },
        '.content-max-width': {
          'max-width': 'var(--content-max-width)',
        },
      }
      
      const newComponents = {
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.75rem 1.5rem',
          borderRadius: 'var(--radius)',
          fontWeight: '500',
          fontSize: '0.875rem',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          border: 'none',
          outline: 'none',
          '&:focus-visible': {
            outline: '2px solid var(--ring)',
            outlineOffset: '2px',
          },
        },
        '.btn-primary': {
          background: 'var(--primary)',
          color: 'var(--primary-foreground)',
          '&:hover': {
            background: 'var(--accent)',
            color: 'var(--accent-foreground)',
          },
        },
        '.btn-secondary': {
          background: 'var(--secondary)',
          color: 'var(--secondary-foreground)',
          '&:hover': {
            background: 'var(--muted)',
          },
        },
        '.btn-outline': {
          background: 'transparent',
          color: 'var(--primary)',
          border: '2px solid var(--primary)',
          '&:hover': {
            background: 'var(--primary)',
            color: 'var(--primary-foreground)',
          },
        },
        '.btn-ghost': {
          background: 'transparent',
          color: 'var(--muted-foreground)',
          '&:hover': {
            background: 'var(--muted)',
            color: 'var(--primary)',
          },
        },
        '.card': {
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: 'var(--card-padding)',
          boxShadow: 'var(--shadow)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 'var(--shadow-lg)',
            transform: 'translateY(-2px)',
          },
        },
        '.glass': {
          background: 'rgba(237, 224, 212, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(237, 224, 212, 0.2)',
        },
        '.glass-dark': {
          background: 'rgba(127, 85, 57, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(127, 85, 57, 0.2)',
        },
      }
      
      addUtilities(newUtilities)
      addComponents(newComponents)
    },
  ],
}