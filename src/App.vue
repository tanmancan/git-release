<template>
  <div id="app">
    <GitReleaseForm></GitReleaseForm>
  </div>
</template>

<script>
import GitReleaseForm from './components/GitReleaseForm.vue';

export default {
  name: 'app',
  components: {
    GitReleaseForm,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
