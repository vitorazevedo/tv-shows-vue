import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SearchBarComponent from '@/components/SearchBar.vue';
import SearchIcon from '@/components/icons/search.vue';

// Define the type for your component's instance
interface SearchBarComponentInstance {
  query: string;
}

describe('SearchBarComponent', () => {
  it('renders the SearchIcon component', () => {
    const wrapper = mount(SearchBarComponent);
    const searchIcon = wrapper.findComponent(SearchIcon);

    expect(searchIcon.exists()).toBe(true);
  });

  it('renders the input and button elements', () => {
    const wrapper = mount(SearchBarComponent);
    const input = wrapper.find('input');
    const button = wrapper.find('button');

    expect(input.exists()).toBe(true);
    expect(button.exists()).toBe(true);
  });

  it('updates the query when typing in the input', async () => {
    const wrapper = mount<SearchBarComponentInstance>(SearchBarComponent as unknown as SearchBarComponentInstance);
    const input = wrapper.find('input');
    await input.setValue('test query');

    expect(wrapper.vm.query).toBe('test query');
  });

  it('emits a search event with the query value when the button is clicked', async () => {
    const wrapper = mount<typeof SearchBarComponent, SearchBarComponentInstance>(SearchBarComponent);

    const input = wrapper.find('input');
    await input.setValue('test query');

    const button = wrapper.find('button');
    await button.trigger('click');

    expect(wrapper.emitted('search')).toBeTruthy();
    expect(wrapper.emitted('search')?.[0]).toEqual(['test query']);
  });

  it('emits a search event with the query value when enter is pressed in the input', async () => {
    const wrapper = mount<typeof SearchBarComponent, SearchBarComponentInstance>(SearchBarComponent);
    const input = wrapper.find('input');
    await input.setValue('test query');
    await input.trigger('keyup.enter');

    expect(wrapper.emitted('search')).toBeTruthy();
    expect(wrapper.emitted('search')?.[0]).toEqual(['test query']);
  });
});
