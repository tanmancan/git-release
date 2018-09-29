<template>
<pre>
<strong>Release Summary:</strong>

<strong>endpoint:</strong> {{endpoint}}
<strong>tag_name:</strong> {{fields.tag_name.val}}
<strong>target_commitish:</strong> {{fields.target_commitish.val}}
<strong>name:</strong> {{fields.name.val}}
<strong>body:</strong> {{fields.body.val}}
<strong>draft:</strong> {{fields.draft.val ? 'yes' : 'no'}}
<strong>prerelease:</strong> {{fields.prerelease.val ? 'yes' : 'no'}}
</pre>
</template>

<script>
export default {
  props: ['endpoint', 'fields'],
};
</script>
