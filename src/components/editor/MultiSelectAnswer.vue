<template>
  <div v-for="(selection, index) in selections">
    <v-row no-gutters>
      <input type="checkbox" :id="selection.id" :value="selection.selectionId" v-model="choice.selected" :disabled="true">
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
    },
    expand: function () {
      if (this.state == false) {
        document.getElementById('items').style.transform = 'scaleX(1)';
        document.getElementById('toggle1').style.transform = 'rotate(45deg)';
        this.state = true;
      }
      else {
        document.getElementById('items').style.transform = 'scaleX(0)';
        document.getElementById('toggle1').style.transform = 'rotate(0deg)';
        this.state = false;
      }
    }
  },
  data() {
    return {
      state: false,
      description: '',
      choice: {
        "id": 1,
        "selected": 2,
      },
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
<style lang="scss">
$tl: 0.6s; // transition length

.v-row {
  padding-top: 0px;
  margin: -12px;
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

:root {
  --form-control-color: #0970e6;
  --form-control-disabled: #959495;
  --current-color: #adadad;
  --font-size: 1.5em;
  --transition-time: 120ms;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

form {
  display: grid;
  place-content: center;
  min-height: 100vh;
}

.form-control {
  font-family: system-ui, sans-serif;
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  line-height: 1;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
}

.form-control+.form-control {
  margin-top: 1em;
}

.form-control--disabled {
  color: var(--form-control-disabled);
  cursor: not-allowed;
}

input[type="checkbox"] {
  /* add if not using autoprefixer */
  -webkit-appearance: none;
  /* remove most all native input styles */
  appearance: none;
  /* iOS < 15 */
  background-color: var(--form-background);
  /* not removed via appearance */
  margin: 2.5em 0 0;

  font: inherit;
  color: var(--current-color);
  width: 1em;
  height: 1em;
  border: 0.05em solid currentColor;
  border-radius: 50%;
  transform: translateY(-0.075em);
  transition: var(--transition-time) background ease-in-out;
  display: grid;
  place-content: center;
}

input[type="checkbox"]:checked {
  border-color: transparent;
  background-color: var(--form-control-color);
}

input[type="checkbox"]::before {
  content: "";
  width: 0.25em;
  height: 0.25em;
  transform: scale(0);
  transition: var(--transition-time) transform ease-in-out;
  box-shadow: inset 1em 1em white;
  border-radius: 50%;
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}

input[type="checkbox"]:disabled {
  --form-control-color: var(--form-control-disabled);

  color: var(--form-control-disabled);
  cursor: not-allowed;
}
</style>