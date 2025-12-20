import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './utils/axios'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入中文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

// 使用 Element Plus 并设置语言为中文
app.use(ElementPlus, {
  locale: zhCn
})
app.use(store);
app.use(router);
// 设置全局属性
app.config.globalProperties.$axios = axios;
app.mount('#app')

