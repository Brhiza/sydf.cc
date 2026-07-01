import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('DivinationSupplementaryInfo', () => {
  it('奇门排盘设置应只放在展开后的补充信息里', () => {
    const source = readFileSync(new URL('./DivinationSupplementaryInfo.vue', import.meta.url), 'utf8');
    const headerStart = source.indexOf('<div class="info-header-actions">');
    const headerEnd = source.indexOf('<DatePicker', headerStart);
    const infoFormStart = source.indexOf('<div v-if="showSupplementaryInfo" class="info-form">');
    const qimenSettingsStart = source.indexOf('<div v-if="showQimenMethodSelector" class="qimen-settings">');

    expect(headerStart).toBeGreaterThan(-1);
    expect(headerEnd).toBeGreaterThan(headerStart);
    expect(infoFormStart).toBeGreaterThan(-1);
    expect(qimenSettingsStart).toBeGreaterThan(infoFormStart);
    expect(source.slice(headerStart, headerEnd)).not.toContain('showQimenMethodSelector');
  });
});
