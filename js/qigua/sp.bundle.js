// tarot-deck.js
const tarotCards = [
    { number: 1, name: "愚者" }, { number: 2, name: "魔术师" }, { number: 3, name: "女祭司" }, { number: 4, name: "女皇" }, { number: 5, name: "皇帝" }, { number: 6, name: "教皇" }, { number: 7, name: "恋人" }, { number: 8, name: "战车" }, { number: 9, name: "力量" }, { number: 10, name: "隐士" }, { number: 11, name: "命运之轮" }, { number: 12, name: "正义" }, { number: 13, name: "倒吊人" }, { number: 14, name: "死神" }, { number: 15, name: "节制" }, { number: 16, name: "恶魔" }, { number: 17, name: "塔" }, { number: 18, name: "星星" }, { number: 19, name: "月亮" }, { number: 20, name: "太阳" }, { number: 21, name: "审判" }, { number: 22, name: "世界" },
    { number: 23, name: "权杖一" }, { number: 24, name: "权杖二" }, { number: 25, name: "权杖三" }, { number: 26, name: "权杖四" }, { number: 27, name: "权杖五" }, { number: 28, name: "权杖六" }, { number: 29, name: "权杖七" }, { number: 30, name: "权杖八" }, { number: 31, name: "权杖九" }, { number: 32, name: "权杖十" },
    { number: 33, name: "圣杯一" }, { number: 34, name: "圣杯二" }, { number: 35, name: "圣杯三" }, { number: 36, name: "圣杯四" }, { number: 37, name: "圣杯五" }, { number: 38, name: "圣杯六" }, { number: 39, name: "圣杯七" }, { number: 40, name: "圣杯八" }, { number: 41, name: "圣杯九" }, { number: 42, name: "圣杯十" },
    { number: 43, name: "宝剑一" }, { number: 44, name: "宝剑二" }, { number: 45, name: "宝剑三" }, { number: 46, name: "宝剑四" }, { number: 47, name: "宝剑五" }, { number: 48, name: "宝剑六" }, { number: 49, name: "宝剑七" }, { number: 50, name: "宝剑八" }, { number: 51, name: "宝剑九" }, { number: 52, name: "宝剑十" },
    { number: 53, name: "钱币一" }, { number: 54, name: "钱币二" }, { number: 55, name: "钱币三" }, { number: 56, name: "钱币四" }, { number: 57, name: "钱币五" }, { number: 58, name: "钱币六" }, { number: 59, name: "钱币七" }, { number: 60, name: "钱币八" }, { number: 61, name: "钱币九" }, { number: 62, name: "钱币十" },
    { number: 63, name: "权杖侍者" }, { number: 64, name: "圣杯侍者" }, { number: 65, name: "宝剑侍者" }, { number: 66, name: "钱币侍者" },
    { number: 67, name: "权杖骑士" }, { number: 68, name: "圣杯骑士" }, { number: 69, name: "宝剑骑士" }, { number: 70, name: "钱币骑士" },
    { number: 71, name: "权杖女王" }, { number: 72, name: "圣杯女王" }, { number: 73, name: "宝剑女王" }, { number: 74, name: "钱币女王" },
    { number: 75, name: "权杖国王" }, { number: 76, name: "圣杯国王" }, { number: 77, name: "宝剑国王" }, { number: 78, name: "钱币国王" }
];
let deck = [];
function shuffleDeck() {
    let shuffledDeck = tarotCards.map(card => ({
        ...card,
        position: Math.floor(Math.random() * 2)
    }));
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    deck = shuffledDeck;
}
function drawCards(count) {
    if (deck.length < count) {
        console.log("牌库不足，正在重新洗牌...");
        shuffleDeck();
    }
    return deck.splice(deck.length - count, count);
}
shuffleDeck();

// sp-renderer.js
const imageUrlPrefix_sp = "../static/mx/";
function renderThreeTarotCards(cardsData) {
    const outputText = document.getElementById('outputText');
    outputText.style.display = 'block';
    let cardsHtml = '';
    for (const card of cardsData) {
        const { number, name, position } = card;
        const displayName = position === 1 ? `逆位${name}` : name;
        const reversedClass = position === 1 ? 'reversed' : '';
        cardsHtml += `
            <div class="hexagram-item tarot">
                <img src="${imageUrlPrefix_sp}${number}.jpg" alt="${displayName}" class="${reversedClass}" />
                <div class="hexagram">${displayName}</div>
            </div>
        `;
    }
    outputText.innerHTML = `
        <div class="result-section">
            <h2 class="result-title">抽牌结果</h2>
            <div class="hexagram-container tarot three-cards">
                ${cardsHtml}
            </div>
        </div>
        <div class="result-section">
            <h2 class="result-title">AI解答</h2>
            <div class="ai-response"></div>
        </div>
    `;
    return outputText.querySelector('.ai-response');
}

// sp.js
document.addEventListener('DOMContentLoaded', () => {
    const latest = window.loadLatestHistory('塔罗牌·三牌');
    if (latest) {
        document.getElementById('userInput').value = latest.userInput;
        document.getElementById('outputText').innerHTML = latest.resultHTML;
        document.getElementById('outputText').style.display = 'block';
    }
});

document.getElementById('submitButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    if (!userInput.trim()) {
        alert('请输入您的问题');
        return;
    }
    shuffleDeck();
    const selectedCards = drawCards(3);
    const prompt = `你是一个塔罗牌大师，需要根据我抽到的牌和问题去解析，并解释卡牌的含义和解析，并在最后用百分比表示问题的概率，我抽到了${selectedCards.map(card =>
        card.position === 1 ? `逆位 ${card.name}` : card.name).join(', ')}，我想知道 ${userInput}\n请帮我解读并以如下格式回复\n此牌象意味着：\n你可以：`;
    const aiResponseDiv = renderThreeTarotCards(selectedCards);
    aiResponseDiv.innerHTML = "";
    try {
        // 确保 marked 库可用
        await ensureMarkedLibrary();

        const aiResponse = await queryAI(prompt);
        let fullResponse = "";
        for await (const content of aiResponse.streamResponse()) {
            fullResponse += content;
            // 使用 markdown 渲染
            aiResponseDiv.innerHTML = renderMarkdown(fullResponse);
        }
        window.saveHistory('塔罗牌·三牌', userInput, document.getElementById('outputText').innerHTML);
    } catch (error) {
        console.error('请求失败:', error);
        aiResponseDiv.innerHTML = "哈哈，AI开小差了";
    }
});