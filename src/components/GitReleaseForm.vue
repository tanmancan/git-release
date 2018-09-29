<template>
  <div class="git-release-form">
    <h1>Github Release Form</h1>
    <form action="">
      <label for="owner">Owner Account Name</label>
      <input
        required
        type="text"
        name="owner"
        id="owner"
        v-model="owner.val"
        :placeholder="getDefaultValues('owner')">
        <p><small>{{owner.helpText}}</small></p>

      <label for="repo">Repository Name</label>
      <input
        required
        type="text"
        name="repo"
        id="repo"
        v-model="repo.val"
        :placeholder="getDefaultValues('repo')">
        <p><small>{{repo.helpText}}</small></p>

      <label for="access_token">Access Token</label>
      <input
        required
        type="text"
        name="access_token"
        id="access_token"
        v-model="access_token.val"
        :placeholder="getDefaultValues('access_token')">
        <p><small>{{access_token.helpText}}</small></p>

      <label for="tag_name">Tag Name</label>
      <input
        required
        type="text"
        name="tag_name"
        id="tag_name"
        v-model="tag_name.val"
        :placeholder="getDefaultValues('tag_name')">
        <p><small>{{tag_name.helpText}}</small></p>

      <label for="target_commitish">Target Commit Hash</label>
      <input
        required
        type="text"
        name="target_commitish"
        id="target_commitish"
        v-model="target_commitish.val"
        :placeholder="getDefaultValues('target_commitish')">
        <p><small>{{target_commitish.helpText}}</small></p>

      <label for="name">Release Name</label>
      <input
        required
        type="text"
        name="name"
        id="name"
        v-model="name.val"
        :placeholder="getDefaultValues('name')">
        <p><small>{{name.helpText}}</small></p>

      <label for="body">Release Message</label>
      <textarea
        required
        name="body"
        id="body"
        v-model="body.val"
        :placeholder="getDefaultValues('body')"
        rows="6"></textarea>
        <p><small>{{body.helpText}}</small></p>

      <label for="draft">
      <input
        type="checkbox"
        name="draft"
        id="draft"
        v-model="draft.val"
        :placeholder="getDefaultValues('draft')">
        Draft</label>
        <p><small>{{draft.helpText}}</small></p>

      <label for="prerelease">
      <input
        type="checkbox"
        name="prerelease"
        id="prerelease"
        v-model="prerelease.val"
        :placeholder="getDefaultValues('prerelease')">
        Prerelease
        </label>
        <p><small>{{prerelease.helpText}}</small></p>

        <button type="submit" @click="submitForm">Submit</button>
        <hr>

        <p class="response-message">
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
    </form>

    <hr>
<pre>
<strong>Release Summary:</strong>

<strong>endpoint:</strong> {{endpoint}}
<strong>tag_name:</strong> {{tag_name.val}}
<strong>target_commitish:</strong> {{target_commitish.val}}
<strong>name:</strong> {{name.val}}
<strong>body:</strong> {{body.val}}
<strong>draft:</strong> {{draft.val ? 'yes' : 'no'}}
<strong>prerelease:</strong> {{prerelease.val ? 'yes' : 'no'}}
</pre>
  </div>
</template>

<script>
import fields from '../js/fields.json';
import GitRelease from '../js/git-release';

export default {
  components: {

  },
  data() {
    return {
      ...fields,
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
      return `https://api.github.com/repos/${this.owner.val || this.owner.defaultValue}/${this.repo.val || this.repo.defaultValue}/releases`;
    },
  },
  mounted() {
    this.doRelease = new GitRelease();
  },
  methods: {
    getDefaultValues(key) {
      return `ex: ${this[key].defaultValue}`;
    },
    submitForm(e) {
      e.preventDefault();

      const payload = {
        tag_name: this.tag_name.val,
        target_commitish: this.target_commitish.val,
        name: this.name.val,
        body: this.body.val,
        draft: this.draft.val,
        prerelease: this.prerelease.val,
      };

      this.doRelease.updateEndpoint(this.endpoint);
      this.doRelease.addHeader('Content-Type', 'application/json');
      this.doRelease.addHeader('Authorization', `token ${this.access_token.val}`);
      this.doRelease.addHeader('Accept', 'application/vnd.github.v3+json');
      this.doRelease.updateBody(payload);

      this.doRelease.send()
        .then(response => response.json())
        .then((json) => {
          this.response = {
            ...this.responseDefault,
            ...json,
          };

          console.log('TESTTTT', this.response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  .git-release-form {
    max-width: 40rem;
    margin: auto;
  }

  label {
    display: block;
  }

  input[type="text"],
  textarea {
    display: block;
    width: 100%;
    padding: .25rem;
  }

  p {
    margin: 0 0 1rem;
  }

  button {
    font-size: 1rem;
    padding: 0.25rem 1rem;
    border: 1px solid #ccc;
    background: #666;
    color: white;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0 0 1rem;
  }
</style>

