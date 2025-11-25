<template>
  <div class="daily-fortune-result">
    <!-- 结果头部信息 -->
    <div class="result-header">
      <div class="info-line">
        <span class="info-label">公历时间：</span>
        <span class="info-value">{{ fortuneData.date }}</span>
      </div>
      <div class="info-line">
        <span class="info-label">干支：</span>
        <span class="info-value">{{ fortuneData.ganzhi?.year }}年 {{ fortuneData.ganzhi?.month }}月 {{ fortuneData.ganzhi?.day }}日 {{ fortuneData.ganzhi?.hour }}时</span>
      </div>
      <!-- 幸运元素直接显示在头部 -->
      <div v-if="showLucky" class="info-line">
        <span class="info-label">幸运数字：</span>
        <span class="info-value">{{ fortuneData.lucky?.numbers?.join('、') || '暂无' }}</span>
      </div>
      <div v-if="showLucky" class="info-line">
        <span class="info-label">幸运颜色：</span>
        <span class="info-value">{{ fortuneData.lucky?.colors?.join('、') || '暂无' }}</span>
      </div>
      <div v-if="showLucky" class="info-line">
        <span class="info-label">幸运方向：</span>
        <span class="info-value">{{ fortuneData.lucky?.directions?.join('、') || '暂无' }}</span>
      </div>
      <div v-if="showLucky" class="info-line">
        <span class="info-label">幸运时辰：</span>
        <span class="info-value">{{ fortuneData.lucky?.time || '暂无' }}</span>
      </div>
    </div>

    <!-- 整体运势概览 -->
    <div class="fortune-overview">
      <h3 class="fortune-title">今日运势概览</h3>
      <div class="overall-score">
        <span class="score-text">{{ fortuneData.overall.luck }}（{{ fortuneData.overall.score }}分）</span>
      </div>
      <p class="score-description">{{ fortuneData.overall.description }}</p>
      
      <!-- AI整体分析 -->
      <div v-if="parsedAIResponse?.overallAnalysis" class="ai-overall-analysis">
        <div class="analysis-item">
          <strong>运势概述：</strong>{{ parsedAIResponse.overallAnalysis.summary }}
        </div>
        <div class="analysis-item">
          <strong>运势走向：</strong>{{ parsedAIResponse.overallAnalysis.trend }}
        </div>
        <div class="analysis-item">
          <strong>行动策略：</strong>{{ parsedAIResponse.overallAnalysis.strategy }}
        </div>
      </div>
    </div>
      
    <!-- 各方面运势 -->
    <div class="aspects-section">
      <h4 class="section-title">综合运势</h4>
      <div 
        v-for="aspect in aspectItems" 
        :key="aspect.key"
        class="aspect-item"
      >
        <div class="aspect-header">
          <span class="aspect-icon">{{ aspect.icon }}</span>
          <span class="aspect-name">{{ aspect.name }}：</span>
          <span class="aspect-score">{{ fortuneData.aspects[aspect.key].score }}分</span>
        </div>
        <div v-if="fortuneData.aspects[aspect.key].description" class="aspect-description">
          {{ fortuneData.aspects[aspect.key].description }}
        </div>
        
        <!-- AI详细分析 -->
        <div v-if="parsedAIResponse?.aspects[aspect.key]" class="aspect-ai-analysis">
          <div class="analysis-subitem">
            <strong>详细分析：</strong>{{ parsedAIResponse.aspects[aspect.key].analysis }}
          </div>
          <div v-if="parsedAIResponse.aspects[aspect.key].opportunities" class="analysis-subitem">
            <strong>发展机会：</strong>{{ parsedAIResponse.aspects[aspect.key].opportunities }}
          </div>
          <div v-if="parsedAIResponse.aspects[aspect.key].challenges || parsedAIResponse.aspects[aspect.key].risks" class="analysis-subitem">
            <strong>风险挑战：</strong>{{ parsedAIResponse.aspects[aspect.key].challenges || parsedAIResponse.aspects[aspect.key].risks }}
          </div>
          <div v-if="parsedAIResponse.aspects[aspect.key].advice" class="analysis-subitem">
            <strong>行动建议：</strong>{{ parsedAIResponse.aspects[aspect.key].advice }}
          </div>
        </div>
      </div>
    </div>

    <!-- 奇门遁甲专业分析 -->
    <div v-if="parsedAIResponse?.qimenAnalysis" class="qimen-section">
      <h4 class="section-title">奇门遁甲解析</h4>
      <div class="qimen-analysis">
        <div class="analysis-item">
          <strong>格局特点：</strong>{{ parsedAIResponse.qimenAnalysis.patternAnalysis }}
        </div>
        <div class="analysis-item">
          <strong>宫位影响：</strong>{{ parsedAIResponse.qimenAnalysis.palaceInfluence }}
        </div>
        <div class="analysis-item">
          <strong>专业指导：</strong>{{ parsedAIResponse.qimenAnalysis.professionalGuidance }}
        </div>
      </div>
    </div>

    <!-- 注意事项 -->
    <div v-if="parsedAIResponse?.precautions" class="precautions-section">
      <h4 class="section-title">注意事项</h4>
      <div class="precautions">
        <div v-if="parsedAIResponse.precautions.warnings" class="analysis-item">
          <strong>特别提醒：</strong>{{ parsedAIResponse.precautions.warnings }}
        </div>
        <div v-if="parsedAIResponse.precautions.avoidances" class="analysis-item">
          <strong>避免行为：</strong>{{ parsedAIResponse.precautions.avoidances }}
        </div>
        <div v-if="parsedAIResponse.precautions.recommendations" class="analysis-item">
          <strong>推荐活动：</strong>{{ parsedAIResponse.precautions.recommendations }}
        </div>
      </div>
    </div>

    <!-- 兜底显示：如果JSON解析失败，显示原始AI响应 -->
    <div v-if="aiResponse && !parsedAIResponse" class="ai-interpretation">
      <h4 class="section-title">AI大师解读</h4>
      <div class="ai-content">{{ aiResponse }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { DailyFortuneData } from '@/types/divination';

interface DetailedAnalysis {
  overallAnalysis?: {
    summary?: string;
    trend?: string;
    strategy?: string;
  };
  aspects?: Record<string, {
    analysis?: string;
    opportunities?: string;
    challenges?: string;
    risks?: string;
    advice?: string;
  }>;
  qimenAnalysis?: {
    patternAnalysis?: string;
    palaceInfluence?: string;
    professionalGuidance?: string;
  };
  precautions?: {
    warnings?: string;
    avoidances?: string;
    recommendations?: string;
  };
}

interface Props {
  fortuneData: DailyFortuneData;
  aiResponse?: string;
  showLucky?: boolean;
  detailedAnalysis?: DetailedAnalysis;
}

const props = withDefaults(defineProps<Props>(), {
  showLucky: true,
  aiResponse: '',
  detailedAnalysis: () => ({})
});

// 各方面运势配置
const aspectItems = [
  { key: 'career', name: '事业运势', icon: '💼' },
  { key: 'wealth', name: '财富运势', icon: '💰' },
  { key: 'relationship', name: '感情运势', icon: '💕' },
  { key: 'health', name: '健康运势', icon: '🏥' }
] as const;

// 解析AI响应的JSON数据，优先使用直接传递的详细分析数据
const parsedAIResponse = computed(() => {
  // 优先使用直接传递的详细分析数据
  if (props.detailedAnalysis) {
    console.log('使用直接传递的详细分析数据:', props.detailedAnalysis);
    return props.detailedAnalysis;
  }
  
  // 如果没有直接传递的数据，则尝试解析AI响应
  if (!props.aiResponse) return null;
  
  console.log('开始解析AI响应:', props.aiResponse);
  
  try {
    let jsonStr = '';
    
    // 方法1：提取```json代码块中的内容
    const jsonMatch = props.aiResponse.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
      console.log('通过代码块提取JSON:', jsonStr);
    } else {
      // 方法2：如果整个响应就是JSON，直接使用
      const trimmedResponse = props.aiResponse.trim();
      if (trimmedResponse.startsWith('{') && trimmedResponse.endsWith('}')) {
        jsonStr = trimmedResponse;
        console.log('直接使用响应作为JSON:', jsonStr);
      } else {
        // 方法3：查找第一个{到最后一个}之间的内容
        const startIndex = props.aiResponse.indexOf('{');
        const endIndex = props.aiResponse.lastIndexOf('}');
        if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
          jsonStr = props.aiResponse.substring(startIndex, endIndex + 1);
          console.log('通过位置提取JSON:', jsonStr);
        }
      }
    }
    
    if (!jsonStr) {
      console.warn('未找到JSON内容');
      return null;
    }
    
    // 清理JSON字符串：移除多余的空白字符和可能的换行符
    jsonStr = jsonStr.trim();
    
    // 尝试解析JSON
    const parsed = JSON.parse(jsonStr);
    console.log('JSON解析成功:', parsed);
    
    // 验证JSON结构是否包含必要的字段
    if (parsed && typeof parsed === 'object') {
      // 确保有基本的整体分析结构
      if (!parsed.overallAnalysis) {
        parsed.overallAnalysis = {
          summary: '整体运势分析',
          trend: '运势走向',
          strategy: '行动策略'
        };
      }
      
      // 确保有各方面运势结构
      if (!parsed.aspects) {
        parsed.aspects = {};
      }
      
      // 确保有注意事项结构
      if (!parsed.precautions) {
        parsed.precautions = {
          warnings: '',
          avoidances: '',
          recommendations: ''
        };
      }
      
      return parsed;
    }
    
    return null;
  } catch (error) {
    console.error('AI响应JSON解析失败:', error, '原始响应:', props.aiResponse);
    return null;
  }
});
</script>

