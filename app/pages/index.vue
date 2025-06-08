<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { greekAlphabet } from '../data/greekAlphabet';
import { ref, onMounted } from 'vue';

// Create a ref for the shuffled alphabet
const shuffledAlphabet = ref([]);
const swiperInstance = ref(null);

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
        <Swiper :slides-per-view="1" :space-between="30" :loop="true" :allow-touch-move="false" class="h-full"
          @swiper="swiperInstance = $event" :speed="500">
          <SwiperSlide v-for="letter in shuffledAlphabet" :key="letter.letter">
            <Flashcard :letter="letter" @answer="handleAnswer" @next="nextSlide" />
          </SwiperSlide>
        </Swiper>

</template>