<script setup lang="ts">
import { computed } from 'vue';
import CardShow from './CardShow.vue';

const props = defineProps<{
  genre: string;
  shows: Array<{
    id: number;
    name: string;
    image?: { medium: string };
    rating: { average: number };
  }>;
}>();

const sortedShows = computed(() => {
  return props.shows.sort((a, b) => b.rating.average - a.rating.average);
});
</script>

<template>
  <div class="genre-list">
    <h2>{{ genre }}</h2>
    <ul>
      <CardShow v-for="show in sortedShows" :key="show.id" :show="show" />
    </ul>
  </div>
</template>

<style scoped>
.genre-list {
  padding-top: var(--size-px-20);

  ul {
    display: flex;
    align-items: flex-start;
    gap: var(--size-px-20);
    overflow-x: scroll;
    scrollbar-width: none;
  }

  ul::-webkit-scrollbar {
    width: 0;
  }
}
</style>
