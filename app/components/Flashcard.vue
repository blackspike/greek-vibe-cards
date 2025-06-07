<script setup>
import { ref } from 'vue';

const props = defineProps({
  letter: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['answer', 'next']);

const isCorrect = ref(null);
const isAnswered = ref(false);
const showOutline = ref(false);
const incorrectButton = ref(null);

// Get unique equivalents from the Greek alphabet and sort them alphabetically
const uniqueEquivalents = [
  'ch', 'd', 'f', 'g', 'i', 'l', 'o', 'ps', 'r', 's', 'th', 'v', 'x', 'y'
].sort();

const updateFailedLetters = (letter, isCorrect) => {
  const failedLetters = JSON.parse(localStorage.getItem('failedLetters') || '{}');

  if (isCorrect) {
    // If correct, decrease count or remove if 0
    if (failedLetters[letter]) {
      failedLetters[letter]--;
      if (failedLetters[letter] <= 0) {
        delete failedLetters[letter];
      }
    }
  } else {
    // If incorrect, increment count
    failedLetters[letter] = (failedLetters[letter] || 0) + 1;
  }

  localStorage.setItem('failedLetters', JSON.stringify(failedLetters));
};

const handleAnswer = (letter) => {
  if (letter === props.letter.equivalent) {
    isCorrect.value = true;
    isAnswered.value = true;
    showOutline.value = true;
    emit('answer', { correct: true, letter: props.letter });

    // Update failed letters count
    updateFailedLetters(props.letter.letter, true);

    // Hide outline after 500ms
    setTimeout(() => {
      showOutline.value = false;
    }, 300);

    // Move to next slide after 500ms
    setTimeout(() => {
      emit('next');
      // Reset state for next slide
      isCorrect.value = null;
      isAnswered.value = false;
      incorrectButton.value = null;
    }, 300);
  } else {
    isCorrect.value = false;
    isAnswered.value = true;
    showOutline.value = true;
    incorrectButton.value = letter;
    emit('answer', { correct: false, letter: props.letter });

    // Update failed letters count
    updateFailedLetters(props.letter.letter, false);

    // Hide outline after 300ms
    setTimeout(() => {
      showOutline.value = false;
      incorrectButton.value = null;
    }, 300);

    // Reset state after 300ms
    setTimeout(() => {
      isCorrect.value = null;
      isAnswered.value = false;
    }, 300);
  }
};
</script>

<template>
  <div
    class="h-full flex flex-col items-center justify-center p-8 text-white bg-gradient-to-br from-sky-600 to-sky-800">
    <div class="flex h-full items-center font-display text-[16rem] font-medium leading-none">
      {{ letter.letter }}
    </div>

    <div class="space-y-8 w-full">
      <div class="flex justify-center">
        <div class="w-full max-w-2xl">

          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="equiv in uniqueEquivalents"
              :key="equiv"
              @click="handleAnswer(equiv)"
              :class="[
                'text-xl bg-sky-500/20 border-sky-500/10 hover:bg-sky-500/30 border-2 rounded-lg p-1 transition-all duration-300 font-semibold ',
                showOutline && isCorrect && equiv === letter.equivalent ? 'border-green-500 ring-4 ring-green-500/50' : '',
                showOutline && !isCorrect && equiv === incorrectButton ? 'border-red-500 ring-4 ring-red-500/50' : 'border-sky-300'
              ]"
            >
              {{ equiv.toUpperCase() }}
            </button>
          </div>
        </div>
      </div>

      <div class="w-full">
        <h3 class="text-xl font-semibold mb-2 text-sky-300">
          Example - <span class="text-sky-200">{{ letter.example.english }}</span>
        </h3>
        <p class="text-6xl font-display">
          {{ letter.example.greek }}
        </p>
      </div>
    </div>
  </div>
</template>
