<template>
  <div class="form-field">
    <FormFieldText
      v-if="isText"
      :field-data="fieldData"
      :fieldName="fieldName"></FormFieldText>
    <FormFieldTextarea
      v-if="isTextarea"
      :field-data="fieldData"
      :field-name="fieldName"></FormFieldTextarea>
    <FormFieldCheckbox
      v-if="isCheckbox"
      :field-data="fieldData"
      :field-name="fieldName"></FormFieldCheckbox>
  </div>
</template>

<script>
import FormFieldText from './FormFieldText.vue';
import FormFieldTextarea from './FormFieldTextarea.vue';
import FormFieldCheckbox from './FormFieldCheckbox.vue';

export default {
  components: {
    FormFieldText,
    FormFieldTextarea,
    FormFieldCheckbox,
  },
  props: ['fieldData', 'fieldName'],
  computed: {
    isText() {
      return this.fieldData.type === 'text';
    },
    isTextarea() {
      return this.fieldData.type === 'textarea';
    },
    isCheckbox() {
      return this.fieldData.type === 'checkbox';
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
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
