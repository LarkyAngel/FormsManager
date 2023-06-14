<template>
    <v-text-field
        v-model="answer"
        color="primary"
        label="ShortTextAnswer"
        variant="underlined"
        :disabled="true"
      ></v-text-field>
</template>
<script>
    export default {
        name: 'ShortTextAnswer',
        data (){
            return {
                answer: ''
            }
        }
    }
</script>
<style>
</style>