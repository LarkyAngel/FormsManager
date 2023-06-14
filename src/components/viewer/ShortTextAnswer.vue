<template>
    <v-text-field
        v-model="answerReal"
        color="primary"
        label="ShortTextAnswer"
        variant="underlined"
        :disabled=true
      ></v-text-field>
</template>
<script>
    export default {
        name: 'ShortTextAnswer',
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