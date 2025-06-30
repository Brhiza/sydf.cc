// 确保 marked 库可用的辅助函数
function ensureMarkedLibrary() {
    return new Promise((resolve) => {
        if (typeof marked !== 'undefined') {
            resolve();
            return;
        }

        // 如果 marked 不存在，动态加载
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
        script.onload = () => {
            // 配置 marked 以获得紧凑的输出
            if (typeof marked !== 'undefined' && marked.setOptions) {
                marked.setOptions({
                    breaks: false,    // 不将单个换行符转换为 <br>
                    gfm: true,        // 启用 GitHub 风格的 markdown
                    sanitize: false,  // 允许 HTML（但要小心 XSS）
                    smartypants: false, // 禁用智能标点符号
                    headerIds: false,   // 禁用标题 ID
                    mangle: false      // 禁用邮箱地址混淆
                });
            }
            resolve();
        };
        script.onerror = () => {
            console.warn('无法加载 marked 库，将使用纯文本渲染');
            resolve();
        };
        document.head.appendChild(script);
    });
}

// 渲染 markdown 内容的辅助函数
function renderMarkdown(text) {
    if (typeof marked !== 'undefined') {
        try {
            // 预处理文本以获得更紧凑的输出
            const processedText = text
                .replace(/\n{3,}/g, '\n\n')    // 将多个连续换行符减少为最多两个
                .replace(/^\s+|\s+$/g, '')     // 去除首尾空白
                .replace(/\n\s*\n\s*\n/g, '\n\n') // 清理多余的空行
                .trim();

            let html = marked.parse(processedText);

            // 后处理 HTML 以获得更紧凑的输出
            html = html
                .replace(/<p><\/p>/g, '')           // 移除空段落
                .replace(/>\s+</g, '><')            // 移除标签间的空白
                .replace(/(<\/p>)\s*(<p>)/g, '$1$2') // 减少段落间距
                .replace(/(<\/h[1-6]>)\s*(<p>)/g, '$1$2') // 减少标题和段落间距
                .replace(/(<\/li>)\s*(<li>)/g, '$1$2')    // 减少列表项间距
                .trim();

            return html;
        } catch (error) {
            console.warn('Markdown 解析失败，使用纯文本:', error);
            return text.replace(/\n/g, '<br>');
        }
    } else {
        // 如果没有 marked 库，简单地将换行符转换为 <br>
        return text.replace(/\n/g, '<br>');
    }
}

async function queryAI(prompt) {
    try {
        const controller = new AbortController();
        window.currentAIRequest = controller;

        const response = await fetch('https://flow.ovo.gs/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt,
                model: "sydf-v1-250520",
                max_tokens: 8192
            }),
            signal: controller.signal
        });

        if (!response.ok) {
            const errorText = await response.text();
            // 根据不同的错误状态码提供更友好的错误信息
            let userFriendlyMessage = "AI服务暂时不可用，请稍后再试";
            if (response.status === 429) {
                userFriendlyMessage = "请求过于频繁，请稍等片刻再试";
            } else if (response.status >= 500) {
                userFriendlyMessage = "服务器暂时繁忙，请稍后再试";
            }
            throw new Error(`${userFriendlyMessage} (状态码: ${response.status})`);
        }

        if (!response.body) {
            throw new Error('Response body is null');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        return {
            async *streamResponse() {
                let buffer = '';
                while (true) {
                    const {
                        done,
                        value
                    } = await reader.read();
                    if (done) {
                        if (buffer.startsWith('data: ')) {
                            try {
                                const jsonData = JSON.parse(buffer.slice(6));
                                if (jsonData.choices && jsonData.choices[0].delta && jsonData.choices[0].delta.content) {
                                    yield jsonData.choices[0].delta.content;
                                }
                            } catch (e) {
                                console.debug('跳过最后不完整的 JSON 数据:', buffer, e);
                            }
                        }
                        break;
                    }
                    buffer += decoder.decode(value, {
                        stream: true
                    });
                    const lines = buffer.split('\n');
                    buffer = lines.pop() || '';
                    for (const line of lines) {
                        if (line.trim() === '' || !line.startsWith('data: ')) {
                            continue;
                        }
                        try {
                            const jsonData = JSON.parse(line.slice(6));
                            if (jsonData.choices && jsonData.choices[0].delta && jsonData.choices[0].delta.content) {
                                const content = jsonData.choices[0].delta.content;
                                yield content;
                            }
                        } catch (e) {
                            console.debug('跳过非 JSON 数据:', line, e);
                        }
                    }
                }
            }
        };
    } catch (error) {
        console.error('请求失败:', error);
        throw error;
    }
}

// 为观音灵签等页面提供的兼容函数
async function getAIResponse(prompt, callback) {
    try {
        // 确保 marked 库可用
        await ensureMarkedLibrary();

        const aiResponse = await queryAI(prompt);
        let fullResponse = "";

        for await (const content of aiResponse.streamResponse()) {
            fullResponse += content;
            // 实时更新，使用 markdown 渲染
            const renderedContent = renderMarkdown(fullResponse);
            callback(renderedContent);
        }
    } catch (error) {
        console.error('getAIResponse 失败:', error);
        callback(`<div style="color: #ff4081; padding: 10px; border: 1px solid #ff4081; border-radius: 5px;">
            <p>😔 AI解读遇到了一些问题：</p>
            <p>${error.message}</p>
            <p>请稍后再试或刷新页面。</p>
        </div>`);
    }
}

if (typeof window !== 'undefined') {
    let userHasScrolled = false;

    // 当用户滚动时，检查他们是否滚动到了底部
    window.addEventListener('scroll', () => {
        // 检查滚动条是否在底部 (留出一些像素的容差)
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5;
        if (!atBottom) {
            userHasScrolled = true;
        } else {
            // 如果用户滚动回底部，重新启用自动滚动
            userHasScrolled = false;
        }
    });

    const scrollContent = () => {
        // 只有在用户没有手动滚动时才自动滚动
        if (!userHasScrolled && document.documentElement.scrollHeight > window.innerHeight) {
            document.documentElement.scrollTop = document.documentElement.scrollHeight;
        }
    };

    const observer = new MutationObserver((mutations) => {
        let relevantMutation = false;
        for (const mutation of mutations) {
            // Check if the mutation happened inside an element we care about.
            if (mutation.target.closest && mutation.target.closest('.ai-response')) {
                relevantMutation = true;
                break;
            }
        }
        if (relevantMutation) {
            // Use requestAnimationFrame to wait for the next repaint,
            // ensuring scrollHeight is updated before we try to scroll.
            window.requestAnimationFrame(scrollContent);
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        const targetNode = document.body;
        const config = {
            childList: true,
            subtree: true,
            characterData: true
        };
        observer.observe(targetNode, config);
    });
}