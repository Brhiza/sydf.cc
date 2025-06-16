document.addEventListener('DOMContentLoaded', () => {
    const historyContainer = document.getElementById('historyContainer');
    let history = [];
    try {
        history = JSON.parse(localStorage.getItem('qigua_history')) || [];
    } catch (e) {
        console.error("Could not parse history from localStorage", e);
        history = [];
    }

    if (history.length === 0) {
        historyContainer.innerHTML = '<p class="card-description">暂无历史记录。</p>';
        return;
    }

    history.reverse().forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';

        const button = document.createElement('button');
        button.className = 'history-item-button';
        button.innerHTML = `<span>${new Date(item.date).toLocaleDateString()} - ${item.userInput}</span><span class="toggle-icon">▶</span>`;
        
        const content = document.createElement('div');
        content.className = 'history-item-content';
        content.style.display = 'none'; // Initially hidden
        content.innerHTML = item.resultHTML;
        
        button.addEventListener('click', () => {
            const isVisible = content.style.display === 'block';
            content.style.display = isVisible ? 'none' : 'block';
            button.classList.toggle('open');
        });

        historyItem.appendChild(button);
        historyItem.appendChild(content);
        historyContainer.appendChild(historyItem);
    });
});