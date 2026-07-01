# 架构说明

这份文档用于帮助维护者快速理解项目的真实结构，而不是只看目录名猜职责。

## 一句话概览

时月东方是一个“前端站点 + Cloudflare Functions + SEO 预渲染 + PWA”组合项目。

浏览器负责交互与展示，`functions/` 负责 AI 代理与开发者 API，构建阶段负责静态预渲染，Service Worker 负责缓存与更新。

## 运行面划分

### 1. 浏览器前端

对应目录：

- `src/components/`
- `src/composables/`
- `src/views/`
- `src/stores/`

职责：

- 表单输入与页面交互
- 占卜结果展示
- 历史记录管理
- 自定义 API 设置
- 追问与重新生成

### 2. 领域服务层

对应目录：

- `src/services/`
- `src/utils/`
- `src/shared/`

职责：

- 占卜数据生成
- AI 请求编排
- 历史记录持久化
- 提示词生成
- 时间、日期、卦象与牌阵计算

传统排盘与抽取算法当前以 `mingyu-core` 为权威来源。六爻、梅花易数、奇门遁甲、塔罗与三山国王灵签等运行时入口应直接调用 `mingyu-core`，不要在本仓库重新维护同名本地算法副本。

`src/services/algorithms/` 仅保留当前项目特有的应用层组合逻辑与迁移回归测试；其中今日运势仍是站点侧基于日家奇门数据组合出的功能，不等同于 `mingyu-core` 的独立公开算法。

### 3. 服务端入口

对应目录：

- `functions/api/ai.js`
- `functions/api/v1/divination.ts`
- `functions/_shared/ai-proxy.js`

职责：

- 同源前端 AI 代理
- 对外开发者 API
- OpenAI 兼容请求归一化与转发

### 4. 构建与静态输出

对应目录：

- `vite.config.ts`
- `scripts/prerender.ts`
- `src/seo/`

职责：

- 前端构建
- PWA 注入
- SEO 元信息生成
- 预渲染静态 HTML 输出

### 5. PWA 与缓存

对应目录：

- `src/sw.ts`
- `src/services/serviceWorkerRegistration.ts`
- `src/services/serviceWorkerLifecycle.ts`

职责：

- 预缓存应用壳
- 运行时缓存图片、脚本、样式与 HTML
- 自动激活新版 Service Worker

## 前端主流程

### 普通占卜流程

1. 页面路由进入 `src/views/divination/UnifiedDivinationView.vue`
2. 页面状态由 `src/composables/useUnifiedDivinationPage.ts` 负责串接
3. 核心占卜状态由 `src/composables/useDivinationUnified.ts` 管理
4. `src/services/divination.ts` 调用 `src/services/divination-orchestrator.ts`
5. 编排服务先生成占卜数据，再发起 AI 解读，再写入历史记录
6. 结果页通过 `src/components/divination/DivinationResult.vue` 与相关子组件渲染

### 今日运势流程

今日运势仍有一套专门页面状态，入口在：

- `src/views/divination/components/UnifiedDailyDivinationContent.vue`
- `src/composables/useDailyFortune.ts`

它和普通占卜共用以下底层能力：

- `src/services/divination-orchestrator.ts`
- `src/services/history.ts`
- `src/services/ai-regeneration.ts`

维护时要注意：

- 今日运势虽然有专门页面状态，但不应在底层再发展出第二套完全独立协议
- 任何“统一规则”改动，都要同时检查普通占卜和今日运势

## 历史记录体系

统一入口是 `src/services/history.ts`。

它当前负责：

- 本地持久化
- 置顶与排序
- 搜索与筛选
- 导入导出
- 今日运势按日期检索
- 摘要生成
- 变更事件广播

这是一块高耦合区域。改这里时请同时验证：

- 历史列表
- 历史详情
- 追问续接
- 重新生成
- 今日运势按日期回填

## AI 体系

### 浏览器侧

- `src/services/ai.ts`
  - 统一封装 OpenAI 兼容请求
  - 处理流式响应、工具调用与错误重试
- `src/services/aiService.ts`
  - 面向占卜领域的 AI 适配层
- `src/services/prompts/`
  - 提示词生成逻辑

### 服务端

- `functions/_shared/ai-proxy.js`
  - 校验请求体
  - 限制消息数量与大小
  - 将请求转发到真正的 OpenAI 兼容接口

## SEO 与预渲染

### 运行时 SEO

`src/seo/index.ts` 负责：

- 页面标题
- 描述
- 关键词
- Canonical
- Open Graph
- JSON-LD 结构化数据

### 构建时预渲染

`scripts/prerender.ts` 会在构建后读取 `dist/index.html`，为关键路由输出静态 HTML。

当前策略是：

- 正常用户界面由前端应用接管
- 预渲染文案只放在 `noscript` 回退中

这部分与产品约束高度相关，改动时不要让静态 SEO 文案重新暴露到正常用户视图中。

## 路由与构建模式

### 标准模式

标准模式会包含完整页面，例如：

- 首页
- 各类占卜页
- 历史记录
- 关于页
- 人工咨询
- API 设置页

### 定制构建模式

定制模式由以下任一条件触发：

- `VITE_APP_BUILD_TARGET=CUSTOM`
- Vite mode 为 `oyyy`

定制构建会收起部分页面入口，因此改路由、导航或 SEO 时要同时检查两种模式。

## 改动时的推荐顺序

1. 先找“唯一权威入口”
2. 再判断是否影响前端、服务端、类型、文档
3. 再补测试
4. 最后更新 README 或相关说明

## 当前最值得持续收口的区域

- 今日运势与普通占卜的状态分叉
- 历史记录服务的单文件职责过重
- 前后端重复维护的协议与规则
- SEO、PWA 与运行时页面之间的一致性
