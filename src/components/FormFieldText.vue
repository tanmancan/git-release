<template>
  <div>
    <label :for="fieldName">{{fieldData.label}}</label>
    <input
      required
      :readonly="fieldData.readonly"
      type="text"
      :name="fieldName"
      :id="fieldName"
      v-model="fieldData.val"
      :placeholder="fieldData.defaultValue">
      <p v-if="fieldData.readonly">
        <strong>
          <small>
            This data was automatically provided by an environmental variable.
            Field editing is disabled.
          </small>
        </strong>
      </p>
      <p><small>{{fieldData.helpText}}</small></p>
  </div>
</template>

<script>
export default {
  props: ['fieldData', 'fieldName'],
};
</script>
