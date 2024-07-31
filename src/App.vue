<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';
import MenuIcon from '@/components/icons/menu.vue';
import CloseIcon from '@/components/icons/close.vue';

const dynamicStyle = ref({ transform: '' });

const toggleStyle = () => {
  console.log('toggleStyle clicked');

  if (dynamicStyle.value.transform) {
    dynamicStyle.value = { transform: '' };
  } else {
    dynamicStyle.value = { transform: 'translateX(0)' };
  }
};

const fullYear = new Date().getFullYear();
</script>

<template>
  <header>
    <section>
      <RouterLink to="/"><img alt="TVScope Logo" src="@/assets/svg/logo.svg"></RouterLink>
      <aside :style="dynamicStyle">
        <nav>
          <RouterLink to="/" @click="toggleStyle">TV Shows</RouterLink>
          <RouterLink to="/about" @click="toggleStyle">About</RouterLink>
          <button @click="toggleStyle">
            <CloseIcon />
          </button>
        </nav>
      </aside>
      <button @click="toggleStyle">
        <MenuIcon />
      </button>
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

    aside {
      transition: transform 0.3s ease-in-out;

      nav {
        display: flex;
        align-items: center;
        gap: var(--size-px-20);
        color: var(--color-neutral-3);
        font-weight: var(--font-bold);
      }
    }

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
      aside {
        visibility: none;
        width: var(--size-pe-100);
        height: var(--size-pe-100);
        padding: var(--size-px-80) var(--size-px-40);
        position: fixed;
        top: 0;
        right: 0;
        z-index: var(--index-10);
        transform: translateX(var(--size-pe-100));
        background-color: var(--color-primary-dark);

        nav {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-size: var(--font-size-20);

          button {
            color: var(--color-white-dark);
            position: absolute;
            top: var(--size-px-22);
            right: var(--size-px-20);
            z-index: var(--index-1);
          }
        }

        /* visibility: visible; */
        /* display: block; */
        /* transform: translateX(0); */
      }

      button {
        display: flex;
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
