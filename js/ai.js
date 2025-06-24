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