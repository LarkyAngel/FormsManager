<script setup>
import { useRoute } from 'vue-router'
import { ref, reactive, resolveComponent, markRaw, onBeforeMount } from 'vue'
import router from './../router/index.js'

const route = useRoute()
const form_id = ref(0)

const form = reactive([])
const answers = reactive([])
const answer = reactive({})

const is_loaded = ref(false)
const error_at = ref(-1)

const expanded = reactive([])


onBeforeMount(async () => {
  form_id.value = route.query.form_id

  const get_form = () => new Promise(r => { r(localStorage.getItem('form ' + form_id.value)) })
  form.value = JSON.parse(await get_form())

  for (let i = 0; i < form.value.questions.length; ++i) {
    expanded.push(i)
  }

  const get_answers = () => new Promise(r => {
    let result = []
    Object.keys(localStorage).forEach((key) => {
      let words = key.split(" ")
      if (words[0] === 'answer' && words[1] === form_id.value.toString()) {
        result.push(JSON.parse(localStorage.getItem(key)))
      }
    })
    r(result)
  })
  answers.value = await get_answers()

  answer.value = {
    form_id: 0,
    answer_id: 0,
    name: 'Nowa odpowiedź',
    data: []
  }
  for (let i = 0; i < form.value.questions.length; ++i) {
    if (form.value.questions[i].type == 'MultiSelectAnswer') {
      answer.value.data.push([])
    } else {
      answer.value.data.push('')
    }
  }

  is_loaded.value = true
})

function search(x) {
  return markRaw(resolveComponent(x))
}

async function saveAnswer() {
  error_at.value = -1
  for (let i = 0; i < form.value.questions.length; ++i) {
    if (form.value.questions[i].is_required) {
      const type = form.value.questions[i].type
      console.log(answer.value.data[i])
      if (type == 'MultiSelectAnswer') {
        let ok = false
        for (let j = 0; j < answer.value.data[i].length; ++j) {
          if (answer.value.data[i][j]) {
            ok = true
          }
        }
        if (!ok) {
          error_at.value = i
          break;
        }
      } else {
        if (answer.value.data[i] == '') {
          error_at.value = i
          break;
        }
      }
    }
  }

  console.log(error_at.value)
  if (error_at.value == -1) {
    let next_answer_id = -1
    for (let i = 0; i < answers.value.length; ++i) {
      next_answer_id = Math.max(next_answer_id, answers.value[i].answer_id)
    }
    answer.value.form_id = form_id.value
    answer.value.answer_id = next_answer_id + 1
    console.log(JSON.stringify(answer))
    const add_answer = () =>
      new Promise(r => {
        r(localStorage.setItem('answer ' + form_id.value + ' ' + (next_answer_id + 1),
          JSON.stringify(answer.value)))
      })
    await add_answer()
  }
}

router.beforeEach((to, from, next) => {
  console.log(error_at.value)
  if (from.path != '/about/client' || error_at.value == -1 || to.path != '/about') {
    next()
  }
})
</script>

<template>
  <div v-if="is_loaded">
    <v-text-field v-model="answer.value.name" color="primary" label="Answer name" variant="underlined"></v-text-field>

    <div id="app" class="bg-gray-200">
      <v-expansion-panels v-model="expanded" multiple accordion>
        <div v-for="(question, index) in form.value.questions">
          <div class="draggable-item">
            <v-expansion-panel style="minWidth: 900px" :key="index">

              <v-expansion-panel-title>

                <h1 style="font-size:20px"> {{ question.title }} {{ question.is_required ? '*' : '' }}</h1>

              </v-expansion-panel-title>
              <v-expansion-panel-text v-bind:class='{ "error": error_at == index }'>
                <keep-alive>
                  <component :is="search(question.type+'2')" v-model:modelValue="answer.value.data[index]"
                    :options="question.options" />
                </keep-alive>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </div>
        </div>
      </v-expansion-panels>
    </div>

    <v-card-actions>
      <v-spacer></v-spacer>
      <router-link :to="{
        path: '/about',
        query: {
          form_id: form_id
        }
      }">
        <v-btn color="black" v-on:click="saveAnswer()">
          Save answer
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </router-link>
      <div v-if="error_at != -1" style="color:red">
        Nie udzielono wymaganej odpowiedzi!
      </div>
    </v-card-actions>
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

.error {
  background-color: rgb(195, 164, 164)
}
</style>
