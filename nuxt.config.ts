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
        { name: 'description', content: 'LEARN GREEK OR DIE: A vibe-coded flashcard app for learning the Greek alphabet and numbers' },
        { name: 'theme-color', content: '#003365' },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://greek-vibecards.vercel.app/' },
        { property: 'og:title', content: 'Greek VibeCards' },
        { property: 'og:description', content: 'LEARN GREEK OR DIE: A vibe-coded flashcard app for learning the Greek alphabet and numbers' },
        { property: 'og:image', content: '/1200x630.png' },
        // Twitter
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: 'https://greek-vibecards.vercel.app/' },
        { property: 'twitter:title', content: 'Greek VibeCards' },
        { property: 'twitter:description', content: 'LEARN GREEK OR DIE: A vibe-coded flashcard app for learning the Greek alphabet and numbers' },
        { property: 'twitter:image', content: '/1200x630.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'apple-touch-icon', href: '/1024.png' }
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
