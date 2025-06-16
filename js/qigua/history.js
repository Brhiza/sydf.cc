document.addEventListener('DOMContentLoaded', () => {
    const historyContainer = document.getElementById('historyContainer');
    const history = JSON.parse(localStorage.getItem('qigua_history')) || [];

    if (history.length === 0) {
        historyContainer.innerHTML = '<p>暂无历史记录。</p>';
        return;
    }

    history.reverse().forEach(item => {
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

        historyContainer.appendChild(card);
    });
});