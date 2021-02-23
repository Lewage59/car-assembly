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
        path: '/user-center',
        component: Layout,
        redirect: '/user-center/index',
        children: [{
            path: 'index',
            name: 'userCenter',
            component: ()=> import('@/views/user-center/index'),
            redirect: '/user-center/index/user-info',
            meta: {
                title: '个人中心'
            },
            children: [{
                path: 'user-info',
                name: 'userInfo',
                component: ()=> import('@/views/user-center/user-info/index'),
                meta: {
                    title: '我的信息'
                }
            }, {
                path: 'user-car',
                name: 'userCar',
                component: ()=> import('@/views/user-center/user-car/index'),
                meta: {
                    title: '我的组装车'
                }
            }]
        }]
    },   

    {
        path: '/car-model-detail/:id(\\d+)',
        name: 'carModelDetail',
        component: ()=> import('@/views/car-model-detail/index'),
        meta: {
            title: '车型详情'
        }
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