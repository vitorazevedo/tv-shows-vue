import { createRouter, createWebHistory } from 'vue-router';
import { config } from '@vue/test-utils';
import DetailViewComponent from '@/views/DetailView.vue';
import HomeViewComponent from '@/views/HomeView.vue';

const routes = [
  {
    path: '/detail/:id',
    name: 'Detail',
    component: DetailViewComponent,
  },
  {
    path: '/',
    name: 'Home',
    component: HomeViewComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Set the global configuration for @vue/test-utils
config.global.plugins = [router];

export { router };
