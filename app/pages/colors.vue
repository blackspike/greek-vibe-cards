<script setup>
import { ref, onMounted } from 'vue';
import { greekColors } from '../data/greekColors';

const shuffledColors = ref([]);
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
  if (currentIndex.value < shuffledColors.value.length - 1) {
    currentIndex.value++;
  }
};

// Shuffle colors on mount
onMounted(() => {
  shuffledColors.value = shuffleArray([...greekColors]);
});
</script>

<template>
  <div v-if="shuffledColors.length" class="w-full h-full flex items-center justify-center">
    <ColorCard
      :color="shuffledColors[currentIndex]"
      @next="nextCard"
    />
  </div>
</template>