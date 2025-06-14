// 定义全局变量来存储星盘数据
window.astrolabe1 = null;
window.astrolabe2 = null;

// 缓存 DOM 元素
const dom = {
    nameInput: document.getElementById('name'),
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

// 性别选择事件监听 - 只处理视觉状态
dom.genderMale1.addEventListener('click', () => {
    dom.genderMale1.classList.add('selected');
    dom.genderFemale1.classList.remove('selected');
});

dom.genderFemale1.addEventListener('click', () => {
    dom.genderFemale1.classList.add('selected');
    dom.genderMale1.classList.remove('selected');
});

dom.genderMale2.addEventListener('click', () => {
    dom.genderMale2.classList.add('selected');
    dom.genderFemale2.classList.remove('selected');
});

dom.genderFemale2.addEventListener('click', () => {
    dom.genderFemale2.classList.add('selected');
    dom.genderMale2.classList.remove('selected');
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
            aiResponseDiv.append(document.createTextNode(content));
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
    
    window.astrolabe1 = null;
    window.astrolabe2 = null;
    let allSuccess = true;

    // Determine gender at the time of charting
    const getSelectedGender = (maleBtn, femaleBtn) => {
        if (maleBtn.classList.contains('selected')) return 'male';
        if (femaleBtn.classList.contains('selected')) return 'female';
        return null;
    };

    const gender1 = getSelectedGender(dom.genderMale1, dom.genderFemale1);
    
    if (year1Val && month1Val && day1Val && hour1Val && gender1) {
        const year1 = parseInt(year1Val);
        const month1 = parseInt(month1Val);
        const day1 = parseInt(day1Val);
        const timeIndex1 = parseInt(hour1Val);
        window.astrolabe1 = pageConfig.chartingFunction(1, year1, month1, day1, timeIndex1, gender1, dom.result1Div);
        if (!window.astrolabe1) allSuccess = false;
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
        const gender2 = getSelectedGender(dom.genderMale2, dom.genderFemale2);

        if (year2Val && month2Val && day2Val && hour2Val && gender2) {
            const year2 = parseInt(year2Val);
            const month2 = parseInt(month2Val);
            const day2 = parseInt(day2Val);
            const timeIndex2 = parseInt(hour2Val);
            window.astrolabe2 = pageConfig.chartingFunction(2, year2, month2, day2, timeIndex2, gender2, dom.result2Div);
            if (!window.astrolabe2) allSuccess = false;
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
    // 排盘成功后更新URL
    if (allSuccess) {
        updateURLParameters();
    }
}

async function askAI() {
    if (!pageConfig.getAIPrompt) return;
    const button = dom.aiQuestionContainer.querySelector('.ai-glow-button');
    const selectedOption = dom.aiQuestionOptions.querySelector('.unified-button.selected');
    const isCustom = selectedOption.textContent.trim() === '自定义';
    const questionText = isCustom ? dom.customQuestion.value : selectedOption.dataset.defaultText;
    const prompt = pageConfig.getAIPrompt(questionText, selectedOption);
    
    button.classList.add('glowing');
    try {
        await handleAIQuery(prompt);
    } finally {
        button.classList.remove('glowing');
    }
}

async function askAIForCompatibility() {
    if (!pageConfig.getCompatibilityPrompt) return;
    const button = dom.combinedAnalysisContainer.querySelector('.ai-glow-button');
    const selectedOption = dom.combinedQuestionOptions.querySelector('.unified-button.selected');
    const isCustom = selectedOption.textContent.trim() === '自定义';
    const questionText = isCustom ? dom.customCombinedQuestion.value : selectedOption.dataset.defaultText;
    const prompt = pageConfig.getCompatibilityPrompt(questionText);

    button.classList.add('glowing');
    try {
        await handleAIQuery(prompt);
    } finally {
        button.classList.remove('glowing');
    }
}

// 从 URL 加载数据并排盘
function loadDataFromURL() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    if (name) {
        dom.nameInput.value = name;
    }

    const year1 = params.get('y1');
    // 如果没有参数，则不执行任何操作
    if (!year1) {
        return;
    }

    dom.year1.value = year1;
    dom.month1.value = params.get('m1');
    dom.day1.value = params.get('d1');
    dom.hour1.value = params.get('h1');
    const gender1 = params.get('g1');
    if (gender1 === 'male') {
        dom.genderMale1.click();
    } else if (gender1 === 'female') {
        dom.genderFemale1.click();
    }

    const isCombined = params.get('hp') === 'true';
    if (isCombined) {
        dom.enableSecondPerson.checked = true;
        toggleSecondPersonInputs();
        dom.year2.value = params.get('y2');
        dom.month2.value = params.get('m2');
        dom.day2.value = params.get('d2');
        dom.hour2.value = params.get('h2');
        const gender2 = params.get('g2');
        if (gender2 === 'male') {
            dom.genderMale2.click();
        } else if (gender2 === 'female') {
            dom.genderFemale2.click();
        }
    }

    // 确保所有数据都已填充，然后触发排盘
    setTimeout(generateAstrolabe, 100);
}

// 将当前输入数据更新到 URL
function updateURLParameters() {
    const params = new URLSearchParams();
    const name = dom.nameInput.value.trim();
    if (name) {
        params.set('name', name);
    }
    params.set('y1', dom.year1.value);
    params.set('m1', dom.month1.value);
    params.set('d1', dom.day1.value);
    params.set('h1', dom.hour1.value);
    const gender1 = dom.genderMale1.classList.contains('selected') ? 'male' : 'female';
    params.set('g1', gender1);

    if (dom.enableSecondPerson.checked) {
        params.set('hp', 'true');
        params.set('y2', dom.year2.value);
        params.set('m2', dom.month2.value);
        params.set('d2', dom.day2.value);
        params.set('h2', dom.hour2.value);
        const gender2 = dom.genderMale2.classList.contains('selected') ? 'male' : 'female';
        params.set('g2', gender2);
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    history.pushState({}, '', newUrl);
}

document.addEventListener('DOMContentLoaded', () => {
    setDefaultOption('single');
    // 页面加载时尝试从 URL 加载数据
    loadDataFromURL();
});
// Detect iOS devices and add a class to the body
(function() {
    const platform = navigator.platform;
    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isMac = platform.toUpperCase().indexOf('MAC') >= 0;

    // Check if it's an iOS device (including iPad on iPadOS 13+)
    if (isIOS || (isMac && 'ontouchend' in document)) {
        document.body.classList.add('ios-device');
    }
})();