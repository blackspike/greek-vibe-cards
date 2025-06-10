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
        { property: 'og:url', content: 'https://vibecards.blackspike.com/' },
        { property: 'og:title', content: 'Greek VibeCards' },
        { property: 'og:description', content: 'LEARN GREEK OR DIE: A vibe-coded flashcard app for learning the Greek alphabet and numbers' },
        { property: 'og:image', content: '/1200x630.png' },
        // Twitter
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: 'https://vibecards.blackspike.com/' },
        { property: 'twitter:title', content: 'Greek VibeCards' },
        { property: 'twitter:description', content: 'LEARN GREEK OR DIE: A vibe-coded flashcard app for learning the Greek alphabet and numbers' },
        { property: 'twitter:image', content: '/1200x630.png' }
      ],
      bodyAttrs: {
        class: 'bg-sky-900',
      },
      htmlAttrs: {
        class: 'bg-sky-900',
      },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/1024.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' }
      ]
    }
  },
  // Optional: VitePWA module config
  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'robots.txt'],
    manifest: {
      name: "Greek VibeCards",
      short_name: "VibeCards",
      description: "LEARN GREEK OR DIE: A vibe-coded flashcard app for learning the Greek alphabet and numbers",
      start_url: "/",
      display: "standalone",
      background_color: "#003365",
      theme_color: "#003365",
      icons: [
        {
          src: "/icon-48x48.png",
          sizes: "48x48",
          type: "image/png"
        },
        {
          src: "/icon-72x72.png",
          sizes: "72x72",
          type: "image/png"
        },
        {
          src: "/icon-96x96.png",
          sizes: "96x96",
          type: "image/png"
        },
        {
          src: "/icon-128x128.png",
          sizes: "128x128",
          type: "image/png"
        },
        {
          src: "/icon-144x144.png",
          sizes: "144x144",
          type: "image/png"
        },
        {
          src: "/icon-152x152.png",
          sizes: "152x152",
          type: "image/png"
        },
        {
          src: "/icon-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/icon-256x256.png",
          sizes: "256x256",
          type: "image/png"
        },
        {
          src: "/icon-384x384.png",
          sizes: "384x384",
          type: "image/png"
        },
        {
          src: "/icon-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "/1024.png",
          sizes: "1024x1024",
          type: "image/png"
        }
      ]
    },
    workbox: {
      navigateFallback: '/index.html',
      globPatterns: ['**/*.{js,css,html,png,ico,svg,webmanifest}'],
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.destination === 'document',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'html-cache'
          }
        }
      ]
    }
  },
  css: ['~/assets/css/fonts.css','~/assets/css/global.css','~/assets/css/buttons.css'],
  modules: ['@nuxt/icon', '@nuxt/image', '@nuxtjs/plausible', '@vite-pwa/nuxt'],
  plausible: {
    domain: 'vibecards.blackspike.com',
    ignoredHostnames: ['localhost'],
  },
  icon: {
    provider: 'none',
    customCollections: [
      {
        prefix: 'bs-icon',
        dir: './app/assets/icons'
      },
    ],
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  }
})