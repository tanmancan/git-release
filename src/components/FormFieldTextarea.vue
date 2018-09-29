<template>
  <div>
    <label :for="fieldName">{{fieldData.label}}</label>
    <textarea
      required
      :name="fieldName"
      :id="fieldName"
      v-model="fieldData.val"
      :placeholder="fieldData.defaultValue"
      rows="6"></textarea>
      <p><small>{{fieldData.helpText}}</small></p>
  </div>
</template>

<script>
export default {
  props: ['fieldData', 'fieldName'],
};
</script>
