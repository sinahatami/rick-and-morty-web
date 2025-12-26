/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00B5CC',
          light: '#33C3D6',
          dark: '#0091A3',
        },
        secondary: {
          DEFAULT: '#B8E986',
          light: '#C6EEA3',
          dark: '#A2D36D',
        },
        accent: {
          DEFAULT: '#FF6B6B',
          light: '#FF8989',
          dark: '#FF4D4D',
        },
        background: '#FFFFFF',
        surface: '#F9FAFB',
        border: '#E5E7EB',
        text: {
          primary: '#111827',
          secondary: '#6B7280',
          tertiary: '#9CA3AF',
        },
        status: {
          alive: '#10B981',
          dead: '#EF4444',
          unknown: '#6B7280',
        },
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        input: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
