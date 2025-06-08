import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ErrorStackParser from 'error-stack-parser'

import App from './App.vue'
import router from './router'
import {findCodeBySourceMap} from './utils/index.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.errorHandler = (err, vm, info) => {
  const errorStack = ErrorStackParser.parse(err as Error)
  console.log(11111,errorStack)

  findCodeBySourceMap(errorStack[0])
}

app.mount('#app')
