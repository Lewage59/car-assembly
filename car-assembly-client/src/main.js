import {createApp} from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import App from './App.vue';

const app = createApp(App);

app.config.productionTip = false;
app.use(ElementPlus);
app.mount('#app');
