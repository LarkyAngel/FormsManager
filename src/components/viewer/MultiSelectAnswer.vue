<template>
  <div v-for="(selection, index) in this.options">
    <v-row no-gutters>

      <input type="checkbox" :id="selection.id" :value="selection.selectionId" v-model="answer[index]"
        style="margin-top:6px" :disabled="true">

      <div style="padding-left:5px;"> {{ selection.description }}</div>
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
    answer: {
      type: Array,
      default: []
    }
  }
}
</script>