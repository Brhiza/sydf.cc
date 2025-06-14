// 缓存 DOM 元素
const dom = {
    year1: document.getElementById('year'),
    month1: document.getElementById('month'),
    day1: document.getElementById('day'),
    hour1: document.getElementById('hour'),
    genderMale1: document.getElementById('genderMale'),
    genderFemale1: document.getElementById('genderFemale'),
    enableSecondPerson: document.getElementById('enableSecondPerson'),
    secondPersonInputs: document.getElementById('secondPersonInputs'),
    year2: document.getElementById('year2'),
    month2: document.getElementById('month2'),
    day2: document.getElementById('day2'),
    hour2: document.getElementById('hour2'),
    genderMale2: document.getElementById('genderMale2'),
    genderFemale2: document.getElementById('genderFemale2'),
    result1Div: document.getElementById('result'),
    result2Div: document.getElementById('result2'),
    aiQuestionContainer: document.getElementById('aiQuestionContainer'),
    aiQuestionOptions: document.getElementById('aiQuestionOptions'),
    customQuestion: document.getElementById('customQuestion'),
    combinedAnalysisContainer: document.getElementById('combinedAnalysisContainer'),
    combinedQuestionOptions: document.getElementById('combinedQuestionOptions'),
    customCombinedQuestion: document.getElementById('customCombinedQuestion'),
    mainContainer: document.querySelector('.container')
};

let selectedGender = null;
let selectedGender2 = null;

// 性别选择事件监听
dom.genderMale1.addEventListener('click', () => {
    dom.genderMale1.classList.add('selected');
    dom.genderFemale1.classList.remove('selected');
    selectedGender = '男';
});

dom.genderFemale1.addEventListener('click', () => {
    dom.genderFemale1.classList.add('selected');
    dom.genderMale1.classList.remove('selected');
    selectedGender = '女';
});

dom.genderMale2.addEventListener('click', () => {
    dom.genderMale2.classList.add('selected');
    dom.genderFemale2.classList.remove('selected');
    selectedGender2 = '男';
});

dom.genderFemale2.addEventListener('click', () => {
    dom.genderFemale2.classList.add('selected');
    dom.genderMale2.classList.remove('selected');
    selectedGender2 = '女';
});

function setDefaultOption(type = 'single') {
    const containerId = type === 'combined' ? 'combinedQuestionOptions' : 'aiQuestionOptions';
    const defaultButton = document.querySelector(`#${containerId} button:first-child`);
    if(defaultButton) defaultButton.click();
}

function toggleSecondPersonInputs() {
    const isChecked = dom.enableSecondPerson.checked;
    dom.secondPersonInputs.style.display = isChecked ? 'block' : 'none';
    if (!isChecked) {
        dom.result2Div.innerHTML = '';
        dom.result2Div.style.display = 'none';
        dom.combinedAnalysisContainer.style.display = 'none';
    }
}

function showCustomInput(type = 'single') {
    const customInput = type === 'combined' ? dom.customCombinedQuestion : dom.customQuestion;
    customInput.style.display = 'block';
    customInput.focus();
}

function selectOption(button, type = 'single') {
    const optionsContainer = type === 'combined' ? dom.combinedQuestionOptions : dom.aiQuestionOptions;
    const customInput = type === 'combined' ? dom.customCombinedQuestion : dom.customQuestion;
    
    optionsContainer.querySelectorAll('.unified-button').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');

    if (button.textContent.trim() !== '自定义') {
        customInput.style.display = 'none';
    }
}

async function handleAIQuery(prompt) {
    let aiResponseDiv = document.getElementById('aiResponse');
    if (!aiResponseDiv) {
        aiResponseDiv = document.createElement('div');
        aiResponseDiv.id = 'aiResponse';
        aiResponseDiv.className = 'ai-response'; // 添加 ai-response 类
        aiResponseDiv.style.marginTop = '20px';
        aiResponseDiv.style.padding = '15px';
        aiResponseDiv.style.borderRadius = '8px';
        aiResponseDiv.style.backgroundColor = '#f8f9fa';
        aiResponseDiv.style.whiteSpace = 'pre-wrap';
        aiResponseDiv.style.wordWrap = 'break-word';
        aiResponseDiv.style.overflowY = 'auto'; 
        dom.mainContainer.appendChild(aiResponseDiv);
    }
    
    aiResponseDiv.style.display = 'block';
    aiResponseDiv.innerHTML = '';

    try {
        const aiResponse = await queryAI(prompt);
        for await (const content of aiResponse.streamResponse()) {
            aiResponseDiv.innerHTML += content;
            // 移除此处的滚动逻辑，交由 js/ai.js 中的 MutationObserver 处理
        }
    } catch (error) {
        console.error('请求失败:', error);
        aiResponseDiv.innerHTML = "哈哈，AI开小差了";
    }
}

