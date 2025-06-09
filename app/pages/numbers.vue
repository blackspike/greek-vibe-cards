<script setup>
import { ref, onMounted } from 'vue';
import { greekNumbers } from '../data/greekNumbers';

const shuffledNumbers = ref([]);
const currentIndex = ref(0);

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
  if (currentIndex.value < shuffledNumbers.value.length - 1) {
    currentIndex.value++;
  }
};

// Shuffle numbers on mount
onMounted(() => {
  shuffledNumbers.value = shuffleArray([...greekNumbers]);
});
</script>

<template>
  <div v-if="shuffledNumbers.length" class=" w-full h-full flex items-center justify-center">
    <NumberCard
      :number="shuffledNumbers[currentIndex]"
      @next="nextCard"
    />
  </div>
</template>