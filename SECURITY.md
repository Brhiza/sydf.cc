# 安全说明

如果你发现了与以下内容相关的安全问题，请不要直接公开敏感细节：

- API 密钥泄露
- `/api/ai` 或 `/api/v1/divination` 鉴权绕过
- CORS 配置缺陷
- 代理请求可被第三方滥用
- 本地历史记录或设置数据暴露
- XSS、注入、缓存污染或预渲染泄露

## 建议的处理方式

- 不要在公开 Issue 中贴出真实密钥、完整请求头、可利用脚本或生产环境隐私数据
- 如果暂时没有私下披露渠道，先提交一条不包含利用细节的 Issue，说明“存在安全问题，需要私下沟通”
- 如果问题已经影响线上，请在描述中明确标出影响范围、触发条件与临时缓解方案

## 维护者排查重点

以下位置是安全相关的关键入口：

- `functions/api/ai.js`
- `functions/api/v1/divination.ts`
- `functions/_shared/ai-proxy.js`
- `src/components/common/MarkdownRenderer.vue`
- `src/seo/`

## 自检建议

- 检查是否把任何默认密钥写进了前端构建变量
- 检查 AI 代理是否只允许可信来源访问
- 检查开发者 API 是否始终要求 `DEV_API_KEY`
- 检查 Markdown 与 AI 输出渲染是否存在脚本注入风险
- 检查静态预渲染文案是否只出现在 `noscript` 回退中
