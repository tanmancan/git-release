<template>
  <div class="generate-release-message">
    <label :for="fieldName">{{fieldData.label}}</label>
    <input
      required
      :type="fieldData.type"
      :name="fieldName"
      :id="fieldName"
      v-model="fieldData.val"
      :placeholder="fieldData.defaultValue">
      <button @click="generateMessage">Generate</button>
      <p><small>{{fieldData.helpText}}</small></p>
  </div>
</template>

<script>
import GitRelease from '../js/git-release';

export default {
  props: ['fields'],
  data() {
    return {
      fieldData: {
        helpText: 'Provide a starting hash to autogenerate release message based on a range of commit messages.',
        defaultValue: 'abcde012345',
        val: '',
        type: 'text',
        label: 'Auto Generate Release Message',
        readonly: false,
      },
      fieldName: 'starting_commitish',
    };
  },
  mounted() {
    this.getCommits = new GitRelease();
  },
  computed: {
    endpoint() {
      return `https://api.github.com/repos/${this.fields.owner.val || this.fields.owner.defaultValue}/${this.fields.repo.val || this.fields.repo.defaultValue}/commits`;
    },
  },
  methods: {
    generateMessage(e) {
      e.preventDefault();

      const payload = {
        sha: '',
        path: '',
        author: '',
        since: '',
        until: '',
      };

      this.getCommits.updateEndpoint(this.endpoint);
      this.getCommits.addAccessToken(this.fields.access_token.val);
      this.getCommits.updateBody(payload);
    },
  },
};
</script>

<style lang="scss" scoped>
  .generate-release-message {
    display: flex;
    flex-flow: row wrap;
  }

  label,
  p {
    flex: 1 0 100%;
    width: 100%;
  }

  input {
    flex: 1 1 80%;
  }

  button {
    flex: 1 1 20%;
    margin: 0;
  }
</style>
