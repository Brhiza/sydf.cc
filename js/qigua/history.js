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
        historyContainer.innerHTML = '<p>暂无历史记录。</p>';
        return;
    }

    history.reverse().forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';

        const button = document.createElement('button');
        button.className = 'history-item-button';
        button.textContent = `${new Date(item.date).toLocaleDateString()} - ${item.userInput}`;
        
        const content = document.createElement('div');
        content.className = 'history-item-content';
        content.style.display = 'none'; // Initially hidden
        
        const card = document.createElement('div');
        card.className = 'history-item-card';
        
        const title = document.createElement('h3');
        title.textContent = `${item.type} - ${new Date(item.date).toLocaleString()}`;
        card.appendChild(title);

        const question = document.createElement('p');
        question.innerHTML = `<strong>问题：</strong> ${item.userInput}`;
        card.appendChild(question);

        const resultContainer = document.createElement('div');
        resultContainer.innerHTML = item.resultHTML;
        card.appendChild(resultContainer);
        
        content.appendChild(card);
        
        button.addEventListener('click', () => {
            const isVisible = content.style.display === 'block';
            content.style.display = isVisible ? 'none' : 'block';
        });

        historyItem.appendChild(button);
        historyItem.appendChild(content);
        historyContainer.appendChild(historyItem);
    });
});