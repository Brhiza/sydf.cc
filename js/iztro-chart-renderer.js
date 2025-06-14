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
    // 清空容器
    container.innerHTML = '';

    // 1. 创建主星盘容器
    const astrolabeContainer = document.createElement('div');
    astrolabeContainer.className = 'iztro-astrolabe iztro-astrolabe-theme-default';

    // 2. 渲染所有宫位
    astrolabe.palaces.forEach(palaceData => {
        const palaceElement = createPalaceElement(palaceData, horoscope, taijiPalaces, activeHeavenlyStem, activePalaceIndex, handleStemClick, handlePalaceClick);
        astrolabeContainer.appendChild(palaceElement);
    });

    // 3. 渲染中央区域
    const centerElement = createCenterElement(astrolabe, horoscope, horoscopeDate, handleHoroscopeDateChange);
    astrolabeContainer.appendChild(centerElement);

    // 4. 将完整的星盘挂载到页面
    container.appendChild(astrolabeContainer);
}

function createPalaceElement(palace, horoscope, taijiPalaces, activeHeavenlyStem, activePalaceIndex, handleStemClick, handlePalaceClick) {
    const palaceDiv = document.createElement('div');
    palaceDiv.className = 'iztro-palace';
    palaceDiv.style.gridArea = `g${palace.index}`;
    palaceDiv.onclick = () => handlePalaceClick(palace.index); // Add click handler for Taiji

    if (palace.index === activePalaceIndex) {
        palaceDiv.classList.add('taiji-active');
    }

    // Main content container
    const contentDiv = document.createElement('div');
    contentDiv.className = 'iztro-palace-content';

    // Stars container
    const starsContainer = document.createElement('div');
    starsContainer.className = 'iztro-stars-container';

    palace.majorStars.forEach(star => starsContainer.appendChild(createStarElement(star, activeHeavenlyStem)));
    palace.minorStars.forEach(star => starsContainer.appendChild(createStarElement(star, activeHeavenlyStem)));
    palace.adjectiveStars.forEach(star => starsContainer.appendChild(createStarElement(star, activeHeavenlyStem)));
    
    contentDiv.appendChild(starsContainer);

    // Dynamic info container
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
            ageData.stars.forEach(star => horoscopeStarsDiv.appendChild(createStarElement(star, null))); // No highlight for horoscope stars
            dynamicInfoDiv.appendChild(horoscopeStarsDiv);
        }
    }
    
    contentDiv.appendChild(dynamicInfoDiv);

    // Footer container
    const footerDiv = document.createElement('div');
    footerDiv.className = 'iztro-palace-footer';

    const footerLeft = document.createElement('div');
    footerLeft.innerHTML = `
        <div class="iztro-palace-lft24">
            <div>${palace.changsheng12 || ''}</div>
            <div>${palace.boshi12 || ''}</div>
        </div>
    `;

    const footerCenter = document.createElement('div');
    const taijiPalaceName = taijiPalaces[palace.index];
    const originalName = `${palace.name}${palace.isBodyPalace ? '·身' : ''}`;
    let displayName = originalName;

    // If a taiji point is active and the name is different, show the temporary name
    if (taijiPalaceName && taijiPalaceName !== palace.name) {
        displayName = `<span class="taiji-palace-name">${taijiPalaceName}</span> <span class="original-palace-name">(${originalName})</span>`;
    }

    footerCenter.innerHTML = `
        <div class="iztro-palace-name">${displayName}</div>
        <div class="iztro-palace-scope-decadal">${palace.decadal.range.join(" - ")}</div>
    `;

    const footerRight = document.createElement('div');
    footerRight.className = 'footer-right-container'; // Add a class for styling

    const rgt24Div = document.createElement('div');
    rgt24Div.className = 'iztro-palace-rgt24';
    rgt24Div.innerHTML = `
        <div>${palace.suiqian12 || ''}</div>
        <div>${palace.jiangqian12 || ''}</div>
    `;

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

    // Basic Info Section
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
    // The iztro library returns Chinese characters for gender in the astrolabe object.
    const genderText = astrolabe.gender; // This will be '男' or '女'
    const genderClass = genderText === '男' ? 'male' : 'female';
    basicInfoContainer.appendChild(createItem('性别：', genderText));
    basicInfoContainer.querySelector('span:last-child').classList.add('gender', `gender-${genderClass}`);
    basicInfoContainer.appendChild(createItem('阳历：', astrolabe.solarDate));
    basicInfoContainer.appendChild(createItem('农历：', astrolabe.lunarDate));
    basicInfoContainer.appendChild(createItem('干支：', astrolabe.chineseDate));
    basicInfoContainer.appendChild(createItem('命主：', astrolabe.soul));
    basicInfoContainer.appendChild(createItem('身主：', astrolabe.body));
    basicInfoContainer.appendChild(createItem('五行局：', astrolabe.fiveElementsClass));

    // Horoscope Section
    const horoscopeContainer = document.createElement('div');
    horoscopeContainer.className = 'center-section horoscope-controls';
    horoscopeContainer.innerHTML = '<label>运限推算</label>';

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    // Format date to YYYY-MM-DD for input value
    const y = horoscopeDate.getFullYear();
    const m = String(horoscopeDate.getMonth() + 1).padStart(2, '0');
    const d = String(horoscopeDate.getDate()).padStart(2, '0');
    dateInput.value = `${y}-${m}-${d}`;
    dateInput.onchange = (e) => {
        handleHoroscopeDateChange(new Date(e.target.value));
    };

    horoscopeContainer.appendChild(dateInput);
    
    centerDiv.appendChild(basicInfoContainer);
    centerDiv.appendChild(horoscopeContainer);

    return centerDiv;
}