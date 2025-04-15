import CardShowComponent from '@/components/CardShow.vue';
import Rating from '@/components/Rating.vue';
import { router } from '@/mocks/router.setup';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { RouterLink } from 'vue-router';

router.push({ name: 'Home' });
await router.isReady();

describe('CardShowComponent', () => {
  let show: {
    id: number;
    image?: { medium: string };
    name: string;
    rating: { average: number };
  };

  beforeEach(() => {
    show = {
      id: 1,
      image: { medium: 'http://example.com/image.jpg' },
      name: 'Example Show',
      rating: { average: 8.5 },
    };
  });

  it('renders the RouterLink with the correct "to" attribute', () => {
    const wrapper = mount(CardShowComponent, {
      props: { show },
    });

    const routerLink = wrapper.findComponent(RouterLink);
    expect(routerLink.props().to).toBe(`/detail/${show.id}`);
  });

  it('renders the show image if present', () => {
    const wrapper = mount(CardShowComponent, {
      props: { show },
    });

    const img = wrapper.find('img:not(.image-placeholder)');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(show.image?.medium);
  });

  it('renders the placeholder image if show image is not present', () => {
    const wrapper = mount(CardShowComponent, {
      props: {
        show: {
          ...show,
          image: undefined,
        },
      },
    });

    const placeholderImg = wrapper.find('img.image-placeholder');
    expect(placeholderImg.exists()).toBe(true);
    expect(placeholderImg.attributes('src')).toContain('data:image/svg+xml');
  });

  it('renders the show name', () => {
    const wrapper = mount(CardShowComponent, {
      props: { show },
    });

    const figcaption = wrapper.find('figcaption');
    expect(figcaption.text()).toBe(show.name);
  });

  it('renders the Rating component with the correct props', () => {
    const wrapper = mount(CardShowComponent, {
      props: { show },
    });

    const ratingComponent = wrapper.findComponent(Rating);
    expect(ratingComponent.exists()).toBe(true);
    expect(ratingComponent.props().rating).toEqual(show.rating);
  });
});
