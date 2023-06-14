<template>
  <v-row no-gutters>
    <div style="padding-top:20px">{{ this.options[0].lower_bound_label }}</div>
    <div v-for="(selection, index) in this.linear_scale_options">
      <label>{{ selection.description }}<br />
        <input type="radio" :id="selection.id" :value="selection.selectionId" v-model="choice.selected" />
      </label>
    </div>
    <div style="padding-top:20px">{{ this.options[0].upper_bound_label }}</div>
  </v-row>
</template>
<script>
import { watch, ref } from "vue"
import _ from "lodash";
export default {
  name: 'SingleSelectAnswer',
  methods: {
    removeSelection: function (event, id) {
      const index = this.selections.indexOf(id)
      this.selections.splice(index, 1)
    },
  },
  props: {
    modelValue: '',
    options: {
      type: Array,// if this is an array or use **type: Object** if that's an object
      default: []
    }
  },

  data: function () {
    return {
      linear_scale_options: []
    }
  },

  emits: [
    'update:modelValue'
  ],
  mounted() {
    for (let i = this.options[0].lower_bound; i <= this.options[0].upper_bound; ++i) {
      this.linear_scale_options.push({
        'selectionId': i.toString(),
        'description': i.toString()
      })
    }
  },
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
<style lang="scss">
$tl: 0.6s; // transition length

label {
  float: left;
  padding: 0 1em;
  text-align: center;
}

#row {
  padding-top: 0;
  padding-bottom: 0;
  margin-top: -30px;
  margin-bottom: -50px;
}

.v-text-field {
  padding: 10px;
}

body {
  margin: 5%;
}

.search-box {
  transition: width $tl, border-radius $tl, background $tl, box-shadow $tl;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  background: rgb(235, 235, 235);

  &+label .search-icon {
    color: black
  }

  &:hover {
    color: white;
    background: rgb(200, 200, 200);
    box-shadow: 0 0 0 5px rgb(61, 71, 82);

    &+label .search-icon {
      color: white
    }
  }

  &:focus {
    transition: width $tl cubic-bezier(0, 1.22, .66, 1.39), border-radius $tl, background $tl;
    border: none;
    outline: none;
    box-shadow: none;
    padding-left: 15px;
    cursor: text;
    width: 300px;
    border-radius: auto;
    background: rgb(235, 235, 235);
    color: black;

    &+label .search-icon {
      color: black;
    }
  }

  &:not(:focus) {
    text-indent: -5000px;
  }

  // for more-graceful falling back (:not browsers likely support indent)
}

#search-submit {
  position: relative;
  left: -5000px;
}

.search-icon {
  position: relative;
  left: -30px;
  color: white;
  cursor: pointer;
}

.v-text-field {
  width: 400px;
}

.button {
  background-color: #099;
  color: white;
  text-decoration: none;
  border-radius: 60px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  width: auto;
  max-width: 32px;
  /** I'm animating max-width because width needs to be auto, and auto can't be animated **/
  -webkit-transition: max-width 0.5s;
  transition: max-width 0.5s;
}

.button:hover {
  max-width: 300px;
}

.icon {
  font-family: "Font Awesome 5 Free";
  font-size: 16px;
  margin-right: 15px;
  padding: 0px 8px;
  display: flex;
  align-items: center;
}

.text {
  white-space: nowrap;
  padding-right: 15px;
}</style>