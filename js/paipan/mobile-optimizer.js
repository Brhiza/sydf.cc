// 移动端优化脚本
(function() {
    'use strict';

    class MobileOptimizer {
        constructor() {
            this.isMobile = this.detectMobile();
            this.isTouch = 'ontouchstart' in window;
            this.init();
        }

        detectMobile() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                   window.innerWidth <= 768;
        }

        init() {
            if (this.isMobile) {
                this.optimizeForMobile();
            }

            // 监听屏幕方向变化
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    this.handleOrientationChange();
                }, 100);
            });

            // 监听窗口大小变化
            window.addEventListener('resize', this.debounce(() => {
                this.isMobile = this.detectMobile();
                if (this.isMobile) {
                    this.optimizeForMobile();
                }
            }, 250));
        }

        optimizeForMobile() {
            // 优化触摸体验
            this.optimizeTouchExperience();
            
            // 优化表单输入
            this.optimizeFormInputs();
            
            // 优化滚动性能
            this.optimizeScrolling();
            
            // 优化按钮大小
            this.optimizeButtons();
            
            // 优化表格显示
            this.optimizeTables();
        }

        optimizeTouchExperience() {
            // 添加触摸反馈
            document.addEventListener('touchstart', (e) => {
                if (e.target.matches('button, .btn, .tab-btn, .questions-grid p')) {
                    e.target.style.transform = 'scale(0.95)';
                    e.target.style.transition = 'transform 0.1s ease';
                }
            });

            document.addEventListener('touchend', (e) => {
                if (e.target.matches('button, .btn, .tab-btn, .questions-grid p')) {
                    setTimeout(() => {
                        e.target.style.transform = '';
                    }, 100);
                }
            });

            // 防止双击缩放
            let lastTouchEnd = 0;
            document.addEventListener('touchend', (e) => {
                const now = Date.now();
                if (now - lastTouchEnd <= 300) {
                    e.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
        }

        optimizeFormInputs() {
            // 为数字输入添加数字键盘
            const numberInputs = document.querySelectorAll('input[type="number"]');
            numberInputs.forEach(input => {
                input.setAttribute('inputmode', 'numeric');
                input.setAttribute('pattern', '[0-9]*');
            });

            // 优化选择框
            const selects = document.querySelectorAll('select');
            selects.forEach(select => {
                select.style.fontSize = '16px'; // 防止iOS缩放
            });

            // 添加输入焦点优化
            const inputs = document.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    // 滚动到输入框
                    setTimeout(() => {
                        input.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 300);
                });
            });
        }

        optimizeScrolling() {
            // 添加平滑滚动
            document.documentElement.style.scrollBehavior = 'smooth';
            
            // 优化滚动容器
            const scrollContainers = document.querySelectorAll('.inspiration-content, .horoscope-content');
            scrollContainers.forEach(container => {
                container.style.webkitOverflowScrolling = 'touch';
                container.style.overflowScrolling = 'touch';
            });
        }

        optimizeButtons() {
            // 确保按钮有足够的触摸目标大小
            const buttons = document.querySelectorAll('button, .btn, .tab-btn');
            buttons.forEach(button => {
                const rect = button.getBoundingClientRect();
                if (rect.height < 44) {
                    button.style.minHeight = '44px';
                    button.style.display = 'flex';
                    button.style.alignItems = 'center';
                    button.style.justifyContent = 'center';
                }
            });
        }

        optimizeTables() {
            // 为表格添加水平滚动
            const tables = document.querySelectorAll('table');
            tables.forEach(table => {
                if (!table.parentElement.classList.contains('table-wrapper')) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'table-wrapper';
                    wrapper.style.cssText = `
                        overflow-x: auto;
                        -webkit-overflow-scrolling: touch;
                        margin: 10px 0;
                    `;
                    table.parentElement.insertBefore(wrapper, table);
                    wrapper.appendChild(table);
                }
            });
        }

        handleOrientationChange() {
            // 重新计算布局
            this.optimizeForMobile();
            
            // 修复iOS Safari的视口高度问题
            if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            }
        }

        // 防抖函数
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // 添加移动端特定的CSS
        addMobileStyles() {
            const style = document.createElement('style');
            style.textContent = `
                /* 移动端优化样式 */
                @media (max-width: 768px) {
                    /* 防止iOS Safari缩放 */
                    input, select, textarea {
                        font-size: 16px !important;
                    }
                    
                    /* 优化触摸目标 */
                    button, .btn, .tab-btn, a {
                        min-height: 44px;
                        min-width: 44px;
                    }
                    
                    /* 优化间距 */
                    .container {
                        padding: 15px;
                    }
                    
                    /* 优化表格 */
                    .table-wrapper {
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        overflow: hidden;
                    }
                    
                    /* 优化问题灵感卡片 */
                    .questions-grid p {
                        min-height: 44px;
                        display: flex;
                        align-items: center;
                        padding: 12px;
                    }
                    
                    /* 优化加载遮罩 */
                    .loading-overlay {
                        padding: 20px;
                    }
                    
                    .loading-spinner {
                        max-width: 90%;
                        padding: 20px;
                    }
                }
                
                /* iOS Safari视口修复 */
                .full-height {
                    height: 100vh;
                    height: calc(var(--vh, 1vh) * 100);
                }
            `;
            document.head.appendChild(style);
        }

        // 添加手势支持
        addGestureSupport() {
            let startY = 0;
            let startX = 0;
            
            document.addEventListener('touchstart', (e) => {
                startY = e.touches[0].clientY;
                startX = e.touches[0].clientX;
            });
            
            document.addEventListener('touchmove', (e) => {
                const currentY = e.touches[0].clientY;
                const currentX = e.touches[0].clientX;
                const diffY = startY - currentY;
                const diffX = startX - currentX;
                
                // 检测下拉刷新手势
                if (diffY < -100 && Math.abs(diffX) < 50 && window.scrollY === 0) {
                    // 可以在这里添加下拉刷新功能
                    console.log('Pull to refresh detected');
                }
            });
        }
    }

    // 初始化移动端优化
    const mobileOptimizer = new MobileOptimizer();
    
    // 添加移动端样式
    mobileOptimizer.addMobileStyles();
    
    // 添加手势支持
    mobileOptimizer.addGestureSupport();

    // 导出到全局作用域
    window.MobileOptimizer = mobileOptimizer;

    console.log('Mobile Optimizer initialized');
})();
