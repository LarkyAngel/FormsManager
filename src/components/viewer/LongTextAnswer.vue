<template>
    <v-textarea
      v-model="answerReal"
      counter
      label="LongTextAnswer"
      maxlength="120"
      single-line
      :disabled=true
    ></v-textarea>
</template>
<script>
    export default {
        name: 'LongTextAnswer',
        props: {
            answer: String
        },
        data (){
            return {
                answerReal: ''
            }
        },
        mounted() {
            this.answerReal = this.answer
        }
    }
</script>
<style>
</style>