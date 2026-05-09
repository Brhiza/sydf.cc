# 时月东方

一个基于 Vue 3、Vite 与 Cloudflare Functions 构建的 AI 占卜站点，提供六爻、梅花易数、奇门遁甲、塔罗牌、三山国王灵签与今日运势等在线体验。

项目当前重点是：

- 保持前端交互、AI 解读、历史记录、SEO 预渲染与开发者 API 之间的一致性
- 让站点在普通用户场景和可维护性上都足够稳定
- 以清晰文档为优先，让新维护者能快速理解项目结构并开始开发

## 功能概览

- 多种占卜方式统一收口到同一套路由与结果页体系
- 支持 AI 流式解读、追问对话与历史记录回看
- 支持重新生成主解读或追问回复
- 支持用户接入自定义 OpenAI 兼容 API
- 支持 PWA 安装、运行时缓存与自动更新
- 支持静态 SEO 预渲染与结构化数据
- 提供对外开发者 API，便于其他服务端调用

## 技术栈

- `Vue 3`
- `TypeScript`
- `Vite`
- `Pinia`
- `Vue Router`
- `Vitest`
- `Cloudflare Functions`
- `Workbox / vite-plugin-pwa`

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发环境

```bash
npm run dev
```

默认会启动 Vite 本地开发服务器。

如果你需要调试定制构建：

```bash
npm run dev:oyyy
```

### 3. 运行测试

```bash
npm test
```

### 4. 构建生产产物

```bash
npm run build
```

该命令会依次执行：

1. 清理 `dist`
2. 构建前端
3. 执行 SEO 预渲染脚本

## 常用脚本

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动标准开发环境 |
| `npm run dev:oyyy` | 启动定制构建开发环境 |
| `npm run build` | 生产构建并执行预渲染 |
| `npm run oyyy` | 生成定制构建版本并预渲染 |
| `npm run preview` | 本地预览构建产物 |
| `npm test` | 运行 Vitest 测试 |
| `npm run lint` | 运行 ESLint，并自动修复可修复问题 |
| `npm run format` | 使用 Prettier 格式化部分源码文件 |

## 环境变量

### 前端构建环境变量

| 变量名 | 说明 |
| --- | --- |
| `VITE_SITE_URL` | SEO 使用的站点根地址，默认 `https://sydf.cc` |
| `VITE_APP_BUILD_TARGET` | 构建目标，设为 `CUSTOM` 时进入定制构建 |
| `VITE_APP_API_KEY` | 自定义 API 默认密钥，可选，不建议放公开环境 |
| `VITE_APP_API_ENDPOINT` | 自定义 API 默认地址，可选 |
| `VITE_APP_DEFAULT_MODEL` | 自定义 API 默认模型，可选 |

### Cloudflare Functions 环境变量

| 变量名 | 说明 |
| --- | --- |
| `OPENAI_API_KEY` | `/api/ai` 与 `/api/v1/divination` 代理 AI 请求时必需 |
| `OPENAI_API_BASE` | OpenAI 兼容接口根地址，可选 |
| `OPENAI_API_MODEL` | 服务端默认模型，可选 |
| `DEV_API_KEY` | 开发者 API 鉴权密钥，供 `/api/v1/divination` 使用 |

## 文档目录

- [开发说明](./docs/development.md)
- [架构说明](./docs/architecture.md)
- [开发者 API](./docs/api.md)
- [贡献指南](./CONTRIBUTING.md)
- [安全说明](./SECURITY.md)

## 目录结构

```text
.
├── docs/                  文档目录
├── functions/             Cloudflare Functions
├── public/                静态资源、Headers 与 Redirects
├── scripts/               构建辅助脚本
├── src/
│   ├── components/        组件
│   ├── composables/       页面状态与交互逻辑
│   ├── config/            占卜配置与静态映射
│   ├── router/            路由定义
│   ├── seo/               SEO 元信息与预渲染逻辑
│   ├── services/          AI、历史记录、数据生成与编排服务
│   ├── stores/            Pinia 状态
│   ├── styles/            样式系统
│   ├── types/             类型定义
│   ├── utils/             工具函数
│   └── views/             页面视图
├── AGENTS.md              协作约束
├── package.json
└── vite.config.ts
```

## 核心模块

- `src/services/divination-orchestrator.ts`
  - 统一协调占卜数据生成、AI 解读、历史记录落盘与追问流程
- `src/composables/useDivinationUnified.ts`
  - 承接大部分占卜页状态
- `src/composables/useDailyFortune.ts`
  - 处理今日运势页的日期、每日限制、历史回填与追问
- `functions/api/ai.js`
  - 同源前端 AI 代理入口
- `functions/api/v1/divination.ts`
  - 对外开发者 API
- `src/seo/*`
  - 处理路由级 SEO 元信息与静态预渲染
- `src/sw.ts`
  - PWA Service Worker 与缓存策略

## 部署说明

项目默认面向 `Cloudflare Pages + Functions` 部署，仓库已经包含：

- `functions/` 服务端入口
- `public/_headers`
- `public/_redirects`
- PWA 与预渲染相关构建逻辑

如果迁移到其他平台，需要重点确认：

- `functions/api/ai.js` 与 `functions/api/v1/divination.ts` 的运行方式
- 路由回退规则
- 预渲染产物的静态托管方式

## 维护建议

- 改动占卜规则时，同时检查 `src`、`functions`、`docs` 与类型定义
- 改动结果页、历史页、追问链路时，同时回归错误态与重新生成流程
- 改动 SEO 或 PWA 时，同时验证无 JavaScript 回退、缓存更新与生产构建
- 提交前至少运行 `npm test` 与 `npm run build`

## 项目状态

仓库已经具备完整运行能力，但仍在持续整理工程文档与维护约束。

当前尚未在仓库内声明开源许可证；如果要正式对外开放使用、修改与分发权限，请在发布前补充明确的许可证文件。
