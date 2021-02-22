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

    {
        path: '/car-model-lib',
        component: Layout,
        redirect: '/car-model-lib/index',
        children: [{
            path: 'index',
            name: 'carModelLib',
            component: ()=> import('@/views/car-model-lib/index'),
            meta: {
                title: '车型库'
            }
        }]
    },
      
    {
        path: '/car-assembly',
        component: Layout,
        redirect: '/car-assembly/index',
        children: [{
            path: 'index',
            name: 'carAssembly',
            component: ()=> import('@/views/car-assembly/index'),
            meta: {
                title: '汽车组装'
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

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter({
        history: createWebHashHistory(),
        routes: constantRoutes
    });

    router.matcher = newRouter.matcher; // reset router
}
  
export default router;