<script setup>
import { ref, onMounted } from 'vue';
import { greekColors } from '../data/greekColors';

const props = defineProps({
  color: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['answer', 'next']);

const isCorrect = ref(null);
const isAnswered = ref(false);
const showOutline = ref(false);
const showAnswer = ref(false);
const isPlaying = ref(false);

// Create shuffled copy of colors for display
const shuffledColors = ref([]);

onMounted(() => {
  shuffledColors.value = [...greekColors].sort(() => Math.random() - 0.5);
});

const playExample = () => {
  if (isPlaying.value) return;

  isPlaying.value = true;
  const audio = new Audio(`/voice-over/colors/${props.color.english.toLowerCase()}.mp3`);

  audio.onended = () => {
    isPlaying.value = false;
  };

  audio.play().catch(error => {
    console.error('Error playing audio:', error);
    isPlaying.value = false;
  });
};

const updateFailedColors = (greek, isCorrect) => {
  const failedColors = JSON.parse(localStorage.getItem('failedColors') || '{}');

  if (!isCorrect) {
    failedColors[greek] = (failedColors[greek] || 0) + 1;
    localStorage.setItem('failedColors', JSON.stringify(failedColors));
  }
};

const handleHint = () => {
  showAnswer.value = true;
  setTimeout(() => {
    showAnswer.value = false;
  }, 1500);
};

const handleColorSelect = (selectedColor) => {
  if (selectedColor.hex === props.color.hex) {
    isCorrect.value = true;
    isAnswered.value = true;
    showOutline.value = true;
    emit('answer', { correct: true, color: props.color });

    updateFailedColors(props.color.greek, true);

    setTimeout(() => {
      showOutline.value = false;
    }, 300);

    setTimeout(() => {
      emit('next');
      isCorrect.value = null;
      isAnswered.value = false;
    }, 300);
  } else {
    isCorrect.value = false;
    isAnswered.value = true;
    showOutline.value = true;
    emit('answer', { correct: false, color: props.color });

    updateFailedColors(props.color.greek, false);

    setTimeout(() => {
      showOutline.value = false;
    }, 300);

    setTimeout(() => {
      isCorrect.value = null;
      isAnswered.value = false;
    }, 300);
  }
};
</script>

<template>
  <div
    class="h-full w-full flex flex-col items-center justify-center p-6 text-white shadow-2xl rounded-2xl bg-gradient-to-br from-sky-600 to-sky-800">

    <div class="flex flex-col items-center mb-8 w-full">
      <div class="text-5xl lg:text-6xl font-normal mb-4 text-center">
        {{ color.greek }}
      </div>
      <div v-if="showAnswer" class="text-2xl font-medium px-4 py-2 bg-sky-500 rounded-lg">
        {{ color.english }}
      </div>
    </div>

    <div class="w-full max-w-md">
      <div class="grid grid-cols-4 gap-4 m-auto justify-center max-w-[90%]">
        <button v-for="c in shuffledColors" :key="c.english" @click="handleColorSelect(c)"
          class="btn !border-8 !border-white/20 aspect-square w-full !rounded-full !p-0 transition-transform hover:scale-105"
          :style="{ backgroundColor: c.hex, border: c.hex === '#FFFFFF' ? '2px solid #CBD5E1' : 'none' }">
        </button>
      </div>

      <div class="flex gap-4 justify-center mt-8">
        <button @click="handleHint"
          class="btn !bg-sky-500/5 w-16 !rounded-full !p-0 aspect-square !items-center !font-normal"
          aria-label="Show answer">
          <Icon name="bs-icon:question-circle" size="32" />
        </button>

        <button @click="playExample"
          :disabled="isPlaying"
          class="btn !bg-sky-500/5 w-16 !rounded-full !p-0 aspect-square !items-center !font-normal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Play example audio">
          <Icon name="bs-icon:volume" size="24" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>