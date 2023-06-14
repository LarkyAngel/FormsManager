<template>
  <v-row no-gutters>
    <div style="padding-top:20px">{{ this.options[0].lower_bound_label }}</div>
    <div v-for="(selection, index) in linear_scale_options">

      <label>{{ selection.description }}<br />
        <input type="radio" :checked="selection.selectionId == answer.toString() ? true : false" :disabled="true" />
      </label>
    </div>

    <div style="padding-top:20px">{{ this.options[0].upper_bound_label }}</div>
  </v-row>
</template>
<script>
export default {
  name: 'SingleSelectAnswer',
  props: {
    options: {
      type: Array,
      default: []
    },
    answer: String
  },
  data() {
    return {
      linear_scale_options: []
    }
  },
  mounted() {
    for (let i = this.options[0].lower_bound; i <= this.options[0].upper_bound; ++i) {
      this.linear_scale_options.push({
        'selectionId': i.toString(),
        'description': i.toString()
      })
    }
  }
}
</script>