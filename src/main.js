import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import './assets/tailwind.css'
import 'normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import DraggableController from '@/components/draggable-controller'

import Image from '@/components/tests/image'
import List from '@/components/tests/list'

const app = createApp(App)

app.use(store)
app.component(DraggableController.name, DraggableController)
app.component(Image.name, Image)
app.component(List.name, List)
app.use(ElementPlus, { locale, size: 'mini', zIndex: 3000 })
app.mount('#app')
