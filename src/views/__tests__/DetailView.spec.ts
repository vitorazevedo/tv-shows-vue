import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { RouterLink } from 'vue-router';
import { router } from '@/mocks/router.setup';

import Rating from '@/components/Rating.vue';
import ArrowIcon from '@/components/icons/arrow.vue';

import DetailViewComponent from '@/views/DetailView.vue';

import type { Show, ShowResponse } from '@/types/interfaces';

// Mock the global fetch function
global.fetch = vi.fn();

// Define the type for the component's instance
interface DetailViewInstance {
  show: Show;
}

describe('DetailViewComponent', () => {
  // Mock the show data
  const mockShow: ShowResponse = {
    name: 'Test Show',
    summary: '<p>Test Summary</p>',
    image: { original: 'http://example.com/image.jpg' },
    rating: { average: 8.5 },
    language: 'English',
    status: 'Running',
    runtime: 60,
    premiered: '2022-01-01',
    ended: undefined,
    schedule: { days: ['Monday'], time: '20:00' },
    network: { name: 'Test Network', country: { name: 'USA' } },
    genres: ['Drama', 'Sci-Fi'],
  };

  const expectedShow: Show = {
    name: 'Test Show',
    summary: '<p>Test Summary</p>',
    image: { original: 'http://example.com/image.jpg' },
    rating: { average: 8.5 },
    info: [
      { label: 'Language', value: 'English' },
      { label: 'Status', value: 'Running' },
      { label: 'Runtime', value: '60 minutes' },
      { label: 'Premiered', value: '2022-01-01' },
      { label: 'Schedule', value: 'Monday at 20:00' },
      { label: 'Network', value: 'Test Network / USA' },
      { label: 'Genres', value: 'Drama, Sci-Fi' },
    ],
  };

  it('fetches and processes show data successfully', async () => {
    (fetch as any).mockResolvedValueOnce({
      json: () => mockShow,
    });

    router.push({ name: 'Detail', params: { id: '1' } });
    await router.isReady();

    const wrapper = mount<DetailViewInstance>(DetailViewComponent as unknown as DetailViewInstance);

    await new Promise(process.nextTick); // Wait for the fetch to resolve

    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows/1');
    expect(wrapper.vm.show).toEqual(expectedShow);
  });

  it('renders the ArrowIcon component and back link', async () => {
    (fetch as any).mockResolvedValueOnce({
      json: () => mockShow,
    });

    router.push({ name: 'Detail', params: { id: '1' } });
    await router.isReady();

    const wrapper = mount<DetailViewInstance>(DetailViewComponent as unknown as DetailViewInstance);

    await new Promise(process.nextTick); // Wait for the fetch to resolve

    const arrowIcon = wrapper.findComponent(ArrowIcon);
    expect(arrowIcon.exists()).toBe(true);

    const backLink = wrapper.findComponent(RouterLink);
    expect(backLink.exists()).toBe(true);
    expect(backLink.props().to).toBe('/');
  });

  it('renders the show details correctly', async () => {
    (fetch as any).mockResolvedValueOnce({
      json: async () => mockShow,
    });

    const wrapper = mount<DetailViewInstance>(DetailViewComponent as unknown as DetailViewInstance);

    await new Promise(process.nextTick); // Wait for the fetch to resolve

    expect(wrapper.find('h1').text()).toBe(mockShow.name!);
    expect(wrapper.find('div').html()).toContain(mockShow.summary!);
    expect(wrapper.find('img').attributes('src')).toBe(mockShow.image!.original);

    const ratingComponent = wrapper.findComponent(Rating);
    expect(ratingComponent.exists()).toBe(true);
    expect(ratingComponent.props().rating).toEqual(mockShow.rating);

    const details = wrapper.findAll('li');
    expect(details[0].text()).toBe(`LanguageEnglish`);
    expect(details[1].text()).toBe(`StatusRunning`);
    expect(details[2].text()).toBe(`Runtime60 minutes`);
    expect(details[3].text()).toBe(`Premiered2022-01-01`);
    expect(details[4].text()).toBe(`ScheduleMonday at 20:00`);
    expect(details[5].text()).toBe(`NetworkTest Network / USA`);
    expect(details[6].text()).toBe(`GenresDrama, Sci-Fi`);
  });

  it('handles missing data gracefully', async () => {
    const mockIncompleteShow: ShowResponse = {
      name: 'Test Show',
      summary: undefined,
      image: null,
      rating: { average: null },
      language: undefined,
      status: undefined,
      runtime: undefined,
      premiered: undefined,
      ended: undefined,
      schedule: undefined,
      network: undefined,
      genres: [],
    };

    (fetch as any).mockResolvedValueOnce({
      json: () => mockIncompleteShow,
    });

    const wrapper = mount<DetailViewInstance>(DetailViewComponent as unknown as DetailViewInstance);

    await new Promise(process.nextTick); // Wait for the fetch to resolve

    const expectedIncompleteShow: Show = {
      name: 'Test Show',
      summary: 'No summary available.',
      image: null,
      rating: { average: null },
      info: [],
    };

    expect(wrapper.vm.show).toEqual(expectedIncompleteShow);
  });

  it('handles fetch errors gracefully', async () => {
    // Mock a network error
    (fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

    router.push({ name: 'Detail', params: { id: '1' } });
    await router.isReady();

    const wrapper = mount<DetailViewInstance>(DetailViewComponent as unknown as DetailViewInstance);

    await new Promise(process.nextTick); // Wait for the fetch to resolve

    expect(wrapper.vm.show).toBeUndefined(); // The show data should be undefined
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch show data:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});
