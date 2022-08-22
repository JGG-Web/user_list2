import Vue from 'vue'
import App from './App.vue'
// 引入elementUI
import ElementUI from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'



Vue.config.productionTip = false

// 全局引用
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
