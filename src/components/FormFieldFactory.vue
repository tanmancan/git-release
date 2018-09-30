<template>
  <component
    :is="getFieldType"
    :field-data="fieldData"
    :fieldName="fieldName"></component>
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
  data() {
    return {
      type: {
        text: 'FormFieldText',
        password: 'FormFieldText',
        textarea: 'FormFieldTextarea',
        checkbox: 'FormFieldCheckbox',
      },
    };
  },
  computed: {
    getFieldType() {
      return this.type[this.fieldData.type]
        ? this.type[this.fieldData.type]
        : 'FormFieldText';
    },
  },
  mounted() {
    this.fieldData.defaultValue = `ex: ${this.fieldData.defaultValue}`;
  },
};
</script>

<style lang="scss">
  label {
    display: block;
  }

  input[type="text"],
  input[type="password"],
  textarea {
    display: block;
    width: 100%;
    padding: .25rem;
  }

  [readonly="readonly"] {
    opacity: 0.5;
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
