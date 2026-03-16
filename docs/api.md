# 开发者 API（v1）

本文档描述本项目对外开放的开发者 API，用于生成占卜数据并由 AI 输出解读（支持 SSE 流式）。

## 1. 基础信息

- Base URL：`https://<你的域名>`
- API 版本前缀：`/api/v1`
- 时区：后端固定按 **北京时间（UTC+8）** 进行排盘/干支/节气相关计算
- 返回语言：解读内容固定为 **简体中文**

## 2. 鉴权

本 API 使用单个 Key 进行鉴权：

- Cloudflare Pages 环境变量：`DEV_API_KEY`
- 客户端请求头二选一：
  - `Authorization: Bearer <DEV_API_KEY>`
  - `X-Api-Key: <DEV_API_KEY>`

注意：请不要把 `DEV_API_KEY` 暴露在公开前端代码中，建议仅在你自己的服务端调用。

## 3. CORS（跨域）

仅当请求的 `Origin` 主机名满足以下规则时，服务端才会返回 `Access-Control-Allow-Origin`：

- `xushuo.cc`
- `*.xushuo.cc`

不满足规则的 `Origin` 将不会获得 CORS 许可（浏览器会拦截跨域读取）。

## 4. 依赖的 AI 配置

本 API 内部会调用项目已有的 `POST /api/ai` 代理来生成解读，因此还需要配置：

- `OPENAI_API_KEY`（必需）
- `OPENAI_API_BASE`（可选，默认 `https://api.openai.com/v1`）
- `OPENAI_API_MODEL`（可选，默认值由项目配置决定）

说明：`/api/ai` 会强制使用环境变量中的模型配置。

## 5. 接口：POST `/api/v1/divination`

一个统一接口覆盖所有占卜类型：

- `daily`：今日运势（日家奇门）
- `liuyao`：六爻
- `meihua`：梅花易数
- `qimen`：奇门遁甲（转盘法）
- `ssgw`：三山国王灵签
- `tarot`：塔罗（多牌阵）
- `tarot_single`：塔罗（单牌）

### 5.1 请求头

```http
Content-Type: application/json
Authorization: Bearer <DEV_API_KEY>
```

### 5.2 请求体（JSON）

```json
{
  "type": "liuyao",
  "question": "我最近换工作是否顺利？",
  "stream": true,
  "debug": false,
  "options": {
    "datetime": "2026-03-16T12:00:00+08:00",
    "method": "default",
    "divinationNumber": 123,
    "spreadType": "three",
    "signNumber": 8,
    "date": "2026-03-16",
    "temperature": 0.7,
    "supplementaryInfo": {
      "gender": "男",
      "birthYear": 1990,
      "interpretationStyle": "专业",
      "outputLength": "详细"
    }
  }
}
```

字段说明：

- `type`（必填）：占卜类型
- `question`（除 `daily` 外必填）：用户问题
- `stream`（可选，默认 `false`）：是否使用 SSE 流式输出
- `debug`（可选，默认 `false`）：是否返回/推送调试信息（prompt、raw），可能包含敏感信息与较大体积

`options`：

- `datetime`（可选）：指定起卦/排盘时间（ISO 8601，建议携带时区偏移，例如 `+08:00`）
- `method`（可选）：`default | random | number`（六爻/梅花/奇门适用）
- `divinationNumber`（可选）：数字起卦用（`method=number` 时必填）
- `date`（可选）：`daily` 专用，`YYYY-MM-DD`
- `signNumber`（可选）：`ssgw` 专用，不传则随机抽签
- `spreadType`（可选）：`tarot` 专用，不传默认 `three`
- `temperature`（可选）：传给 AI 的 temperature
- `supplementaryInfo`（可选）：影响解读风格/长度（不会改变既有排盘算法的核心逻辑）

`tarot.spreadType` 可用值（与项目内置牌阵一致）：

- `single`、`three`、`love`、`career`、`decision`、`celtic`、`chakra`、`year`、`mindBodySpirit`、`horseshoe`

### 5.3 非流式响应（`stream=false`）

成功（HTTP 200）：

```json
{
  "ok": true,
  "requestId": "xxxx",
  "type": "liuyao",
  "divination": { "..." : "占卜数据" },
  "interpretation": "AI解读文本",
  "usage": { "..." : "可选的 usage" }
}
```

失败（示例，HTTP 401/400/502）：

```json
{
  "ok": false,
  "requestId": "xxxx",
  "error": { "code": "UNAUTHORIZED", "message": "API Key 无效或缺失" }
}
```

### 5.4 流式响应（`stream=true`，SSE）

返回 `Content-Type: text/event-stream`。

事件顺序：

1) 服务端先发送 `event: meta`（包含占卜数据与 requestId）  
2) 随后透传 `/api/ai` 的 SSE 数据流（OpenAI 兼容格式，最后 `data: [DONE]`）  
3) 若发生错误，会发送 `event: error` 并关闭连接

示例（节选）：

```text
event: meta
data: {"requestId":"...","type":"liuyao","divination":{...}}

data: {"id":"...","choices":[{"delta":{"content":"..."},"index":0}]}

data: [DONE]
```

注意：

- `EventSource` 仅支持 GET，无法直接用于该 POST SSE；浏览器端请使用 `fetch()` + `ReadableStream` 自行解析。
- 流式模式下，即使 AI 报错，HTTP 状态也可能是 200，但会通过 `event: error` 通知。

## 6. 错误码与含义（常见）

- `UNAUTHORIZED`：未提供 Key 或 Key 不匹配（HTTP 401）
- `BAD_REQUEST`：请求体不是 JSON、参数缺失或不合法（HTTP 400）
- `DIVINATION_FAILED`：生成占卜数据失败（HTTP 400）
- `AI_REQUEST_FAILED`：请求 AI 代理失败（HTTP 502）
- `AI_ERROR`：AI 代理返回非 2xx（HTTP 502 或 SSE error）
- `AI_BAD_RESPONSE`：AI 返回格式不符合预期（HTTP 502 或 SSE error）
- `STREAM_ERROR`：SSE 读取过程中发生异常（SSE error）

## 7. curl 测试用例

六爻（非流式）：

```bash
curl -s https://<你的域名>/api/v1/divination \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <DEV_API_KEY>" \
  -d '{"type":"liuyao","question":"我最近换工作是否顺利？","stream":false,"options":{"method":"default","supplementaryInfo":{"outputLength":"详细"}}}'
```

今日运势（指定日期，非流式）：

```bash
curl -s https://<你的域名>/api/v1/divination \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: <DEV_API_KEY>" \
  -d '{"type":"daily","stream":false,"options":{"date":"2026-03-16"}}'
```

塔罗（三牌阵，流式）：

```bash
curl -N https://<你的域名>/api/v1/divination \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: <DEV_API_KEY>" \
  -d '{"type":"tarot","question":"我和TA的关系接下来会如何发展？","stream":true,"options":{"spreadType":"three"}}'
```

