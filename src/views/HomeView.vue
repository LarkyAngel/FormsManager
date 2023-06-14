<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { RouterLink } from 'vue-router'

const forms = reactive([])
const is_loaded = ref(false)

onBeforeMount(async () => {
  const get_forms = () => new Promise(r => {

    let result = []
    Object.keys(localStorage).forEach((key) => {
      if (key.slice(0, key.indexOf(" ")) == 'form') {
        result.push(JSON.parse(localStorage.getItem(key)))
      }
    })

    r(result)
  })

  forms.value = await get_forms()
  forms.sort(function(x,y){return y["form_id"]-x["form_id"]})
  forms.value.reverse()
  is_loaded.value = true
})

function nextId() {

  let next_form_id = -1
  for (let i = 0; i < forms.value.length; ++i) {
    next_form_id = Math.max(next_form_id, forms.value[i].form_id)
  }

  return next_form_id
}

async function addForm() {

  let next_form_id = -1
  for (let i = 0; i < forms.value.length; ++i) {
    next_form_id = Math.max(next_form_id, forms.value[i].form_id)
  }

  let next_form = {
    form_id: next_form_id + 1,
    name: '',
    description: '',
    questions: []
  }
  const add_form = () =>
    new Promise(r => {
      r(localStorage.setItem('form ' + (next_form_id + 1),
        JSON.stringify(next_form)))
    })
  await add_form()

  forms.value.push(next_form)
}

async function removeForm(this_form_id) {

  let index = -1;
  for (let i = 0; i < forms.value.length; ++i) {
    if (forms.value[i].form_id == this_form_id) {
      index = i;
    }
  }

  forms.value.splice(index, 1)

  const remove_form = () =>
    new Promise(r => { r(localStorage.removeItem('form ' + this_form_id)) })
  await remove_form()
}
</script>

<template>
  <div v-if="is_loaded" align="center">
    <ul class="w-full max-w-md">
      <li v-for="(form, index) in forms.value" :key="form.form_id"
        class="p-4 mb-3 flex justify-between items-center bg-white shadow rounded-lg">

        {{ form.name ? form.name : "Bez nazwy" }}
        <div><router-link :to="{
          path: '/about',
          query: {
            form_id: form.form_id
          }
        }"><v-btn icon="mdi-account-details"></v-btn>
          </router-link>

          <router-link :to="{
            path: '/editor',
            query: {
              form_id: form.form_id
            }
          }"><v-btn icon="mdi-pencil-box"></v-btn>
          </router-link>

          <v-btn @click="removeForm(form.form_id)" icon="mdi-delete"><v-icon color="red"></v-icon>
          </v-btn>
        </div>
      </li>
      <li class="p-4 mb-3 flex justify-between items-center bg-white shadow rounded-lg">

        <router-link :to="{
          path: '/editor',
          query: {
            form_id: nextId()
          }
        }">
          <v-btn size="large" @click="addForm()" icon="mdi-plus" density="compact">
          </v-btn>
        </router-link>

      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import './../assets/css/style.scss';
</style>