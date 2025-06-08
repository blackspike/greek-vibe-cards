<script setup>
import { ref, onMounted, computed } from 'vue';
import { greekAlphabet } from '../data/greekAlphabet';

const failedLetters = ref({});

// Function to get letter details by Greek letter
const getLetterDetails = (greekLetter) => {
  return greekAlphabet.find(letter => letter.letter === greekLetter);
};

// Load failed letters from localStorage
const loadFailedLetters = () => {
  const stored = localStorage.getItem('failedLetters');
  if (stored) {
    failedLetters.value = JSON.parse(stored);
  }
};

// Function to remove a letter from failed letters
const removeLetter = (letter) => {
  const stored = JSON.parse(localStorage.getItem('failedLetters') || '{}');
  delete stored[letter];
  localStorage.setItem('failedLetters', JSON.stringify(stored));
  failedLetters.value = stored;
};

// Sort failed letters by count (most frequent first)
const sortedFailedLetters = computed(() => {
  return Object.entries(failedLetters.value)
    .sort(([, a], [, b]) => b - a)
    .map(([letter, count]) => ({
      letter,
      count,
      details: getLetterDetails(letter)
    }));
});

onMounted(() => {
  loadFailedLetters();
});
</script>

<template>
  <div class="bg-sky-600/50 py-8 px-4 rounded-2xl h-full max-h-[80dvh] flex flex-col">
    <h1 class="text-3xl font-bold text-white text-center">Practice Stats</h1>

    <div v-if="sortedFailedLetters.length > 0" class="flex-1 min-h-0">
      <div class="h-full flex flex-col">
        <h2 class="text-xl font-semibold text-sky-200 mb-4 text-center">Frequently Missed Letters</h2>
        <div class="space-y-1 overflow-y-auto flex-1 min-h-0 pr-2">
          <div v-for="item in sortedFailedLetters" :key="item.letter"
            class="flex items-center justify-between p-4 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 transition-colors">
            <div class="flex items-center gap-6">
              <span class="text-4xl font-display text-white">{{ item.letter }}</span>
              <div class="text-sky-200">
                <p class="font-medium">{{ item.details?.name }}</p>
                <p class="text-sm opacity-75">Equivalent: {{ item.details?.equivalent.toUpperCase() }}</p>
              </div>
            </div>
            <div class="flex items-center gap-6">
              <div class="text-right">
                <span class="font-medium text-sky-300">{{ item.count }}</span>
                <p class="text-sm text-sky-200 opacity-75">mistakes</p>
              </div>
              <button @click="removeLetter(item.letter)"
                class="p-2 rounded-lg bg-sky-500/10 hover:bg-red-500 transition-colors group flex items-center justify-center"
                aria-label="Remove from failed letters">
                <Icon name="tabler:trash" size="32"
                  class="w-5 h-5 text-sky-200 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="bg-sky-500/20 rounded-lg p-6">
      <p class="text-sky-200 text-center">No practice data yet. Keep practicing to see your progress!</p>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgb(14 165 233 / 0.1);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgb(14 165 233 / 0.3);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgb(14 165 233 / 0.4);
}
</style>