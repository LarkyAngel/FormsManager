import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import Home from './views/HomeView.vue'
import About from './views/AboutView.vue'
import Client from './views/ClientView.vue'
import Viewer from './views/ViewerView.vue'
import Editor from './views/EditorView.vue'

import ShortTextAnswer1 from './components/viewer/ShortTextAnswer.vue'
import LongTextAnswer1 from './components/viewer/LongTextAnswer.vue'
import SingleSelectAnswer1 from './components/viewer/SingleSelectAnswer.vue'
import MultiSelectAnswer1 from './components/viewer/MultiSelectAnswer.vue'
import LinearScaleAnswer1 from './components/viewer/LinearScaleAnswer.vue'
import ShortTextAnswer2 from './components/client/ShortTextAnswer.vue'
import LongTextAnswer2 from './components/client/LongTextAnswer.vue'
import SingleSelectAnswer2 from './components/client/SingleSelectAnswer.vue'
import MultiSelectAnswer2 from './components/client/MultiSelectAnswer.vue'
import LinearScaleAnswer2 from './components/client/LinearScaleAnswer.vue'
import ShortTextAnswer3 from './components/editor/ShortTextAnswer.vue'
import LongTextAnswer3 from './components/editor/LongTextAnswer.vue'
import SingleSelectAnswer3 from './components/editor/SingleSelectAnswer.vue'
import MultiSelectAnswer3 from './components/editor/MultiSelectAnswer.vue'
import LinearScaleAnswer3 from './components/editor/LinearScaleAnswer.vue'

const routes = [
  {
    path: '/',
    component: Home,
    children: [{
      path: '/about',
      component: About,
      children: [
        {
          path: '/about/viewer/',
          component: Viewer
        },
        {
          path: '/about/client/',
          component: Client
        }
      ]
    },
    {
      path: '/editor/',
      component: Editor
    }
    ]
  }
]

import './assets/main.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)
  .component('ShortTextAnswer1', ShortTextAnswer1)
  .component('LongTextAnswer1', LongTextAnswer1)
  .component('SingleSelectAnswer1', SingleSelectAnswer1)
  .component('MultiSelectAnswer1', MultiSelectAnswer1)
  .component('LinearScaleAnswer1', LinearScaleAnswer1)
  .component('ShortTextAnswer2', ShortTextAnswer2)
  .component('LongTextAnswer2', LongTextAnswer2)
  .component('SingleSelectAnswer2', SingleSelectAnswer2)
  .component('MultiSelectAnswer2', MultiSelectAnswer2)
  .component('LinearScaleAnswer2', LinearScaleAnswer2)
  .component('ShortTextAnswer3', ShortTextAnswer3)
  .component('LongTextAnswer3', LongTextAnswer3)
  .component('SingleSelectAnswer3', SingleSelectAnswer3)
  .component('MultiSelectAnswer3', MultiSelectAnswer3)
  .component('LinearScaleAnswer3', LinearScaleAnswer3)

const vuetify = createVuetify({
  components,
  directives,
})

app.use(vuetify)

app.use(router)

app.mount('#app')
