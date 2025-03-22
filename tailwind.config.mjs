/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        shi_brown: 'var(--shi_brown)',
      },
      backgroundColor: {
        shi_prussian_blue: 'var(--shi_prussian_blue)',
        shi_burlywood: '#deb887',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
