import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { regDirectives } from '@/helpers/directive'


const app = createApp(App);

regDirectives(app);

app.use(store).use(router).use(ElementPlus).mount('#app');
