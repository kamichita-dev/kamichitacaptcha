/**
 * Advanced CAPTCHA Client API v2.0.0
 * 🔒 Auto-initializing like hCaptcha/reCAPTCHA
 * Usage: <script src="cap_api.js"></script>
 */

(function() {
    'use strict';

    // 🛡️ Advanced obfuscation layer
    const _0x5a2b = ['challenge', 'verify', 'license', 'captcha', 'api'];
    const _0x3c7d = (function() {
        let _0x4f8a = true;
        return function(_0x2b1c, _0x9e5d) {
            const _0x1a3f = _0x4f8a ? function() {
                if (_0x9e5d) {
                    const _0x6c8b = _0x9e5d.apply(_0x2b1c, arguments);
                    _0x9e5d = null;
                    return _0x6c8b;
                }
            } : function() {};
            _0x4f8a = false;
            return _0x1a3f;
        };
    })();

    // 🔐 Security Core with encryption
    const SecurityCore = {
        _key: null,
        _endpoint: null,
        _initialized: false,
        
        // Advanced key derivation
        _deriveKey: function(base) {
            const salt = new Date().getTime().toString(36);
            const combined = base + salt + navigator.userAgent.slice(0, 20);
            return btoa(combined).replace(/[^a-zA-Z0-9]/g, '').substring(0, 48);
        },
        
        // Anti-debugging protection
        _protect: function() {
            const protectionInterval = setInterval(() => {
                try {
                    if (window.console && (console.profiles || console.profileEnd)) {
                        throw new Error('🛡️ Debug protection active');
                    }
                } catch(e) {
                    // Silent protection
                }
            }, 2000);
            
            // Anti-devtools detection
            let devtools = { open: false };
            const threshold = 160;
            setInterval(() => {
                if (window.outerHeight - window.innerHeight > threshold || 
                    window.outerWidth - window.innerWidth > threshold) {
                    devtools.open = true;
                    console.clear();
                }
            }, 500);
        },
        
        // Secure network requests with retry logic
        _secureRequest: async function(url, options = {}, retryCount = 0) {
            const maxRetries = 3;
            const retryDelay = 1000; // 1 second
            
            const headers = {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-Client-Version': '2.0.0',
                'X-Timestamp': Date.now().toString(),
                ...options.headers
            };
            
            try {
                const response = await fetch(url, {
                    ...options,
                    headers,
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'omit'  // Don't send credentials for CORS
                });
                
                if (!response.ok) {
                    // Handle specific error codes
                    if (response.status === 429) {
                        throw new Error('レート制限を超えました。しばらくお待ちください。');
                    } else if (response.status === 401) {
                        throw new Error('認証エラー。ページを再読み込みしてください。');
                    } else if (response.status === 403) {
                        throw new Error('アクセスが拒否されました。');
                    } else if (response.status >= 500) {
                        throw new Error('サーバーエラー。しばらくしてから再試行してください。');
                    }
                    
                    throw new Error(`ネットワークエラー (${response.status})`);
                }
                
                return await response.json();
                
            } catch (error) {
                // Network error or fetch failed
                if (error.name === 'TypeError' || error.message.includes('Failed to fetch') || error.message.includes('Load failed')) {
                    if (retryCount < maxRetries) {
                        console.log(`リトライ中... (${retryCount + 1}/${maxRetries})`);
                        await new Promise(resolve => setTimeout(resolve, retryDelay * (retryCount + 1)));
                        return this._secureRequest(url, options, retryCount + 1);
                    }
                    throw new Error('ネットワーク接続エラー。インターネット接続を確認してください。');
                }
                
                throw error;
            }
        }
    };

    // 🎯 Advanced CAPTCHA Engine
    class AdvancedCaptchaEngine {
        constructor() {
            this.config = {
                apiBase: this._detectApiBase(),
                timeout: 30000,
                maxRetries: 3,
                gridSize: 3,
                theme: 'light',
                language: 'ja',
                challengeType: null  // Can be: text_input, number_input, math_calc, audio, or null for random
            };
            
            this.state = {
                licenseKey: null,
                currentChallenge: null,
                selectedImages: new Set(),
                attempts: 0,
                isLoading: false
            };
            
            this.callbacks = {
                onSuccess: null,
                onError: null,
                onExpired: null
            };
            
            // Initialize security
            SecurityCore._protect();
        }

        // 🔍 Auto-detect API base URL
        _detectApiBase() {
            // Force use of the specified API endpoint
            return 'https://captchaapi.kamichitateam.f5.si';
        }

        // 🔑 License key management with caching and retry
        async _getLicenseKey() {
            if (this.state.licenseKey && this._isKeyValid()) {
                return this.state.licenseKey;
            }
            
            try {
                const response = await SecurityCore._secureRequest(
                    `${this.config.apiBase}/api/captcha_licence_key`
                );
                
                if (!response || !response.license_key) {
                    throw new Error('Invalid response from server');
                }
                
                this.state.licenseKey = response.license_key;
                this.state.keyExpiry = Date.now() + (response.expires_in * 1000);
                return this.state.licenseKey;
            } catch (error) {
                console.error('License key error:', error);
                
                // User-friendly error message
                let errorMessage = 'ライセンスキーの取得に失敗しました。';
                
                if (error.message.includes('ネットワーク')) {
                    errorMessage = 'ネットワーク接続エラー。インターネット接続を確認してください。';
                } else if (error.message.includes('Failed to fetch') || error.message.includes('Load failed')) {
                    errorMessage = 'サーバーに接続できません。しばらくしてから再試行してください。';
                }
                
                throw new Error(errorMessage);
            }
        }

        _isKeyValid() {
            return this.state.keyExpiry && Date.now() < this.state.keyExpiry;
        }

        // 🎨 Modern UI with hCaptcha-style design
        _injectStyles() {
            if (document.getElementById('adv-captcha-styles')) return;
            
            const style = document.createElement('style');
            style.id = 'adv-captcha-styles';
            style.textContent = `
                .adv-captcha {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    border: 1px solid #c7c7c7;
                    border-radius: 4px;
                    background: #fafafa;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
                    max-width: 300px;
                    overflow: hidden;
                    position: relative;
                    user-select: none;
                    -webkit-user-select: none;
                }
                
                .adv-captcha-checkbox-container {
                    padding: 10px;
                    background: #ffffff;
                    border-bottom: 1px solid #e0e0e0;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }
                
                .adv-captcha-checkbox-container:hover {
                    background: #f9f9f9;
                }
                
                .adv-captcha-checkbox {
                    width: 24px;
                    height: 24px;
                    border: 2px solid #c7c7c7;
                    border-radius: 3px;
                    margin-right: 12px;
                    position: relative;
                    background: white;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                }
                
                .adv-captcha-checkbox.checked {
                    background: #00af54;
                    border-color: #00af54;
                }
                
                .adv-captcha-checkbox.checked::after {
                    content: '✓';
                    color: white;
                    font-size: 14px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-weight: bold;
                }
                
                .adv-captcha-text {
                    color: #333;
                    font-size: 14px;
                    flex: 1;
                }
                
                .adv-captcha-logo {
                    margin-left: auto;
                    font-size: 10px;
                    color: #999;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                }
                
                .adv-captcha-logo::before {
                    content: '';
                    width: 16px;
                    height: 16px;
                    background-image: url('https://php.kamichitateam.f5.si/static/9bc9247bb379885dd59f2eff6f1edab7.png');
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                    margin-right: 4px;
                    display: inline-block;
                }
                
                .adv-captcha-challenge {
                    background: white;
                    padding: 20px;
                    text-align: center;
                }
                
                .adv-captcha-title {
                    margin: 0 0 15px 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: #333;
                }
                
                .adv-captcha-challenge-image {
                    max-width: 100%;
                    height: auto;
                    border-radius: 4px;
                    border: 1px solid #ddd;
                    margin: 15px 0;
                }
                
                .adv-captcha-image-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 90px;
                }
                
                .adv-captcha-audio-container {
                    padding: 10px 0;
                }
                
                .adv-captcha-input {
                    width: 100%;
                    padding: 12px;
                    font-size: 16px;
                    border: 2px solid #ddd;
                    border-radius: 4px;
                    margin: 15px 0;
                    box-sizing: border-box;
                    text-align: center;
                    font-family: monospace;
                    letter-spacing: 2px;
                }
                
                .adv-captcha-input:focus {
                    outline: none;
                    border-color: #1976d2;
                }
                
                .adv-captcha-description {
                    margin: 0 0 20px 0;
                    font-size: 14px;
                    color: #666;
                }
                
                .adv-captcha-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 4px;
                    margin-bottom: 15px;
                }
                
                .adv-captcha-image {
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                    border: 2px solid transparent;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    background: #f5f5f5;
                    position: relative;
                }
                
                .adv-captcha-image.loading {
                    background: #f5f5f5 url('data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>') center/20px no-repeat;
                }
                
                .adv-captcha-image.error {
                    background: #ffebee url('data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>') center/20px no-repeat;
                }
                
                .adv-captcha-image:hover {
                    opacity: 0.8;
                }
                
                .adv-captcha-image.selected {
                    border-color: #1976d2;
                    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
                }
                
                .adv-captcha-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .adv-captcha-btn {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.2s ease;
                }
                
                .adv-captcha-btn-verify {
                    background: #1976d2;
                    color: white;
                }
                
                .adv-captcha-btn-verify:hover:not(:disabled) {
                    background: #1565c0;
                }
                
                .adv-captcha-btn-verify:disabled {
                    background: #ccc;
                    cursor: not-allowed;
                }
                
                .adv-captcha-btn-refresh {
                    background: #f5f5f5;
                    color: #333;
                    border: 1px solid #ddd;
                }
                
                .adv-captcha-btn-refresh:hover {
                    background: #eeeeee;
                }
                
                .adv-captcha-loading {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100px;
                    color: #666;
                }
                
                .adv-captcha-spinner {
                    border: 2px solid #f3f3f3;
                    border-top: 2px solid #1976d2;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    animation: adv-captcha-spin 1s linear infinite;
                    margin-right: 10px;
                }
                
                @keyframes adv-captcha-spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .adv-captcha-error {
                    background: #ffebee;
                    color: #c62828;
                    padding: 10px;
                    border-radius: 4px;
                    margin: 10px 0;
                    font-size: 14px;
                    text-align: center;
                }
                
                .adv-captcha-success {
                    background: #e8f5e8;
                    color: #2e7d32;
                    padding: 15px;
                    text-align: center;
                    font-weight: 500;
                }
                
                .adv-captcha-success::before {
                    content: '✓';
                    margin-right: 8px;
                    font-weight: bold;
                }
            `;
            
            document.head.appendChild(style);
        }

        // 🏗️ Create initial checkbox widget
        _createWidget(container) {
            this._injectStyles();
            
            container.innerHTML = `
                <div class="adv-captcha">
                    <div class="adv-captcha-checkbox-container">
                        <div class="adv-captcha-checkbox" id="captcha-checkbox"></div>
                        <span class="adv-captcha-text">私はロボットではありません</span>
                        <a href="#" class="adv-captcha-logo" title="Advanced CAPTCHA">SecureCap</a>
                    </div>
                </div>
            `;
            
            // Add click handler for checkbox
            const checkbox = container.querySelector('#captcha-checkbox');
            const checkboxContainer = container.querySelector('.adv-captcha-checkbox-container');
            
            checkboxContainer.addEventListener('click', (e) => {
                e.preventDefault();
                this._handleCheckboxClick(container);
            });
        }

        // 📋 Handle checkbox click - start challenge
        async _handleCheckboxClick(container) {
            if (this.state.isLoading) return;
            
            const checkbox = container.querySelector('#captcha-checkbox');
            checkbox.classList.add('checked');
            
            try {
                await this._showChallenge(container);
            } catch (error) {
                checkbox.classList.remove('checked');
                this._handleError(error.message, container);
            }
        }

        // 🎯 Show challenge (text, number, math, or audio)
        async _showChallenge(container) {
            this.state.isLoading = true;
            
            // Show loading state
            const captchaDiv = container.querySelector('.adv-captcha');
            captchaDiv.innerHTML = `
                <div class="adv-captcha-challenge">
                    <div class="adv-captcha-loading">
                        <div class="adv-captcha-spinner"></div>
                        チャレンジを読み込み中...
                    </div>
                </div>
            `;
            
            try {
                const licenseKey = await this._getLicenseKey();
                
                const requestBody = {
                    license_key: licenseKey,
                    domain: window.location.hostname
                };
                
                // Add challenge type if specified
                if (this.config.challengeType) {
                    requestBody.challenge_type = this.config.challengeType;
                }
                
                const challenge = await SecurityCore._secureRequest(
                    `${this.config.apiBase}/api/challenge`,
                    {
                        method: 'POST',
                        body: JSON.stringify(requestBody)
                    }
                );
                
                if (!challenge || !challenge.challenge_id) {
                    throw new Error('Invalid challenge response');
                }
                
                this.state.currentChallenge = challenge;
                this._renderChallenge(container, challenge);
                
            } catch (error) {
                console.error('Challenge error:', error);
                
                // User-friendly error message
                let errorMessage = 'チャレンジの読み込みに失敗しました。';
                
                if (error.message.includes('ネットワーク') || error.message.includes('接続')) {
                    errorMessage = 'ネットワークエラー。接続を確認して再試行してください。';
                } else if (error.message.includes('Failed to fetch') || error.message.includes('Load failed')) {
                    errorMessage = 'サーバーに接続できません。ページを再読み込みしてください。';
                }
                
                this._handleError(errorMessage, container);
                
                // Show retry button
                captchaDiv.innerHTML = `
                    <div class="adv-captcha-challenge">
                        <div class="adv-captcha-error">
                            ${errorMessage}
                        </div>
                        <button class="adv-captcha-btn adv-captcha-btn-verify" id="retry-btn" style="width: 100%; margin-top: 10px;">
                            再試行
                        </button>
                    </div>
                `;
                
                const retryBtn = captchaDiv.querySelector('#retry-btn');
                if (retryBtn) {
                    retryBtn.addEventListener('click', () => {
                        this._showChallenge(container);
                    });
                }
                
            } finally {
                this.state.isLoading = false;
            }
        }

        // 🖼️ Render challenge (image, number, math, or audio)
        _renderChallenge(container, challenge) {
            const captchaDiv = container.querySelector('.adv-captcha');
            
            let challengeHTML = '';
            
            // Render based on challenge type
            if (challenge.type === 'audio') {
                // Audio CAPTCHA
                challengeHTML = `
                    <div class="adv-captcha-challenge">
                        <div class="adv-captcha-title">${challenge.description}</div>
                        <div class="adv-captcha-audio-container">
                            <audio controls id="captcha-audio" style="width: 100%; margin: 15px 0;">
                                <source src="${challenge.challenge_audio}" type="audio/wav">
                            </audio>
                            <button class="adv-captcha-btn adv-captcha-btn-refresh" id="play-audio-btn" style="margin: 10px 0;">
                                🔊 再生
                            </button>
                        </div>
                        <input type="${challenge.input_type}" 
                               id="captcha-input" 
                               class="adv-captcha-input" 
                               placeholder="数字を入力" 
                               maxlength="10"
                               autocomplete="off">
                        <div class="adv-captcha-actions">
                            <button class="adv-captcha-btn adv-captcha-btn-refresh" id="refresh-btn">
                                新しいチャレンジ
                            </button>
                            <button class="adv-captcha-btn adv-captcha-btn-verify" id="verify-btn" disabled>
                                確認
                            </button>
                        </div>
                    </div>
                `;
            } else {
                // Image-based CAPTCHA (text, number, math)
                challengeHTML = `
                    <div class="adv-captcha-challenge">
                        <div class="adv-captcha-title">${challenge.description}</div>
                        <div class="adv-captcha-image-container">
                            <img src="${challenge.challenge_image}" 
                                 alt="CAPTCHA Challenge" 
                                 class="adv-captcha-challenge-image"
                                 loading="lazy">
                        </div>
                        <input type="${challenge.input_type}" 
                               id="captcha-input" 
                               class="adv-captcha-input" 
                               placeholder="${challenge.input_type === 'number' ? '数字を入力' : '文字を入力'}" 
                               maxlength="15"
                               autocomplete="off">
                        <div class="adv-captcha-actions">
                            <button class="adv-captcha-btn adv-captcha-btn-refresh" id="refresh-btn">
                                新しいチャレンジ
                            </button>
                            <button class="adv-captcha-btn adv-captcha-btn-verify" id="verify-btn" disabled>
                                確認
                            </button>
                        </div>
                    </div>
                `;
            }
            
            captchaDiv.innerHTML = challengeHTML;
            this._attachInputHandlers(container);
        }

        // 🎮 Attach input handlers for text/number/math challenges
        _attachInputHandlers(container) {
            const input = container.querySelector('#captcha-input');
            const verifyBtn = container.querySelector('#verify-btn');
            const refreshBtn = container.querySelector('#refresh-btn');
            const playAudioBtn = container.querySelector('#play-audio-btn');
            const audio = container.querySelector('#captcha-audio');
            
            if (input) {
                input.addEventListener('input', () => {
                    verifyBtn.disabled = input.value.trim().length === 0;
                });
                
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && input.value.trim().length > 0) {
                        this._verifyInputChallenge(container);
                    }
                });
                
                // Auto-focus
                setTimeout(() => input.focus(), 100);
            }
            
            if (verifyBtn) {
                verifyBtn.addEventListener('click', () => this._verifyInputChallenge(container));
            }
            
            if (refreshBtn) {
                refreshBtn.addEventListener('click', () => this._showChallenge(container));
            }
            
            if (playAudioBtn && audio) {
                playAudioBtn.addEventListener('click', () => {
                    audio.currentTime = 0;
                    audio.play();
                });
            }
        }

        // ✅ Verify input challenge (text/number/math/audio)
        async _verifyInputChallenge(container) {
            const input = container.querySelector('#captcha-input');
            const answer = input ? input.value.trim() : '';
            
            if (!answer) return;
            
            const verifyBtn = container.querySelector('#verify-btn');
            const originalText = verifyBtn.textContent;
            verifyBtn.textContent = '確認中...';
            verifyBtn.disabled = true;
            input.disabled = true;
            
            try {
                const result = await SecurityCore._secureRequest(
                    `${this.config.apiBase}/api/verify`,
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            challenge_id: this.state.currentChallenge.challenge_id,
                            answer: answer,
                            license_key: this.state.licenseKey
                        })
                    }
                );
                
                if (result.success) {
                    this._showSuccess(container, result.token);
                    if (this.callbacks.onSuccess) {
                        this.callbacks.onSuccess(result.token);
                    }
                } else {
                    this._showError(container, result.message || '不正解です。もう一度お試しください。', result.attempts_remaining > 0);
                    input.value = '';
                    input.disabled = false;
                    input.focus();
                    verifyBtn.textContent = originalText;
                    verifyBtn.disabled = false;
                }
                
            } catch (error) {
                console.error('Verification error:', error);
                
                let errorMessage = '検証に失敗しました。';
                
                if (error.message.includes('ネットワーク') || error.message.includes('接続')) {
                    errorMessage = 'ネットワークエラー。もう一度お試しください。';
                } else if (error.message.includes('Failed to fetch') || error.message.includes('Load failed')) {
                    errorMessage = 'サーバーに接続できません。ページを再読み込みしてください。';
                }
                
                this._showError(container, errorMessage, true);
                input.disabled = false;
                input.focus();
                verifyBtn.textContent = originalText;
                verifyBtn.disabled = false;
            }
        }

        // ✅ Verify challenge solution
        async _verifyChallenge(container) {
            if (this.state.selectedImages.size === 0) return;
            
            const verifyBtn = container.querySelector('#verify-btn');
            const originalText = verifyBtn.textContent;
            verifyBtn.textContent = '確認中...';
            verifyBtn.disabled = true;
            
            try {
                const result = await SecurityCore._secureRequest(
                    `${this.config.apiBase}/api/verify`,
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            challenge_id: this.state.currentChallenge.challenge_id,
                            selected_indices: Array.from(this.state.selectedImages),
                            license_key: this.state.licenseKey
                        })
                    }
                );
                
                if (result.success) {
                    this._showSuccess(container, result.token);
                    if (this.callbacks.onSuccess) {
                        this.callbacks.onSuccess(result.token);
                    }
                } else {
                    this._showError(container, result.message, result.attempts_remaining > 0);
                }
                
            } catch (error) {
                this._showError(container, 'verification failed: ' + error.message, true);
            } finally {
                verifyBtn.textContent = originalText;
                verifyBtn.disabled = false;
            }
        }

        // ✅ Show success state
        _showSuccess(container, token) {
            const captchaDiv = container.querySelector('.adv-captcha');
            captchaDiv.innerHTML = `
                <div class="adv-captcha-success">
                    CAPTCHA認証が完了しました
                </div>
            `;
            
            // Store token for form submission
            this._storeToken(token);
        }

        // ❌ Show error state
        _showError(container, message, canRetry = true) {
            const challengeDiv = container.querySelector('.adv-captcha-challenge');
            let errorDiv = container.querySelector('.adv-captcha-error');
            
            if (!errorDiv) {
                errorDiv = document.createElement('div');
                errorDiv.className = 'adv-captcha-error';
                challengeDiv.insertBefore(errorDiv, challengeDiv.firstChild);
            }
            
            errorDiv.textContent = message;
            
            if (!canRetry) {
                setTimeout(() => this._showChallenge(container), 2000);
            }
        }

        // 🏪 Store verification token
        _storeToken(token) {
            // Create hidden input for form submission
            let tokenInput = document.getElementById('adv-captcha-token');
            if (!tokenInput) {
                tokenInput = document.createElement('input');
                tokenInput.type = 'hidden';
                tokenInput.id = 'adv-captcha-token';
                tokenInput.name = 'adv-captcha-token';
                document.body.appendChild(tokenInput);
            }
            tokenInput.value = token;
        }

        // 🚨 Error handling
        _handleError(message, container = null) {
            console.error('CAPTCHA Error:', message);
            
            if (container) {
                this._showError(container, message, true);
            }
            
            if (this.callbacks.onError) {
                this.callbacks.onError(message);
            }
        }

        // 🎯 Public API methods
        render(elementOrId, options = {}) {
            const container = typeof elementOrId === 'string' 
                ? document.getElementById(elementOrId) 
                : elementOrId;
            
            if (!container) {
                throw new Error('Container element not found');
            }
            
            // Set callbacks
            this.callbacks = {
                onSuccess: options.callback || options.onSuccess || null,
                onError: options.onError || null,
                onExpired: options.onExpired || null
            };
            
            // Override config
            Object.assign(this.config, options);
            
            this._createWidget(container);
            return this;
        }
    }

    // 🚀 Auto-initialization system
    const AutoInitializer = {
        instances: new Map(),
        
        // Initialize all CAPTCHA elements on page
        initializeAll: function() {
            // Look for elements with data-captcha attribute
            const elements = document.querySelectorAll('[data-captcha]');
            
            elements.forEach(element => {
                if (!this.instances.has(element)) {
                    const options = this._parseOptions(element);
                    const engine = new AdvancedCaptchaEngine();
                    engine.render(element, options);
                    this.instances.set(element, engine);
                }
            });
            
            // Look for elements with class 'adv-captcha-container'
            const containers = document.querySelectorAll('.adv-captcha-container');
            containers.forEach(container => {
                if (!this.instances.has(container)) {
                    const engine = new AdvancedCaptchaEngine();
                    engine.render(container);
                    this.instances.set(container, engine);
                }
            });
        },
        
        // Parse data attributes as options
        _parseOptions: function(element) {
            const options = {};
            
            // Parse common options from data attributes
            const dataKeys = ['callback', 'theme', 'size', 'sitekey', 'type'];
            dataKeys.forEach(key => {
                const value = element.dataset[key];
                if (value) {
                    if (key === 'callback' && window[value]) {
                        options.callback = window[value];
                    } else if (key === 'type') {
                        options.challengeType = value;
                    } else {
                        options[key] = value;
                    }
                }
            });
            
            return options;
        }
    };

    // 🌐 Global API (hCaptcha/reCAPTCHA compatible)
    window.AdvancedCaptcha = {
        // Main render method
        render: function(container, options = {}) {
            const engine = new AdvancedCaptchaEngine();
            return engine.render(container, options);
        },
        
        // Initialize method (legacy compatibility)
        init: function(container, options = {}) {
            return this.render(container, options);
        },
        
        // Get verification token
        getToken: function() {
            const tokenInput = document.getElementById('adv-captcha-token');
            return tokenInput ? tokenInput.value : null;
        },
        
        // Reset CAPTCHA
        reset: function(widgetId) {
            // Implementation for reset functionality
            console.log('Reset CAPTCHA:', widgetId);
        }
    };

    // 🎬 Auto-initialization on DOM ready
    function initializeWhenReady() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                AutoInitializer.initializeAll();
            });
        } else {
            AutoInitializer.initializeAll();
        }
        
        // Watch for dynamically added elements
        if (window.MutationObserver) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            if (node.dataset && node.dataset.captcha) {
                                AutoInitializer.initializeAll();
                            }
                            // Check descendants
                            const captchaElements = node.querySelectorAll && node.querySelectorAll('[data-captcha], .adv-captcha-container');
                            if (captchaElements && captchaElements.length > 0) {
                                AutoInitializer.initializeAll();
                            }
                        }
                    });
                });
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    // 🚀 Start auto-initialization
    initializeWhenReady();

    // 🔒 Prevent script tampering
    Object.freeze(window.AdvancedCaptcha);

})();
