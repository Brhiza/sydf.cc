import type { RouteRecordRaw } from 'vue-router';
import { EXTERNAL_DAILY_FORTUNE_URL } from '@/shared/external-projects';
import { isDivinationType } from '@/utils/divination-type';

const ExternalRedirectPlaceholder = { render: () => null };

const divinationRoutes: RouteRecordRaw[] = [
  {
    path: '/divination/daily',
    name: 'daily-fortune-redirect',
    component: ExternalRedirectPlaceholder,
    beforeEnter: () => {
      if (typeof window !== 'undefined') {
        window.location.assign(EXTERNAL_DAILY_FORTUNE_URL);
      }

      return false;
    },
  },
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
