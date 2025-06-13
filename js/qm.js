document.getElementById('submitButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    
    const date = new Date();
    const lunar = Lunar.fromDate(date);
    const ganzhiInfo = `年：${lunar.getYearInGanZhi()}，月：${lunar.getMonthInGanZhi()}，日：${lunar.getDayInGanZhi()}，时：${lunar.getTimeInGanZhi()}`;

    const prompt = `你是一个奇门遁甲大师，当前时间：${ganzhiInfo}\n问题: ${userInput}\n请帮我把这些信息起一个完整的八门遁甲盘，不需要告诉我起盘步骤，只需要针对我的问题回答，并详细解读然后用以下格式输出，此盘意味着（详细分析整体趋势和特点），你可以（给出具体的建议和行动方向），接下来你可以开始输出了\n此盘意味着：\n你可以：`;

    const outputText = document.getElementById('outputText');
    outputText.style.display = 'block';
    
    outputText.innerHTML = '<div class="ai-response"></div>';
    const aiResponseDiv = outputText.querySelector('.ai-response');
    aiResponseDiv.innerHTML = "";

    try {
        const aiResponse = await queryAI(prompt);
        for await (const content of aiResponse.streamResponse()) {
            const processedContent = content.replace(/[*#]/g, '');
            aiResponseDiv.innerHTML += processedContent;
        }
    } catch (error) {
        console.error('请求失败:', error);
        aiResponseDiv.innerHTML = "哈哈，AI开小差了";
    }
});