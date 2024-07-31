import DetailViewComponent from '@/views/DetailView.vue';
import HomeViewComponent from '@/views/HomeView.vue';
import { config } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeViewComponent,
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: DetailViewComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Set the global configuration for @vue/test-utils
config.global.plugins = [router];

export { router };
