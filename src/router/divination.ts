import type { RouteRecordRaw } from 'vue-router';
import { divinationNavItems } from '@/config/divination';

const divinationTypes = divinationNavItems.map((item) => item.type) as string[];

const divinationRoutes: RouteRecordRaw[] = [
  {
    path: '/divination/:type',
    name: 'divination',
    component: () => import('../views/divination/UnifiedDivinationView.vue'),
    props: (route) => ({ divinationType: route.params.type }),
    beforeEnter: (to, _from, next) => {
      if (divinationTypes.includes(to.params.type as string)) {
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
