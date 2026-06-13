import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#2563EB', foreground: '#FFFFFF' },
        secondary: { DEFAULT: '#14B8A6', foreground: '#FFFFFF' },
        accent: { DEFAULT: '#F59E0B', foreground: '#FFFFFF' },
        success: '#22C55E',
        error: '#EF4444',
        background: '#FFFFFF',
        foreground: '#1E293B',
        dark: { DEFAULT: '#0F172A', foreground: '#F8FAFC' },
        muted: { DEFAULT: '#F1F5F9', foreground: '#64748B' },
        border: '#E2E8F0',
        card: { DEFAULT: '#FFFFFF', foreground: '#1E293B' },
      },
      fontFamily: {
        heading: ['Poppins', 'Segoe UI', 'sans-serif'],
        body: ['Inter', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '16px',
        lg: '16px',
        md: '12px',
        sm: '8px',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
