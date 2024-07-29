<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ArrowIcon from '@/components/icons/arrow.vue';

const route = useRoute();
const show = ref<any>(null);

async function fetchShow() {
  const response = await fetch(`http://api.tvmaze.com/shows/${route.params.id}`);
  const data = await response.json();
  show.value = data;
}

onMounted(() => {
  fetchShow();
});
</script>

<template>
  <section class="detail-view" v-if="show">
    <RouterLink :to="`/`" class="back-button">
      <ArrowIcon />
      <span>Take me back home</span>
    </RouterLink>
    <h1>{{ show.name }}</h1>
    <article>
      <img v-if="show.image" :src="show.image.original" alt="Show Image">
      <div>
        <p v-html="show.summary"></p>
        <p><strong>Genres:</strong> {{ show.genres.join(', ') }}</p>
        <p><strong>Language:</strong> {{ show.language }}</p>
        <p><strong>Status:</strong> {{ show.status }}</p>
        <p><strong>Runtime:</strong> {{ show.runtime }} minutes</p>
        <p><strong>Premiered:</strong> {{ show.premiered }}</p>
        <p v-if="show.ended"><strong>Ended:</strong> {{ show.ended }}</p>
        <p><strong>Schedule:</strong> {{ show.schedule.days.join(', ') }} at {{ show.schedule.time }}</p>
        <p><strong>Rating:</strong> {{ show.rating.average }}</p>
        <p><strong>Network:</strong> {{ show.network.name }} ({{ show.network.country.name }})</p>
      </div>
    </article>
  </section>
</template>

<style scoped>
section {
  article {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 24px;

    img {
      max-height: 360px;
    }

    div {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;

      a {
        color: #e5e5e5;
        cursor: pointer;
        font-size: 1rem;
        display: inline-block;

        &:hover {
          text-decoration: none;
        }
      }
    }
  }

  .back-button {
    color: #e5e5e5;
    cursor: pointer;
    font-size: 1rem;
    display: inline-block;
    margin-bottom: 10px;

    &:hover {
      text-decoration: none;
    }
  }
}

@media (min-width: 480px) {
  section {
    article {
      flex-direction: row;
      flex-wrap: nowrap;

      img {
        width: 30%;
        max-height: unset;
      }

      >div {
        width: 70%;
      }
    }
  }
}
</style>
