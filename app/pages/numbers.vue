<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { greekNumbers } from '../data/greekNumbers';
import { ref, onMounted } from 'vue';

// Create a ref for the shuffled numbers
const shuffledNumbers = ref([]);
const swiperInstance = ref(null);

// Function to shuffle array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Handle answer from number card
const handleAnswer = ({ correct, number }) => {
  if (correct) {
    // Already handled in the NumberCard component
  } else {
    // Already handled in the NumberCard component
  }
};

// Function to move to next slide
const nextSlide = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext();
  }
};

// Shuffle the numbers on component mount
onMounted(() => {
  shuffledNumbers.value = shuffleArray([...greekNumbers]);
});
</script>

<template>
  <Swiper :slides-per-view="1" :space-between="30" :loop="true" :allow-touch-move="false" class="h-full"
    @swiper="swiperInstance = $event" :speed="500">
    <SwiperSlide v-for="number in shuffledNumbers" :key="number.greek">
      <NumberCard :number="number" @answer="handleAnswer" @next="nextSlide" />
    </SwiperSlide>
  </Swiper>
</template>