<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { greekAlphabet } from '../data/greekAlphabet';
import { ref, onMounted } from 'vue';

// Create a ref for the shuffled alphabet
const shuffledAlphabet = ref([]);
const swiperInstance = ref(null);
const correctStreak = ref(0);

// Function to update high score
const updateHighScore = (currentStreak) => {
  const currentHighScore = parseInt(localStorage.getItem('highScore') || '0');
  if (currentStreak > currentHighScore) {
    localStorage.setItem('highScore', currentStreak.toString());
  }
};

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
    correctStreak.value++; // Increment streak on correct answer
    updateHighScore(correctStreak.value); // Update high score if needed
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

// Shuffle the alphabet on component mount
onMounted(() => {
  shuffledAlphabet.value = shuffleArray([...greekAlphabet]);
});
</script>

<template>
  <div class="h-full relative">
    <!-- Score Counter -->
    <div v-if="correctStreak > 0"
      class="absolute top-4 right-4 bg-sky-500/20 px-4 py-2 rounded-lg font-bold text-sky-200 backdrop-blur-sm z-10">
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