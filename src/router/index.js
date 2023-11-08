import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DeliveryForm from '../views/DeliveryForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/newParcel',
      name: 'deliveryForm',
      component: DeliveryForm
    },
  ]
})

export default router
