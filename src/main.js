import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBoxesStacked,
  faBoxOpen,
  faTrash,
  faPen,
  faArrowRightLong,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'
library.add(faBoxesStacked, faBoxOpen, faTrash, faPen, faArrowRightLong, faSpinner)

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

app.component('font-awesome-icon', FontAwesomeIcon)
