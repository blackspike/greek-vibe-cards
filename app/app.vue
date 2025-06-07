<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { greekAlphabet } from './data/greekAlphabet';
</script>

<template>
  <main class="bg-sky-50 h-dvh p-4">
    <NuxtRouteAnnouncer />
    <div class="max-w-md mx-auto h-full flex flex-col">
      <h1 class="text-2xl font-bold text-center text-sky-800 mb-4">Greek Alphabet Flashcards</h1>
      <div class="flex-1">
        <Swiper
          :slides-per-view="1"
          :space-between="30"
          :loop="true"
          class="h-full"
        >
          <SwiperSlide v-for="letter in greekAlphabet" :key="letter.letter">
            <Flashcard :letter="letter" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </main>
</template>
