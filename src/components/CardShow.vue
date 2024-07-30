<script setup lang="ts">
import Rating from './Rating.vue';

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
        <div>
          <img v-if="show.image" :src="show.image.medium" alt="Show Image">
          <img v-if="!show.image" src="@/assets/svg/logo.svg" alt="No Image" class="image-placeholder">
        </div>
        <figcaption>{{ show.name }}</figcaption>
      </figure>
      <Rating :rating="show.rating" />
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

        .image-placeholder {
          width: var(--size-px-210);
          height: var(--size-px-295);
          object-fit: none;
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
      position: absolute;
      left: var(--size-px-7);
      top: var(--size-px-7);
      z-index: var(--index-1);
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
