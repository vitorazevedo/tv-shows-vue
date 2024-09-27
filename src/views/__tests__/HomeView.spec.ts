import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { router } from '@/mocks/router.setup';

import GenreList from '@/components/GenreList.vue';
import SearchBar from '@/components/SearchBar.vue';

import HomeView from '@/views/HomeView.vue';

// Mock the global fetch function
global.fetch = vi.fn();

// Define the type for the component's instance
interface HomeViewInstance {
  shows: Array<{ id: number; name: string; genres: string[]; rating: { average: number } }>;
  searchResults: Array<{ id: number; name: string; genres: string[]; rating: { average: number } }>;
  genres: string[];
}

// Helper function to create a mock Response object
function createMockResponse(data: any): Response {
  return {
    json: async () => data,
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: new Headers(),
    redirected: false,
    type: 'basic',
    url: '',
    clone: () => createMockResponse(data),
    body: null,
    bodyUsed: false,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    blob: () => Promise.resolve(new Blob([])),
    formData: () => Promise.resolve(new FormData()),
    text: () => Promise.resolve(''),
  } as Response;
}

router.push({ name: 'Home' });

describe('HomeView', () => {
  it('renders the welcome message and SearchBar component', () => {
    const mockShowsEndpoint = [{ id: 1, name: 'Search Show 1', genres: ['Drama'], rating: { average: 6 } }];
    const fetchSpy = vi.spyOn(global, 'fetch');

    fetchSpy.mockResolvedValueOnce(createMockResponse(mockShowsEndpoint));

    const wrapper = mount(HomeView);

    expect(wrapper.find('h1').text()).toBe('Welcome!');
    expect(wrapper.findComponent(SearchBar).exists()).toBe(true);
  });

  it('fetches shows and updates genres on mount', async () => {
    const mockShows = [
      { id: 1, name: 'Show 1', genres: ['Drama'], rating: { average: 6 } },
      { id: 2, name: 'Show 2', genres: ['Comedy'], rating: { average: 6 } },
    ];
    (fetch as any).mockResolvedValueOnce(createMockResponse(mockShows));

    const wrapper = mount<HomeViewInstance>(HomeView as unknown as HomeViewInstance);

    await new Promise(process.nextTick); // Wait for the fetch to resolve

    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows');
    expect(wrapper.vm.shows).toEqual(mockShows);
    expect(wrapper.vm.genres).toEqual(['Comedy', 'Drama']);
  });

  it('searches shows and updates searchResults with multiple fetch calls', async () => {
    const mockShowsEndpoint = [{ id: 1, name: 'Search Show 1', genres: ['Drama'], rating: { average: 6 } }];
    const mockSearchEndpoint = [{ show: { id: 2, name: 'Search Show 2', genres: ['Comedy'], rating: { average: 6 } } }];

    const fetchSpy = vi.spyOn(global, 'fetch');

    // Set up the first mock response
    fetchSpy.mockResolvedValueOnce(createMockResponse(mockShowsEndpoint));
    const wrapper = mount<HomeViewInstance>(HomeView as unknown as HomeViewInstance);
    expect(wrapper.exists()).toBe(true);
    await new Promise(process.nextTick);
    expect(fetchSpy).toHaveBeenNthCalledWith(1, 'https://api.tvmaze.com/shows');
    expect(wrapper.vm.shows).toEqual([mockShowsEndpoint[0]]);

    // Set up the second mock response
    fetchSpy.mockResolvedValueOnce(createMockResponse(mockSearchEndpoint));
    await wrapper.findComponent(SearchBar).vm.$emit('search', 'SearchQuery');
    await new Promise(process.nextTick);
    expect(fetchSpy).toHaveBeenNthCalledWith(2, 'https://api.tvmaze.com/search/shows?q=SearchQuery');
    expect(wrapper.vm.searchResults).toEqual([mockSearchEndpoint[0].show]);

    fetchSpy.mockRestore();
  });

  it('renders GenreList components for each genre', async () => {
    const mockShows = [
      { id: 1, name: 'Show 1', genres: ['Drama'], rating: { average: 6 } },
      { id: 2, name: 'Show 2', genres: ['Comedy'], rating: { average: 6 } },
    ];
    (fetch as any).mockResolvedValueOnce(createMockResponse(mockShows));

    const wrapper = mount<HomeViewInstance>(HomeView as unknown as HomeViewInstance);

    await new Promise(process.nextTick); // Wait for the fetch to resolve

    const genreLists = wrapper.findAllComponents(GenreList);
    expect(genreLists.length).toBe(2);
    expect(genreLists[0].props().genre).toBe('Comedy');
    expect(genreLists[0].props().shows).toEqual([mockShows[1]]);
    expect(genreLists[1].props().genre).toBe('Drama');
    expect(genreLists[1].props().shows).toEqual([mockShows[0]]);
  });
});
