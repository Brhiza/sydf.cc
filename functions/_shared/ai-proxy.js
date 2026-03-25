const DEFAULT_OPENAI_API_BASE = 'https://api.openai.com/v1';
const DEFAULT_OPENAI_API_MODEL = 'gpt-3.5-turbo';
const DEFAULT_MAX_TOKENS = 4096;
const MAX_TOKENS = 8192;
const MAX_MESSAGE_COUNT = 50;
const MAX_MESSAGE_CONTENT_LENGTH = 20000;
const MAX_TOOL_COUNT = 8;
const MAX_TOOL_ARGUMENT_LENGTH = 12000;
const MAX_TOOL_SCHEMA_LENGTH = 20000;

function createHttpError(message, status = 400) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeNonEmptyString(value, fieldName, maxLength = 256) {
  if (typeof value !== 'string') {
    throw createHttpError(`${fieldName} 必须为字符串`, 400);
  }

  const trimmed = value.trim();
  if (!trimmed) {
    throw createHttpError(`${fieldName} 不能为空`, 400);
  }

  if (trimmed.length > maxLength) {
    throw createHttpError(`${fieldName} 过长`, 400);
  }

  return trimmed;
}

function cloneJsonWithLimit(value, fieldName, maxLength) {
  let serialized = '';
  try {
    serialized = JSON.stringify(value);
  } catch {
    throw createHttpError(`${fieldName} 必须为可序列化的 JSON`, 400);
  }

  if (typeof serialized !== 'string') {
    throw createHttpError(`${fieldName} 必须为可序列化的 JSON`, 400);
  }

  if (serialized.length > maxLength) {
    throw createHttpError(`${fieldName} 过大`, 400);
  }

  return JSON.parse(serialized);
}

function normalizeToolCalls(toolCalls, messageIndex) {
  if (toolCalls == null) return undefined;
  if (!Array.isArray(toolCalls)) {
    throw createHttpError(`messages[${messageIndex}].tool_calls 必须为数组`, 400);
  }

  return toolCalls.slice(0, MAX_TOOL_COUNT).map((toolCall, toolIndex) => {
    if (!isPlainObject(toolCall) || toolCall.type !== 'function' || !isPlainObject(toolCall.function)) {
      throw createHttpError(`messages[${messageIndex}].tool_calls[${toolIndex}] 格式不正确`, 400);
    }

    return {
      id: normalizeNonEmptyString(
        toolCall.id ?? `tool_call_${messageIndex}_${toolIndex}`,
        `messages[${messageIndex}].tool_calls[${toolIndex}].id`,
        200
      ),
      type: 'function',
      function: {
        name: normalizeNonEmptyString(
          toolCall.function.name,
          `messages[${messageIndex}].tool_calls[${toolIndex}].function.name`,
          128
        ),
        arguments:
          typeof toolCall.function.arguments === 'string'
            ? toolCall.function.arguments.slice(0, MAX_TOOL_ARGUMENT_LENGTH)
            : '',
      },
    };
  });
}

function normalizeMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw createHttpError('messages 必须为非空数组', 400);
  }

  if (messages.length > MAX_MESSAGE_COUNT) {
    throw createHttpError(`messages 数量不能超过 ${MAX_MESSAGE_COUNT} 条`, 400);
  }

  return messages.map((message, index) => {
    if (!isPlainObject(message)) {
      throw createHttpError(`messages[${index}] 必须为对象`, 400);
    }

    const role = normalizeNonEmptyString(message.role, `messages[${index}].role`, 32);
    const allowedRoles = new Set(['system', 'user', 'assistant', 'tool', 'developer']);
    if (!allowedRoles.has(role)) {
      throw createHttpError(`messages[${index}].role 不受支持`, 400);
    }

    let content = null;
    if (message.content === null) {
      content = null;
    } else if (typeof message.content === 'string') {
      if (message.content.length > MAX_MESSAGE_CONTENT_LENGTH) {
        throw createHttpError(`messages[${index}].content 过长`, 400);
      }
      content = message.content;
    } else {
      throw createHttpError(`messages[${index}].content 必须为字符串或 null`, 400);
    }

    const normalizedMessage = {
      role,
      content,
    };

    if (typeof message.name === 'string' && message.name.trim()) {
      normalizedMessage.name = message.name.trim().slice(0, 128);
    }

    if (typeof message.tool_call_id === 'string' && message.tool_call_id.trim()) {
      normalizedMessage.tool_call_id = message.tool_call_id.trim().slice(0, 200);
    }

    const toolCalls = normalizeToolCalls(message.tool_calls, index);
    if (toolCalls) {
      normalizedMessage.tool_calls = toolCalls;
    }

    return normalizedMessage;
  });
}

