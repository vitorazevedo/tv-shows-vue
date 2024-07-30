import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import DetailViewComponent from '@/views/DetailView.vue';
import ArrowIcon from '@/components/icons/arrow.vue';
import Rating from '@/components/Rating.vue';
import { createRouter, createWebHistory, RouterLink } from 'vue-router';

const mockRoutes = [
  {
    path: '/detail/:id',
    name: 'Detail',
    component: DetailViewComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: mockRoutes,
});

global.fetch = vi.fn();

interface DetailViewInstance {
  show: { id: number; name: string; genres: string[] };
}

describe('DetailViewComponent', () => {
  it('fetches show data on mount', async () => {
    const mockShow = {
      id: 1,
      name: 'Test Show',
      summary: '<p>Test Summary</p>',
      image: { original: 'http://example.com/image.jpg' },
      rating: { average: 8.5 },
      language: 'English',
      status: 'Running',
      runtime: 60,
      premiered: '2022-01-01',
      ended: null,
      schedule: { days: ['Monday'], time: '20:00' },
      network: { name: 'Test Network', country: { name: 'USA' } },
      genres: ['Drama', 'Sci-Fi'],
    };

    (fetch as any).mockResolvedValueOnce({
      json: () => mockShow,
    });

    router.push({ name: 'Detail', params: { id: '1' } });
    await router.isReady();

    const wrapper = mount<DetailViewInstance>(DetailViewComponent as unknown as DetailViewInstance, {
      global: {
        plugins: [router],
        components: { RouterLink },
      },
    });

    await new Promise(process.nextTick); // Wait for the fetch to resolve

    expect(fetch).toHaveBeenCalledWith('http://api.tvmaze.com/shows/1');
    expect(wrapper.vm.show).toEqual(mockShow);
  });

  it('renders the ArrowIcon component and back link', async () => {
    const mockShow = {
      id: 1,
      name: 'Test Show',
      summary: '<p>Test Summary</p>',
      image: { original: 'http://example.com/image.jpg' },
      rating: { average: 8.5 },
      language: 'English',
      status: 'Running',
      runtime: 60,
      premiered: '2022-01-01',
      ended: null,
      schedule: { days: ['Monday'], time: '20:00' },
      network: { name: 'Test Network', country: { name: 'USA' } },
      genres: ['Drama', 'Sci-Fi'],
    };

    (fetch as any).mockResolvedValueOnce({
      json: () => mockShow,
    });

    router.push({ name: 'Detail', params: { id: '1' } });
    await router.isReady();

    const wrapper = mount(DetailViewComponent, {
      global: {
        plugins: [router],
        components: { RouterLink },
      },
    });

    await new Promise(process.nextTick); // Wait for the fetch to resolve

    const arrowIcon = wrapper.findComponent(ArrowIcon);
    expect(arrowIcon.exists()).toBe(true);
    const backLink = wrapper.findComponent(RouterLink);
    expect(backLink.exists()).toBe(true);
    expect(backLink.props().to).toBe('/');
  });

  it('renders the show details correctly', async () => {
    const mockShow = {
      id: 1,
      name: 'Test Show',
      summary: '<p>Test Summary</p>',
      image: { original: 'http://example.com/image.jpg' },
      rating: { average: 8.5 },
      language: 'English',
      status: 'Running',
      runtime: 60,
      premiered: '2022-01-01',
      ended: null,
      schedule: { days: ['Monday'], time: '20:00' },
      network: { name: 'Test Network', country: { name: 'USA' } },
      genres: ['Drama', 'Sci-Fi'],
    };

    (fetch as any).mockResolvedValueOnce({
      json: async () => mockShow,
    });

    router.push('/1');
    await router.isReady();

    const wrapper = mount(DetailViewComponent, {
      global: {
        plugins: [router],
        components: { RouterLink },
      },
    });

    await new Promise(process.nextTick); // Wait for the fetch to resolve

    expect(wrapper.find('h1').text()).toBe(mockShow.name);
    expect(wrapper.find('div').html()).toContain(mockShow.summary);
    expect(wrapper.find('img').attributes('src')).toBe(mockShow.image.original);

    const ratingComponent = wrapper.findComponent(Rating);
    expect(ratingComponent.exists()).toBe(true);
    expect(ratingComponent.props().rating).toEqual(mockShow.rating);

    const details = wrapper.findAll('li');
    expect(details[0].text()).toBe(`Language${mockShow.language}`);
    expect(details[1].text()).toBe(`Status${mockShow.status}`);
    expect(details[2].text()).toBe(`Runtime${mockShow.runtime} minutes`);
    expect(details[3].text()).toBe(`Premiered${mockShow.premiered}`);
    expect(details[4].text()).toBe(`Schedule${mockShow.schedule.days.join(', ')} at ${mockShow.schedule.time}`);
    expect(details[5].text()).toBe(`Network${mockShow.network.name} / ${mockShow.network.country.name}`);
    expect(details[6].text()).toBe(`Genres${mockShow.genres.join(', ')}`);
  });
});
