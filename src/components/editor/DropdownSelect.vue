<template>
  <div style="min-width:700px">
    <v-col>

      <v-row justify="space-between" align="center">
        <v-select label="Select"
          :items="['ShortTextAnswer', 'LongTextAnswer', 'SingleSelectAnswer', 'MultiSelectAnswer', 'LinearScaleAnswer']"
          variant="solo" v-model="model"></v-select><v-spacer></v-spacer>
        <v-switch label="Required" v-model="is_required_real"></v-switch>
      </v-row>

    </v-col>
  </div>
</template>

<script>
import ShortTextAnswer from './ShortTextAnswer.vue'
import LongTextAnswer from './LongTextAnswer.vue'
import SingleSelectAnswer from './SingleSelectAnswer.vue'
import MultiSelectAnswer from './MultiSelectAnswer.vue'
import LinearScaleAnswer from './LinearScaleAnswer.vue'

import { watch, ref } from "vue"
import _ from "lodash";
export default {
  name: "DropdownSelect",
  components: {
    ShortTextAnswer,
    LongTextAnswer,
    SingleSelectAnswer,
    MultiSelectAnswer,
    LinearScaleAnswer
  },
  props: {
    prop: '',
    selectionsProp: {
      type: Array,
      default: []
    },
    is_required: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      selections: [],
      dropdownPopoverShow: false
    }
  },
  computed: {
    model: {
      get() { return this.prop },
      set(val) { this.$emit('update:prop', val) },
    }
  },
  watch: {
    selections: {
      handler: function (val, oldVal) {
        console.log(val)
        this.update()
      },
      deep: true
    }
  },
  setup(props, context) {
    const is_required_real = ref(props.is_required)
    watch(is_required_real, (currentValue, oldValue) => {
      console.log('w')
      context.emit('update:is_required', currentValue)
    })
    return {
      is_required_real
    }
  },
  mounted() {
    this.model = this.prop
    this.selections.length = 0
    for (let i = 0; i < this.selectionsProp.length; ++i)
      this.selections.push(this.selectionsProp[i])
  },
  emits: [
    'update:prop',
    'update:is_required',
    'update:selectionsProp'
  ],
  methods: {
    update() {
      while (this.selectionsProp > 0) {
        this.selectionsProp.pop()
      }
      for (let i = 0; i < this.selections.length; ++i)
        this.selectionsProp.push(this.selections[i])
    },
    postPost(a) {
      console.log(a)
    },
    changeComponent(component) {
      ttype = component
    },
  }
}
</script>