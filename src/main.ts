import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { Loading } from '@element-plus/icons-vue'
import App from './App.vue'
import './style.css'

// 创建应用实例
const app = createApp(App)

// 注册Element Plus
app.use(ElementPlus)

// 注册图标组件
app.component('i-loading', Loading)

// 挂载应用
app.mount('#app')
