document.addEventListener('DOMContentLoaded', () => {
    // --- Dependency Check ---
    const iztro = window.iztro;

    if (!iztro) {
        console.error('Error: Missing required library `iztro.js`. Please check the script tags in your HTML.');
        const resultDiv = document.getElementById('result');
        if (resultDiv) {
            resultDiv.innerHTML = '<p style="color: red;">错误：缺少必要的紫微斗数库文件，请联系管理员。</p>';
            resultDiv.style.display = 'block';
        }
        return; // Stop execution
    }

    const ZIWEI_AI_PROMPTS = {
        single: [
            {
                id: 'ai-mingge-zonglun',
                text: '命格总论',
                prompt: `请对该紫微斗数命盘进行一次全面、深入、详尽的命格总论分析，内容需丰富详实。分析需严格按照以下结构展开：

1.  **命格核心提要**：
    *   **命宫与身宫**：深度解读命宫和身宫的主星组合，精准判断命格的基本类型和格局层次（例如，“杀破狼”格的开创型，“机月同梁”格的稳定型等）。
    *   **三方四正**：综合分析命宫、财帛宫、官禄宫、迁移宫的星曜组合，提炼出命主最核心的、贯穿一生的追求与价值观。
    *   **生年四化**：点明生年四化（禄、权、科、忌）分别落入的宫位和代表的核心含义，揭示命主与生俱来的优势领域和需要特别关注的人生课题。

2.  **性格、能力与天赋**：
    *   **核心性格**：根据命宫、福德宫的星曜组合，深入剖析命主最核心的性格特质，包括其外在表现和内在真实的思维模式、情感需求。
    *   **先天优势**：详细描述命主与生俱来的天赋和才能，例如学习能力（文昌、文曲）、沟通表达（巨门）、领导管理（紫微、天府）、抗压能力（七杀、破军）等，并说明这些优势在哪些领域最能得到发挥。
    *   **潜在挑战**：客观指出命主性格或命格中可能存在的弱点、盲点或潜在的内在冲突（如空劫、煞忌交侵），并解释这些挑战可能在生活中如何体现。

3.  **人生主要领域剖析**：
    *   **事业格局**：分析官禄宫，判断其事业心的强弱、适合的职业方向、工作环境以及事业上的贵人与阻力。
    *   **财富机遇**：分析财帛宫和田宅宫，解读其理财观念、财富能量、获取财富的主要方式以及资产积累的潜力。
    *   **感情婚姻**：分析夫妻宫，解读其感情观、择偶偏好、理想伴侣的类型以及婚姻生活的真实写照。
    *   **人际互动**：分析仆役宫和兄弟宫，揭示其与朋友、同事、合作伙伴的相处模式和贵人运。

4.  **人生大运总览与核心建议**：
    *   **大限趋势**：简要概括未来几步大限（每步大限为十年）的整体走势起伏，点明人生的几个关键转折期和黄金发展阶段。
    *   **核心指导与人生课题**：综合以上所有分析，为命主提炼出最核心、最重要的人生发展建议。明确指出TA此生的主要人生课题是什么，并提供具体的、可操作的策略来帮助TA扬长避短、趋吉避凶，更好地实现人生价值。`
            },
            { id: 'ai-current-luck', text: '当前大限', prompt: '请详细分析命主当前所处的这步大限（十年运势）。重点解读大限命宫、财帛宫、官禄宫、夫妻宫的星曜组合及四化影响。说明在此期间，命主在事业、财运、感情和人际关系方面的主要机遇和挑战，并提供针对性的发展建议。' },
            { id: 'ai-this-year', text: '今年运势', prompt: '请详细分析命主在今年的流年运势。重点解读流年命宫、流年四化（禄权科忌）对原局各宫位的影响。具体分析事业、财运、感情、健康四个方面的运势走向，并指出需要特别注意的关键月份。' },
            { id: 'ai-career', text: '事业格局', prompt: '请深入分析该命盘的事业发展潜力。重点解读官禄宫和三方四正的星曜组合，判断其事业心、领导力、适合的职业方向（如创业、职场、技术、艺术等）。结合大限走势，分析其职业生涯的关键上升期和可能遇到的瓶颈。' },
            { id: 'ai-wealth', text: '财富机遇', prompt: '请深入分析该命盘的财富格局。重点解读财帛宫和田宅宫，判断其理财观念、财富能量、主要收入来源和资产积累能力。分析其一生的财运起伏，并提供符合其命盘特性的求财和守财建议。' },
            { id: 'ai-marriage', text: '感情婚姻', prompt: '请深入分析该命盘的感情与婚姻状况。重点解读夫妻宫，分析其对待感情的态度、理想伴侣的类型以及婚姻生活的真实写照。结合大限和流年，判断感情运势的起伏和正缘出现的可能时机，并为经营长期稳定的亲密关系提供建议。' },
            { id: 'ai-relationships', text: '人际关系', prompt: '请分析该命盘的人际关系模式。重点解读兄弟宫（与同辈、朋友）和仆役宫（与下属、合作者），评估其社交能力、贵人运和需要注意的人际交往问题。提供改善人际互动、化解潜在矛盾的具体方法。' },
            { id: 'ai-custom', text: '自定义...', prompt: '' }
        ],
        combined: [
            { id: 'ai-compat-marriage', text: '婚恋匹配', prompt: '请对这两个紫微斗数命盘进行婚恋匹配分析。从命宫的性格互补性、夫妻宫的星曜呼应、四化星的相互影响等角度，系统评估双方的缘分深浅和相处模式。总结双方的匹配优势和潜在矛盾，并为促进关系和谐提供具体建议。' },
            { id: 'ai-compat-career', text: '事业合作', prompt: '请对这两个紫微斗数命盘进行事业合作匹配分析。评估双方在性格、能力、资源上的互补性，以及合作的默契程度。分析合作过程中可能出现的机遇和矛盾点，并对如何建立长期、共赢的合作关系提供策略建议。' },
            { id: 'ai-compat-custom', text: '自定义...', prompt: '' }
        ]
    };

    const MUTAGEN_MAP = {
        '甲': { '禄': '廉贞', '权': '破军', '科': '武曲', '忌': '太阳' },
        '乙': { '禄': '天机', '权': '天梁', '科': '紫微', '忌': '太阴' },
        '丙': { '禄': '天同', '权': '天机', '科': '文昌', '忌': '廉贞' },
        '丁': { '禄': '太阴', '权': '天同', '科': '天机', '忌': '巨门' },
        '戊': { '禄': '贪狼', '权': '太阴', '科': '右弼', '忌': '天机' },
        '己': { '禄': '武曲', '权': '贪狼', '科': '天梁', '忌': '文曲' },
        '庚': { '禄': '太阳', '权': '武曲', '科': '太阴', '忌': '天同' },
        '辛': { '禄': '巨门', '权': '太阳', '科': '文曲', '忌': '文昌' },
        '壬': { '禄': '天梁', '权': '紫微', '科': '左辅', '忌': '武曲' },
        '癸': { '禄': '破军', '权': '巨门', '科': '太阴', '忌': '贪狼' },
    };

    function renderAstrolabe(astrolabe, horoscope, horoscopeDate, taijiPalaces, container, activeHeavenlyStem, activePalaceIndex, handleStemClick, handlePalaceClick, handleHoroscopeDateChange) {
        container.innerHTML = '';
        const astrolabeContainer = document.createElement('div');
        astrolabeContainer.className = 'iztro-astrolabe iztro-astrolabe-theme-default';
        astrolabe.palaces.forEach(palaceData => {
            const palaceElement = createPalaceElement(palaceData, horoscope, taijiPalaces, activeHeavenlyStem, activePalaceIndex, handleStemClick, handlePalaceClick);
            astrolabeContainer.appendChild(palaceElement);
        });
        const centerElement = createCenterElement(astrolabe, horoscope, horoscopeDate, handleHoroscopeDateChange);
        astrolabeContainer.appendChild(centerElement);
        container.appendChild(astrolabeContainer);
    }

    function createPalaceElement(palace, horoscope, taijiPalaces, activeHeavenlyStem, activePalaceIndex, handleStemClick, handlePalaceClick) {
        const palaceDiv = document.createElement('div');
        palaceDiv.className = 'iztro-palace';
        palaceDiv.style.gridArea = `g${palace.index}`;
        palaceDiv.onclick = () => handlePalaceClick(palace.index);

        if (palace.index === activePalaceIndex) {
            palaceDiv.classList.add('taiji-active');
        }

        const contentDiv = document.createElement('div');
        contentDiv.className = 'iztro-palace-content';

        const starsContainer = document.createElement('div');
        starsContainer.className = 'iztro-stars-container';
        palace.majorStars.forEach(star => starsContainer.appendChild(createStarElement(star, activeHeavenlyStem)));
        palace.minorStars.forEach(star => starsContainer.appendChild(createStarElement(star, activeHeavenlyStem)));
        palace.adjectiveStars.forEach(star => starsContainer.appendChild(createStarElement(star, activeHeavenlyStem)));
        contentDiv.appendChild(starsContainer);

        const dynamicInfoDiv = document.createElement('div');
        dynamicInfoDiv.className = 'iztro-palace-dynamic-info';
        if (horoscope && horoscope.ages) {
            const ageData = horoscope.ages[palace.index];
            if (ageData && ageData.palaceName) {
                const dynamicNameDiv = document.createElement('div');
                dynamicNameDiv.className = 'dynamic-palace-name yearly';
                dynamicNameDiv.textContent = `流年${ageData.palaceName}`;
                dynamicInfoDiv.appendChild(dynamicNameDiv);
            }
            if (ageData && ageData.stars && ageData.stars.length > 0) {
                const horoscopeStarsDiv = document.createElement('div');
                horoscopeStarsDiv.className = 'horoscope-stars yearly';
                ageData.stars.forEach(star => horoscopeStarsDiv.appendChild(createStarElement(star, null)));
                dynamicInfoDiv.appendChild(horoscopeStarsDiv);
            }
        }
        contentDiv.appendChild(dynamicInfoDiv);

        const footerDiv = document.createElement('div');
        footerDiv.className = 'iztro-palace-footer';

        const footerLeft = document.createElement('div');
        footerLeft.innerHTML = `<div class="iztro-palace-lft24"><div>${palace.changsheng12 || ''}</div><div>${palace.boshi12 || ''}</div></div>`;

        const footerCenter = document.createElement('div');
        const taijiPalaceName = taijiPalaces[palace.index];
        const originalName = `${palace.name}${palace.isBodyPalace ? '·身' : ''}`;
        let displayName = originalName;
        if (taijiPalaceName && taijiPalaceName !== palace.name) {
            displayName = `<span class="taiji-palace-name">${taijiPalaceName}</span> <span class="original-palace-name">(${originalName})</span>`;
        }
        footerCenter.innerHTML = `<div class="iztro-palace-name">${displayName}</div><div class="iztro-palace-scope-decadal">${palace.decadal.range.join(" - ")}</div>`;

        const footerRight = document.createElement('div');
        footerRight.className = 'footer-right-container';
        const rgt24Div = document.createElement('div');
        rgt24Div.className = 'iztro-palace-rgt24';
        rgt24Div.innerHTML = `<div>${palace.suiqian12 || ''}</div><div>${palace.jiangqian12 || ''}</div>`;
        const gzDiv = document.createElement('div');
        gzDiv.className = 'iztro-palace-gz';
        if (palace.heavenlyStem === activeHeavenlyStem) {
            gzDiv.classList.add('active');
        }
        gzDiv.textContent = `${palace.heavenlyStem}${palace.earthlyBranch}`;
        gzDiv.onclick = () => handleStemClick(palace.heavenlyStem);
        footerRight.appendChild(rgt24Div);
        footerRight.appendChild(gzDiv);
        
        footerDiv.appendChild(footerLeft);
        footerDiv.appendChild(footerCenter);
        footerDiv.appendChild(footerRight);

        palaceDiv.appendChild(contentDiv);
        palaceDiv.appendChild(footerDiv);

        return palaceDiv;
    }

    function createStarElement(star, activeHeavenlyStem) {
        const starSpan = document.createElement('span');
        starSpan.className = `iztro-star iztro-star-${star.type}`;
        const nameSpan = document.createElement('span');
        nameSpan.className = 'iztro-star-name';
        nameSpan.textContent = star.name;
        starSpan.appendChild(nameSpan);

        if (star.brightness) {
            const brightnessSpan = document.createElement('span');
            brightnessSpan.className = 'iztro-star-brightness';
            brightnessSpan.textContent = `(${star.brightness})`;
            starSpan.appendChild(brightnessSpan);
        }

        if (activeHeavenlyStem && MUTAGEN_MAP[activeHeavenlyStem]) {
            const mutagens = MUTAGEN_MAP[activeHeavenlyStem];
            for (const key in mutagens) {
                if (mutagens[key] === star.name) {
                    const mutagenTag = document.createElement('span');
                    mutagenTag.className = `iztro-mutagen-tag mutagen-${key.toLowerCase()}`;
                    mutagenTag.textContent = key;
                    starSpan.appendChild(mutagenTag);
                    starSpan.classList.add('star-highlight');
                }
            }
        }
        return starSpan;
    }

    function createCenterElement(astrolabe, horoscope, horoscopeDate, handleHoroscopeDateChange) {
        const centerDiv = document.createElement('div');
        centerDiv.className = 'iztro-palace-center';

        const basicInfoContainer = document.createElement('div');
        basicInfoContainer.className = 'center-section basic-info';
        const createItem = (labelText, valueText) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'iztro-palace-center-item';
            const label = document.createElement('label');
            label.textContent = labelText;
            const span = document.createElement('span');
            span.textContent = valueText;
            itemDiv.appendChild(label);
            itemDiv.appendChild(span);
            return itemDiv;
        };

        if (astrolabe.name) {
            basicInfoContainer.appendChild(createItem('姓名：', astrolabe.name));
        }
        const genderText = astrolabe.gender;
        basicInfoContainer.appendChild(createItem('性别：', genderText));
        basicInfoContainer.appendChild(createItem('阳历：', astrolabe.solarDate));
        basicInfoContainer.appendChild(createItem('农历：', astrolabe.lunarDate));
        basicInfoContainer.appendChild(createItem('干支：', astrolabe.chineseDate));
        basicInfoContainer.appendChild(createItem('命主：', astrolabe.soul));
        basicInfoContainer.appendChild(createItem('身主：', astrolabe.body));
        basicInfoContainer.appendChild(createItem('五行局：', astrolabe.fiveElementsClass));

        const horoscopeContainer = document.createElement('div');
        horoscopeContainer.className = 'center-section horoscope-controls';
        horoscopeContainer.innerHTML = '<label>运限推算</label>';
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        const y = horoscopeDate.getFullYear();
        const m = String(horoscopeDate.getMonth() + 1).padStart(2, '0');
        const d = String(horoscopeDate.getDate()).padStart(2, '0');
        dateInput.value = `${y}-${m}-${d}`;
        dateInput.onchange = (e) => handleHoroscopeDateChange(new Date(e.target.value));
        horoscopeContainer.appendChild(dateInput);
        
        centerDiv.appendChild(basicInfoContainer);
        centerDiv.appendChild(horoscopeContainer);
        return centerDiv;
    }

    function formatAstrolabeForAI(astrolabe) {
        if (!astrolabe) return "无法获取命盘数据。";
        const yearStem = astrolabe.chineseDate.substring(0, 1);
        const yearMutagens = MUTAGEN_MAP[yearStem];
        let result = `### 基本信息\n`;
        result += `* **阳历**: ${astrolabe.solarDate}\n`;
        result += `* **农历**: ${astrolabe.lunarDate}\n`;
        result += `* **干支**: ${astrolabe.chineseDate}\n`;
        result += `* **性别**: ${astrolabe.gender}\n`;
        result += `* **时辰**: ${astrolabe.time}\n`;
        result += `* **命主**: ${astrolabe.soul}\n`;
        result += `* **身主**: ${astrolabe.body}\n`;
        result += `* **五行局**: ${astrolabe.fiveElementsClass}\n\n`;
        result += `### 四化星\n`;
        result += `* **生年四化**: 天干【${yearStem}】\n`;
        result += `  - **化禄**: ${yearMutagens['禄']}\n`;
        result += `  - **化权**: ${yearMutagens['权']}\n`;
        result += `  - **化科**: ${yearMutagens['科']}\n`;
        result += `  - **化忌**: ${yearMutagens['忌']}\n\n`;

        result += `### 宫位信息\n`;
        astrolabe.palaces.forEach(palace => {
            const majorStars = palace.majorStars.map(s => `${s.name} ${s.brightness}`).join(' ') || '无';
            const minorStars = palace.minorStars.map(s => s.name).join(' ') || '无';
            const selfPalace = palace.isBodyPalace ? ' (身宫)' : '';
            const palaceMutagens = MUTAGEN_MAP[palace.heavenlyStem];
            result += `* **${palace.name}宫 (${palace.heavenlyStem}${palace.earthlyBranch})${selfPalace}**: \n`;
            result += `  - **主星**: ${majorStars}\n`;
            result += `  - **辅星**: ${minorStars}\n`;
            result += `  - **大限**: ${palace.decadal.range.join('-')}岁\n`;
            result += `  - **宫干四化**: 天干【${palace.heavenlyStem}】禄入${palaceMutagens['禄']}, 权入${palaceMutagens['权']}, 科入${palaceMutagens['科']}, 忌入${palaceMutagens['忌']}\n`;
        });
        return result;
    }

    function generateAstrolabeForPerson(personNumber, year, month, day, timeIndex, gender, resultDiv) {
        resultDiv.style.display = 'none';
        resultDiv.innerHTML = '<div class="iztro-container"></div><div class="original-result" style="display: none;"></div>';

        if (isNaN(year) || isNaN(month) || isNaN(day) || timeIndex === null) {
            resultDiv.innerHTML = `<p style="color: red;">第${personNumber}人：请输入所有必填的出生信息！</p>`;
            resultDiv.style.display = 'block';
            return null;
        }

        if (!gender) {
            resultDiv.innerHTML = `<p style="color: red;">第${personNumber}人：请选择性别！</p>`;
            resultDiv.style.display = 'block';
            return null;
        }

        const solarDate = `${year}-${month}-${day}`;
        try {
            const astrolabe = iztro.astro.bySolar(solarDate, timeIndex, gender, true, 'zh-CN');
            let activeHeavenlyStem = null;
            let horoscopeDate = new Date();
            let activePalaceIndex = astrolabe.palaces.findIndex(p => p.name === '命宫');

            const redrawAstrolabe = () => {
                const container = resultDiv.querySelector('.iztro-container');
                const horoscope = iztro.astro.getHoroscope(astrolabe, horoscopeDate);
                const getShiftedPalaceNames = (targetPalaceIndex) => {
                    const PALACE_NAMES_ORDER = ['命宫', '兄弟宫', '夫妻宫', '子女宫', '财帛宫', '疾厄宫', '迁移宫', '仆役宫', '官禄宫', '田宅宫', '福德宫', '父母宫'];
                    const originalLifePalaceIndex = astrolabe.palaces.findIndex(p => p.name === '命宫');

                    if (targetPalaceIndex === originalLifePalaceIndex) {
                        return astrolabe.palaces.map(p => p.name);
                    }

                    const newNames = [];
                    for (let i = 0; i < 12; i++) {
                        newNames[i] = PALACE_NAMES_ORDER[(i - targetPalaceIndex + 12) % 12];
                    }
                    return newNames;
                };

                const taijiPalaces = getShiftedPalaceNames(activePalaceIndex);

                const handleStemClick = (stem) => {
                    activeHeavenlyStem = activeHeavenlyStem === stem ? null : stem;
                    redrawAstrolabe();
                };

                const handleHoroscopeDateChange = (date) => {
                    horoscopeDate = date;
                    redrawAstrolabe();
                };

                const handlePalaceClick = (palaceIndex) => {
                    const lifePalaceIndex = astrolabe.palaces.findIndex(p => p.name === '命宫');
                    activePalaceIndex = activePalaceIndex === palaceIndex ? lifePalaceIndex : palaceIndex;
                    redrawAstrolabe();
                };

                renderAstrolabe(astrolabe, horoscope, horoscopeDate, taijiPalaces, container, activeHeavenlyStem, activePalaceIndex, handleStemClick, handlePalaceClick, handleHoroscopeDateChange);
            };
            
            redrawAstrolabe();

            const originalResultContainer = resultDiv.querySelector('.original-result');
            const name = document.getElementById('name').value.trim();
            if (name && personNumber === 1) {
                document.title = `${name}的紫微斗数排盘`;
            }
            let htmlResult = `<h3>${personNumber === 1 ? (name ? `${name}的基本信息` : '基本信息') : `第${personNumber}人 - 基本信息`}</h3>`;
            htmlResult += `<p><strong>阳历：</strong>${astrolabe.solarDate}</p>`;
            htmlResult += `<p><strong>农历：</strong>${astrolabe.lunarDate}</p>`;
            htmlResult += `<p><strong>干支：</strong>${astrolabe.chineseDate}</p>`;
            htmlResult += `<p><strong>性别：</strong>${astrolabe.gender}</p>`;
            htmlResult += `<p><strong>时辰：</strong>${astrolabe.time}</p>`;
            htmlResult += `<p><strong>命主：</strong>${astrolabe.soul}</p>`;
            htmlResult += `<p><strong>身主：</strong>${astrolabe.body}</p>`;
            htmlResult += `<p><strong>五行局：</strong>${astrolabe.fiveElementsClass}</p>`;
            htmlResult += `<p><strong>星座：</strong>${astrolabe.sign}</p>`;
            htmlResult += `<p><strong>生肖：</strong>${astrolabe.zodiac}</p>`;
            htmlResult += `<h3>${personNumber === 1 ? '宫位信息：' : `第${personNumber}人 - 宫位信息：`}</h3>`;
            htmlResult += '<ul>';
            astrolabe.palaces.forEach(palace => {
                htmlResult += `<li><strong>${palace.name}宫 (${palace.heavenlyStem}${palace.earthlyBranch}):</strong>`;
                htmlResult += ` 主星: ${palace.majorStars.map(s => s.name).join(', ') || '无'}`;
                htmlResult += `; 副星: ${palace.minorStars.map(s => s.name).join(', ') || '无'}`;
                htmlResult += `; 小星: ${palace.adjectiveStars.map(s => s.name).join(', ') || '无'}`;
                htmlResult += `</li>`;
            });
            htmlResult += '</ul>';
            originalResultContainer.innerHTML = htmlResult;

            resultDiv.style.display = 'block';
            return astrolabe;
        } catch (error) {
            console.error(`第${personNumber}人排盘错误:`, error);
            resultDiv.innerHTML = `<p style="color: red;">第${personNumber}人排盘失败，请检查输入或查看控制台错误信息。</p><p>${error.message}</p>`;
            resultDiv.style.display = 'block';
            return null;
        }
    }

    initializePage({
        chartingFunction: generateAstrolabeForPerson,
        aiPrompts: ZIWEI_AI_PROMPTS,
        getAIPrompt: (questionText, selectedOption, astrolabe1) => {
            const formattedAstrolabe = astrolabe1 ? formatAstrolabeForAI(astrolabe1) : "无法获取命盘数据。";
            return `你是一个紫微斗数大师，现在是${new Date().toLocaleString()}，请基于以下命盘数据回答问题。\n\n${formattedAstrolabe}\n\n---\n\n**问题**: ${questionText}\n\n---\n\n**分析要求**:\n1. **深入浅出**: 请使用通俗易懂的语言和生活化的比喻来解释专业的命理概念（如星曜、宫位、四化）。分析的最终目的是为了给用户提供清晰的指引，而不是展示术语。\n2. **先定性，后定量**: 先对命格的核心特点（如性格、优势、挑战）进行定性描述，再结合大限、流年进行定量的运势分析。\n3. **积极正向**: 所有的分析都应以积极、善意的视角出发。在指出潜在的挑战或风险时，必须同步提供具体的、可操作的规避方法或转化策略，避免宿命论和不必要的焦虑。\n4. **聚焦建议**: 最终的落脚点是提供清晰、可行的建议。无论是事业、感情还是健康，都要给出用户在现实生活中可以参考和实践的指引。`;
        },
        getCompatibilityPrompt: (questionText, astrolabe1, astrolabe2) => {
            const formattedAstrolabe1 = astrolabe1 ? formatAstrolabeForAI(astrolabe1) : "无法获取第一人命盘数据。";
            const formattedAstrolabe2 = astrolabe2 ? formatAstrolabeForAI(astrolabe2) : "无法获取第二人命盘数据。";
            return `你是一个紫微斗数大师，现在是${new Date().toLocaleString()}，请基于以下两个命盘数据进行合盘分析。\n\n# 第一人命盘\n${formattedAstrolabe1}\n\n# 第二人命盘\n${formattedAstrolabe2}\n\n---\n\n**问题**: ${questionText}\n\n---\n\n**分析要求**:\n1. **通俗易懂**: 用生活化的语言解释双方的互动模式，避免生涩的专业术语。\n2. **突出重点**: 聚焦于双方性格的吸引点、潜在的矛盾点，以及星曜能量的互补性。\n3. **关系导向**: 分析的目的不是给出“合”或“不合”的简单结论，而是深入剖析双方的相处之道。\n4. **提供策略**: 必须提供具体的、可操作的建议，用于促进双方关系的和谐发展，以及如何化解潜在的矛盾。`;
        }
    });
});