<template>
  <ResultInfoHeader :items="headerItems" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ResultInfoHeader from '../ResultInfoHeader.vue';
import { createTarotHeaderItems } from './tarot-result';

interface Props {
  spreadName?: string;
  cardCount: number;
  timestamp?: number;
}

const props = defineProps<Props>();

const headerItems = computed(() => {
  return createTarotHeaderItems(props.spreadName, props.cardCount, props.timestamp);
});
</script>
