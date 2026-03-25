<template>
  <div class="disclaimer">
    <div class="disclaimer-content">
      <div class="disclaimer-icon">⚠️</div>
      <div class="disclaimer-text">
        请注意：内容完全基于 AI 模型的胡言乱语，旨在利用国产前沿大数据算法提供一种思考和决策的辅助视角，不构成任何形式的建议。请结合您的实际情况，理性参考，自主决策，命运终究掌握在自己手中。
      </div>
    </div>
  </div>
</template>

<style scoped>
.disclaimer {
  margin-top: var(--spacing-6);
  padding: var(--spacing-4);
  background: linear-gradient(135deg, var(--color-background-muted) 0%, var(--color-background-muted) 100%);
  border: 1px solid var(--color-border-light);
  border-radius: 12px;
  font-size: 14px;
}

.disclaimer-content {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  line-height: 1.6;
}

.disclaimer-icon {
  margin-top: 2px;
  flex-shrink: 0;
  font-size: 18px;
  opacity: 0.8;
}

.disclaimer-text {
  flex: 1;
  color: var(--color-text-secondary);
  font-size: 13px;
}

@media (max-width: 768px) {
  .disclaimer {
    margin-top: var(--spacing-5);
    padding: var(--spacing-3);
  }

  .disclaimer-content {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-2);
    text-align: center;
  }

  .disclaimer-icon {
    margin-top: 0;
  }
}
</style>
