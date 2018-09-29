<template>
  <p class="response-message" v-if="response.message || response.errors">
    <span v-if="response.html_url">
      Your release has been created:
      <a target="_blank" rel="noopener noreferrer" :href="response.html_url">View Release</a>
      <br>
    </span>
    <span v-if="response.documentation_url">{{response.documentation_url}}<br></span>
    <span v-if="response.message">{{response.message}}<br></span>
    <span v-if="response.errors" v-for="(error, idx) in response.errors" :key="idx">
      <span>{{error.field}} {{error.code}}<br></span>
    </span>
  </p>
</template>

<script>
export default {
  props: ['response'],
};
</script>
