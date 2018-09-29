<template>
  <div>
    <label :for="fieldName">
    <input
      type="checkbox"
      :name="fieldName"
      :id="fieldName"
      v-model="fieldData.val"
      :placeholder="fieldData.defaultValue">
      {{fieldData.label}}
      </label>
      <p><small>{{fieldData.helpText}}</small></p>
  </div>
</template>

<script>
export default {
  props: ['fieldData', 'fieldName'],
};
</script>
