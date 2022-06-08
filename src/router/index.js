import { createRouter, createWebHistory } from 'vue-router'
import Reportes from '../views/Reportes.vue'
import Login from '../views/Login.vue'
import Base from '../views/Bases.vue'
import LugarVerificar from '../views/LugarVerificacion.vue'
import Rondin from '../views/Rondin.vue'
import Incidencias from '../views/Incidencias.vue'

const routes= [
    {
      path: '/',
      name: 'reportes',
      component: Reportes,
      meta: { requireAuth: true }
    },
    {
      path: '/login',
      name: 'Login', 
      component: Login,
    },
    {
      path: '/bases',
      name: 'bases',
      component: Base,
      meta: { requireAuth: true }
    },
    {
      path: '/lugarverificacion',
      name: 'lugarverificacion',
      component: LugarVerificar,
      meta: { requireAuth: true }
    },
    {
      path: '/rondin',
      name: 'rondin',
      component: Rondin,
      meta: { requireAuth: true }
    },
    {
      path: '/incidencias',
      name: 'incidencias',
      component: Incidencias,
      meta: { requireAuth: true }
    }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next)=>{ 
  const protectedRoute = to.matched.some(record => record.meta.requireAuth)
  if (protectedRoute && localStorage.getItem('dataUser') === null) {
    next({ name: 'Login' })
  } else { 
    next()
  }
})

export default router
