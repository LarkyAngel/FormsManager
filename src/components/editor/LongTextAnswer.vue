<template>
    <v-textarea
      v-model="answer"
      counter
      label="LongTextAnswer"
      maxlength="120"
      single-line
      :disabled="true"
    ></v-textarea>
</template>
<script>
    export default {
        name: 'LongTextAnswer',
        data (){
            return {
                answer: ''
            }
        }
    }
</script>
<style>
</style>