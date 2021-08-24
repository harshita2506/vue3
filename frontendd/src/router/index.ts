import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { payrollRoutes } from "../../src/modules/HR/Payroll/router/router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: () =>
    import ( '../modules/HR/Login/views/Login.vue'),
  },
{
  path: "/home",
  component: () =>
      import ( '@/modules/HR/Login/views/Home.vue'),
      children: [
        {
          path: 'leaves',
          component: () =>
          import (  "../modules/HR/Leaves/Views/Leaves.vue"),
        },
        {
          path: 'payroll',
          component: () => 
          import ( '../modules/HR/Payroll/views/Payroll.vue'),
        },
        {
          path: 'add-report',
          component: () => 
          import ( '../modules/HR/Payroll/views/NewReport.vue')
        },
        ...payrollRoutes,
      ]
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
