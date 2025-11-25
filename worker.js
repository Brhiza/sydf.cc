// ==================================================
// CONFIGURATION (应用程序配置)
// 包含所有服务商、模型映射和安全白名单的常量定义
// ==================================================
const CONFIG = {
  // 定义默认回退模型 (用于用户请求了一个不存在的模型别名时)
  DEFAULT_MODEL: "sydf/v1-250520", 
  
  // 新增：定义所有模型的最终后备模型
  FINAL_FALLBACK_MODEL: "ovo/doubao-1.6", 

  /**
   * API_SERVICES: 上游 AI 服务的配置
   */
  API_SERVICES: {
    'ovo': {
      url: 'https://oai.ovo.gs/v1/chat/completions',
      auth_header: 'Bearer',
      models: [ 'qwen/qwen3-max','ovo/qwen3','sydf/v1-250520','ovo/doubao-1.6','ovo/gpt-oss-120b','ovo/kimi-k2-0905','gemini/gemini-2.5-pro','ovo/deepseek-v3.1','ovo/llama-v4-maverick','ovo/gemini-2.5-pro']
    }
  },
  
  /**
   * ALLOWED_ORIGINS: 允许访问此后端的来源域名白名单
   */
  ALLOWED_ORIGINS: ['sydf.cc', 'zwds.de', 'ovo.gs', 'zwds-1iv.pages.dev', 'x.ovo.gs', 'bazi-pro-7c6.pages.dev','bazi-pro.pages.dev'],
  
  /**
   * MODEL_MAPPING: 用户请求的模型别名到实际模型的映射和故障转移配置。
   */
  MODEL_MAPPING: {
    "sydf-v1-250520": { model: "sydf/v1-250520", fallback: "ovo/doubao-1.6" },
  },
};

// ==================================================
// UTILITY MODULES (辅助模块)
// ==================================================

/**
 * Logger 模块：提供带请求 ID 上下文的日志记录功能。
 */
const Logger = {
  /**
   * @param {string} requestId - 当前请求的唯一 ID
   * @returns {object} 包含 log, warn, error 方法的日志对象
   */
  create: (requestId) => {
    const logWithContext = (level, ...args) => {
      const timestamp = new Date().toISOString();
      console[level](`[${timestamp}] [${requestId}]`, ...args);
    };
    return {
      log: (...args) => logWithContext('log', ...args),
      warn: (...args) => logWithContext('warn', ...args),
      error: (...args) => logWithContext('error', ...args),
    };
  }
};

/**
 * Responder 模块：用于创建标准化的 HTTP 响应。
 */
