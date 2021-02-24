
import {createStore} from 'vuex';
import getters from './getters';

const debug = process.env.NODE_ENV !== 'production';
const files = require.context('./modules', false, /\.js$/);
const modules = {};

files.keys().forEach(key=> {
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});
Object.keys(modules).forEach(key=> {
    modules[key]['namespaced'] = true;
});

const store = createStore({
    modules,
    getters,
    strict: debug
});

export default store;
