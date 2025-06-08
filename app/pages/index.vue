<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { greekAlphabet } from '../data/greekAlphabet';
import { ref, onMounted } from 'vue';
import confetti from 'canvas-confetti';

// Create a ref for the shuffled alphabet
const shuffledAlphabet = ref([]);
const swiperInstance = ref(null);
const correctStreak = ref(0);
const currentHighScore = ref(0);

// Load high score on mount
onMounted(() => {
  shuffledAlphabet.value = shuffleArray([...greekAlphabet]);
  currentHighScore.value = parseInt(localStorage.getItem('highScore') || '0');
});

// Function to shuffle array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

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

// Handle answer from flashcard
const handleAnswer = ({ correct, letter }) => {
  if (correct) {
    correctStreak.value++; // Increment streak on correct answer

    // Update high score if current streak is higher
    if (correctStreak.value > currentHighScore.value) {
      currentHighScore.value = correctStreak.value;
      localStorage.setItem('highScore', correctStreak.value.toString());
    }

    // Celebrate every 5 correct answers
    if (correctStreak.value > 0 && correctStreak.value % 5 === 0) {
      celebrate();
    }
  } else {
    correctStreak.value = 0; // Reset streak on wrong answer
  }
};

// Function to move to next slide
const nextSlide = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext();
  }
};
</script>

<template>
  <div class="h-full relative">
    <!-- Score Counter -->
    <div v-if="correctStreak > 0"
      :class="[
        'absolute top-4 right-4 px-4 py-2 rounded-lg font-bold backdrop-blur-sm z-10 transition-all duration-300 bg-sky-500/20 text-sky-200',
        correctStreak >= currentHighScore ? 'ring-2 ring-amber-400' : ''
      ]">
      <transition name="bounce" mode="out-in">
        <span :key="correctStreak" class="block text-2xl">{{ correctStreak }}</span>
      </transition>
    </div>

    <Swiper :slides-per-view="1" :space-between="30" :loop="true" :allow-touch-move="false" class="h-full"
      @swiper="swiperInstance = $event" :speed="500">
      <SwiperSlide v-for="letter in shuffledAlphabet" :key="letter.letter">
        <Flashcard :letter="letter" @answer="handleAnswer" @next="nextSlide" />
      </SwiperSlide>
    </Swiper>
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