import { ref, onMounted, onUnmounted } from 'vue';

export function useViewport() {
  const isMobile = ref(window.innerWidth <= 768);

  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  const checkScreenSize = () => {
    isMobile.value = window.innerWidth <= 768;
    setViewportHeight();
  };

  onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    window.addEventListener('orientationchange', setViewportHeight);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize);
    window.removeEventListener('orientationchange', setViewportHeight);
  });

  return {
    isMobile,
  };
}