function normalizeTools(tools) {
  if (tools == null) return undefined;
  if (!Array.isArray(tools)) {
    throw createHttpError('tools 必须为数组', 400);
  }

  if (tools.length > MAX_TOOL_COUNT) {
    throw createHttpError(`tools 数量不能超过 ${MAX_TOOL_COUNT} 个`, 400);
  }

  return tools.map((tool, index) => {
    if (!isPlainObject(tool) || tool.type !== 'function' || !isPlainObject(tool.function)) {
      throw createHttpError(`tools[${index}] 格式不正确`, 400);
    }

    return {
      type: 'function',
      function: {
        name: normalizeNonEmptyString(tool.function.name, `tools[${index}].function.name`, 128),
        description:
          typeof tool.function.description === 'string'
            ? tool.function.description.slice(0, 1000)
            : '',
        parameters: cloneJsonWithLimit(
          tool.function.parameters ?? { type: 'object', properties: {} },
          `tools[${index}].function.parameters`,
          MAX_TOOL_SCHEMA_LENGTH
        ),
      },
    };
  });
}

function normalizeToolChoice(toolChoice) {
  if (toolChoice == null) return undefined;
  if (toolChoice === 'auto' || toolChoice === 'none') {
    return toolChoice;
  }

  if (
    isPlainObject(toolChoice) &&
    toolChoice.type === 'function' &&
    isPlainObject(toolChoice.function)
  ) {
    return {
      type: 'function',
      function: {
        name: normalizeNonEmptyString(toolChoice.function.name, 'tool_choice.function.name', 128),
      },
    };
  }

  throw createHttpError('tool_choice 格式不正确', 400);
}

function normalizeTemperature(temperature) {
  if (temperature == null) return undefined;
  if (typeof temperature !== 'number' || !Number.isFinite(temperature)) {
    throw createHttpError('temperature 必须为数字', 400);
  }

  return Math.min(2, Math.max(0, temperature));
}

function normalizeMaxTokens(maxTokens) {
  if (maxTokens == null) return DEFAULT_MAX_TOKENS;
  if (typeof maxTokens !== 'number' || !Number.isFinite(maxTokens) || maxTokens <= 0) {
    throw createHttpError('max_tokens 必须为正数', 400);
  }

  return Math.min(MAX_TOKENS, Math.max(1, Math.floor(maxTokens)));
}

function normalizeAiRequestBody(requestBody, forcedModel) {
  if (!isPlainObject(requestBody)) {
    throw createHttpError('请求体必须为 JSON 对象', 400);
  }

  const normalizedBody = {
    model: forcedModel,
    messages: normalizeMessages(requestBody.messages),
    stream: Boolean(requestBody.stream),
    max_tokens: normalizeMaxTokens(requestBody.max_tokens),
  };

  const temperature = normalizeTemperature(requestBody.temperature);
  if (temperature !== undefined) {
    normalizedBody.temperature = temperature;
  }

  const tools = normalizeTools(requestBody.tools);
  if (tools) {
    normalizedBody.tools = tools;
  }

  const toolChoice = normalizeToolChoice(requestBody.tool_choice);
  if (toolChoice !== undefined) {
    normalizedBody.tool_choice = toolChoice;
  }

  return normalizedBody;
}

export function createAiProxyRequest(env, requestBody, init = {}) {
  const apiBase = env.OPENAI_API_BASE || DEFAULT_OPENAI_API_BASE;
  const apiKey = env.OPENAI_API_KEY;
  const apiModel = env.OPENAI_API_MODEL || DEFAULT_OPENAI_API_MODEL;

  if (!apiKey) {
    throw createHttpError('OPENAI_API_KEY is not configured.', 500);
  }

  const normalizedBody = normalizeAiRequestBody(requestBody, apiModel);
  const normalizedApiBase = apiBase.replace(/\/+$/, '');

  return new Request(`${normalizedApiBase}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(normalizedBody),
    signal: init.signal,
  });
}

export async function proxyAiRequest(env, requestBody, init = {}) {
  const apiRequest = createAiProxyRequest(env, requestBody, init);
  return fetch(apiRequest);
}

export function getHttpErrorStatus(error) {
  return typeof error?.status === 'number' ? error.status : null;
}
