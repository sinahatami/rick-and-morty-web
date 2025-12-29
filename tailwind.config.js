/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
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
          dark: '#97C460',
        },
        accent: {
          DEFAULT: '#FF9800',
          light: '#FFB74D',
          dark: '#F57C00',
        },
        surface: '#F9FAFB',
        border: '#E5E7EB',
        text: {
          primary: '#111827',
          secondary: '#4B5563',
          tertiary: '#9CA3AF',
        },
        status: {
          alive: '#10B981',
          dead: '#EF4444',
          unknown: '#9CA3AF',
        },
      },
      boxShadow: {
        card: '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -2px rgba(0, 0, 0, 0.03)',
        'card-hover':
          '0 12px 24px -8px rgba(0, 181, 204, 0.15), 0 4px 12px -4px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
