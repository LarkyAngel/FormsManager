<template>
  <div v-for="(selection, index) in this.options">

    <v-row no-gutters>
      <input type="checkbox" :id="selection.id" :value="selection.selectionId" v-model="choices[index]"
        style="margin-top:6px">

      <div style="padding-left:5px;"> {{ selection.description }}</div>
    </v-row>

  </div>
</template>

<script>
import { watch, ref } from "vue"
import _ from "lodash";
export default {
  name: 'MultiSelectAnswer',
  props: {
    modelValue: ref({
      type: Array,
      default: []
    }),
    options: {
      type: Array,// if this is an array or use **type: Object** if that's an object
      default: []
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup(props, context) {
    const choices = ref([])
    watch(() => _.cloneDeep(choices), (currentValue, oldValue) => {
      context.emit('update:modelValue', currentValue.value)
    })
    return {
      choices
    }
  }
}
</script>