import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../components/LandingPage.vue'
import Login from    '../components/Login.vue'
import Dashboard from    '../components/Dashboard.vue'
import Mission from    '../components/Mission.vue'

const routes = [
    { path: '/', component: LandingPage },
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/mission', component: Mission },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
