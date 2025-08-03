import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'pageHome',
      component: () => import('@/views/pageHome.vue'),
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/datav',
      name: 'datav',
      redirect: '/datav/security',
      component: () => import('@/views/data-v.vue'),
      children: [
        {
          path: 'security',
          name: 'security',
          component: () => import('@/views/security/security-management.vue')
        },
        {
          path: 'major-hazard',
          name: 'majorHazard',
          component: () => import('@/views/major-hazard/major-hazard.vue')
        },
        {
          path: 'double-prevention-mechanism',
          name: 'mechanism',
          component: () => import('@/views/double-prevention-mechanism/double-prevention-mechanism.vue')
        }
      ]
    }
  ],
})

export default router
