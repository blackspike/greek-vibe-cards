<script setup>
defineProps({
  letter: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div
    class="h-full flex flex-col items-center justify-center px-8 py-12 pt-0 text-white bg-gradient-to-br from-sky-600 to-sky-800"
  >
    <div class="font-display text-[20rem] font-medium leading-none">
      {{ letter.letter }}
    </div>

    <div class="space-y-12 w-full">
      <div class="grid grid-cols-2 gap-16">
        <div>
          <h3 class="text-xl font-semibold mb-6 text-sky-300">
            Name
          </h3>
          <p class="text-6xl">
            {{ letter.name }}
          </p>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-6 text-sky-300">
            English
          </h3>
          <p class="text-6xl">
            {{ letter.equivalent }}
          </p>
        </div>
      </div>

      <div class="w-full">
        <h3 class="text-xl font-semibold mb-6 text-sky-300">
          Example - <span class="text-sky-200">{{ letter.example.english }}</span>
        </h3>
        <p class="text-6xl">
          {{ letter.example.greek }}
        </p>
      </div>
    </div>
  </div>
</template>
