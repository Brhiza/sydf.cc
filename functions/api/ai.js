// functions/api/ai.js

export async function onRequest(context) {
  const { request, env } = context;

  // 只允许 POST 请求
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // 从环境变量中获取 OpenAI 配置
  const apiBase = env.OPENAI_API_BASE || 'https://api.openai.com/v1';
  const apiKey = env.OPENAI_API_KEY;
  const apiModel = env.OPENAI_API_MODEL || 'gpt-3.5-turbo';

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'OPENAI_API_KEY is not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const requestBody = await request.json();

    // 强制使用环境变量中的模型
    requestBody.model = apiModel;

    const apiRequest = new Request(`${apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    const response = await fetch(apiRequest);

    // 如果是流式响应，需要特殊处理
    if (response.headers.get('Content-Type')?.includes('text/event-stream')) {
      return new Response(response.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error processing AI request.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}