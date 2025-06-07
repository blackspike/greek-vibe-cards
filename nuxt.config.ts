import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Greek VibeCards',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A vibe-coded flashcard app for learning the Greek alphabet' },
        { name: 'theme-color', content: '#0052b4' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'manifest', href: '/manifest.json' }
      ]
    }
  },
  fonts: {
    provider: 'bunny'
  },
  css: ['~/assets/css/fonts.css','~/assets/css/global.css'],
  modules: ['@nuxt/icon', '@nuxt/image'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  }
})
