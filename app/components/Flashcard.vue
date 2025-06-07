<script setup>
defineProps({
  letter: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg">
    <div class="text-8xl font-bold text-sky-800 mb-8">{{ letter.letter }}</div>
    <div class="space-y-4 w-full">
      <div class="text-center">
        <div class="text-sm text-gray-500">Name</div>
        <div class="text-2xl font-semibold">{{ letter.name }}</div>
      </div>
      <div class="text-center">
        <div class="text-sm text-gray-500">Pronunciation</div>
        <div class="text-2xl font-semibold">{{ letter.pronunciation }}</div>
      </div>
      <div class="text-center">
        <div class="text-sm text-gray-500">Equivalent</div>
        <div class="text-2xl font-semibold">{{ letter.equivalent }}</div>
      </div>
    </div>
  </div>
</template>