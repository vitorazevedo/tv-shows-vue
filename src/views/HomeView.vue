<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import GenreList from '@/components/GenreList.vue';

const shows = ref<any[]>([]);
const searchResults = ref<any[]>([]);
const genres = ref<string[]>([]);

const displayedShows = computed(() => {
  return searchResults.value.length > 0 ? searchResults.value : shows.value;
});

const fetchShows = async () => {
  const response = await fetch('https://api.tvmaze.com/shows');
  const data = await response.json();
  shows.value = data;
};

const searchShows = async (query: string) => {
  if (query) {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const data = await response.json();
    searchResults.value = data.map((result: any) => result.show);
  } else {
    searchResults.value = [];
  }
};

const extractGenres = (shows: any[]) => {
  const genresSet = new Set<string>();
  shows.forEach(show => {
    show.genres.forEach((genre: string) => {
      genresSet.add(genre);
    });
  });
  return Array.from(genresSet).sort();
};

const filteredShowsByGenre = (genre: string) => {
  return displayedShows.value.filter(show => show.genres.includes(genre));
};

onMounted(() => {
  fetchShows();
});

watch(shows, (newShows) => {
  genres.value = extractGenres(newShows);
});
</script>

<template>
  <article class="home-view">
    <div>
      <h1>Welcome!</h1>
      <p>Easily search for your favorite <b>TV shows</b> by name. Results are grouped by genre, helping you discover
        similar content quickly. <b>Start exploring now!</b> 😉</p>
      <SearchBar @search="searchShows" />
    </div>
    <article v-for="genre in genres" :key="genre">
      <GenreList v-if="filteredShowsByGenre(genre).length > 0" :genre="genre" :shows="filteredShowsByGenre(genre)" />
    </article>
  </article>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;

  &>div {
    max-width: var(--size-px-720);

    p {
      color: var(--color-neutral-3);

      b {
        color: var(--color-secondary);
      }
    }
  }
}
</style>
