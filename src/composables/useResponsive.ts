import { onMounted, onUnmounted, ref } from 'vue';

const MOBILE_BREAKPOINT = 768;

export function useResponsive() {
  const isMobile = ref(window.innerWidth <= MOBILE_BREAKPOINT);

  function checkScreenSize() {
    isMobile.value = window.innerWidth <= MOBILE_BREAKPOINT;
  }

  onMounted(() => {
    window.addEventListener('resize', checkScreenSize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize);
  });

  return { isMobile };
}
