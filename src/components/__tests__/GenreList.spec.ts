import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import GenreListComponent from '@/components/GenreList.vue';
import CardShow from '@/components/CardShow.vue';
import { router } from '@/mocks/router.setup';

router.push({ name: 'Home' });
await router.isReady();

describe('GenreListComponent', () => {
  const props = {
    genre: 'Drama',
    shows: [
      { id: 1, name: 'Show 1', rating: { average: 7.5 }, image: { medium: 'http://example.com/show1.jpg' } },
      { id: 2, name: 'Show 2', rating: { average: 8.0 }, image: { medium: 'http://example.com/show2.jpg' } },
      { id: 3, name: 'Show 3', rating: { average: 6.5 }, image: { medium: 'http://example.com/show3.jpg' } },
    ],
  };

  it('renders the genre title', () => {
    const wrapper = mount(GenreListComponent, {
      props,
    });

    const genreTitle = wrapper.find('h2');
    expect(genreTitle.exists()).toBe(true);
    expect(genreTitle.text()).toBe(props.genre);
  });

  it('renders the correct number of CardShow components', () => {
    const wrapper = mount(GenreListComponent, {
      props,
    });

    const cardShows = wrapper.findAllComponents(CardShow);
    expect(cardShows.length).toBe(props.shows.length);
  });

  it('passes the correct props to CardShow components', () => {
    const wrapper = mount(GenreListComponent, {
      props,
    });

    const cardShows = wrapper.findAllComponents(CardShow);
    cardShows.forEach((cardShow, index) => {
      expect(cardShow.props().show).toEqual(props.shows[index]);
    });
  });

  it('sorts shows by rating in descending order', () => {
    const wrapper = mount(GenreListComponent, {
      props,
    });

    const sortedShows = props.shows.sort((a, b) => b.rating.average - a.rating.average);

    const cardShows = wrapper.findAllComponents(CardShow);
    cardShows.forEach((cardShow, index) => {
      expect(cardShow.props().show).toEqual(sortedShows[index]);
    });
  });
});
