import {createApp} from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import './styles/reset.less';
import './styles/index.less';
import '@/permission'; // permission control

import ElementPlus from 'element-plus';
import 'dayjs/locale/zh-cn';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';

import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.config.productionTip = false;
app.use(router);
app.use(store);
app.use(ElementPlus, {locale});
app.mount('#app');
