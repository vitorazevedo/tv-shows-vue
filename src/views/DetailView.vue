<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import ArrowIcon from '@/components/icons/arrow.vue';
import Rating from '@/components/Rating.vue';

import type { Show, ShowResponse } from '@/types/interfaces';

const route = useRoute();
const show = ref<Show>();

async function fetchShow(): Promise<void> {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${route.params.id}`);
    const data: ShowResponse = await response.json();

    const details: Show = {
      name: data.name ?? 'N/A',
      summary: data.summary ?? 'No summary available.',
      image: data.image ?? null,
      rating: data.rating ?? { average: null },
      info: [],
    };

    const extra: [string, string | undefined][] = [
      ['Language', data.language],
      ['Status', data.status],
      ['Runtime', data.runtime ? `${data.runtime} minutes` : undefined],
      ['Premiered', data.premiered],
      ['Ended', data.ended],
      ['Schedule', data.schedule?.days && data.schedule.time ? `${data.schedule.days.join(', ')} at ${data.schedule.time}` : undefined],
      ['Network', data.network?.name && data.network?.country?.name ? `${data.network.name} / ${data.network.country.name}` : undefined],
      ['Genres', data.genres?.length ? data.genres.join(', ') : undefined],
    ];

    extra.forEach(([label, value]) => {
      if (value) {
        details.info.push({ label, value });
      }
    });

    show.value = details;
  } catch (error) {
    console.error('Failed to fetch show data:', error);
  }
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
        <Rating v-if="show.rating.average" :rating="show.rating" />
        <ul v-if="show.info.length">
          <li v-for="(info, index) in show.info" :key="index">
            <span>{{ info.label }}</span><span>{{ info.value }}</span>
          </li>
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
