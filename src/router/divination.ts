import type { RouteRecordRaw } from 'vue-router';
import { isDivinationType } from '@/utils/divination-type';

const divinationRoutes: RouteRecordRaw[] = [
  {
    path: '/divination/:type',
    name: 'divination',
    component: () => import('../views/divination/UnifiedDivinationView.vue'),
    props: (route) => ({ divinationType: String(route.params.type || '') }),
    beforeEnter: (to, _from, next) => {
      if (isDivinationType(String(to.params.type || ''))) {
        next();
      } else {
        next({ name: 'not-found' });
      }
    },
  },
  {
    path: '/ssgw',
    redirect: '/divination/ssgw',
  },
];

export default divinationRoutes;
