import type { RouteRecordRaw } from 'vue-router';

const historyRoutes: RouteRecordRaw[] = [
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/HistoryView.vue'),
  },
  {
    path: '/history/:id',
    name: 'history-detail',
    component: () => import('../views/HistoryView.vue'),
    props: (route) => ({
      showDetail: true,
      selectedRecordId: route.params.id,
    }),
  },
];

export default historyRoutes;
