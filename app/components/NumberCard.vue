<script setup>

const props = defineProps({
  number: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['answer', 'next']);

const isCorrect = ref(null);
const isAnswered = ref(false);
const showOutline = ref(false);
const inputValue = ref('');
const showAnswer = ref(false);

const updateFailedNumbers = (greek, isCorrect) => {
  const failedNumbers = JSON.parse(localStorage.getItem('failedNumbers') || '{}');

  if (!isCorrect) {
    // If incorrect, increment count
    failedNumbers[greek] = (failedNumbers[greek] || 0) + 1;
    localStorage.setItem('failedNumbers', JSON.stringify(failedNumbers));
  }
};

const handleDigit = (digit) => {
  inputValue.value += digit;
};

const handleBackspace = () => {
  inputValue.value = inputValue.value.slice(0, -1);
};

const handleClear = () => {
  inputValue.value = '';
};

const handleHint = () => {
  showAnswer.value = true;
  setTimeout(() => {
    showAnswer.value = false;
  }, 1500);
};

const handleSubmit = () => {
  const submittedNumber = parseInt(inputValue.value, 10);

  if (submittedNumber === props.number.number) {
    isCorrect.value = true;
    isAnswered.value = true;
    showOutline.value = true;
    emit('answer', { correct: true, number: props.number });

    // Update failed numbers count
    updateFailedNumbers(props.number.greek, true);

    // Hide outline after 300ms
    setTimeout(() => {
      showOutline.value = false;
    }, 300);

    // Move to next slide after 300ms
    setTimeout(() => {
      emit('next');
      // Reset state for next slide
      isCorrect.value = null;
      isAnswered.value = false;
      inputValue.value = '';
    }, 300);
  } else {
    isCorrect.value = false;
    isAnswered.value = true;
    showOutline.value = true;
    emit('answer', { correct: false, number: props.number });

    // Update failed numbers count
    updateFailedNumbers(props.number.greek, false);

    // Hide outline after 300ms
    setTimeout(() => {
      showOutline.value = false;
    }, 300);

    // Reset state after 300ms
    setTimeout(() => {
      isCorrect.value = null;
      isAnswered.value = false;
      inputValue.value = '';
    }, 300);
  }
};
</script>

<template>
  <div
    class="h-full w-full flex flex-col items-center justify-center p-6 text-white shadow-2xl rounded-2xl bg-gradient-to-br from-sky-600 to-sky-800">

    <div class="flex flex-col items-center mb-8 w-full">
      <div class="text-5xl lg:text-6xl font-normal mb-8 text-center">
        {{ number.greek }}
      </div>
      <div class="text-2xl font-medium bg-sky-500/20 rounded-lg px-4 py-4 w-full max-w-xs text-center relative">
        <transition name="fade">
          <div v-if="showAnswer" class="absolute inset-0 flex items-center justify-center bg-sky-500 rounded-lg">
            {{ number.number }}
          </div>
        </transition>
        {{ inputValue || '0' }}
      </div>
    </div>

    <div class="w-full max-w-xs">
      <div class="grid grid-cols-3 gap-2">
        <!-- Numbers 7-9 -->
        <button v-for="n in ['7', '8', '9']" :key="n" @click="handleDigit(n)" class="btn !py-2">
          {{ n }}
        </button>

        <!-- Numbers 4-6 -->
        <button v-for="n in ['4', '5', '6']" :key="n" @click="handleDigit(n)" class="btn !py-2">
          {{ n }}
        </button>

        <!-- Numbers 1-3 -->
        <button v-for="n in ['1', '2', '3']" :key="n" @click="handleDigit(n)" class="btn !py-2">
          {{ n }}
        </button>

        <!-- Zero and Control Buttons -->
        <button @click="handleHint" class="btn !py-2 !bg-sky-500/5" aria-label="Show answer">
          <Icon name="bs-icon:question-circle" size="32" />
        </button>
        <button @click="handleDigit('0')" class="btn !py-2">
          0
        </button>
        <button @click="handleBackspace" class="btn !py-2 !bg-sky-500/5" aria-label="Delete last digit">
          <Icon name="bs-icon:backspace" size="32" />
        </button>

        <!-- Enter Button -->
        <button @click="handleSubmit" class="btn col-span-3 !py-3" :class="{
            '!bg-green-500/40 !border-green-500 ring-4 ring-green-500/50': showOutline && isCorrect,
            '!bg-red-500/40 !border-red-500 ring-4 ring-red-500/50': showOutline && !isCorrect
          }">
          Enter
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