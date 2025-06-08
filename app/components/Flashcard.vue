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
const isPlaying = ref(false);

// Get unique equivalents from the Greek alphabet and sort them alphabetically
const uniqueEquivalents = [
  'ch', 'd', 'f', 'g', 'i', 'l', 'm', 'n', 'o', 'p', 'ps', 'r', 's', 't', 'th', 'v', 'x', 'y', 'z'
].sort();

const updateFailedLetters = (letter, isCorrect) => {
  const failedLetters = JSON.parse(localStorage.getItem('failedLetters') || '{}');

  if (!isCorrect) {
    // If incorrect, increment count
    failedLetters[letter] = (failedLetters[letter] || 0) + 1;
    localStorage.setItem('failedLetters', JSON.stringify(failedLetters));
  }
};

const playExample = () => {
  if (isPlaying.value) return;

  isPlaying.value = true;
  const audio = new Audio(`/voice-over/${props.letter.example.english.toLowerCase()}.mp3`);

  audio.onended = () => {
    isPlaying.value = false;
  };

  audio.play().catch(error => {
    console.error('Error playing audio:', error);
    isPlaying.value = false;
  });
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
    class="h-full flex flex-col items-center justify-center p-6 text-white shadow-2xl rounded-2xl bg-gradient-to-br from-sky-600 to-sky-800">

    <div class="flex h-full items-center text-[14rem] font-medium leading-none font-display -mt-10">
      {{ letter.letter }}
    </div>

    <div class="space-y-8 w-full -mt-10">
      <div class="flex justify-center">
        <div class="w-full max-w-2xl">

          <div class="grid grid-cols-4 gap-2">
            <button v-for="equiv in uniqueEquivalents" :key="equiv" @click="handleAnswer(equiv)" :class="[
                'text-xl border-2 rounded-lg p-1 transition-all duration-300 font-semibold',
                showOutline && isCorrect && equiv === letter.equivalent ? '!bg-green-500/40 border-green-500 ring-4 ring-green-500/50' : '',
                showOutline && !isCorrect && equiv === incorrectButton ? '!bg-red-500/40 border-red-500 ring-4 ring-red-500/50' : '',
                'bg-sky-500/20 border-sky-500/10 hover:bg-sky-500/30'
              ]">
              {{ equiv.toUpperCase() }}
            </button>
            <NuxtLink to="/numbers"
              class="text-xl border-2 rounded-lg p-1 transition-all duration-300 font-semibold bg-sky-500/20 border-sky-500/10 hover:bg-sky-500/30 flex items-center justify-center">
              <Icon name="tabler:calculator" size="24" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="w-full">
        <details class="group">
          <summary class="text-xl font-semibold text-sky-300 cursor-pointer hover:text-sky-200 flex justify-center items-center gap-2">
            <Icon name="tabler:chevron-down" size="24"
              class="flex-shrink-0 rotate-180 group-open:rotate-0 transition-transform" />
            Hint
          </summary>
          <div class="flex items-baseline justify-between mt-4">
            <div class="flex items-baseline gap-2">
              <p class="text-xl text-sky-200">{{ letter.example.english }}</p>
            </div>
            <div class="flex items-baseline gap-4">
              <p class="text-4xl font-display">{{ letter.example.greek }}</p>
              <button @click="playExample" :disabled="isPlaying"
                class="p-3 flex aspect-square rounded-full bg-sky-500/20 hover:bg-sky-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Play example audio">
                <Icon name="tabler:volume" size="24" />
              </button>
            </div>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<style scoped>
summary {
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }
}

details {
  @media (prefers-reduced-motion: no-preference) {
    interpolate-size: allow-keywords;
  }

  &::details-content {
    block-size: 0;
    opacity: 0;
    overflow-y: clip;
    transition: content-visibility .2s allow-discrete, opacity .2s, block-size .2s ease-out;
  }

  &[open]::details-content {
    block-size: auto;
    opacity: 1;
  }
}
</style>
