# 开发说明

这份文档关注“怎么把项目跑起来，以及改动时该从哪里下手”。

## 开发环境

建议准备：

- Node.js 22.18.0 或更新版本
- npm 10 以上版本

项目的 CI 使用 Node.js 22.18.0。仓库根目录提供 `.nvmrc`，使用 `nvm` 时可以直接切换到一致版本。

## 安装依赖

```bash
npm ci
```

## 本地启动

### 标准模式

```bash
npm run dev
```

### 定制构建模式

```bash
npm run dev:oyyy
```

定制构建主要用于隐藏部分标准站点页面与入口，适合调试特殊渠道版本。

## 生产构建

```bash
npm run build
```

该命令会执行：

1. 清理旧的 `dist`
2. 执行 Vite 构建
3. 生成预渲染 SEO 页面

如果需要构建定制版本：

```bash
npm run oyyy
```

## 测试

```bash
npm test
```

当前测试体系以 `Vitest` 为主，覆盖了：

- 路由
- 组合式函数
- 服务层
- API 代理
- SEO 预渲染
- 部分关键组件

## 代码质量

### 综合检查

```bash
npm run check
```

该命令会依次运行类型检查、ESLint、Vitest 测试和生产构建，适合提交前或 CI 中使用。

### TypeScript

```bash
npm run typecheck
```

### ESLint

```bash
npm run lint
```

该命令只检查问题，不会自动修改文件。需要自动修复时运行：

```bash
npm run lint:fix
```

### Prettier

```bash
npm run format
```

## 环境变量说明

### 前端侧

| 变量名 | 用途 |
| --- | --- |
| `VITE_SITE_URL` | SEO 中使用的站点地址 |
| `VITE_APP_BUILD_TARGET` | 控制定制构建 |
| `VITE_APP_API_KEY` | 作为自定义 API 默认值填入设置页 |
| `VITE_APP_API_ENDPOINT` | 作为自定义 API 默认地址 |
| `VITE_APP_DEFAULT_MODEL` | 作为自定义 API 默认模型 |

### Cloudflare Functions 侧

| 变量名 | 用途 |
| --- | --- |
| `OPENAI_API_KEY` | 服务端代理 AI 请求时必需 |
| `OPENAI_API_BASE` | OpenAI 兼容接口地址 |
| `OPENAI_API_MODEL` | 服务端默认模型 |
| `AI_PROXY_MAX_MESSAGE_CONTENT_LENGTH` | AI 代理单条消息最大字符数，默认 `60000`，最高 `200000` |
| `DEV_API_KEY` | 开发者 API 访问密钥 |

## 重要入口文件

如果你不知道该从哪里改起，可以从下面这些文件开始定位：

### 页面入口

- `src/main.ts`
- `src/App.vue`
- `src/router/index.ts`
- `src/router/divination.ts`

### 核心交互

- `src/composables/useDivinationUnified.ts`
- `src/composables/useUnifiedDivinationPage.ts`
- `src/composables/useDailyFortune.ts`

### 核心服务

- `src/services/divination-orchestrator.ts`
- `src/services/divination.ts`
- `src/services/history.ts`
- `src/services/ai.ts`
- `src/services/aiService.ts`

### 服务端

- `functions/api/ai.js`
- `functions/api/v1/divination.ts`
- `functions/_shared/ai-proxy.js`

### SEO 与构建

- `src/seo/index.ts`
- `src/seo/prerender.ts`
- `scripts/prerender.ts`
- `vite.config.ts`

## 常见改动场景

### 1. 新增或调整占卜文案

优先检查：

- `src/config/divination.ts`
- `src/services/prompts/`
- `src/seo/`
- `docs/api.md`

### 2. 修改历史记录行为

优先检查：

- `src/services/history.ts`
- `src/composables/useHistoryManager.ts`
- `src/views/HistoryView.vue`
- `src/components/sidebar/history/`

### 3. 修改 AI 追问或重新生成逻辑

优先检查：

- `src/services/ai-regeneration.ts`
- `src/services/aiService.ts`
- `src/composables/useDivinationUnified.ts`
- `src/composables/useDailyFortune.ts`
- `src/components/divination/result/ai/`

### 4. 修改 SEO

优先检查：

- `src/seo/index.ts`
- `src/seo/prerender.ts`
- `scripts/prerender.ts`
- `public/robots.txt`
- `public/sitemap.xml`

### 5. 修改开发者 API

优先检查：

- `functions/api/v1/divination.ts`
- `docs/api.md`
- `src/functions/api-v1-divination.test.ts`

## 回归建议

每次改动后，至少检查以下场景中的相关项：

- 标准模式页面是否正常打开
- 定制构建模式是否仍能正确隐藏页面
- 占卜结果是否能写入历史
- 历史详情页是否还能正确回看与重试
- 今日运势是否还能按日期正确读取
- 追问对话是否仍能续接
- `npm run build` 后是否仍能生成预渲染页面
- PWA 更新后页面是否能拿到新内容

## 文档维护要求

出现以下情况时，请同步更新文档：

- 脚本变化
- 环境变量变化
- 路由变化
- 接口字段变化
- SEO 策略变化
- 历史记录或追问规则变化
