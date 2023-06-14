<template>
    <v-textarea
  placeholder="LongTextAnswer"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      counter
      label="LongTextAnswer"
      maxlength="120"
      single-line
    ></v-textarea>
</template>
<script>
    export default {
        name: 'LongTextAnswer',
        props: {
            modelValue: ''
        },
        
        data: function() {
            return {
            }
        },
        emits: [
            'update:modelValue'
        ]
    }
</script>
<style>
</style>