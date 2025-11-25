import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// 导入插件
import { registerPlugins } from './plugins';
import { initializeServices } from './services';

// 导入 PWA Service Worker 注册函数
import { registerSW } from 'virtual:pwa-register';

const app = createApp(App);

// 1. 注册插件 (包括 Pinia)
registerPlugins(app);

// 2. 初始化服务 (包括 historyService，它会自动加载历史)
initializeServices();

// 3. 注册路由
app.use(router);

// 4. 注册 Service Worker
registerSW({ 
  immediate: true,
  onOfflineReady() {
    // 应用已准备好离线使用
  },
  onNeedRefresh() {
    // 发现新版本，请刷新页面
  }
});

// 5. PWA 安装提示处理
import { pwa } from './services/pwa';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}
 
let deferredPrompt: Event | null;

window.addEventListener('beforeinstallprompt', (e) => {
  // 阻止 Chrome 67 及更早版本自动显示安装提示
  e.preventDefault();
  // 存储事件，以便稍后可以触发它
  deferredPrompt = e;
  pwa.setInstallable(true);
  
  // 将触发函数暴露给 pwa service
  pwa.setPromptTrigger(() => {
    if (deferredPrompt) {
      (deferredPrompt as BeforeInstallPromptEvent).prompt();
      (deferredPrompt as BeforeInstallPromptEvent).userChoice.then(() => {
        deferredPrompt = null;
        pwa.setInstallable(false);
      });
    }
  });
});

// 如果需要，可以监听安装完成的事件
window.addEventListener('appinstalled', () => {
  // 隐藏安装按钮
  deferredPrompt = null;
  pwa.setInstallable(false);
});

app.mount('#app');
