// 共享的问题灵感模板组件
(function() {
    'use strict';

    // 问题灵感数据
    const INSPIRATION_DATA = {
        ganqing: {
            title: '感情类',
            groups: [
                {
                    title: '情感发展',
                    questions: [
                        '我近期的桃花运怎么样？',
                        '我们目前的感情走向如何？',
                        '他/她对我的真实情感是什么？',
                        '我们之间有未来吗？',
                        '如何改善我们目前的关系？',
                        '这段感情对我的影响？'
                    ]
                },
                {
                    title: '正缘婚姻',
                    questions: [
                        '我的正缘什么时候出现？',
                        '我的另一半是什么样的人？',
                        '我何时会结婚？',
                        '我适合和现在的对象结婚吗？',
                        '我的婚姻生活会幸福吗？',
                        '如何吸引我的正缘桃花？'
                    ]
                },
                {
                    title: '关系难题',
                    questions: [
                        '我们之间出了什么问题？',
                        '如何解决现在的感情危机？',
                        '我们有机会复合吗？',
                        '我应该放弃这段感情吗？',
                        '我和Ta的缘分有多深？',
                        '我的灵魂伴侣有什么特征？'
                    ]
                }
            ]
        },
        shiye: {
            title: '事业类',
            groups: [
                {
                    title: '事业发展',
                    questions: [
                        '我适合现在的工作/行业吗？',
                        '我的事业什么时候能成功？',
                        '我适合跳槽还是继续坚守？',
                        '我事业上的贵人会是谁？',
                        '我未来的事业走向怎么样？',
                        '我什么时候能找到满意的工作？'
                    ]
                },
                {
                    title: '职场机遇',
                    questions: [
                        '我今年有机会升职加薪吗？',
                        '如何得到领导的赏识和重用？',
                        '我在公司的发展前景如何？',
                        '如何改善我的职场人际关系？',
                        '如何改善当前的工作状态？',
                        '我最近的职场人际运如何？'
                    ]
                },
                {
                    title: '创业之路',
                    questions: [
                        '我适合创业吗？',
                        '我的创业最佳时机是什么时候？',
                        '我该和什么样的人合伙？',
                        '我的创业项目前景如何？',
                        '创业过程中需要注意哪些风险？',
                        '我的创业会成功吗？'
                    ]
                }
            ]
        },
        caifu: {
            title: '财富类',
            groups: [
                {
                    title: '财运趋势',
                    questions: [
                        '我近期的财运怎么样？',
                        '我这辈子财运的整体趋势？',
                        '我什么时候能发财？',
                        '我适合靠什么方式赚钱？',
                        '如何有效提升我的财运？',
                        '我近期会有意外之财吗？'
                    ]
                },
                {
                    title: '投资理财',
                    questions: [
                        '我适合做投资吗？',
                        '我应该选择什么样的投资方向？',
                        '这个投资项目能赚钱吗？',
                        '如何才能守住我的财富？',
                        '我的投资风险大吗？',
                        '如何更好地管理我的财富？'
                    ]
                },
                {
                    title: '财务状况',
                    questions: [
                        '我为什么总是存不住钱？',
                        '是什么原因导致我财务紧张？',
                        '我最近会有破财风险吗？',
                        '如何避免不必要的财务损失？',
                        '我需要注意哪些年份的破财？',
                        '我该如何处理我的债务问题？'
                    ]
                }
            ]
        },
        renji: {
            title: '人际关系类',
            groups: [
                {
                    title: '社交模式',
                    questions: [
                        '我的人际交往模式有何优缺点？',
                        '如何拓展我的高质量社交圈？',
                        '我目前的人际关系状态如何？',
                        '我会吸引哪些人进入我的生活？',
                        '如何获得他人的信任与支持？',
                        '如何处理与朋友的矛盾？'
                    ]
                },
                {
                    title: '贵人善缘',
                    questions: [
                        '什么样的朋友是我的贵人？',
                        '我应该远离什么样的朋友？',
                        '如何结交更多志同道合的朋友？',
                        '我该如何维系重要的友谊？',
                        '我该信任我身边的朋友吗？',
                        '如何获得领导或长辈的赏识？'
                    ]
                },
                {
                    title: '家庭关系',
                    questions: [
                        '我和家人的关系怎么样？',
                        '我的家庭对我有什么样的影响？',
                        '如何改善我与家人的关系？',
                        '我该如何处理家庭矛盾？',
                        '我与家人的缘分有多深？',
                        '如何更好地与家人沟通？'
                    ]
                }
            ]
        },
        rensheng: {
            title: '人生成长类',
            groups: [
                {
                    title: '学业规划',
                    questions: [
                        '我的学业运势如何？',
                        '我适合考研/考公吗？',
                        '我适合继续深造还是工作？',
                        '如何提升我的学习效率？',
                        '我该选择哪个专业/学校？',
                        '我这次考试能通过吗？'
                    ]
                },
                {
                    title: '个人成长',
                    questions: [
                        '我的性格优势和劣势是什么？',
                        '我的人生主要课题是什么？',
                        '如何找到我的人生方向？',
                        '如何克服我性格中的弱点？',
                        '如何有效提升自己的能量状态？',
                        '我的人生转折点在何时？'
                    ]
                },
                {
                    title: '人生机遇',
                    questions: [
                        '我未来十年的人生大运怎么样？',
                        '我该如何实现我的人生目标？',
                        '我的人生会有什么重大机遇？',
                        '我应该注意哪些健康问题？',
                        '如何才能活出更精彩的人生？',
                        '未来的人生之路走向如何？'
                    ]
                }
            ]
        }
    };

    // 创建问题灵感卡片
    function createInspirationCard() {
        const card = document.createElement('div');
        card.className = 'inspiration-card';
        
        // 创建标题
        const title = document.createElement('h3');
        title.className = 'inspiration-title';
        title.textContent = '问题灵感';
        card.appendChild(title);

        // 创建标签页
        const tabs = document.createElement('div');
        tabs.className = 'inspiration-tabs';
        
        Object.keys(INSPIRATION_DATA).forEach((key, index) => {
            const tab = document.createElement('button');
            tab.className = `tab-btn ${index === 0 ? 'active' : ''}`;
            tab.setAttribute('data-tab', key);
            tab.textContent = INSPIRATION_DATA[key].title;
            tabs.appendChild(tab);
        });
        
        card.appendChild(tabs);

        // 创建内容区域
        const content = document.createElement('div');
        content.className = 'inspiration-content';
        
        Object.keys(INSPIRATION_DATA).forEach((key, index) => {
            const pane = document.createElement('div');
            pane.className = `tab-pane ${index === 0 ? 'active' : ''}`;
            pane.id = key;
            
            INSPIRATION_DATA[key].groups.forEach(group => {
                const groupDiv = document.createElement('div');
                groupDiv.className = 'question-group';
                
                const groupTitle = document.createElement('h4');
                groupTitle.textContent = group.title;
                groupDiv.appendChild(groupTitle);
                
                const questionsGrid = document.createElement('div');
                questionsGrid.className = 'questions-grid';
                
                group.questions.forEach(question => {
                    const questionP = document.createElement('p');
                    questionP.textContent = question;
                    questionsGrid.appendChild(questionP);
                });
                
                groupDiv.appendChild(questionsGrid);
                pane.appendChild(groupDiv);
            });
            
            content.appendChild(pane);
        });
        
        card.appendChild(content);

        // 添加标签页切换功能
        tabs.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                const targetTab = e.target.getAttribute('data-tab');
                
                // 更新标签页状态
                tabs.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // 更新内容区域
                content.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
                content.querySelector(`#${targetTab}`).classList.add('active');
            }
        });

        return card;
    }

    // 导出到全局作用域
    window.InspirationTemplate = {
        create: createInspirationCard,
        data: INSPIRATION_DATA
    };
})();