const Responder = {
  /**
   * 创建错误响应 (JSON)。
   */
  error: (message, status, requestId, origin) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (origin) {
        headers['Access-Control-Allow-Origin'] = origin;
    }
    
    return new Response(JSON.stringify({
      error: { message, type: 'internal_server_error' },
      requestId: requestId,
    }), {
      status,
      headers,
    });
  },
  
  /**
   * 创建流式响应 (Event-Stream)。
   */
  stream: (readable, origin) => {
    return new Response(readable, {
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  },
  
  /**
   * 创建 OPTIONS 预检请求响应。
   */
  options: (origin) => {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }
};

/**
 * Security 模块：处理安全相关的检查。
 */
const Security = {
  /**
   * 校验请求来源是否在白名单中。
   */
  isOriginAllowed: (origin) => {
    if (!origin) return false;
    
    // 确保 URL 具有协议，避免 new URL() 抛出错误
    const fullUrl = origin.startsWith('http') ? origin : `https://${origin}`;

    try {
      const hostname = new URL(fullUrl).hostname;
      // 检查 hostname 是否在允许列表或其子域名
      return CONFIG.ALLOWED_ORIGINS.some(allowed => hostname === allowed || hostname.endsWith(`.${allowed}`));
    } catch (e) {
      return false;
    }
  }
};

/**
 * AIService 模块：处理模型和服务配置的查找逻辑。
 */
const AIService = {
  /**
   * 根据请求的模型名称，获取其对应的服务配置、实际模型名称和 API 密钥。
   */
  getModelService: (requestedModelName, logger, env) => {
    const modelMapping = CONFIG.MODEL_MAPPING[requestedModelName];
    
    let actualModel;
    if (modelMapping) {
      // 1. 如果模型是别名，使用映射中的实际模型
      actualModel = modelMapping.model;
    } else {
      // 2. 检查请求的模型是否直接存在于任何服务中
      const modelExists = Object.values(CONFIG.API_SERVICES).some(service => service.models.includes(requestedModelName));
      if (modelExists) {
        actualModel = requestedModelName;
        logger.log(`模型 "${requestedModelName}" 未在映射中找到，但作为有效模型直接使用。`);
      } else {
        // 3. 既非别名也非有效模型，使用默认模型进行回退
        actualModel = CONFIG.DEFAULT_MODEL; 
        logger.warn(`模型 "${requestedModelName}" 未在映射中找到，也非任何服务中的有效模型，使用默认模型 "${actualModel}"`);
      }
    }

    // 遍历服务配置，查找匹配 actualModel 的服务
    for (const [serviceName, serviceConfig] of Object.entries(CONFIG.API_SERVICES)) {
      if (serviceConfig.models.includes(actualModel)) {
        const apiKey = env[`${serviceName.toUpperCase()}_API_KEY`];
        if (!apiKey) {
          logger.error(`${serviceName.toUpperCase()}_API_KEY 未在环境变量中配置`);
          throw new Error(`服务 ${serviceName} 未正确配置，请联系管理员。`);
        }
        return {
          service: { name: serviceName, ...serviceConfig },
          actualModel,
          apiKey,
        };
      }
    }
    // 错误处理：如果默认模型都找不到服务，说明配置存在严重问题
    throw new Error(`无法为模型 "${actualModel}" 找到服务配置，请检查配置。`);
  }
};

// ==================================================
// CORE REQUEST HANDLER (请求处理核心逻辑)
// ==================================================

/**
 * 处理主要的 AI 请求 (POST /)。
 */
async function handleMainRequest(request, env) {
  const requestId = Math.random().toString(36).substr(2, 9);
  const logger = Logger.create(requestId);
  const origin = request.headers.get('Origin');

  // 1. 安全检查：来源验证
  if (!Security.isOriginAllowed(origin)) {
    return Responder.error('来源不允许', 403, requestId, null); 
  }

  try {
    // 2. 请求体验证和解析
    const requestData = await request.json();

    if (typeof requestData !== 'object' || requestData === null) {
        return Responder.error('请求体格式不正确，应为JSON对象', 400, requestId, origin);
    }
    
    const { model, messages, prompt, temperature, tools, tool_choice } = requestData;

    if (!model) {
        return Responder.error('请求参数缺失: 必须提供 "model"', 400, requestId, origin);
    }
    if (messages === undefined && prompt === undefined) {
        return Responder.error('请求参数缺失: 必须提供 "messages" 或 "prompt"', 400, requestId, origin);
    }
    if (messages !== undefined && !Array.isArray(messages)) {
        return Responder.error('"messages" 必须是数组', 400, requestId, origin);
    }
    
    // 3. 准备上游 API 的 messages
    const finalMessages = messages && messages.length > 0
      ? messages
      : [{ role: 'user', content: prompt }];

    const inputText = finalMessages.map(m => m.content).join('\n');
    logger.log('请求开始:', { model, inputLength: inputText.length });

    // 4. 确定模型调用顺序 (主模型 + 映射的故障转移模型 + 最终故障转移模型)
    let modelsToTry = [model];
    const primaryMapping = CONFIG.MODEL_MAPPING[model];
    if (primaryMapping && primaryMapping.fallback) {
      modelsToTry.push(primaryMapping.fallback);
    }
    
    // ***** 关键修改：添加 FINAL_FALLBACK_MODEL 作为最终后备 *****
    if (!modelsToTry.includes(CONFIG.FINAL_FALLBACK_MODEL)) {
        modelsToTry.push(CONFIG.FINAL_FALLBACK_MODEL);
    }
    // ******************************************************

    // 5. 尝试调用上游 API（带故障转移）
    let apiResponse;
    let lastError = null;

    for (const modelToTry of modelsToTry) {
      try {
        const { service, actualModel, apiKey } = AIService.getModelService(modelToTry, logger, env);

        logger.log(`尝试服务: ${service.name}, 模型: ${actualModel}`);

        const response = await fetch(service.url, {
          method: 'POST',
          headers: {
            'Authorization': `${service.auth_header} ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Object.fromEntries(Object.entries({
            model: actualModel,
            messages: finalMessages,
            stream: true,
            temperature: temperature || 0.7,
            tools,
            tool_choice,
          }).filter(([_, v]) => v != null))),
        });

        if (response.ok) {
          apiResponse = response;
          logger.log(`成功连接到服务: ${service.name} with model ${actualModel}`);
          break; // 成功，退出循环
        } else {
          const errorText = await response.text();
          lastError = `AI 服务 ${service.name} (模型: ${actualModel}) 错误 (状态: ${response.status}): ${errorText}`;
          logger.warn(lastError);
        }
      } catch (error) {
        // 捕获网络错误或 AIService.getModelService 抛出的配置错误
        lastError = `调用服务时发生错误: ${error.message}`;
        logger.error(lastError);
      }
    }

    if (!apiResponse) {
      logger.error('所有 API 调用尝试均失败。');
      throw new Error(lastError || '无法连接到任何 AI 服务，请稍后重试。');
    }

    // 6. 流式传输响应
    const { readable, writable } = new TransformStream();
    apiResponse.body.pipeTo(writable);
    logger.log('流式传输开始');
    return Responder.stream(readable, origin);

  } catch (error) {
    logger.error('Worker 内部错误:', error.message);
    // 内部错误返回 500
    return Responder.error(error.message, 500, requestId, origin);
  }
}

// ==================================================
// WORKER ENTRY POINT (Worker 入口点)
// ==================================================

export default {
  /**
   * Cloudflare Worker 的主要 fetch 处理函数
   */
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin');

    if (request.method === 'OPTIONS') {
      // 处理 CORS 预检请求
      if (!Security.isOriginAllowed(origin)) {
        return new Response('Not allowed', { status: 403 });
      }
      return Responder.options(origin);
    }

    if (request.method === 'POST') {
      // 处理主要的 AI 请求
      return handleMainRequest(request, env);
    }

    // 处理其他不允许的 HTTP 方法
    return new Response('方法不允许', {
      status: 405,
      headers: { 'Allow': 'POST, OPTIONS' },
    });
  },
};