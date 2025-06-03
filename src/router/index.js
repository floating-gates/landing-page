import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../components/LandingPage.vue'
import Login from    '../components/Login.vue'
import Dashboard from    '../components/Dashboard.vue'
import Mission from    '../components/Mission.vue'
import ValueProposition from '../components/ValueProposition.vue'
import Profile from '../components/Profile.vue'
import TermsService from '../components/TermsService.vue'

const routes = [
    { path: '/', component: LandingPage },
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/mission', component: Mission },
    { path: '/value-proposition', component: ValueProposition },
    { path: '/profile', component: Profile },
    { path: '/terms_and_services', component: TermsService }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
