<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import MenuIcon from '@/components/icons/menu.vue';

const fullYear = new Date().getFullYear();
</script>

<template>
  <header>
    <section>
      <RouterLink to="/"><img alt="TVScope Logo" src="@/assets/svg/logo.svg"></RouterLink>
      <nav>
        <RouterLink to="/">TV Shows</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <button>
          <MenuIcon />
        </button>
      </nav>
    </section>
  </header>
  <main>
    <section>
      <RouterView />
    </section>
  </main>
  <footer>
    <section>
      <RouterLink to="/"><img alt="TVScope Logo" src="@/assets/svg/logo.svg"></RouterLink>
      <p>© <time>{{ fullYear }}</time> - All Rights Reserved</p>
    </section>
  </footer>
</template>

<style scoped>
header {
  flex: 1 0;
  background-color: var(--color-primary-dark);

  &>section {
    max-width: var(--size-screen-lg);
    height: var(--size-pe-100);
    padding: var(--size-px-20);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: var(--size-px-40);
    }

    nav {
      display: flex;
      align-items: center;
      gap: var(--size-px-20);
      color: var(--color-neutral-3);
      font-weight: var(--font-bold);

      button {
        padding: var(--size-px-10);
        display: none;
        color: inherit;
        border-radius: var(--size-px-10);
        background-color: rgba(0, 0, 0, 0.2);

        svg {
          width: var(--size-px-20);
        }
      }

      @media (max-width: 37.5rem) {
        a {
          display: none;
        }

        button {
          display: flex;
        }
      }
    }
  }

}

main {
  flex: 1 1 var(--size-pe-50);
  background-color: var(--color-primary-light);

  &>section {
    max-width: var(--size-screen-lg);
    height: var(--size-pe-100);
    padding: var(--size-px-40) var(--size-px-20);
    margin: 0 auto;
  }
}

footer {
  flex: 1 1 var(--size-pe-50);
  background-color: var(--color-primary);

  &>section {
    max-width: var(--size-screen-lg);
    height: var(--size-pe-100);
    padding: var(--size-px-40) var(--size-px-20);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: var(--size-px-10);

    img {
      width: var(--size-px-30);
    }

    p {
      color: var(--color-neutral-3);
    }
  }
}
</style>
