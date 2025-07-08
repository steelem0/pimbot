export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
    './pages/**/*.{vue,js}',
    './app.vue',
    './nuxt.config.ts'
  ],
   darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: '#7F5AF0',
        'primary-dark': '#5C3DCC',
        background: '#F8F9FC',
        text: '#1A1A1A',
        muted: '#6B7280',
        accent: '#FCA311',
        surface: '#FFFFFF',
      },
    },
  },
  plugins: [],
  presets: [require('@nuxt/ui/tailwind')]
};