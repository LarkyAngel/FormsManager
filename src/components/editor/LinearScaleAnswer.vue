<template>
  <div v-if="is_loaded">
    <v-row no-gutters>

      <div style="display: flex; justify-content:space-between">

        <v-select style="width:200px;" label="Lower bound" :items="[0, 1]" variant="solo"
          v-model="lower_bound_real" class="select" item-text="name" hide-details single-line dense
          autowidth></v-select>
        <div style="padding-top:23px">-</div>
        <v-select style="width:200px;" label="Upper bound" :items="[2, 3, 4, 5, 6, 7, 8, 9, 10]" variant="solo"
          v-model="upper_bound_real" class="select" item-text="name" hide-details single-line dense
          autowidth></v-select>
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
      state: false,
      description: '',
      choice: {
        "id": 1,
        "selected": 2
      },
      is_loaded: false,
      user: {
        user_id: 100,
        name: 'Demo User',
        roles: [
          { role_id: 10, enabled: true },
          { role_id: 20, enabled: false },
          { role_id: 30, enabled: false }
        ]
      }
    }
  },
  props: {
    selections: {
      type: Array,// if this is an array or use **type: Object** if that's an object
      default: []
    }
  },
  computed: {
    selection_data: {
      get: function() {
        return this.selections[0]
      },
      set: function(newVal) {
      if (this.selections.length > 0) {
        this.selections.pop()
      }
      this.selections.push(newVal)
    }
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
$tl: 0.6s; // transition length

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
}



.select {
  width: 50px;
  max-height: 50px;
  font-size: 11px;
}
</style>