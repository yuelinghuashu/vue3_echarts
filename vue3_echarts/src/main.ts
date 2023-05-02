import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import * as echarts from 'echarts'
import axios from 'axios'

const service = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 3000
})


// 引用lib-flexible插件，在插件文件中进行屏幕rem自适应配置，并且在vscode的px转换rem的插件中改变默认转换大小
import 'lib-flexible/flexible.js'

const app = createApp(App)

/* 挂载全局对象 */
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$axios = service


app.use(router).mount('#app')