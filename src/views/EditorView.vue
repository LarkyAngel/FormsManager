<script setup>
import { useRoute } from 'vue-router'
import { ref, reactive, onBeforeMount, markRaw, resolveComponent } from 'vue'
import Draggable from "../components/editor/DraggableContainer.vue";
import DropdownSelect from "../components/editor/DropdownSelect.vue"
import router from './../router/index.js'

const route = useRoute()
const form_id = ref(0)

const form = reactive({})

const is_loaded = ref(false)
const error_at = ref(-1)

const selected = ref('')

onBeforeMount(async () => {
  form_id.value = route.query.form_id

  const get_form = () => new Promise(r => { r(localStorage.getItem('form ' + form_id.value)) })
  form.value = JSON.parse(await get_form())

  is_loaded.value = true
})


function search(x) {
  return markRaw(resolveComponent(x))
}

async function saveChanges() {
  let result_questions = []
  for (let i = 0; i < form.value.questions.length; ++i) {
    if (form.value.questions[i].data == null) {
      result_questions.push(form.value.questions[i])
    } else {
      result_questions.push(form.value.questions[i].data)
    }
  }
  error_at.value = -1
  for (let i = 0; i < result_questions.length; ++i) {
    console.log(result_questions[i].options.length)
    const type = result_questions[i].type
    if ((type == 'SingleSelectAnswer' || type == 'MultiSelectAnswer') && result_questions[i].options.length == 0) {
      error_at.value = i;
      break;
    }
  }
  console.log(error_at.value)

  if (error_at.value == -1) {
    const get_answers = () => new Promise(r => {
      let result = []
      Object.keys(localStorage).forEach((key) => {
        let words = key.split(' ')
        if (words[0] === 'answer' && words[1] === form_id.value.toString()) {
          console.log(JSON.parse(localStorage.getItem(key)))
          result.push(JSON.parse(localStorage.getItem(key)))
        }
      })
      r(result)
    })
    const answers = await get_answers()
    for (let i = 0; i < answers.length; ++i) {
      const remove_answer = () =>
        new Promise(r => { r(localStorage.removeItem('answer ' + form_id.value + ' ' + answers[i].answer_id)) })
      await remove_answer()
    }
    form.value.questions = result_questions
    const set_form = () => new Promise(r => { r(localStorage.setItem('form ' + form_id.value, JSON.stringify(form.value))) })
    await set_form()
  }
}

router.beforeEach((to, from, next) => {
  if (error_at.value == -1) {
    next()
  }
})
</script>

<template>
  <div v-if="is_loaded">
    <div class="about">
      <v-card class="mx-auto" max-width="1000" title="Create new form">
        <v-container>
          <v-text-field v-model="form.value.name" color="primary" label="Form name" variant="underlined"></v-text-field>

          <v-textarea v-model="form.value.description" counter label="Description" maxlength="120"
            single-line></v-textarea>

          <div id="app" class="bg-gray-200">

            <draggable v-model="form.value.questions" transition="100" class="drop-zone" :animation="200"
              ghost-class="moving-card">
              <template v-slot:item="{ item }">
                <v-expansion-panels>
                  <div class="draggable-item">
                    <v-expansion-panel style="minWidth: 900px">
                      <v-expansion-panel-title>


                        <template v-slot:default="{ expanded }">
                          <v-row no-gutters>
                            <v-col cols="0" class="d-flex justify-start">

                              <v-text-field v-model="item.title" color="primary" variant="underlined"></v-text-field>

                            </v-col>
                            <v-col cols="8" class="text-grey">
                            </v-col>
                          </v-row>
                        </template>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text v-bind:class='{ "error": error_at == index }'>
                        <div id="app" v-cloak style="max-width:900px">
                          <v-col>
                          <dropdown-select v-model:prop="item.type" v-model:is_required="item.is_required">
                          </dropdown-select>

                          <div style="width:100%">
                            <keep-alive>
                              <component :is="search(item.type+'3')" v-model:selections="item.options" />
                            </keep-alive>
                          </div>
                          </v-col>
                        </div>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </div>
                </v-expansion-panels>
              </template>
            </draggable>
          </div>

        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <router-link :to="{
            path: '/'
          }">
            <v-btn color="black" v-on:click="saveChanges()">
              Save form
              <v-icon icon="mdi-chevron-right" end></v-icon>
            </v-btn>
          </router-link>

          <div v-if="error_at != -1" style="color:red">
            Nie dodano opcji przy pytaniu wyboru!
          </div>
        </v-card-actions>
      </v-card>

    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<style>
.moving-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: grid;
    align-items: center;

  }
}
</style>
