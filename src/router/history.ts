import type { RouteRecordRaw } from 'vue-router';

const historyRoutes: RouteRecordRaw[] = [
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/HistoryView.vue'),
  },
];

export default historyRoutes;
