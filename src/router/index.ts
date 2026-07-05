import { createRouter, createWebHistory } from 'vue-router';
import divinationRoutes from './divination';
import historyRoutes from './history';
import settingsRoutes from './settings';
import { EXTERNAL_DAILY_FORTUNE_URL } from '@/shared/external-projects';
import { isCustomBuild } from '@/utils/build-target';

const customBuildEnabled = isCustomBuild({
  buildTarget: import.meta.env.VITE_APP_BUILD_TARGET,
  mode: import.meta.env.MODE,
});

const ExternalRedirectPlaceholder = { render: () => null };

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    ...divinationRoutes,
    ...historyRoutes,
    ...(customBuildEnabled ? [] : settingsRoutes),
    ...(customBuildEnabled ? [] : [{
      path: '/rengong',
      name: 'rengong',
      component: () => import('../views/RengongView.vue'),
    }]),
    ...(customBuildEnabled ? [] : [{
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    }]),
    {
      path: '/daily-fortune',
      name: 'daily-fortune-legacy',
      component: ExternalRedirectPlaceholder,
      beforeEnter: () => {
        if (typeof window !== 'undefined') {
          window.location.assign(EXTERNAL_DAILY_FORTUNE_URL);
        }

        return false;
      },
    },
    // 404页面
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    return new Promise((resolve) => {
      // 确保在下一次绘制前执行
      requestAnimationFrame(() => {
        if (savedPosition) {
          resolve(savedPosition);
        } else if (to.hash) {
          resolve({
            el: to.hash,
            behavior: 'smooth',
          });
        } else {
          // 查找主滚动容器
          const contentWrapper = document.querySelector('.content-wrapper');
          if (contentWrapper) {
            contentWrapper.scrollTop = 0;
          }
          // 同时也重置窗口滚动
          window.scrollTo(0, 0);
          resolve({ left: 0, top: 0 });
        }
      });
    });
  },
});

// 全局路由守卫
router.beforeEach((_to, _from, next) => {
  // 路由调试信息已清理
  next();
});

export default router;
