import type { RouteRecordRaw } from 'vue-router';

const settingsRoutes: RouteRecordRaw[] = [
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/ApiKeyView.vue'),
  },
  {
    path: '/api-key',
    redirect: '/settings',
  },
  {
    path: '/api-config',
    redirect: '/settings',
  },
];

export default settingsRoutes;
