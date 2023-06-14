<template>
  <div v-for="(selection, index) in this.options">

    <v-row no-gutters>

      <input type="radio" :id="selection.id" :value="selection.selectionId" v-model="choice.selected"
        style="margin-top:2px" />

      <div style="padding-left:5px;"> {{ selection.description }}</div>
    </v-row>

  </div>
</template>
<script>
import { watch, ref } from "vue"
import _ from "lodash";
export default {
  name: 'SingleSelectAnswer',
  props: {
    modelValue: '',
    options: {
      type: Array,
      default: []
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup(props, context) {
    const choice = ref({
    })
    watch(() => _.cloneDeep(choice), (currentValue, oldValue) => {
      context.emit('update:modelValue', currentValue.value.selected)
    })
    return {
      choice
    }
  }
}
</script>