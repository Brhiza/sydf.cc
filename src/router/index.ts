import { createRouter, createWebHashHistory } from 'vue-router';
import divinationRoutes from './divination';
import historyRoutes from './history';
const isCustomBuild = import.meta.env.VITE_APP_BUILD_TARGET === 'CUSTOM';
import settingsRoutes from './settings';

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    ...divinationRoutes,
    ...historyRoutes,
    ...(isCustomBuild ? [] : settingsRoutes),
    ...(isCustomBuild ? [] : [{
      path: '/rengong',
      name: 'rengong',
      component: () => import('../views/RengongView.vue'),
    }]),
    ...(isCustomBuild ? [] : [{
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    }]),
    ...(isCustomBuild ? [] : [{
      path: '/gongdebox',
      name: 'gongdebox',
      component: () => import('../views/GongdeBoxView.vue'),
    }]),
    {
      path: '/gongdeboard',
      name: 'gongdeboard',
      component: () => import('../views/GongdeBoardView.vue'),
    },
    {
      path: '/daily-fortune',
      name: 'daily-fortune',
      component: () => import('../views/DailyFortuneView.vue'),
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
