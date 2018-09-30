<template>
  <div class="git-release-form">
    <h1>Github Release Form</h1>
    <form>
      <FormFieldFactory
        v-for="(fieldData, key) in fields"
        :key="key"
        :field-name="key"
        :field-data="fieldData"></FormFieldFactory>
        <GenerateReleaseMessage :fields="fields"></GenerateReleaseMessage>
        <button type="submit" @click="submitForm">Submit</button>
        <RequestResponse :response="response"></RequestResponse>
    </form>
    <hr>
    <ReleaseSummary :endpoint="endpoint" :fields="fields"></ReleaseSummary>
  </div>
</template>

<script>
import fields from '../js/fields.json';
import GitRelease from '../js/git-release';
import FormFieldFactory from './FormFieldFactory.vue';
import ReleaseSummary from './ReleaseSummary.vue';
import RequestResponse from './RequestResponse.vue';
import GenerateReleaseMessage from './GenerateReleaseMessage.vue';

export default {
  components: {
    FormFieldFactory,
    ReleaseSummary,
    RequestResponse,
    GenerateReleaseMessage,
  },
  data() {
    return {
      fields,
      doRelease: null,
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
  computed: {
    endpoint() {
      return `https://api.github.com/repos/${this.fields.owner.val || this.fields.owner.defaultValue}/${this.fields.repo.val || this.fields.repo.defaultValue}/releases`;
    },
  },
  mounted() {
    this.doRelease = new GitRelease();

    Object.keys(fields).forEach((key) => {
      if (process.env && process.env[`VUE_APP_${key.toUpperCase()}`]) {
        this.fields[key].val = process.env[`VUE_APP_${key.toUpperCase()}`];
        this.fields[key].readonly = true;
      }
    });
  },
  methods: {
    submitForm(e) {
      e.preventDefault();

      const payload = {
        tag_name: this.fields.tag_name.val,
        target_commitish: this.fields.target_commitish.val,
        name: this.fields.name.val,
        body: this.fields.body.val,
        draft: this.fields.draft.val,
        prerelease: this.fields.prerelease.val,
      };

      this.doRelease.updateEndpoint(this.endpoint);
      this.doRelease.addAccessToken(this.fields.access_token.val);
      this.doRelease.updateBody(payload);

      this.doRelease.send()
        .then(response => response.json())
        .then((json) => {
          this.response = {
            ...this.responseDefault,
            ...json,
          };
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  .git-release-form {
    max-width: 40rem;
    margin: auto;
  }
</style>

