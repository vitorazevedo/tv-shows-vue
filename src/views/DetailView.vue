<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ArrowIcon from '@/components/icons/arrow.vue';
import Rating from '@/components/Rating.vue';

const route = useRoute();
const show = ref<any>(null);

async function fetchShow() {
  const response = await fetch(`https://api.tvmaze.com/shows/${route.params.id}`);
  const data = await response.json();
  show.value = data;
}

onMounted(() => {
  fetchShow();
});
</script>

<template>
  <section class="detail-view" v-if="show">
    <RouterLink :to="`/`">
      <ArrowIcon /><span>Back</span>
    </RouterLink>
    <article>
      <figure v-if="show.image">
        <img :src="show.image.original" loading="lazy" alt="Show Image">
      </figure>
      <section>
        <h1>{{ show.name }}</h1>
        <div v-html="show.summary"></div>
        <Rating :rating="show.rating" />
        <ul>
          <li><span>Language</span><span>{{ show.language }}</span></li>
          <li><span>Status</span><span>{{ show.status }}</span></li>
          <li><span>Runtime</span><span>{{ show.runtime }} minutes</span></li>
          <li><span>Premiered</span><span>{{ show.premiered }}</span></li>
          <li v-if="show.ended"><span>Ended</span><span>{{ show.ended }}</span></li>
          <li><span>Schedule</span><span>{{ show.schedule.days.join(', ') }} at {{ show.schedule.time }}</span></li>
          <li><span>Network</span><span>{{ show.network.name }} / {{ show.network.country.name }}</span></li>
          <li><span>Genres</span><span>{{ show.genres.join(', ') }}</span></li>
        </ul>
      </section>
    </article>
  </section>
</template>

<style scoped>
.detail-view {
  display: flex;
  flex-direction: column;
  gap: var(--size-px-30);

  a {
    display: flex;
    align-items: center;
    gap: var(--size-px-10);
    color: var(--color-neutral-3);
    font-weight: var(--font-bold);
    text-decoration: none;
    cursor: pointer;

    svg {
      width: var(--size-px-15);
    }
  }

  article {
    display: flex;
    align-items: flex-start;
    gap: var(--size-px-80);

    figure {
      flex: 1 1 var(--size-pe-40);
      display: flex;
      overflow: hidden;
      border-radius: var(--size-px-40);

      img {
        width: var(--size-pe-100);
      }
    }

    section {
      flex: 1 1 var(--size-pe-60);
      display: flex;
      flex-direction: column;

      div {
        margin-bottom: var(--size-px-20);
        color: var(--color-neutral-3);
      }

      .rating {
        padding: var(--size-px-7) var(--size-px-15);
        font-size: var(--font-size-16);
      }

      ul {
        margin-top: var(--size-px-20);
        color: var(--color-neutral-3);
        display: flex;
        flex-wrap: wrap;
        gap: var(--size-px-20);

        li {
          flex: 1 1 var(--size-pe-40);
          display: flex;
          flex-direction: column;

          span:nth-of-type(2) {
            font-size: var(--font-size-20);
            color: var(--color-neutral-1);

            @media (max-width: 37.5rem) {
              font-size: var(--font-size-18);
            }
          }
        }
      }
    }

    @media (max-width: 75rem) {
      flex-direction: column-reverse;
      gap: var(--size-px-50);

      figure {
        width: var(--size-pe-100);
      }

      section {
        width: var(--size-pe-100);
      }
    }
  }
}
</style>
