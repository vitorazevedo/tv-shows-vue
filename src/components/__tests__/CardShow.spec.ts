import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { createRouter, createWebHistory, RouterLink } from 'vue-router';
import CardShowComponent from '@/components/CardShow.vue';
import Rating from '@/components/Rating.vue';

// Mock router setup
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/detail/:id', component: { template: '<div>Detail Page</div>' } }],
});

describe('CardShowComponent', () => {
  it('renders the RouterLink with the correct "to" attribute', async () => {
    router.push('/');
    await router.isReady();

    const show = {
      id: 1,
      image: { medium: 'http://example.com/image.jpg' },
      name: 'Example Show',
      rating: { average: 8.5 },
    };

    const wrapper = mount(CardShowComponent, {
      global: {
        plugins: [router],
        components: { RouterLink },
      },
      props: {
        show,
      },
    });

    const routerLink = wrapper.findComponent(RouterLink);
    expect(routerLink.props().to).toBe(`/detail/${show.id}`);
  });

  it('renders the show image if present', () => {
    const show = {
      id: 1,
      image: { medium: 'http://example.com/image.jpg' },
      name: 'Example Show',
      rating: { average: 8.5 },
    };

    const wrapper = mount(CardShowComponent, {
      props: {
        show,
      },
    });

    const img = wrapper.find('img:not(.image-placeholder)');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(show.image.medium);
  });

  it('renders the placeholder image if show image is not present', () => {
    const show = {
      id: 1,
      name: 'Example Show',
      rating: { average: 8.5 },
    };

    const wrapper = mount(CardShowComponent, {
      props: {
        show,
      },
    });

    const placeholderImg = wrapper.find('img.image-placeholder');
    expect(placeholderImg.exists()).toBe(true);
    expect(placeholderImg.attributes('src')).toContain('/src/assets/svg/logo.svg');
  });

  it('renders the show name', () => {
    const show = {
      id: 1,
      image: { medium: 'http://example.com/image.jpg' },
      name: 'Example Show',
      rating: { average: 8.5 },
    };

    const wrapper = mount(CardShowComponent, {
      props: {
        show,
      },
    });

    const figcaption = wrapper.find('figcaption');
    expect(figcaption.text()).toBe(show.name);
  });

  it('renders the Rating component with the correct props', () => {
    const show = {
      id: 1,
      image: { medium: 'http://example.com/image.jpg' },
      name: 'Example Show',
      rating: { average: 8.5 },
    };

    const wrapper = mount(CardShowComponent, {
      props: {
        show,
      },
    });

    const ratingComponent = wrapper.findComponent(Rating);
    expect(ratingComponent.exists()).toBe(true);
    expect(ratingComponent.props().rating).toEqual(show.rating);
  });
});
