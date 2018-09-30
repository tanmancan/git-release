<template>
  <div class="generate-release-message">
    <label :for="fieldName">{{fieldData.label}}</label>
    <Datepicker
      v-model="startDate"
      wrapper-class="datepick-wrapper"
      placeholder="Select start date range."></Datepicker>
    <Datepicker
      v-model="endDate"
      wrapper-class="datepick-wrapper"
      placeholder="Select end date range."></Datepicker>
      <button @click="generateMessage">Generate</button>
      <p><small>{{fieldData.helpText}}</small></p>
      <RequestResponse :response="response"></RequestResponse>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import GitRelease from '../js/git-release';
import RequestResponse from './RequestResponse.vue';

export default {
  props: ['fields'],
  components: {
    RequestResponse,
    Datepicker,
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      fieldData: {
        helpText: 'Select a start and end date, to autogenerate release message based on a range of commit messages. If not end date is provided, more recent commit will be used as the end date.',
        defaultValue: 'abcde012345',
        val: '',
        type: 'text',
        label: 'Auto Generate Release Message',
        readonly: false,
      },
      fieldName: 'starting_commitish',
      responseDefault: {
        message: null,
        errors: null,
      },
      response: {
        message: null,
        errors: null,
      },
    };
  },
  mounted() {
    this.getCommits = new GitRelease();
  },
  computed: {
    endpoint() {
      const endpoint = 'https://api.github.com/repos/:owner/:repo/commits';
      const updatedEndpoint = endpoint.replace(':owner', this.fields.owner.val || this.fields.owner.defaultValue)
        .replace(':repo', this.fields.repo.val || this.fields.repo.defaultValue);
      return updatedEndpoint;
    },
  },
  methods: {
    generateMessage(e) {
      e.preventDefault();
      if (!this.startDate) {
        return;
      }

      const payload = {
        sha: this.fields.target_commitish.val
          ? this.fields.target_commitish.val
          : null,
        since: this.generateDateString(this.startDate),
        until: this.generateDateString(this.endDate),
      };

      const query = Object.entries(payload)
        .map(([key, val]) => (val ? encodeURI(`${key}=${val}`) : null))
        .filter(val => val);

      this.getCommits.updateEndpoint(`${this.endpoint}?${query.join('&')}`);
      this.getCommits.addAccessToken(this.fields.access_token.val);
      this.getCommits.updateBody(payload);

      this.getCommits.send('GET')
        .then(response => response.json())
        .then((json) => {
          this.response = {
            ...this.responseDefault,
            ...json,
          };
          if (!this.response.message && !this.response.errors) {
            this.generateReleaseNotes(this.response);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    generateDateString(dateObj) {
      if (dateObj) {
        const year = dateObj.getFullYear();
        const month = `0${dateObj.getMonth() + 1}`.slice(-2);
        const date = `0${dateObj.getDate()}`.slice(-2);
        return `${year}-${month}-${date}T00:00:00Z`;
      }
      return null;
    },
    generateReleaseNotes(commits = {}) {
      const commitMessages = Object.entries(commits)
        .filter(item => item[1])
        .map(item => `- ${item[1].commit.message}`);
      this.fields.body.val = commitMessages.join('\n');
    },
  },
};
</script>

<style lang="scss">
  .generate-release-message {
    display: flex;
    flex-flow: row wrap;

    label,
    p {
      flex: 1 0 100%;
      width: 100%;
    }

    .datepick-wrapper {
      flex: 1 1 40%;

      > div:first-child,
      input {
        height: 100%;
      }
    }

    button {
      flex: 1 1 20%;
      margin: 0;
    }
  }
</style>
