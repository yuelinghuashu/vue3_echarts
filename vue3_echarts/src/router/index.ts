import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'


const Home = () => import('../views/HomePage.vue')

const routes: Array<RouteRecordRaw> = [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: Home }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router