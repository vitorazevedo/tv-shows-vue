<script setup lang="ts">
import StarIcon from '@/components/icons/star.vue';

defineProps<{
  rating: {
    average: number;
  };
}>()
</script>

<template>
  <small class="rating" v-if="rating && rating.average">
    <StarIcon /><span>{{ rating.average }}</span>
  </small>
</template>

<style scoped>
.rating {
  max-width: fit-content;
  padding: var(--size-px-3) var(--size-px-7);
  display: flex;
  align-items: center;
  gap: var(--size-px-5);
  font-size: var(--font-size-14);
  color: var(--color-warning);
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: var(--size-px-7);

  svg {
    width: var(--size-px-17);
    padding-bottom: var(--size-px-2);
  }
}
</style>
