<template>
  <div v-if="is_loaded">
    <v-row no-gutters>
      <div style="display: flex; justify-content:space-between">

        <v-select style="width:200px;" label="Lower bound" :items="[0, 1]" variant="solo" v-model="lower_bound_real"
          class="select" item-text="name" hide-details single-line dense autowidth></v-select>

        <div style="padding-top:23px">-</div>

        <v-select style="width:200px;" label="Upper bound" :items="[2, 3, 4, 5, 6, 7, 8, 9, 10]" variant="solo"
          v-model="upper_bound_real" class="select" item-text="name" hide-details single-line dense autowidth></v-select>
      </div>
    </v-row>

    <div style="display: flex; justify-content:space-between; margin-top:10px">
      <div style="padding-top:25px">{{ lower_bound_real }}</div>

      <v-text-field v-model="lower_bound_label_real" color="primary" label="Lower bound label (optional)"
        variant="underlined"></v-text-field>
    </div>

    <div style="display: flex; justify-content:space-between; margin-top:-40px">
      <div style="padding-top:25px">{{ upper_bound_real }}</div>

      <v-text-field v-model="upper_bound_label_real" color="primary" label="Upper bound label (optional)"
        variant="underlined"></v-text-field>
    </div>
  </div>
</template>
<script>
import { watch, ref } from "vue"
import _ from "lodash";
export default {
  name: 'LinearScaleAnswer',
  data() {
    return {
      is_loaded: false
    }
  },
  props: {
    selections: {
      type: Array,
      default: []
    }
  },
  setup(props, context) {
    const lower_bound_real = ref(0)
    if (props.selections.length > 0 && props.selections[0].hasOwnProperty('lower_bound')) {
      lower_bound_real.value = props.selections[0].lower_bound
    }
    watch(lower_bound_real, (currentValue, oldValue) => {
      let ret = props.selections
      ret[0].lower_bound = currentValue
      context.emit('update:selections', ret)
    })
    const upper_bound_real = ref(10)
    if (props.selections.length > 0 && props.selections[0].hasOwnProperty('upper_bound')) {
      upper_bound_real.value = props.selections[0].upper_bound
    }
    watch(upper_bound_real, (currentValue, oldValue) => {
      let ret = props.selections
      ret[0].upper_bound = currentValue
      context.emit('update:selections', ret)
    })
    const lower_bound_label_real = ref('')
    if (props.selections.length > 0 && props.selections[0].hasOwnProperty('lower_bound_label')) {
      lower_bound_label_real.value = props.selections[0].lower_bound_label
    }
    watch(lower_bound_label_real, (currentValue, oldValue) => {
      let ret = props.selections
      ret[0].lower_bound_label = currentValue
      context.emit('update:selections', ret)
    })
    const upper_bound_label_real = ref('')
    if (props.selections.length > 0 && props.selections[0].hasOwnProperty('upper_bound_label')) {
      upper_bound_label_real.value = props.selections[0].upper_bound_label
    }
    watch(upper_bound_label_real, (currentValue, oldValue) => {
      let ret = props.selections
      ret[0].upper_bound_label = currentValue
      context.emit('update:selections', ret)
    })
    return {
      lower_bound_real, upper_bound_real, lower_bound_label_real, upper_bound_label_real
    }
  },
  emits: [
    'update:selections'
  ],
  mounted() {
    while (this.selections.length > 0) {
      this.selections.pop()
    }
    this.selections.push({
      lower_bound: 0,
      upper_bound: 10,
      lower_bound_label: '',
      upper_bound_label: ''
    })
    this.is_loaded = true
  }
}
</script>
<style lang="scss">
@import './../../assets/css/style.scss';
</style>