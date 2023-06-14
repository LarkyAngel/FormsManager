<template>
  <div align="center">
  <ul class="w-full max-w-md">
    <li v-for="(answer, index) in answers.value"
      :key="answer.answer_id"
      class="p-4 mb-3 flex justify-between items-center bg-white shadow rounded-lg">

      <router-link :to="{
        path: '/about/viewer',
        query: {
          form_id: form_id,
          answer_id: answer.answer_id
        }
      }">
      {{ answer.name }}
      {{ answer.answer_id }}
      </router-link>

      <router-view/>
      <button aria-label="Delete user"
        class="p-1 focus:outline-none focus:shadow-outline text-red-500 hover:text-red-600"
        @click="deleteAnswer(answer.answer_id)">
        delete
      </button>
    </li>
    <li class="p-4 mb-3 flex justify-between items-center bg-white shadow rounded-lg">
      <router-link :to="{
        path: '/about/client',
        query: {
          form_id: form_id
        }
      }">
      <v-icon icon="mdi-plus"></v-icon>Nowa odpowiedź
      </router-link>
    </li>
  </ul>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, reactive, onBeforeMount } from 'vue'

const route = useRoute()
const form_id = ref(0)
const answers = reactive([])

onBeforeMount(async () => {
  form_id.value = route.query.form_id

  const get_answers = () => new Promise(r => { 
    let result = []
    Object.keys(localStorage).forEach((key) => {
      let words = key.split(' ')
      if (words[0] === 'answer' && words[1] === form_id.value.toString()) {
        result.push(JSON.parse(localStorage.getItem(key)))
      }
    })
    r(result)
  })
  answers.value = await get_answers()
  answers.value.reverse()
})

async function deleteAnswer(answer_id) {
  let index = -1
  for (let i = 0; i < answers.value.length; ++i) {
    if (answers.value[i].answer_id == answer_id) {
      index = i
    }
  }
  answers.value.splice(index, 1)
  const remove_answer = () => 
  new Promise(r => { r(localStorage.removeItem('answer ' + form_id.value + ' ' + answer_id)) })
  await remove_answer()
}
</script>

<style>
.error {
  background-color: rgb(195, 164, 164)
}
</style>