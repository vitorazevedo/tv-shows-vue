<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h2 class="green">{{ msg }}</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ullam molestias nesciunt debitis provident
      laudantium enim aliquam harum suscipit perferendis ducimus maiores dolores temporibus laborum tempora, optio culpa
      adipisci delectus.</p>
  </div>
</template>

<style scoped></style>
