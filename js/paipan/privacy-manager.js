// 隐私和数据保护管理器
(function() {
    'use strict';

    class PrivacyManager {
        constructor() {
            this.encryptionKey = null;
            this.sensitiveDataTypes = ['birthDate', 'personalInfo', 'location'];
            this.dataRetentionPeriod = 7 * 24 * 60 * 60 * 1000; // 7天
            this.init();
        }

        async init() {
            // 生成或恢复加密密钥
            await this.initializeEncryption();
            
            // 检查数据保留期限
            this.cleanExpiredData();
            
            // 设置定期清理
            setInterval(() => {
                this.cleanExpiredData();
            }, 24 * 60 * 60 * 1000); // 每天检查一次

            // 创建隐私设置界面
            this.createPrivacySettings();
        }

        async initializeEncryption() {
            try {
                // 检查Web Crypto API支持
                if (!window.crypto || !window.crypto.subtle) {
                    console.warn('Web Crypto API not supported, using fallback encryption');
                    this.encryptionKey = this.generateFallbackKey();
                    return;
                }

                // 尝试从localStorage恢复密钥
                const storedKey = localStorage.getItem('privacy_key');
                if (storedKey) {
                    this.encryptionKey = await this.importKey(storedKey);
                } else {
                    // 生成新密钥
                    this.encryptionKey = await this.generateKey();
                    const exportedKey = await this.exportKey(this.encryptionKey);
                    localStorage.setItem('privacy_key', exportedKey);
                }
            } catch (error) {
                console.error('Encryption initialization failed:', error);
                this.encryptionKey = this.generateFallbackKey();
            }
        }

        async generateKey() {
            return await window.crypto.subtle.generateKey(
                {
                    name: 'AES-GCM',
                    length: 256
                },
                true,
                ['encrypt', 'decrypt']
            );
        }

        async exportKey(key) {
            const exported = await window.crypto.subtle.exportKey('raw', key);
            return Array.from(new Uint8Array(exported))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        }

        async importKey(keyString) {
            const keyData = new Uint8Array(
                keyString.match(/.{2}/g).map(byte => parseInt(byte, 16))
            );
            
            return await window.crypto.subtle.importKey(
                'raw',
                keyData,
                { name: 'AES-GCM' },
                true,
                ['encrypt', 'decrypt']
            );
        }

        generateFallbackKey() {
            // 简单的回退加密密钥
            return Array.from({ length: 32 }, () => 
                Math.floor(Math.random() * 256)
            );
        }

        // 加密敏感数据
        async encryptData(data, dataType = 'general') {
            try {
                const dataString = JSON.stringify(data);
                
                if (window.crypto && window.crypto.subtle && this.encryptionKey.constructor.name !== 'Array') {
                    // 使用Web Crypto API
                    const iv = window.crypto.getRandomValues(new Uint8Array(12));
                    const encodedData = new TextEncoder().encode(dataString);
                    
                    const encrypted = await window.crypto.subtle.encrypt(
                        { name: 'AES-GCM', iv },
                        this.encryptionKey,
                        encodedData
                    );
                    
                    return {
                        data: Array.from(new Uint8Array(encrypted)),
                        iv: Array.from(iv),
                        type: dataType,
                        timestamp: Date.now(),
                        method: 'webcrypto'
                    };
                } else {
                    // 使用回退加密
                    return {
                        data: this.fallbackEncrypt(dataString),
                        type: dataType,
                        timestamp: Date.now(),
                        method: 'fallback'
                    };
                }
            } catch (error) {
                console.error('Encryption failed:', error);
                return null;
            }
        }

        // 解密敏感数据
        async decryptData(encryptedData) {
            try {
                if (encryptedData.method === 'webcrypto' && window.crypto && window.crypto.subtle) {
                    const iv = new Uint8Array(encryptedData.iv);
                    const data = new Uint8Array(encryptedData.data);
                    
                    const decrypted = await window.crypto.subtle.decrypt(
                        { name: 'AES-GCM', iv },
                        this.encryptionKey,
                        data
                    );
                    
                    const decryptedString = new TextDecoder().decode(decrypted);
                    return JSON.parse(decryptedString);
                } else {
                    // 使用回退解密
                    const decryptedString = this.fallbackDecrypt(encryptedData.data);
                    return JSON.parse(decryptedString);
                }
            } catch (error) {
                console.error('Decryption failed:', error);
                return null;
            }
        }

        // 简单的回退加密算法
        fallbackEncrypt(text) {
            const key = this.encryptionKey;
            const encrypted = [];
            
            for (let i = 0; i < text.length; i++) {
                const charCode = text.charCodeAt(i);
                const keyCode = key[i % key.length];
                encrypted.push(charCode ^ keyCode);
            }
            
            return encrypted;
        }

        fallbackDecrypt(encrypted) {
            const key = this.encryptionKey;
            let decrypted = '';
            
            for (let i = 0; i < encrypted.length; i++) {
                const charCode = encrypted[i];
                const keyCode = key[i % key.length];
                decrypted += String.fromCharCode(charCode ^ keyCode);
            }
            
            return decrypted;
        }

        // 安全存储敏感数据
        async storeSecureData(key, data, dataType = 'general') {
            const encrypted = await this.encryptData(data, dataType);
            if (encrypted) {
                const storageKey = `secure_${key}`;
                localStorage.setItem(storageKey, JSON.stringify(encrypted));
                return true;
            }
            return false;
        }

        // 安全读取敏感数据
        async retrieveSecureData(key) {
            const storageKey = `secure_${key}`;
            const stored = localStorage.getItem(storageKey);
            
            if (!stored) return null;
            
            try {
                const encryptedData = JSON.parse(stored);
                return await this.decryptData(encryptedData);
            } catch (error) {
                console.error('Failed to retrieve secure data:', error);
                return null;
            }
        }

        // 删除敏感数据
        deleteSecureData(key) {
            const storageKey = `secure_${key}`;
            localStorage.removeItem(storageKey);
        }

        // 清理过期数据
        cleanExpiredData() {
            const now = Date.now();
            const keysToRemove = [];
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('secure_')) {
                    try {
                        const data = JSON.parse(localStorage.getItem(key));
                        if (data.timestamp && (now - data.timestamp) > this.dataRetentionPeriod) {
                            keysToRemove.push(key);
                        }
                    } catch (error) {
                        // 如果数据损坏，也删除
                        keysToRemove.push(key);
                    }
                }
            }
            
            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
                console.log(`Expired data removed: ${key}`);
            });
            
            if (keysToRemove.length > 0) {
                console.log(`Cleaned ${keysToRemove.length} expired data entries`);
            }
        }

        // 创建隐私设置界面
        createPrivacySettings() {
            // 检查是否已存在
            if (document.querySelector('.privacy-settings')) return;

            const settings = document.createElement('div');
            settings.className = 'privacy-settings';
            settings.innerHTML = `
                <div class="privacy-panel">
                    <h3>隐私设置</h3>
                    <div class="privacy-options">
                        <label class="privacy-option">
                            <input type="checkbox" id="autoCleanData" checked>
                            <span>自动清理过期数据</span>
                        </label>
                        <label class="privacy-option">
                            <input type="checkbox" id="encryptStorage" checked>
                            <span>加密本地存储</span>
                        </label>
                        <label class="privacy-option">
                            <input type="number" id="retentionDays" value="7" min="1" max="30">
                            <span>数据保留天数</span>
                        </label>
                    </div>
                    <div class="privacy-actions">
                        <button id="clearAllData" class="btn-danger">清除所有数据</button>
                        <button id="exportData" class="btn-secondary">导出数据</button>
                    </div>
                </div>
            `;

            this.addPrivacyStyles();
            this.bindPrivacyEvents(settings);
            
            // 默认隐藏，通过快捷键显示
            settings.style.display = 'none';
            document.body.appendChild(settings);

            // 添加快捷键 Ctrl+Shift+P
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.shiftKey && e.key === 'P') {
                    e.preventDefault();
                    this.togglePrivacySettings();
                }
            });
        }

        addPrivacyStyles() {
            if (document.querySelector('#privacy-styles')) return;

            const style = document.createElement('style');
            style.id = 'privacy-styles';
            style.textContent = `
                .privacy-settings {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 10000;
                    background: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    padding: 0;
                    min-width: 300px;
                }

                .privacy-panel {
                    padding: 20px;
                }

                .privacy-panel h3 {
                    margin: 0 0 20px 0;
                    color: #1f2937;
                    font-size: 18px;
                }

                .privacy-options {
                    margin-bottom: 20px;
                }

                .privacy-option {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 10px;
                    cursor: pointer;
                }

                .privacy-option input[type="checkbox"],
                .privacy-option input[type="number"] {
                    margin: 0;
                }

                .privacy-option input[type="number"] {
                    width: 60px;
                    padding: 4px 8px;
                    border: 1px solid #d1d5db;
                    border-radius: 4px;
                }

                .privacy-actions {
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                }

                .privacy-actions button {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                }

                .btn-danger {
                    background: #ef4444;
                    color: white;
                }

                .btn-secondary {
                    background: #6b7280;
                    color: white;
                }

                .privacy-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 9999;
                }
            `;
            document.head.appendChild(style);
        }

        bindPrivacyEvents(settings) {
            const clearAllBtn = settings.querySelector('#clearAllData');
            const exportBtn = settings.querySelector('#exportData');
            const retentionInput = settings.querySelector('#retentionDays');

            clearAllBtn.addEventListener('click', () => {
                if (confirm('确定要清除所有本地数据吗？此操作不可恢复。')) {
                    this.clearAllData();
                    this.hidePrivacySettings();
                }
            });

            exportBtn.addEventListener('click', () => {
                this.exportUserData();
            });

            retentionInput.addEventListener('change', (e) => {
                const days = parseInt(e.target.value);
                if (days >= 1 && days <= 30) {
                    this.dataRetentionPeriod = days * 24 * 60 * 60 * 1000;
                    localStorage.setItem('privacy_retention_days', days.toString());
                }
            });
        }

        togglePrivacySettings() {
            const settings = document.querySelector('.privacy-settings');
            if (settings.style.display === 'none') {
                this.showPrivacySettings();
            } else {
                this.hidePrivacySettings();
            }
        }

        showPrivacySettings() {
            const settings = document.querySelector('.privacy-settings');
            const overlay = document.createElement('div');
            overlay.className = 'privacy-overlay';
            overlay.addEventListener('click', () => this.hidePrivacySettings());
            
            document.body.appendChild(overlay);
            settings.style.display = 'block';
        }

        hidePrivacySettings() {
            const settings = document.querySelector('.privacy-settings');
            const overlay = document.querySelector('.privacy-overlay');
            
            settings.style.display = 'none';
            if (overlay) overlay.remove();
        }

        clearAllData() {
            // 清除所有本地存储数据
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && (key.startsWith('secure_') || key.startsWith('paipan_'))) {
                    keysToRemove.push(key);
                }
            }
            
            keysToRemove.forEach(key => localStorage.removeItem(key));
            
            // 清除缓存
            if (window.CacheManager) {
                window.CacheManager.clear();
            }
            
            console.log(`Cleared ${keysToRemove.length} data entries`);
            alert('所有数据已清除');
        }

        exportUserData() {
            const userData = {};
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('paipan_')) {
                    userData[key] = localStorage.getItem(key);
                }
            }
            
            const dataBlob = new Blob([JSON.stringify(userData, null, 2)], {
                type: 'application/json'
            });
            
            const url = URL.createObjectURL(dataBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `paipan_data_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            
            URL.revokeObjectURL(url);
        }

        // 获取隐私统计
        getPrivacyStats() {
            let secureDataCount = 0;
            let totalDataSize = 0;
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('secure_')) {
                    secureDataCount++;
                    totalDataSize += localStorage.getItem(key).length;
                }
            }
            
            return {
                secureDataCount,
                totalDataSize,
                encryptionEnabled: !!this.encryptionKey,
                retentionPeriod: this.dataRetentionPeriod / (24 * 60 * 60 * 1000)
            };
        }
    }

    // 创建全局实例
    const privacyManager = new PrivacyManager();

    // 导出到全局作用域
    window.PrivacyManager = {
        storeSecure: (key, data, type) => privacyManager.storeSecureData(key, data, type),
        retrieveSecure: (key) => privacyManager.retrieveSecureData(key),
        deleteSecure: (key) => privacyManager.deleteSecureData(key),
        clearAll: () => privacyManager.clearAllData(),
        getStats: () => privacyManager.getPrivacyStats(),
        showSettings: () => privacyManager.showPrivacySettings()
    };

    console.log('Privacy Manager initialized (Ctrl+Shift+P to open settings)');
})();
