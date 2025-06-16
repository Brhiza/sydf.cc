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
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        if (!response.body) {
            throw new Error('Response body is null');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = '';

        return {
            async *streamResponse() {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n').filter(line => line.trim() !== '');

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            try {
                                const jsonData = JSON.parse(line.slice(6));
                                if (jsonData.choices && jsonData.choices[0].delta && jsonData.choices[0].delta.content) {
                                    let content = jsonData.choices[0].delta.content;
                                    content = content.replace(/\*/g, '');
                                    yield content;
                                }
                            } catch (e) {
                                console.debug('跳过非 JSON 数据:', line, e);
                            }
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