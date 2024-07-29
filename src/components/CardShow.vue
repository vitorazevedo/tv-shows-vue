<script setup lang="ts">
import StarIcon from '@/components/icons/star.vue';

defineProps<{
  show: {
    id: number;
    image?: { medium: string };
    name: string;
    rating: { average: number };
  };
}>();
</script>

<template>
  <li>
    <RouterLink :to="`/detail/${show.id}`">
      <figure>
        <div><img v-if="show.image" :src="show.image.medium" alt="Show Image"></div>
        <figcaption>{{ show.name }}</figcaption>
      </figure>
      <small v-if="show.rating && show.rating.average">
        <StarIcon /> <span>{{ show.rating.average }}</span>
      </small>
    </RouterLink>
  </li>
</template>

<style scoped>
li {
  padding: var(--size-px-10);
  border-radius: var(--size-px-10);
  background-color: var(--color-primary-dark);

  a {
    display: flex;
    flex-direction: column;
    position: relative;

    figure {
      padding-bottom: var(--size-px-15);
      display: flex;
      flex-direction: column;
      gap: var(--size-px-15);

      div {
        display: flex;
        border-radius: var(--size-px-7);
        overflow: hidden;

        img {
          width: var(--size-px-210);
          transition: transform 0.3s ease-in-out;
        }
      }

      figcaption {
        width: var(--size-px-200);
        display: block;
        font-weight: var(--font-bold);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    small {
      padding: var(--size-px-3) var(--size-px-7);
      display: flex;
      align-items: center;
      gap: var(--size-px-5);
      font-size: var(--font-size-14);
      color: var(--color-warning);
      background-color: rgba(0, 0, 0, 0.75);
      border-radius: var(--size-px-7);

      position: absolute;
      left: var(--size-px-7);
      top: var(--size-px-7);
      z-index: var(--index-1);

      svg {
        width: var(--size-px-17);
        padding-bottom: var(--size-px-2);
      }
    }
  }

  a:hover {
    figure {
      div {
        img {
          transform: scale(1.1);
          transition: transform 0.3s ease-in-out;
        }
      }
    }
  }
}
</style>
