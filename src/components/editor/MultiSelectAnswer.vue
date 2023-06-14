<template>
  <div v-for="(selection, index) in selections">
    <v-row no-gutters>

      <input type="checkbox" :id="selection.id" :value="selection.selectionId" :disabled="true">
      <v-text-field v-model="selection.description" color="primary" variant="underlined" filled
        max-width="20"></v-text-field>
      <button v-on:click="removeSelection($event, index + 1)"><v-icon>mdi-close</v-icon></button>

    </v-row>
  </div>
  <v-row>

    <input id="search-box" placeholder="add option" type="text" class="search-box" name="q"
      v-on:keyup.enter="onEnter($event, $event.target.value), $event.target.value = ''" />

    <label for="search-box"><span class="glyphicon glyphicon-search search-icon">
        <v-icon icon="mdi-plus" style="margin-left:-15px;margin-bottom:-11px"></v-icon>
      </span></label>
    <input type="submit" id="search-submit" />

  </v-row>
</template>
<script>
export default {
  name: 'SingleSelectAnswer',
  methods: {
    removeSelection: function (event, id) {
      const index = this.selections.indexOf(id)
      this.selections.splice(index, 1)
    },
    onEnter: function (event, desc) {
      this.description = desc
      let mx = -1
      for (let i = 0; i < this.selections.length; ++i) {
        mx = Math.max(mx, this.selections[i].selectionId)
      }
      this.selections.push({ "selectionId": mx + 1, "description": this.description })
    }
  },
  mounted() {
    if (this.selections.length > 0 && this.selections[0].hasOwnProperty("lower_bound")) {
      while (this.selections.length > 0) {
        this.selections.pop()
      }
    }
  },
  props: {
    selections: {
      type: Array,
      default: []
    }
  }
}
</script>