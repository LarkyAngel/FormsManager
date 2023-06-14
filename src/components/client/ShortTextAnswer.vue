<template>
    <v-text-field 
  placeholder="ShortTextAnswer"
    :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        reset>
</v-text-field>
</template>
<script>
    export default {
        name: 'ShortTextAnswer',
        props: {
            modelValue: ''
        },
        data: function() {
            return {
            }
        },
        emits: [
    'update:modelValue'
],
    }
</script>
<style>
</style>