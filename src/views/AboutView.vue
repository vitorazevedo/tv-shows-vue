<script setup lang="ts">
</script>

<template>
  <section class="about-view">
    <h1>Frontend Assignment</h1>

    <h2>Introduction</h2>
    <p>The purpose of this assignment is to evaluate the candidate’s familiarity with frontend technologies, programming
      patterns and to showcase a sample of what clean and reusable code means to the candidate. This also helps in
      understanding the candidate’s basic design knowledge.</p>

    <h2>Requirement</h2>
    <p>You will use an open <a href="http://www.tvmaze.com/api" target="_blank">TV shows API</a> to create an
      application that allows users to view lists (preferably horizontal list) of TV shows based on different genres
      (drama, comedy, sports, etc.).</p>
    <p>Your goal is to develop a TV show dashboard that effectively categorizes and displays shows based on their genre.
      You are expected to create an intuitive and user-friendly UI where TV shows are not only grouped by genre but also
      sorted according to their ratings. When a user selects a particular show from the dashboard, they should be
      redirected to a detailed screen that provides comprehensive information about the show. To enhance user
      experience, a search feature should also be implemented allowing users to look up tv shows by name.</p>

    <h2>Architecture</h2>
    <p>There is no limit for this. Design your application as you wish. But make sure you will focus on clean code,
      reusability, frontend best practices. Show us that you know how to produce top notch applications.</p>

    <h2>Notes</h2>
    <ul>
      <li>Please keep in mind that we use VueJS in ABN AMRO. Preferably, you complete this assessment
        using this framework.</li>
      <li>Application must be responsive and mobile friendly</li>
      <li>Please keep the leverage/use of scaffolding tools, boilerplate templates, plugins etc. to a minimum.
        We don’t expect you to create things from scratch but, we also would like to see your own
        creation</li>
      <li>Please create a readme file that explains your architectural decisions (E.G. why did you choose a
        specific framework) and make sure you include instructions on how to run your solution, add
        details about NodeJS version being used and NPM.</li>
      <li>Please include unit tests</li>
      <li>Please check that application is running and there are no console errors before sending it to us</li>
      <li>Please make sure that the UI is simple yet eye-catching</li>
      <li>Please feel free to include more features other than the few mentioned above.</li>
      <li>You may notice there is no endpoint in the TVMaze API that cleanly returns shows by genre. However, the
        "Show index" endpoint should contain the data you need</li>
    </ul>
  </section>
</template>

<style scoped>
.about-view {
  p {
    color: var(--color-neutral-3);

    a {
      color: var(--color-secondary);
      font-weight: var(--font-bold);
    }
  }

  ul {
    padding-left: var(--size-px-15);
    list-style: disc;
    color: var(--color-neutral-3);
    display: flex;
    flex-direction: column;
    gap: var(--size-px-10);
  }
}
</style>
