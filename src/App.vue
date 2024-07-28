<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    Header!
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
  <main>
    Main!
    <RouterView />
  </main>
  <footer>Footer!</footer>
</template>

<style scoped>
header {
  flex: 1 0;
  background-color: #ccc;
}

main {
  flex: 1 1 var(--size-pe-50);
  background-color: #999;
}

footer {
  flex: 1 1 var(--size-pe-50);
  background-color: #777;
}
</style>
