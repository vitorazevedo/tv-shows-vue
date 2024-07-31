# TV Shows

Welcome to the TV Shows project! This application aims to provide a comprehensive and user-friendly platform for browsing tv shows, categorized by genre and sorted by ratings. Whether you're a tv show enthusiast or just looking for something new to watch, this dashboard offers an intuitive interface to explore and discover tv shows.  

You can check the results of this project here: [https://tv-shows-vue.web.app/](https://tv-shows-vue.web.app/)


## Architectural Decisions

### Building from Scratch

I decided to develop everything from scratch to ensure the project remains lightweight and easy to maintain, avoiding the complexity that often comes with using external libraries. Additionally, the Vue Composition API was chosen for coding to leverage its modern, flexible approach.

### CSS and Fonts Configuration

The project was configured to include the necessary CSS files and custom fonts, which can be found in the `assets` folder.

### Interface Structure

The main skeleton of the interface, including the `header`, `main`, and `footer`, was placed in the `App.vue` file. This design ensures that all views are loaded within the `main` element, while the `header` and `footer` remain consistent throughout the user's journey.

### Routing and Lazy Loading

For routing, I opted to implement lazy loading for all content for each route. This configuration is detailed in the `index.ts` file within the `router` folder.

### Main Views

Three main views were created for this project:

1. **HomeView.vue**: Responsible for fetching data for all TV shows and filtering them using the search feature.
2. **DetailView.vue**: Responsible for fetching data for a specific TV show.
3. **AboutView.vue**: Provides a description of all the requirements for this assessment.

### Reusable Components

To promote code reusability, four components were created:

1. **GenreList.vue**: Used in `HomeView.vue`, this component receives `genre` and `shows` data, displaying groups of shows by genre. The list is horizontally scrollable using a trackpad or mouse wheel.
2. **CardShow.vue**: Used in `GenreList.vue`, it groups show elements, specifically the image, title, and rating.
3. **Rating.vue**: Used in both `CardShow.vue` and `DetailView.vue`, this component displays a star icon and the rating value passed by the parent component.
4. **SearchBar.vue**: Used in `HomeView.vue`, it emits the input value entered by the user upon pressing the search button or the enter key. The parent component then uses this value to filter the TV show lists.

### Testing

I created essential unit tests to ensure adequate coverage and setup of the end-to-end tests using Cypress, and including one small example.

## Prerequisites

This project requires Node.js v22.3.0 and NPM v10.8.1

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```