<style scoped>
.daily-fortune-result {
  padding: var(--spacing-4);
}

/* 结果头部样式 - 与DailyFortuneView保持一致 */
.result-header {
  margin-bottom: var(--spacing-4);
  padding: var(--spacing-4);
  background: var(--color-background-elevated);
  border-radius: var(--radius-md);
}

.result-header .info-line {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-2);
  justify-content: space-between;
  line-height: 1.4;
}

.result-header .info-line:last-child {
  margin-bottom: 0;
}

.result-header .info-label {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  width: 80px;
  text-align: justify;
  text-align-last: justify;
  flex-shrink: 0;
  font-size: 16px;
}

.result-header .info-value {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  flex: 1;
  text-align: left;
  margin-left: var(--spacing-2);
  font-size: 16px;
}

.fortune-overview {
  text-align: center;
  margin-bottom: var(--spacing-6);
  padding: var(--spacing-4);
  background: var(--color-background-elevated);
  border-radius: var(--radius-md);
}

.fortune-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-3) 0;
}

.score-text {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
}

.score-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin: var(--spacing-3) 0 0 0;
  line-height: 1.6;
}

.aspects-section {
  margin-bottom: var(--spacing-6);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-4) 0;
  padding-bottom: var(--spacing-2);
  border-bottom: 1px solid var(--color-border);
}

