import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './utils/axios'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(store);
app.use(router);
// 设置全局属性
app.config.globalProperties.$axios = axios;
app.mount('#app')

