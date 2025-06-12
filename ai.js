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
                model: "癸水少女",
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
    const scrollObserver = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                let target = mutation.target;
                // 向上遍历，检查父元素是否是我们关心的容器
                while (target && target !== document.body) {
                    if (target.classList && target.classList.contains('ai-response')) {
                        window.scrollTo(0, document.body.scrollHeight);
                        return; // 找到后即可退出循环
                    }
                    target = target.parentElement;
                }
            }
        }
    });

    // 等待DOM加载完毕再开始观察
    document.addEventListener('DOMContentLoaded', () => {
        scrollObserver.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
        });
    });
}
