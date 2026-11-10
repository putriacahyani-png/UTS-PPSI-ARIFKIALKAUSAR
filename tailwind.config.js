/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#002043',
        'primary-container': '#17365d',
        'secondary': '#0051d5',
        'secondary-container': '#316bf3',
        'secondary-fixed': '#dbe1ff',
        'tertiary': '#311c00',
        'tertiary-fixed': '#ffddb8',
        'tertiary-fixed-dim': '#ffb95f',
        'error': '#ba1a1a',
        'error-container': '#ffdad6',
        'surface': '#f8f9ff',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#eff4ff',
        'surface-container': '#e5eeff',
        'surface-container-high': '#dce9ff',
        'surface-container-highest': '#d3e4fe',
        'on-surface': '#0b1c30',
        'on-surface-variant': '#43474e',
        'outline-variant': '#c4c6cf',
        'status-menunggu': '#f97316',
        'status-verifikasi': '#0051d5',
        'status-diterima': '#16a34a',
        'status-perbaikan': '#9333ea',
        'status-selesai': '#14532d',
        'status-ditolak': '#dc2626',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      }
    },
  },
  plugins: [],
}

