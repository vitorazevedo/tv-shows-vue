import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import HomeViewComponent from '@/views/HomeView.vue';
import SearchBar from '@/components/SearchBar.vue';
import GenreList from '@/components/GenreList.vue';

global.fetch = vi.fn();

describe.skip('HomeViewComponent', () => {
  it('renders the welcome message and SearchBar component', () => {
    const wrapper = mount(HomeViewComponent);

    expect(wrapper.find('h1').text()).toBe('Welcome!');
    expect(wrapper.findComponent(SearchBar).exists()).toBe(true);
  });

  it('fetches shows and updates genres on mount', async () => {
    const mockShows = [
      { id: 1, name: 'Show 1', genres: ['Drama'] },
      { id: 2, name: 'Show 2', genres: ['Comedy'] },
    ];
    fetch.mockResolvedValueOnce({
      json: async () => mockShows,
    });

    const wrapper = mount(HomeViewComponent);

    await new Promise(process.nextTick); // Wait for the fetch to resolve

    expect(fetch).toHaveBeenCalledWith('http://api.tvmaze.com/shows');
    expect(wrapper.vm.shows).toEqual(mockShows);
    expect(wrapper.vm.genres).toEqual(['Comedy', 'Drama']);
  });

  it('searches shows and updates searchResults', async () => {
    const mockSearchResults = [{ show: { id: 1, name: 'Search Show 1', genres: ['Drama'] } }];
    fetch.mockResolvedValueOnce({
      json: async () => mockSearchResults,
    });

    const wrapper = mount(HomeViewComponent);

    await wrapper.findComponent(SearchBar).vm.$emit('search', 'Search Query');
    await new Promise(process.nextTick); // Wait for the fetch to resolve

    expect(fetch).toHaveBeenCalledWith('http://api.tvmaze.com/search/shows?q=Search Query');
    expect(wrapper.vm.searchResults).toEqual([mockSearchResults[0].show]);
  });

  it('renders GenreList components for each genre', async () => {
    const mockShows = [
      { id: 1, name: 'Show 1', genres: ['Drama'] },
      { id: 2, name: 'Show 2', genres: ['Comedy'] },
    ];
    fetch.mockResolvedValueOnce({
      json: async () => mockShows,
    });

    const wrapper = mount(HomeViewComponent);

    await new Promise(process.nextTick); // Wait for the fetch to resolve

    const genreLists = wrapper.findAllComponents(GenreList);
    expect(genreLists.length).toBe(2);
    expect(genreLists[0].props().genre).toBe('Comedy');
    expect(genreLists[0].props().shows).toEqual([mockShows[1]]);
    expect(genreLists[1].props().genre).toBe('Drama');
    expect(genreLists[1].props().shows).toEqual([mockShows[0]]);
  });
});
