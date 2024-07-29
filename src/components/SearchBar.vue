<script setup lang="ts">
import { ref } from 'vue';
import SearchIcon from '@/components/icons/search.vue';

const query = ref('');
const emit = defineEmits(['search']);

function search() {
  emit('search', query.value);
}
</script>

<template>
  <div class="search-bar">
    <label>
      <SearchIcon />
      <input v-model="query" @keyup.enter="search" placeholder="Search tv shows">
    </label>
    <button @click="search">Search</button>
  </div>
</template>

<style scoped>
.search-bar {
  padding-top: var(--size-px-30);
  display: flex;
  flex-wrap: nowrap;
  gap: var(--size-px-20);

  label {
    padding: var(--size-px-10) var(--size-px-20);
    flex-basis: var(--size-pe-70);
    display: flex;
    align-items: center;
    gap: var(--size-px-20);
    color: var(--color-neutral-3);
    border-radius: var(--size-px-10);
    border: var(--size-px-2) solid rgba(0, 0, 0, 0.2);
    background-color: rgba(0, 0, 0, 0.2);

    svg {
      width: var(--size-px-20);
    }

    input {
      width: var(--size-pe-100);
      color: inherit;
      background: none;
    }

    input::placeholder {
      color: inherit;
      opacity: var(--opacity-0);
    }
  }

  label:focus-within {
    border-color: var(--color-secondary-dark);
  }

  button {
    padding: var(--size-px-10) var(--size-px-20);
    flex-basis: var(--size-pe-30);
    font-weight: var(--font-bold);
    color: var(--color-white-dark);
    border-radius: var(--size-px-10);
    background-color: var(--color-secondary-dark);
  }
}
</style>
