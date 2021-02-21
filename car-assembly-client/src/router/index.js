import {createRouter, createWebHashHistory} from 'vue-router';

/* Layout */
import Layout from '@/layout';

export const constantRoutes = [
    {
        path: '/login',
        component: ()=> import('@/views/login/index')
    },
  
    {
        path: '/404',
        component: ()=> import('@/views/404')
    },
  
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [{
            path: 'home',
            name: 'home',
            component: ()=> import('@/views/home/index'),
            meta: {
                title: '首页'
            }
        }]
    },
  
    // 404 page must be placed at the end !!!
    {
        path: '/*',
        redirect: '/404'
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
});
  
export default router;