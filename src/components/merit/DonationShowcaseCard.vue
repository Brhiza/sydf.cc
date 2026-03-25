<template>
  <ContentSectionCard>
    <div class="donation-container">
      <div class="merit-box-section">
        <img :src="meritBoxImageSrc" :alt="meritBoxImageAlt" class="merit-box-image" />
      </div>

      <div class="payment-methods">
        <div v-for="method in paymentMethods" :key="method.alt" class="payment-method">
          <img :src="method.src" :alt="method.alt" class="qrcode-image" />
          <p class="donation-hint">{{ method.hint }}</p>
        </div>
      </div>

      <div v-if="boardLink" class="merit-box-link">
        <a :href="boardLink.href">{{ boardLink.label }}</a>
      </div>
    </div>
  </ContentSectionCard>
</template>

<script setup lang="ts">
import ContentSectionCard from '@/components/common/ContentSectionCard.vue';

export interface DonationShowcaseMethod {
  src: string;
  alt: string;
  hint: string;
}

export interface DonationShowcaseLink {
  href: string;
  label: string;
}

withDefaults(
  defineProps<{
    meritBoxImageSrc: string;
    meritBoxImageAlt: string;
    paymentMethods: DonationShowcaseMethod[];
    boardLink?: DonationShowcaseLink;
  }>(),
  {
    boardLink: undefined,
  }
);
</script>

<style scoped>
.donation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-6);
  margin-top: var(--spacing-4);
}

.merit-box-section {
  text-align: center;
}

.merit-box-image {
  max-width: 300px;
  height: auto;
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: var(--spacing-4);
}

.payment-methods {
  display: flex;
  gap: var(--spacing-6);
  justify-content: center;
  flex-wrap: wrap;
}

.payment-method {
  text-align: center;
  padding: var(--spacing-4);
  background: #f8f9fa;
  border-radius: var(--radius-lg);
  min-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

html.dark .payment-method {
  background: #262628;
  border: 1px solid #262628;
}

.qrcode-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: var(--radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: var(--spacing-2);
  display: block;
}

.donation-hint {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.merit-box-link {
  margin-top: var(--spacing-4);
  text-align: center;
}

.merit-box-link a {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  background: #eae7f8;
  color: #6b46c1;
  text-decoration: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: all 0.3s ease;
}

.merit-box-link a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 215, 0, 0.6);
  border-color: #ffd700;
}

@media (max-width: 768px) {
  .payment-methods {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-4);
  }

  .payment-method {
    min-width: 140px;
    max-width: 160px;
    padding: var(--spacing-3);
  }

  .qrcode-image {
    width: 100px;
    height: 100px;
  }

  .donation-hint {
    font-size: var(--font-size-xs);
  }
}
</style>
