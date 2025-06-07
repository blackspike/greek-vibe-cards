import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  icon: {
    mode: 'css',
    cssLayer: 'base'
  },
  devtools: { enabled: false },
  css: ['~/assets/css/global.css'],
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/image'],
  vite: {
      plugins: [
        tailwindcss(),
    ],
  }
})
