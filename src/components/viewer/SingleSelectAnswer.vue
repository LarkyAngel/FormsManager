<template>
  <div v-for="(selection, index) in options">
    <v-row no-gutters>

      <input type="radio" :checked="selection.selectionId == answer.toString() ? true : false" :disabled="true" />
      <div style="padding-left:5px;"> {{ selection.description }} </div>

    </v-row>
  </div>
</template>
<script>
export default {
  name: 'SingleSelectAnswer',
  props: {
    options: {
      type: Array,
      default: []
    },
    answer: -1
  },
  data() {
    return {
      answerReal: ''
    }
  },
  mounted() {
    this.answerReal = this.answer
  }
}
</script>