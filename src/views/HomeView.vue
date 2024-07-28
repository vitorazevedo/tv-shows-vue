<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import CommunityIcon from '@/components/icons/IconCommunity.vue'
</script>

<template>
  <section class="home-view">
    <CommunityIcon />
    <h1>This is an home page <strong>dsd</strong></h1>
    <img alt="Vue logo" src="@/assets/svg/logo.svg">
    <HelloWorld msg="You did it!" />
  </section>
</template>

<style scoped>
.home-view {
  background-color: goldenrod;

  img {
    width: 60px;
  }
}
</style>
