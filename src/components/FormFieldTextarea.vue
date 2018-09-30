<template>
  <div>
    <label :for="fieldName">{{fieldData.label}}</label>
    <textarea
      required
      :readonly="fieldData.readonly"
      :name="fieldName"
      :id="fieldName"
      v-model="fieldData.val"
      :placeholder="fieldData.defaultValue"
      rows="6"></textarea>
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
