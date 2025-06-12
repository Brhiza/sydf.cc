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
    const autoScrollObserver = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                let target = mutation.target;

                // We need to find the element that contains the AI response.
                // Let's assume it has a class 'ai-response'.
                // The observer is on document.body, so target could be anything.
                // We need to find the '.ai-response' div that is an ancestor of or is the target.
                let aiResponseDiv = target.nodeType === Node.ELEMENT_NODE ? target.closest('.ai-response') : null;

                if (aiResponseDiv) {
                    // Now find the actual scrollable container
                    let scrollContainer = aiResponseDiv;
                    while (scrollContainer && scrollContainer !== document.body) {
                        // Check if the element is scrollable
                        if (scrollContainer.scrollHeight > scrollContainer.clientHeight) {
                            break; // Found it
                        }
                        scrollContainer = scrollContainer.parentElement;
                    }

                    // If no specific scrollable container is found, default to the window/body scrolling
                    if (scrollContainer && scrollContainer !== document.body) {
                        scrollContainer.scrollTop = scrollContainer.scrollHeight;
                    } else {
                        // Fallback for cases where the body is the scroller
                        window.scrollTo(0, document.body.scrollHeight);
                    }
                    return; // Optimization: once we've handled a relevant mutation, we can stop.
                }
            }
        }
    });

    // Start observing the document body for changes when the DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        autoScrollObserver.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
            characterDataOldValue: false // Don't need old value
        });
    });
}
