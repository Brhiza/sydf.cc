<template>
  <div class="yao-symbol" :class="{ 'main-yao': isMain, 'changed-yao': !isMain }">
    <!-- 阳爻：实线 -->
    <div v-if="yaoType === '阳'" class="yang-line"></div>
    <!-- 阴爻：断线 -->
    <div v-else-if="yaoType === '阴'" class="yin-line">
      <div class="yin-segment"></div>
      <div class="yin-gap"></div>
      <div class="yin-segment"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  yaoType: '阳' | '阴';
  isMain?: boolean;
}

withDefaults(defineProps<Props>(), {
  isMain: true,
});
</script>

<style scoped>
.yao-symbol {
  width: 65px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  flex-shrink: 0;
  position: relative;
}

.yao-line {
  width: 100%;
  height: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 4px;
}

/* 阳爻：实线 */
.yang-line {
  width: 100%;
  height: 8px;
  background-color: var(--color-text-primary);
  border-radius: 1px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

/* 阴爻：断线 */
.yin-line {
  display: flex;
  gap: 6px;
  width: 100%;
  align-items: center;
}

.yin-segment {
  flex: 1;
  height: 8px;
  background-color: var(--color-text-primary);
  border-radius: 1px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.yin-gap {
  width: 6px;
  height: 6px;
}

/* 主卦和变卦样式已通过CSS变量统一处理 */

/* 响应式调整 */
@media (max-width: 768px) {
  .yao-symbol {
    width: 55px;
    height: 16px;
  }

  .yao-line {
    height: 6px;
  }

  .yang-line {
    height: 7px;
  }

  .yin-segment {
    height: 7px;
  }

  .yin-gap {
    width: 5px;
    height: 7px;
  }
}

@media (max-width: 480px) {
  .yao-symbol {
    width: 48px;
    height: 14px;
  }

  .yao-line {
    height: 5px;
  }

  .yang-line {
    height: 6px;
  }

  .yin-segment {
    height: 6px;
  }

  .yin-gap {
    width: 4px;
    height: 6px;
  }
}

@media (max-width: 360px) {
  .yao-symbol {
    width: 42px;
    height: 12px;
  }

  .yao-line {
    height: 4px;
  }

  .yang-line {
    height: 5px;
  }

  .yin-segment {
    height: 5px;
  }

  .yin-gap {
    width: 4px;
    height: 5px;
  }
}
</style>
