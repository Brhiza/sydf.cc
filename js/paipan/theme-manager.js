// 主题管理系统
(function() {
    'use strict';

    class ThemeManager {
        constructor() {
            this.themes = {
                light: {
                    name: '明亮模式',
                    colors: {
                        primary: '#6366f1',
                        secondary: '#64748b',
                        background: '#ffffff',
                        surface: '#f8fafc',
                        text: '#1f2937',
                        textSecondary: '#6b7280',
                        border: '#e5e7eb',
                        success: '#10b981',
                        warning: '#f59e0b',
                        error: '#ef4444'
                    }
                },
                dark: {
                    name: '深色模式',
                    colors: {
                        primary: '#818cf8',
                        secondary: '#94a3b8',
                        background: '#111827',
                        surface: '#1f2937',
                        text: '#f9fafb',
                        textSecondary: '#d1d5db',
                        border: '#374151',
                        success: '#34d399',
                        warning: '#fbbf24',
                        error: '#f87171'
                    }
                },
                traditional: {
                    name: '古典模式',
                    colors: {
                        primary: '#dc2626',
                        secondary: '#92400e',
                        background: '#fef7ed',
                        surface: '#fff7ed',
                        text: '#451a03',
                        textSecondary: '#78350f',
                        border: '#fed7aa',
                        success: '#059669',
                        warning: '#d97706',
                        error: '#dc2626'
                    }
                },
                highContrast: {
                    name: '高对比度',
                    colors: {
                        primary: '#000000',
                        secondary: '#666666',
                        background: '#ffffff',
                        surface: '#f5f5f5',
                        text: '#000000',
                        textSecondary: '#333333',
                        border: '#000000',
                        success: '#006600',
                        warning: '#cc6600',
                        error: '#cc0000'
                    }
                }
            };
            
            this.currentTheme = 'light';
            this.systemPreference = this.getSystemPreference();
            this.init();
        }

        init() {
            // 从localStorage恢复主题设置
            const savedTheme = localStorage.getItem('paipan_theme');
            if (savedTheme && this.themes[savedTheme]) {
                this.currentTheme = savedTheme;
            } else if (this.systemPreference === 'dark' && this.themes.dark) {
                this.currentTheme = 'dark';
            }

            // 应用主题
            this.applyTheme(this.currentTheme);

            // 监听系统主题变化
            if (window.matchMedia) {
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                mediaQuery.addEventListener('change', (e) => {
                    this.systemPreference = e.matches ? 'dark' : 'light';
                    if (!localStorage.getItem('paipan_theme')) {
                        this.setTheme(this.systemPreference);
                    }
                });
            }

            // 创建主题切换器
            this.createThemeSwitcher();
        }

        getSystemPreference() {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
            return 'light';
        }

        setTheme(themeName) {
            if (!this.themes[themeName]) {
                console.warn(`Theme "${themeName}" not found`);
                return;
            }

            this.currentTheme = themeName;
            this.applyTheme(themeName);
            localStorage.setItem('paipan_theme', themeName);
            
            // 触发主题变化事件
            window.dispatchEvent(new CustomEvent('themeChanged', {
                detail: { theme: themeName, colors: this.themes[themeName].colors }
            }));
        }

        applyTheme(themeName) {
            const theme = this.themes[themeName];
            const root = document.documentElement;

            // 设置CSS变量
            Object.entries(theme.colors).forEach(([key, value]) => {
                root.style.setProperty(`--color-${key}`, value);
            });

            // 设置主题类名
            document.body.className = document.body.className.replace(/theme-\w+/g, '');
            document.body.classList.add(`theme-${themeName}`);

            // 更新meta标签
            this.updateMetaThemeColor(theme.colors.primary);

            console.log(`Theme applied: ${theme.name}`);
        }

        updateMetaThemeColor(color) {
            let metaThemeColor = document.querySelector('meta[name="theme-color"]');
            if (!metaThemeColor) {
                metaThemeColor = document.createElement('meta');
                metaThemeColor.name = 'theme-color';
                document.head.appendChild(metaThemeColor);
            }
            metaThemeColor.content = color;
        }

        createThemeSwitcher() {
            // 检查是否已存在主题切换器
            if (document.querySelector('.theme-switcher')) return;

            const switcher = document.createElement('div');
            switcher.className = 'theme-switcher';
            switcher.innerHTML = `
                <button class="theme-toggle-btn" title="切换主题">
                    <span class="theme-icon">🎨</span>
                </button>
                <div class="theme-menu">
                    ${Object.entries(this.themes).map(([key, theme]) => `
                        <button class="theme-option ${key === this.currentTheme ? 'active' : ''}" 
                                data-theme="${key}">
                            <span class="theme-preview" style="background: ${theme.colors.primary}"></span>
                            ${theme.name}
                        </button>
                    `).join('')}
                </div>
            `;

            // 添加样式
            this.addThemeSwitcherStyles();

            // 添加事件监听
            const toggleBtn = switcher.querySelector('.theme-toggle-btn');
            const menu = switcher.querySelector('.theme-menu');

            toggleBtn.addEventListener('click', () => {
                menu.classList.toggle('show');
            });

            // 点击主题选项
            switcher.addEventListener('click', (e) => {
                if (e.target.classList.contains('theme-option') || e.target.parentElement.classList.contains('theme-option')) {
                    const option = e.target.classList.contains('theme-option') ? e.target : e.target.parentElement;
                    const themeName = option.dataset.theme;
                    this.setTheme(themeName);
                    
                    // 更新活动状态
                    switcher.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
                    option.classList.add('active');
                    
                    menu.classList.remove('show');
                }
            });

            // 点击外部关闭菜单
            document.addEventListener('click', (e) => {
                if (!switcher.contains(e.target)) {
                    menu.classList.remove('show');
                }
            });

            document.body.appendChild(switcher);
        }

        addThemeSwitcherStyles() {
            if (document.querySelector('#theme-switcher-styles')) return;

            const style = document.createElement('style');
            style.id = 'theme-switcher-styles';
            style.textContent = `
                .theme-switcher {
                    position: fixed;
                    bottom: 20px;
                    left: 20px;
                    z-index: 1000;
                }

                .theme-toggle-btn {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: none;
                    background: var(--color-primary, #6366f1);
                    color: white;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                }

                .theme-toggle-btn:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
                }

                .theme-menu {
                    position: absolute;
                    bottom: 60px;
                    left: 0;
                    background: var(--color-background, white);
                    border: 1px solid var(--color-border, #e5e7eb);
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                    padding: 8px;
                    min-width: 160px;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(10px);
                    transition: all 0.3s ease;
                }

                .theme-menu.show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }

                .theme-option {
                    width: 100%;
                    padding: 10px 12px;
                    border: none;
                    background: none;
                    text-align: left;
                    cursor: pointer;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: var(--color-text, #1f2937);
                    font-size: 14px;
                    transition: background-color 0.2s ease;
                }

                .theme-option:hover {
                    background: var(--color-surface, #f8fafc);
                }

                .theme-option.active {
                    background: var(--color-primary, #6366f1);
                    color: white;
                }

                .theme-preview {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    border: 2px solid currentColor;
                }

                @media (max-width: 768px) {
                    .theme-switcher {
                        bottom: 80px;
                        right: 20px;
                        left: auto;
                    }
                    
                    .theme-menu {
                        right: 0;
                        left: auto;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // 获取当前主题
        getCurrentTheme() {
            return {
                name: this.currentTheme,
                ...this.themes[this.currentTheme]
            };
        }

        // 获取所有可用主题
        getAvailableThemes() {
            return Object.entries(this.themes).map(([key, theme]) => ({
                key,
                name: theme.name,
                colors: theme.colors
            }));
        }

        // 添加自定义主题
        addTheme(key, theme) {
            this.themes[key] = theme;
            
            // 重新创建主题切换器
            const existingSwitcher = document.querySelector('.theme-switcher');
            if (existingSwitcher) {
                existingSwitcher.remove();
                this.createThemeSwitcher();
            }
        }

        // 移除主题
        removeTheme(key) {
            if (key === 'light' || key === 'dark') {
                console.warn('Cannot remove default themes');
                return;
            }
            
            delete this.themes[key];
            
            if (this.currentTheme === key) {
                this.setTheme('light');
            }
        }
    }

    // 创建全局实例
    const themeManager = new ThemeManager();

    // 导出到全局作用域
    window.ThemeManager = {
        setTheme: (theme) => themeManager.setTheme(theme),
        getCurrentTheme: () => themeManager.getCurrentTheme(),
        getAvailableThemes: () => themeManager.getAvailableThemes(),
        addTheme: (key, theme) => themeManager.addTheme(key, theme),
        removeTheme: (key) => themeManager.removeTheme(key)
    };

    console.log('Theme Manager initialized');
})();
