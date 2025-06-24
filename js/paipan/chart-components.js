// 图表组件系统
(function() {
    'use strict';

    class ChartComponents {
        constructor() {
            this.charts = new Map();
            this.defaultOptions = {
                responsive: true,
                animation: true,
                theme: 'light'
            };
        }

        // 五行强弱雷达图
        createWuxingRadarChart(container, data, options = {}) {
            const config = {
                ...this.defaultOptions,
                ...options
            };

            const canvas = this.createCanvas(container, 'wuxing-radar');
            const ctx = canvas.getContext('2d');
            
            const chartData = {
                labels: ['金', '木', '水', '火', '土'],
                values: [data.jin || 0, data.mu || 0, data.shui || 0, data.huo || 0, data.tu || 0],
                colors: ['#FFB74D', '#66BB6A', '#42A5F5', '#EF5350', '#8D6E63']
            };

            this.drawRadarChart(ctx, canvas, chartData, config);
            
            const chartId = this.generateChartId();
            this.charts.set(chartId, {
                type: 'radar',
                canvas,
                data: chartData,
                config
            });

            return chartId;
        }

        // 大运流年时间线图
        createTimelineChart(container, data, options = {}) {
            const config = {
                ...this.defaultOptions,
                ...options
            };

            const canvas = this.createCanvas(container, 'timeline-chart');
            const ctx = canvas.getContext('2d');

            const chartData = this.processTimelineData(data);
            this.drawTimelineChart(ctx, canvas, chartData, config);

            const chartId = this.generateChartId();
            this.charts.set(chartId, {
                type: 'timeline',
                canvas,
                data: chartData,
                config
            });

            return chartId;
        }

        // 十神分布饼图
        createTenGodPieChart(container, data, options = {}) {
            const config = {
                ...this.defaultOptions,
                ...options
            };

            const canvas = this.createCanvas(container, 'tengod-pie');
            const ctx = canvas.getContext('2d');

            const chartData = this.processTenGodData(data);
            this.drawPieChart(ctx, canvas, chartData, config);

            const chartId = this.generateChartId();
            this.charts.set(chartId, {
                type: 'pie',
                canvas,
                data: chartData,
                config
            });

            return chartId;
        }

        // 紫微斗数宫位强弱柱状图
        createPalaceStrengthChart(container, data, options = {}) {
            const config = {
                ...this.defaultOptions,
                ...options
            };

            const canvas = this.createCanvas(container, 'palace-strength');
            const ctx = canvas.getContext('2d');

            const chartData = this.processPalaceData(data);
            this.drawBarChart(ctx, canvas, chartData, config);

            const chartId = this.generateChartId();
            this.charts.set(chartId, {
                type: 'bar',
                canvas,
                data: chartData,
                config
            });

            return chartId;
        }

        // 创建画布
        createCanvas(container, className) {
            const canvas = document.createElement('canvas');
            canvas.className = `chart-canvas ${className}`;
            canvas.style.cssText = `
                width: 100%;
                height: 300px;
                max-width: 500px;
                margin: 0 auto;
                display: block;
            `;
            
            // 设置高DPI支持
            const dpr = window.devicePixelRatio || 1;
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = 300 * dpr;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = '300px';
            
            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);

            container.appendChild(canvas);
            return canvas;
        }

        // 绘制雷达图
        drawRadarChart(ctx, canvas, data, config) {
            const centerX = canvas.width / (window.devicePixelRatio || 1) / 2;
            const centerY = canvas.height / (window.devicePixelRatio || 1) / 2;
            const radius = Math.min(centerX, centerY) - 50;
            const maxValue = Math.max(...data.values, 100);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 绘制网格
            this.drawRadarGrid(ctx, centerX, centerY, radius, data.labels.length);

            // 绘制数据
            this.drawRadarData(ctx, centerX, centerY, radius, data, maxValue);

            // 绘制标签
            this.drawRadarLabels(ctx, centerX, centerY, radius + 20, data.labels);
        }

        drawRadarGrid(ctx, centerX, centerY, radius, sides) {
            ctx.strokeStyle = '#e5e7eb';
            ctx.lineWidth = 1;

            // 绘制同心圆
            for (let i = 1; i <= 5; i++) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI);
                ctx.stroke();
            }

            // 绘制射线
            for (let i = 0; i < sides; i++) {
                const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(
                    centerX + radius * Math.cos(angle),
                    centerY + radius * Math.sin(angle)
                );
                ctx.stroke();
            }
        }

        drawRadarData(ctx, centerX, centerY, radius, data, maxValue) {
            ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 2;

            ctx.beginPath();
            for (let i = 0; i < data.values.length; i++) {
                const angle = (i * 2 * Math.PI) / data.values.length - Math.PI / 2;
                const value = (data.values[i] / maxValue) * radius;
                const x = centerX + value * Math.cos(angle);
                const y = centerY + value * Math.sin(angle);

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // 绘制数据点
            ctx.fillStyle = '#6366f1';
            for (let i = 0; i < data.values.length; i++) {
                const angle = (i * 2 * Math.PI) / data.values.length - Math.PI / 2;
                const value = (data.values[i] / maxValue) * radius;
                const x = centerX + value * Math.cos(angle);
                const y = centerY + value * Math.sin(angle);

                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.fill();
            }
        }

        drawRadarLabels(ctx, centerX, centerY, radius, labels) {
            ctx.fillStyle = '#374151';
            ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            for (let i = 0; i < labels.length; i++) {
                const angle = (i * 2 * Math.PI) / labels.length - Math.PI / 2;
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                ctx.fillText(labels[i], x, y);
            }
        }

        // 绘制时间线图
        drawTimelineChart(ctx, canvas, data, config) {
            const width = canvas.width / (window.devicePixelRatio || 1);
            const height = canvas.height / (window.devicePixelRatio || 1);
            const padding = 40;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 绘制时间轴
            ctx.strokeStyle = '#e5e7eb';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(padding, height - padding);
            ctx.lineTo(width - padding, height - padding);
            ctx.stroke();

            // 绘制数据点
            const stepX = (width - 2 * padding) / (data.length - 1);
            data.forEach((item, index) => {
                const x = padding + index * stepX;
                const y = height - padding;

                // 绘制年份标记
                ctx.fillStyle = this.getTimelineColor(item.quality);
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, 2 * Math.PI);
                ctx.fill();

                // 绘制年份文字
                ctx.fillStyle = '#374151';
                ctx.font = '12px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(item.year, x, y + 25);
            });
        }

        // 绘制饼图
        drawPieChart(ctx, canvas, data, config) {
            const centerX = canvas.width / (window.devicePixelRatio || 1) / 2;
            const centerY = canvas.height / (window.devicePixelRatio || 1) / 2;
            const radius = Math.min(centerX, centerY) - 50;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let currentAngle = -Math.PI / 2;
            const total = data.values.reduce((sum, value) => sum + value, 0);

            data.values.forEach((value, index) => {
                const sliceAngle = (value / total) * 2 * Math.PI;
                
                ctx.fillStyle = data.colors[index];
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
                ctx.closePath();
                ctx.fill();

                // 绘制标签
                const labelAngle = currentAngle + sliceAngle / 2;
                const labelX = centerX + (radius + 20) * Math.cos(labelAngle);
                const labelY = centerY + (radius + 20) * Math.sin(labelAngle);
                
                ctx.fillStyle = '#374151';
                ctx.font = '12px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(data.labels[index], labelX, labelY);

                currentAngle += sliceAngle;
            });
        }

        // 绘制柱状图
        drawBarChart(ctx, canvas, data, config) {
            const width = canvas.width / (window.devicePixelRatio || 1);
            const height = canvas.height / (window.devicePixelRatio || 1);
            const padding = 40;
            const chartWidth = width - 2 * padding;
            const chartHeight = height - 2 * padding;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const maxValue = Math.max(...data.values);
            const barWidth = chartWidth / data.values.length * 0.8;
            const barSpacing = chartWidth / data.values.length * 0.2;

            data.values.forEach((value, index) => {
                const barHeight = (value / maxValue) * chartHeight;
                const x = padding + index * (barWidth + barSpacing);
                const y = height - padding - barHeight;

                ctx.fillStyle = data.colors[index] || '#6366f1';
                ctx.fillRect(x, y, barWidth, barHeight);

                // 绘制标签
                ctx.fillStyle = '#374151';
                ctx.font = '12px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(data.labels[index], x + barWidth / 2, height - padding + 20);
            });
        }

        // 数据处理方法
        processTimelineData(data) {
            return data.map(item => ({
                year: item.year,
                quality: item.quality || 'neutral',
                events: item.events || []
            }));
        }

        processTenGodData(data) {
            const labels = Object.keys(data);
            const values = Object.values(data);
            const colors = this.generateColors(labels.length);
            
            return { labels, values, colors };
        }

        processPalaceData(data) {
            const labels = data.map(item => item.name);
            const values = data.map(item => item.strength);
            const colors = this.generateColors(labels.length);
            
            return { labels, values, colors };
        }

        // 工具方法
        generateChartId() {
            return `chart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        }

        generateColors(count) {
            const colors = [
                '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f97316',
                '#eab308', '#22c55e', '#10b981', '#06b6d4', '#3b82f6'
            ];
            return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
        }

        getTimelineColor(quality) {
            const colors = {
                excellent: '#22c55e',
                good: '#84cc16',
                neutral: '#6b7280',
                poor: '#f97316',
                bad: '#ef4444'
            };
            return colors[quality] || colors.neutral;
        }

        // 更新图表
        updateChart(chartId, newData) {
            const chart = this.charts.get(chartId);
            if (!chart) return false;

            chart.data = newData;
            const ctx = chart.canvas.getContext('2d');

            switch (chart.type) {
                case 'radar':
                    this.drawRadarChart(ctx, chart.canvas, newData, chart.config);
                    break;
                case 'timeline':
                    this.drawTimelineChart(ctx, chart.canvas, newData, chart.config);
                    break;
                case 'pie':
                    this.drawPieChart(ctx, chart.canvas, newData, chart.config);
                    break;
                case 'bar':
                    this.drawBarChart(ctx, chart.canvas, newData, chart.config);
                    break;
            }

            return true;
        }

        // 销毁图表
        destroyChart(chartId) {
            const chart = this.charts.get(chartId);
            if (chart) {
                chart.canvas.remove();
                this.charts.delete(chartId);
                return true;
            }
            return false;
        }

        // 获取图表统计
        getStats() {
            return {
                totalCharts: this.charts.size,
                chartTypes: Array.from(this.charts.values()).reduce((acc, chart) => {
                    acc[chart.type] = (acc[chart.type] || 0) + 1;
                    return acc;
                }, {})
            };
        }
    }

    // 创建全局实例
    const chartComponents = new ChartComponents();

    // 导出到全局作用域
    window.ChartComponents = {
        createWuxingRadar: (container, data, options) => 
            chartComponents.createWuxingRadarChart(container, data, options),
        createTimeline: (container, data, options) => 
            chartComponents.createTimelineChart(container, data, options),
        createTenGodPie: (container, data, options) => 
            chartComponents.createTenGodPieChart(container, data, options),
        createPalaceStrength: (container, data, options) => 
            chartComponents.createPalaceStrengthChart(container, data, options),
        update: (chartId, data) => chartComponents.updateChart(chartId, data),
        destroy: (chartId) => chartComponents.destroyChart(chartId),
        getStats: () => chartComponents.getStats()
    };

    console.log('Chart Components initialized');
})();
