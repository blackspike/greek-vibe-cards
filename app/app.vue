<script setup>
import 'swiper/css';
import { greekAlphabet } from './data/greekAlphabet';

// Create a ref for the shuffled alphabet
const shuffledAlphabet = ref([]);
const swiperInstance = ref(null);

const route = useRoute();

// Function to shuffle array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Handle answer from flashcard
const handleAnswer = ({ correct, letter }) => {
  if (correct) {
    // Already handled in the Flashcard component
  } else {
    // Already handled in the Flashcard component
  }
};

// Function to move to next slide
const nextSlide = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext();
  }
};

// Shuffle the alphabet on component mount
onMounted(() => {
  shuffledAlphabet.value = shuffleArray([...greekAlphabet]);
});
</script>

<template>
  <main class="bg-sky-900 h-dvh p-1 py-2 font-sans flex justify-center items-center">
    <div class="max-w-[90vw] sm:max-w-md m-auto h-full flex flex-col max-h-[94dvh] w-full">

      <!-- Navigation -->
      <header class="pb-1">
        <nav class="flex justify-between items-center">
          <NuxtLink to="/" class="flex items-center gap-2 text-white hover:text-sky-300 transition-colors">
            <img src="/favicon.svg" alt="Greek VibeCards" class="w-7 h-7 md:w-5 md-h-5" />

            <span class="text-xs tracking-widest text-sky-300 uppercase font-bold leading-3">Learn greek <br class="md:hidden"/>or die</span>
          </NuxtLink>

          <div class="flex items-center gap-2">

            <NuxtLink to="/" class="text-white hover:text-sky-300 transition-colors p-2 rounded-lg hover:bg-sky-500/10"
              aria-label="Switch to Greek Alphabet Quiz">
              <Icon name="bs-icon:alphabet-greek" size="24" />
            </NuxtLink>

            <NuxtLink to="/numbers"
              class="text-white hover:text-sky-300 transition-colors p-2 rounded-lg hover:bg-sky-500/10"
              aria-label="Switch to Numbers Quiz">
              <Icon name="bs-icon:numbers" size="24" />
            </NuxtLink>

            <NuxtLink to="/colors"
              class="text-white hover:text-sky-300 transition-colors p-2 rounded-lg hover:bg-sky-500/10"
              aria-label="Switch to Colors Quiz">
              <Icon name="bs-icon:colors" size="24" />
            </NuxtLink>

            <NuxtLink to="/settings"
              aria-label="Settings"
              class="text-white hover:text-sky-300 transition-colors p-2 rounded-lg hover:bg-sky-500/10">
              <Icon name="bs-icon:settings" size="24" />
            </NuxtLink>
          </div>
        </nav>
      </header>

      <div class="h-full">
        <NuxtPage />
      </div>

    </div>
  </main>
</template>

<style>
.router-link-active {
  color: rgb(125 211 252) !important;
}
</style>
