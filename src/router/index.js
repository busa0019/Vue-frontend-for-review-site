import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/review/:slug',
    name: 'review',
    component: () => import('../views/ReviewDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router