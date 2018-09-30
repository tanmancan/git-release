<template>
  <div>
    <p class="response-message" v-if="response.message || response.errors || response.html_url">
      <span v-if="response.html_url">
        Your release has been created:
        <a target="_blank" rel="noopener noreferrer" :href="response.html_url">View Release</a>
        <br>
      </span>
      <span v-if="response.documentation_url">{{response.documentation_url}}<br></span>
      <span v-if="response.message">{{response.message}}<br></span>
      <span v-if="response.errors" v-for="(error, idx) in response.errors" :key="idx">
        <span>Error:{{error.code}}</span>
        <span v-if="error.field"> - field:{{error.field}}</span>
        <span v-if="error.message"> - {{error.message}}</span>
        <br>
      </span>
    </p>
    <p class="error-message" v-if="response.errors">

    </p>
  </div>
</template>

<script>
export default {
  props: ['response'],
};
</script>
