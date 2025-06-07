<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { greekAlphabet, greekAlphabetLowercase } from './data/greekAlphabet';
import Flashcard from './components/Flashcard.vue';
</script>

<template>
  <main class="bg-sky-900 h-dvh p-4 font-display">
    <NuxtRouteAnnouncer />

    <div class="max-w-md mx-auto h-full flex flex-col">
      <h1 class="sr-only text-4xl font-bold text-center text-white mb-8">Greek Alphabet Flashcards</h1>

      <div class="flex-1 rounded-xl shadow-2xl bg-sky-700 overflow-hidden">
        <Swiper :slides-per-view="1" :space-between="30" :loop="true" class="h-full">
          <SwiperSlide v-for="letter in greekAlphabet" :key="letter.letter">
            <Flashcard :letter="letter" />
          </SwiperSlide>
          <SwiperSlide v-for="letter in greekAlphabetLowercase" :key="letter.letter">
            <Flashcard :letter="letter" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </main>
</template>
