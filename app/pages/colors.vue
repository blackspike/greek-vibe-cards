<script setup>
import { ref, onMounted, watch } from 'vue';
import confetti from 'canvas-confetti';
import { greekColors } from '../data/greekColors';

const shuffledColors = ref([]);
const currentIndex = ref(0);
const score = ref(0);

// Function to trigger confetti
const celebrate = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#0ea5e9', '#7dd3fc', '#e0f2fe'],
    ticks: 200
  });
};

// Shuffle array function
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Move to next card
const nextCard = () => {
  if (currentIndex.value < shuffledColors.value.length - 1) {
    currentIndex.value++;
  } else {
    // Reshuffle colors and start over
    shuffledColors.value = shuffleArray([...greekColors]);
    currentIndex.value = 0;
  }
};

// Handle answer feedback
const handleAnswer = (result) => {
  if (result.correct) {
    score.value++;
    // Show confetti on multiples of 5
    if (score.value % 5 === 0) {
      celebrate();
    }
  } else {
    score.value = 0;
  }
};

// Shuffle colors on mount
onMounted(() => {
  shuffledColors.value = shuffleArray([...greekColors]);
});
</script>

<template>
  <div v-if="shuffledColors.length" class="relative w-full h-full flex items-center justify-center">
    <div v-if="score > 0" class="absolute top-4 right-4 px-4 py-2 rounded-lg font-bold backdrop-blur-sm z-10 transition-all duration-300 bg-sky-500/20 text-sky-200">
      <transition name="bounce" mode="out-in">
        <span :key="score" class="block text-2xl">{{ score }}</span>
      </transition>
    </div>
    <ColorCard :color="shuffledColors[currentIndex]" @next="nextCard" @answer="handleAnswer" />
  </div>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.3s ease-out;
}

.bounce-leave-active {
  animation: bounce-in 0.3s ease-in reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.3);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>