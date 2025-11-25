// Cloudflare Pages Functions 中间件
// 用于进一步优化缓存策略和响应头

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  
  // 获取响应
  const response = await next();
  
  // 克隆响应以便修改头信息
  const newResponse = new Response(response.body, response);
  
  // 为不同类型的资源设置缓存头
  const pathname = url.pathname;
  
  // HTML 文件 - 不缓存
  if (pathname.endsWith('.html') || pathname === '/') {
    newResponse.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    newResponse.headers.set('X-Frame-Options', 'DENY');
  }
  
  // JS/CSS 文件 - 长期缓存（带哈希）
  if (pathname.match(/\.(js|css)$/)) {
    newResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // 图片文件 - 长期缓存
  if (pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/)) {
    newResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // 字体文件 - 长期缓存
  if (pathname.match(/\.(woff|woff2|ttf|eot)$/)) {
    newResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // API 路由 - 不缓存
  if (pathname.startsWith('/api/')) {
    newResponse.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
  
  // 添加安全头
  newResponse.headers.set('X-Content-Type-Options', 'nosniff');
  newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  newResponse.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // 添加 ETag 支持
  if (response.status === 200) {
    const etag = generateETag(request.url, response.headers.get('content-length'));
    if (etag) {
      newResponse.headers.set('ETag', etag);
    }
  }
  
  return newResponse;
}

// 生成简单的 ETag
function generateETag(url, contentLength) {
  if (!contentLength) return null;
  return `"${url}-${contentLength}"`;
}
