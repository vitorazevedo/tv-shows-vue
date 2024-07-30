<script setup lang="ts">
</script>

<template>
  <section class="about-view">
    <h1>Frontend Assignment</h1>

    <h2>Introduction</h2>
    <p>This assignment aims to evaluate your familiarity with frontend technologies, programming patterns, and your ability to produce clean and reusable code. It will also give us insight into your basic design knowledge.</p>

    <h2>Requirements</h2>
    <p>Utilize the open TV shows API at <a href="http://www.tvmaze.com/api" target="_blank">http://www.tvmaze.com/api</a> to create an application that allows users to view TV shows categorized by different genres (drama, comedy, sports, etc.). </p>
    <p>Your task is to develop a TV show dashboard that effectively categorizes and displays shows based on their genre. The UI should be intuitive and user-friendly, grouping TV shows by genre and sorting them according to their ratings. When a user selects a show, they should be redirected to a detailed screen with comprehensive information about the show. Additionally, implement a search feature to allow users to look up TV shows by name.</p>

    <h2>Architecture</h2>
    <p>You have the freedom to design the application's architecture as you see fit. However, focus on clean code, reusability, and frontend best practices. Demonstrate your ability to produce top-notch applications.</p>

    <h2>Notes</h2>
    <ul>
      <li>It is preferable to complete this assessment using <a href="https://vuejs.org/" target="_blank">Vue.js</a> framework.</li>
      <li>Ensure the application is responsive and mobile-friendly.</li>
      <li>Minimize the use of scaffolding tools, boilerplate templates, plugins, etc. We want to see your original work.</li>
      <li>Create a README file that explains your architectural decisions, instructions on how to run your solution, and details about the <a href="https://nodejs.org/en" target="_blank">Node.js</a> version and <a href="https://www.npmjs.com/" target="_blank">NPM</a> used.</li>
      <li>Include unit tests.</li>
      <li>Verify that the application runs without console errors before submission.</li>
      <li>Ensure the UI is simple yet visually appealing.</li>
      <li>Feel free to add more features beyond those mentioned.</li>
      <li>Note that there is no endpoint in the <a href="http://www.tvmaze.com/api" target="_blank">TVMaze API</a> that cleanly returns shows by genre. However, the "Show index" endpoint should contain the necessary data.</li>
    </ul>

    <p>By completing this assignment, you will showcase your ability to create a well-structured, efficient, and visually appealing application, reflecting your frontend development skills and design sensibilities.</p>
  </section>
</template>

<style scoped>
.about-view {
  p {
    color: var(--color-neutral-3);
  }

  a {
    color: var(--color-secondary);
    font-weight: var(--font-bold);
  }

  ul {
    padding-left: var(--size-px-15);
    padding-bottom: var(--size-px-20);
    list-style: disc;
    color: var(--color-neutral-3);
    display: flex;
    flex-direction: column;
    gap: var(--size-px-10);
  }
}
</style>
