import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import RatingComponent from '@/components/Rating.vue';
import StarIcon from '@/components/icons/star.vue';

describe('RatingComponent', () => {
  it('renders the StarIcon and rating average when rating is provided', () => {
    const wrapper = mount(RatingComponent, {
      props: {
        rating: {
          average: 4.5,
        },
      },
    });

    expect(wrapper.findComponent(StarIcon).exists()).toBe(true);
    expect(wrapper.find('.rating').exists()).toBe(true);
    expect(wrapper.find('.rating span').text()).toBe('4.5');
  });

  it('does not render anything when rating is not provided', () => {
    const wrapper = mount(RatingComponent, {
      props: {
        rating: {
          average: 0,
        },
      },
    });

    expect(wrapper.find('.rating').exists()).toBe(false);
  });
});