let pageConfig = {
    chartingFunction: null,
    getAIPrompt: null,
    getCompatibilityPrompt: null,
};

function initializePage(config) {
    pageConfig = { ...pageConfig, ...config };
}

function generateAstrolabe() {
    // Clear previous AI response when re-charting
    const aiResponseDiv = document.getElementById('aiResponse');
    if (aiResponseDiv) {
        aiResponseDiv.innerHTML = '';
        aiResponseDiv.style.display = 'none'; // Hide the container as well
    }

    const year1Val = dom.year1.value;
    const month1Val = dom.month1.value;
    const day1Val = dom.day1.value;
    const hour1Val = dom.hour1.value;
    
    let astrolabe1 = null;
    let astrolabe2 = null;
    let allSuccess = true;
    
    if (year1Val !== '' && month1Val !== '' && day1Val !== '' && hour1Val !== '' && selectedGender) {
        const year1 = parseInt(year1Val);
        const month1 = parseInt(month1Val);
        const day1 = parseInt(day1Val);
        const timeIndex1 = parseInt(hour1Val);
        astrolabe1 = pageConfig.chartingFunction(1, year1, month1, day1, timeIndex1, selectedGender, dom.result1Div);
        if (!astrolabe1) allSuccess = false;
    } else {
        dom.result1Div.innerHTML = '<p style="color: red;">请输入第一个人的完整出生信息！</p>';
        dom.result1Div.style.display = 'block';
        allSuccess = false;
    }

    if (dom.enableSecondPerson.checked) {
        const year2Val = dom.year2.value;
        const month2Val = dom.month2.value;
        const day2Val = dom.day2.value;
        const hour2Val = dom.hour2.value;

        if (year2Val !== '' && month2Val !== '' && day2Val !== '' && hour2Val !== '' && selectedGender2) {
            const year2 = parseInt(year2Val);
            const month2 = parseInt(month2Val);
            const day2 = parseInt(day2Val);
            const timeIndex2 = parseInt(hour2Val);
            astrolabe2 = pageConfig.chartingFunction(2, year2, month2, day2, timeIndex2, selectedGender2, dom.result2Div);
            if (!astrolabe2) allSuccess = false;
        } else {
            dom.result2Div.innerHTML = '<p style="color: red;">请输入第二个人的完整出生信息！</p>';
            dom.result2Div.style.display = 'block';
            allSuccess = false;
        }
    } else {
        dom.result2Div.innerHTML = '';
        dom.result2Div.style.display = 'none';
    }

    dom.aiQuestionContainer.style.display = 'none';
    dom.combinedAnalysisContainer.style.display = 'none';

    if (allSuccess) {
        let targetElement;
        if (dom.enableSecondPerson.checked) {
            dom.combinedAnalysisContainer.style.display = 'block';
            dom.combinedQuestionOptions.style.display = 'flex';
            setDefaultOption('combined');
            targetElement = dom.combinedAnalysisContainer;
        } else {
            dom.aiQuestionContainer.style.display = 'block';
            dom.aiQuestionOptions.style.display = 'flex';
            setDefaultOption('single');
            targetElement = dom.aiQuestionContainer;
        }
        setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

function askAI() {
    if (!pageConfig.getAIPrompt) return;
    const selectedOption = dom.aiQuestionOptions.querySelector('.unified-button.selected');
    const isCustom = selectedOption.textContent.trim() === '自定义';
    const questionText = isCustom ? dom.customQuestion.value : selectedOption.dataset.defaultText;
    const prompt = pageConfig.getAIPrompt(questionText, selectedOption);
    handleAIQuery(prompt);
}

function askAIForCompatibility() {
    if (!pageConfig.getCompatibilityPrompt) return;
    const selectedOption = dom.combinedQuestionOptions.querySelector('.unified-button.selected');
    const isCustom = selectedOption.textContent.trim() === '自定义';
    const questionText = isCustom ? dom.customCombinedQuestion.value : selectedOption.dataset.defaultText;
    const prompt = pageConfig.getCompatibilityPrompt(questionText);
    handleAIQuery(prompt);
}

document.addEventListener('DOMContentLoaded', () => {
    setDefaultOption('single');
});