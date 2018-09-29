<template>
  <div>
    <label :for="fieldName">{{fieldData.label}}</label>
    <input
      required
      type="text"
      :name="fieldName"
      :id="fieldName"
      v-model="fieldData.val"
      :placeholder="fieldData.defaultValue">
      <p><small>{{fieldData.helpText}}</small></p>
  </div>
</template>

<script>
export default {
  props: ['fieldData', 'fieldName'],
};
</script>
