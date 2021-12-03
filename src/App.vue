<template>
  <about-me />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AboutMe from './components/AboutMe.vue';

export default defineComponent({
  name: 'App',
  components: {
    AboutMe,
  },
});
</script>

<style lang="scss">
@import '@/assets/style.scss';
</style>
