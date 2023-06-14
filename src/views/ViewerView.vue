<script setup>
import { useRoute } from 'vue-router'
import { ref, watch, reactive, resolveComponent, markRaw, onBeforeMount } from 'vue'

const route = useRoute()
const form_id = ref(0)
const answer_id = ref(0)

const form = reactive([])
const answer = reactive([])

const is_loaded = ref(false)

const expanded = reactive([])


onBeforeMount(async () => {
  form_id.value = route.query.form_id
  answer_id.value = route.query.answer_id

  const get_form = () => new Promise(r => { r(localStorage.getItem('form ' + form_id.value)) })
  form.value = JSON.parse(await get_form())

  for (let i = 0; i < form.value.questions.length; ++i) {
    expanded.push(i)
  }

  const get_answer = () => new Promise(r => { r(localStorage.getItem('answer ' + form_id.value + ' ' + answer_id.value)) })
  answer.value = JSON.parse(await get_answer())
  console.log(answer.value.data[0])
  is_loaded.value = true
})

function search(x) {
  return markRaw(resolveComponent(x))
}
</script>

<template>
  <div v-if="is_loaded">
     <center style="font-size:20px; margin-top:15px; margin-bottom:20px">{{ answer.value.name }}</center>
  
    <div id="app" class="bg-gray-200">
    <v-expansion-panels v-model="expanded" multiple accordion >
  <div v-for="(question, index) in form.value.questions">
              <div class="draggable-item">
            <v-expansion-panel style="minWidth: 900px" :key="index">
                       
              <v-expansion-panel-title>

                <h1 style="font-size:20px"> {{ question.title }} {{ question.is_required?'*':'' }}</h1>
        
          </v-expansion-panel-title>
           <v-expansion-panel-text>
            
    <keep-alive>
      <component :is="search(question.type+'1')" :answer="answer.value.data[index]" :options="question.options"/>
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
      <v-btn color="black">
        Return
        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
      </router-link>
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
    display: flex;
    align-items: center;
  }
}
</style>
