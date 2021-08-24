import { RouteRecordRaw } from 'vue-router';

export const payrollRoutes: Array<RouteRecordRaw> = [
    {
        path: 'new-report',
        component: () => import('../../Payroll/views/NewReport.vue')
    }
];
