/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme colors
        theme: {
          green: {
            DEFAULT: '#4CAF50',
            light: '#81C784',
            dark: '#388E3C',
          },
          blue: {
            DEFAULT: '#2196F3',
            light: '#64B5F6',
            dark: '#1976D2',
          },
          purple: {
            DEFAULT: '#9C27B0',
            light: '#BA68C8',
            dark: '#7B1FA2',
          },
          red: {
            DEFAULT: '#F44336',
            light: '#E57373',
            dark: '#D32F2F',
          },
        },
        // Default to green theme
        primary: {
          DEFAULT: 'var(--color-primary, #4CAF50)',
          light: 'var(--color-primary-light, #81C784)',
          dark: 'var(--color-primary-dark, #388E3C)',
        },
        secondary: '#333',
        background: 'var(--color-bg, #121212)',
        foreground: 'var(--color-text, #FFFFFF)',
        muted: 'var(--color-muted, #333333)',
        'muted-foreground': 'var(--color-muted-foreground, #BDBDBD)',
        accent: 'var(--color-accent, #8EB3CC)',
        destructive: '#ff0000',
        warning: '#FFA500',
        success: '#00C853',
        info: '#2196F3',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      spacing: {
        '0': '0px',
        '1': '2px',
        '2': '4px',
        '3': '6px',
        '4': '8px',
        '5': '12px',
        '6': '16px',
        '7': '18px',
        '8': '20px',
        '9': '24px',
        '10': '32px',
        '11': '40px',
        '12': '64px',
        '13': '128px',
        '14': '256px',
        '15': '512px',
      },
      fontSize: {
        'xs': '0.5rem',
        'sm': '0.7rem',
        'base': '0.8rem',
        'md': '1rem',
        'lg': '1.25rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        'md': '4px',
        'lg': '6px',
        'xl': '8px',
      },
      boxShadow: {
        'card': '0 25px 100px -10px rgba(169, 154, 154, 0.54)',
      },
      lineHeight: {
        'tight': '1.2',
        'snug': '1.3',
        'normal': '1.4',
        'relaxed': '1.5',
        'loose': '1.8',
        'extra-loose': '2',
      },
      screens: {
        'sm': '768px',
        'md': '992px',
        'lg': '1024px',
        'xl': '1200px',
      },
      perspective: {
        '1000': '1000px',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
    },
  },
  plugins: [],
}
