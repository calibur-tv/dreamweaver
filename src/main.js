import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import './assets/tailwind.css'
import 'normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

const app = createApp(App)

app.use(store)
app.use(ElementPlus, { locale })
app.mount('#app')