.aspect-item {
  margin-bottom: var(--spacing-4);
  padding: var(--spacing-3);
  background: var(--color-background-elevated);
  border-radius: var(--radius-md);
}

.aspect-item:last-child {
  margin-bottom: 0;
}

.aspect-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-2);
}

.aspect-icon {
  font-size: var(--font-size-lg);
  margin-right: var(--spacing-2);
}

.aspect-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.aspect-score {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-left: var(--spacing-2);
}

.aspect-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.ai-interpretation {
  margin-bottom: var(--spacing-6);
}

.ai-content {
  padding: var(--spacing-4);
  background: var(--color-background-elevated);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  line-height: 1.6;
  color: var(--color-text-secondary);
}

/* AI分析内容样式 */
.ai-overall-analysis {
  margin-top: var(--spacing-4);
  padding: var(--spacing-3);
  background: var(--color-primary-muted);
  border-radius: var(--radius-md);
}

.aspect-ai-analysis {
  margin-top: var(--spacing-2);
  padding: var(--spacing-2);
  background: var(--color-background-elevated);
  border-radius: var(--radius-sm);
}

.analysis-item {
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size-sm);
  line-height: 1.5;
  color: var(--color-text-secondary);
}

.analysis-item:last-child {
  margin-bottom: 0;
}

.analysis-subitem {
  margin-bottom: var(--spacing-1);
  font-size: var(--font-size-sm);
  line-height: 1.4;
  color: var(--color-text-secondary);
  padding-left: var(--spacing-2);
}

.analysis-subitem:last-child {
  margin-bottom: 0;
}

.qimen-section,
.precautions-section {
  margin-bottom: var(--spacing-6);
}

.qimen-analysis,
.precautions {
  padding: var(--spacing-3);
  background: var(--color-background-elevated);
  border-radius: var(--radius-md);
}


.analysis-item strong {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}
</style>
