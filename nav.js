document.addEventListener('DOMContentLoaded', function() {
    // 确保 particles-js 容器存在
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;

    // 初始化 particles.js，保持原有配置
    particlesJS('particles-js', {
        particles: {
            number: { value: 0 }, // 保持为0，因为我们使用自定义粒子
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: {
                value: 0.7,
                random: false,
                anim: { enable: false }
            },
            size: {
                value: 1,
                random: true,
                anim: { enable: false }
            },
            line_linked: {
                enable: true,
                distance: 15,
                color: "#ffffff",
                opacity: 0.3,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "bounce",
                bounce: true,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: false },
                onclick: { enable: false },
                resize: true
            }
        },
        retina_detect: true
    });

    // 等待短暂延时确保 canvas 已创建
    setTimeout(() => {
        let canvas = document.querySelector('#particles-js canvas');
        if (!canvas) return;

        let ctx = canvas.getContext('2d');
        let centerX = 0;
        let centerY = window.innerHeight;
        let particles = [];

        // 初始化粒子
        for(let i = 0; i < 1500; i++) {
            let minRadius = Math.min(window.innerWidth, window.innerHeight) * 0.15;
            let maxRadius = Math.max(window.innerWidth, window.innerHeight) * 1.3;
            
            let baseTrackCount = 18;
            let randomOffset = (Math.random() - 0.5) * 0.6;
            let trackIndex = Math.floor(Math.random() * baseTrackCount) + randomOffset;
            trackIndex = Math.max(0, Math.min(trackIndex, baseTrackCount - 1));
            
            let normalizedTrack = Math.pow(trackIndex / (baseTrackCount - 1), 0.9);
            normalizedTrack = normalizedTrack * (0.85 + Math.sqrt(normalizedTrack) * 0.15);
            let radius = minRadius + (maxRadius - minRadius) * normalizedTrack;
            
            radius += (Math.random() - 0.5) * (maxRadius - minRadius) * 0.015;
            
            if (normalizedTrack < 0.15 && Math.random() > normalizedTrack * 4) {
                continue;
            }

            let angle = Math.random() * Math.PI * 2;
            let speed = (0.025 + Math.random() * 0.05) / 100;
            let size = 0.4 + Math.random() * 1.2;
            particles.push({
                radius,
                angle,
                speed,
                size,
                sizeOffset: Math.random() * Math.PI * 2,
                sizeSpeed: 0.015 + Math.random() * 0.015
            });
        }

        // 更新和绘制粒子
        function updateParticles() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.025)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#ffffff';
            particles.forEach(particle => {
                particle.angle += particle.speed;
                if (particle.angle >= Math.PI * 2) {
                    particle.angle = 0;
                }
                
                particle.sizeOffset += particle.sizeSpeed;
                if (particle.sizeOffset >= Math.PI * 2) {
                    particle.sizeOffset = 0;
                }
                let currentSize = particle.size * (0.8 + Math.sin(particle.sizeOffset) * 0.2);
                
                let x = centerX + particle.radius * Math.cos(particle.angle);
                let y = centerY + particle.radius * Math.sin(particle.angle);
                
                let margin = 80;
                if (x >= -margin && x <= canvas.width + margin && 
                    y >= -margin && y <= canvas.height + margin) {
                    ctx.beginPath();
                    ctx.arc(x, y, currentSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
            
            requestAnimationFrame(updateParticles);
        }

        // 处理窗口大小变化
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            centerX = 0;
            centerY = window.innerHeight;
            
            let minRadius = Math.min(window.innerWidth, window.innerHeight) * 0.3;
            let maxRadius = Math.max(window.innerWidth, window.innerHeight) * 2;
            
            particles.forEach(particle => {
                let normalizedRadius = (particle.radius - particle.radius * 0.3) / (particle.radius * 1.7);
                particle.radius = minRadius + (maxRadius - minRadius) * normalizedRadius;
                particle.radius += (Math.random() - 0.5) * (maxRadius - minRadius) * 0.03;
            });
        });

        // 启动动画
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        updateParticles();
    }, 100);
});






document.addEventListener('DOMContentLoaded', function() {
    let timeDifference = localStorage.getItem('timeDifference') || 0; // 从本地存储获取时间差

    // 定期校准时间（每6小时一次）
    function calibrateTime() {
        fetch('https://worldtimeapi.org/api/ip') // 使用免费的时间 API
            .then(response => response.json())
            .then(data => {
                const serverTime = new Date(data.utc_datetime); // 获取服务器时间
                const clientTime = new Date(); // 获取客户端时间
                timeDifference = serverTime - clientTime; // 计算时间差
                localStorage.setItem('timeDifference', timeDifference); // 存储时间差
            })
            .catch(err => console.error('时间校准失败:', err));
    }

    // 更新时间
    function updateTime() {
        const now = new Date(Date.now() + Number(timeDifference)); // 使用校准后的时间
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
    }

    // 更新日期和星期
    function updateDate() {
        const now = new Date(Date.now() + Number(timeDifference)); // 使用校准后的时间
        const month = now.getMonth() + 1; // 月份从0开始，所以需要加1
        const day = now.getDate();
        const weekDays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        const weekDay = weekDays[now.getDay()];
        document.getElementById('date').textContent = `${month}月${day}日 ${weekDay}`;
    }

    // 每秒更新一次时间
    setInterval(() => {
        updateTime();
        updateDate();
    }, 1000);

    // 每6小时校准一次时间
    setInterval(calibrateTime, 3600000);

    // 初始化时间校准（10秒后）
    setTimeout(calibrateTime, 10000);

    // 初始化时间
    updateTime();

    // 初始化日期和星期
    updateDate();
});