// import { createApp } from 'vue';
// import App from './App.vue';
// import router from './router';

// const app = createApp(App);
// app.use(router);
// app.mount('#app');

// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// ✅ 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

// ✅ 注册 Element Plus
app.use(ElementPlus)

app.use(router)
app.mount('#app')
