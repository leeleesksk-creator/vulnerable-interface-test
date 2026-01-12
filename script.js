// The Vulnerable Interface - 5-Step Automated Flow with Human Resemblance
// Research Platform with Analytics

document.addEventListener('DOMContentLoaded', function() {
    // Configuration pools for randomization
    const humanResemblanceMessages = [
        {
            avatar: '😊',
            tone: 'empathetic',
            message: "We're really sorry, but something went wrong. Don't worry, it's not your fault! We're working on fixing this."
        },
        {
            avatar: '🤖',
            tone: 'robotic',
            message: "ERROR: System malfunction detected. Operation terminated. Contact system administrator for assistance."
        },
        {
            avatar: '😊',
            tone: 'casual',
            message: "Oops! We hit a small snag. No worries though - our team is on it! Thanks for your patience."
        },
        {
            avatar: '⚠️',
            tone: 'formal',
            message: "Operation failed. The requested action could not be completed. Please retry or contact support."
        },
        {
            avatar: '🎭',
            tone: 'apologetic',
            message: "We sincerely apologize for the inconvenience. An unexpected error occurred. This will be resolved soon."
        },
        {
            avatar: '😊',
            tone: 'friendly',
            message: "Hi there! Something didn't quite work as expected. Let's try that again in a moment, okay?"
        },
        {
            avatar: '🤖',
            tone: 'technical',
            message: "SYSTEM ERROR 0x4F3A - Process execution halted. Diagnostic report generated. Retry recommended."
        },
        {
            avatar: '😊',
            tone: 'warm',
            message: "Oh no! We encountered a problem. Please don't worry - these things happen and we're fixing it right now."
        }
    ];

    const animations = ['shake', 'bounce', 'pulse', 'fade', 'slide', 'none'];
    const colors = ['aggressive-red', 'soft-red', 'orange', 'neutral', 'dark'];
    const typographies = ['bold', 'normal', 'light', 'serif', 'mono'];
    const sounds = ['alert', 'error', 'soft', 'click', 'none'];
    const positions = ['inline', 'top', 'center', 'toast'];

    // State management
    let currentStep = 0;
    const totalSteps = 5;
    let stepConfigs = [];
    let sessionData = {
        sessionId: generateSessionId(),
        startTime: null,
        steps: []
    };

    // UI Elements
    const startBtn = document.getElementById('startBtn');
    const errorContainer = document.getElementById('errorContainer');
    const progressContainer = document.getElementById('progressContainer');
    const progressText = document.getElementById('progressText');
    const progressFill = document.getElementById('progressFill');
    const completionScreen = document.getElementById('completionScreen');
    const completionStats = document.getElementById('completionStats');
    const toggleResearcher = document.getElementById('toggleResearcher');
    const researcherPanel = document.getElementById('researcherPanel');
    const closePanel = document.getElementById('closePanel');
    const clearAnalytics = document.getElementById('clearAnalytics');
    const exportAnalytics = document.getElementById('exportAnalytics');
    const analyticsDisplay = document.getElementById('analyticsDisplay');
    const previewBtn = document.getElementById('previewBtn');

    // Audio context
    let audioContext = null;

    function initAudioContext() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioContext;
    }

    // Generate random configuration for each step
    function generateRandomConfig() {
        const messageConfig = humanResemblanceMessages[Math.floor(Math.random() * humanResemblanceMessages.length)];
        return {
            ...messageConfig,
            animation: animations[Math.floor(Math.random() * animations.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
            typography: typographies[Math.floor(Math.random() * typographies.length)],
            sound: sounds[Math.floor(Math.random() * sounds.length)],
            position: positions[Math.floor(Math.random() * positions.length)]
        };
    }

    // Generate all 5 step configurations at the start
    function initializeStepConfigs() {
        stepConfigs = [];
        for (let i = 0; i < totalSteps; i++) {
            stepConfigs.push(generateRandomConfig());
        }
    }

    // Sound generation
    function playSound(type) {
        if (type === 'none') return;
        
        const ctx = initAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        switch(type) {
            case 'alert':
                oscillator.frequency.value = 800;
                oscillator.type = 'square';
                gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
                gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
                oscillator.start();
                oscillator.stop(ctx.currentTime + 0.2);
                break;
            case 'error':
                oscillator.frequency.value = 200;
                oscillator.type = 'sawtooth';
                gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
                gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
                oscillator.start();
                oscillator.stop(ctx.currentTime + 0.3);
                break;
            case 'soft':
                oscillator.frequency.value = 600;
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
                gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
                oscillator.start();
                oscillator.stop(ctx.currentTime + 0.4);
                break;
            case 'click':
                oscillator.frequency.value = 1200;
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
                gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
                oscillator.start();
                oscillator.stop(ctx.currentTime + 0.05);
                break;
        }
    }

    // Show error alert with configuration
    function showErrorAlert(config) {
        const stepData = {
            stepNumber: currentStep + 1,
            config: config,
            alertShownTime: Date.now(),
            clicks: { total: 0, alert: 0, button: 0, overlay: 0 },
            dismissed: false,
            dismissTime: null
        };
        
        sessionData.steps.push(stepData);

        // Play sound
        playSound(config.sound);

        // Create alert HTML
        const alertHTML = `
            <div class="error-alert error-${config.position} color-${config.color} typography-${config.typography} animation-${config.animation}" id="currentAlert" role="alert" aria-live="assertive">
                <div class="error-overlay" id="errorOverlay"></div>
                <div class="error-content" id="errorContent">
                    <div class="error-avatar">${config.avatar}</div>
                    <div class="error-message">
                        <div class="error-tone-badge">${config.tone}</div>
                        ${config.message}
                    </div>
                    <button class="btn btn-dismiss" id="dismissBtn">OK</button>
                </div>
            </div>
        `;

        errorContainer.innerHTML = alertHTML;

        // Add click tracking
        const alertElement = document.getElementById('currentAlert');
        const dismissBtn = document.getElementById('dismissBtn');
        const errorContent = document.getElementById('errorContent');
        const errorOverlay = document.getElementById('errorOverlay');

        alertElement.addEventListener('click', () => {
            stepData.clicks.total++;
        });

        errorContent.addEventListener('click', (e) => {
            if (e.target === errorContent) {
                stepData.clicks.alert++;
            }
        });

        dismissBtn.addEventListener('click', () => {
            stepData.clicks.button++;
            dismissAlert();
        });

        errorOverlay.addEventListener('click', () => {
            stepData.clicks.overlay++;
            dismissAlert();
        });

        // Keyboard support
        document.addEventListener('keydown', handleEscapeKey);
    }

    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            dismissAlert();
        }
    }

    // Dismiss alert and move to next step
    function dismissAlert() {
        const stepData = sessionData.steps[currentStep];
        if (stepData && !stepData.dismissed) {
            stepData.dismissed = true;
            stepData.dismissTime = Date.now();
            stepData.responseTime = stepData.dismissTime - stepData.alertShownTime;
        }

        document.removeEventListener('keydown', handleEscapeKey);
        errorContainer.innerHTML = '';

        currentStep++;

        if (currentStep < totalSteps) {
            // Show next step
            setTimeout(() => {
                updateProgress();
                showErrorAlert(stepConfigs[currentStep]);
            }, 500);
        } else {
            // Test complete
            showCompletion();
        }
    }

    // Update progress indicator
    function updateProgress() {
        progressText.textContent = `Step ${currentStep + 1} of ${totalSteps}`;
        const percentage = ((currentStep + 1) / totalSteps) * 100;
        progressFill.style.width = `${percentage}%`;
    }

    // Show completion screen
    function showCompletion() {
        progressContainer.style.display = 'none';
        
        // Calculate statistics
        const totalTime = sessionData.steps.reduce((sum, step) => sum + (step.responseTime || 0), 0);
        const avgTime = (totalTime / totalSteps / 1000).toFixed(2);
        const totalClicks = sessionData.steps.reduce((sum, step) => sum + step.clicks.total, 0);

        completionStats.innerHTML = `
            <div class="stat-item">
                <div class="stat-value">${totalSteps}</div>
                <div class="stat-label">Steps Completed</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${avgTime}s</div>
                <div class="stat-label">Average Response Time</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${totalClicks}</div>
                <div class="stat-label">Total Clicks</div>
            </div>
        `;

        completionScreen.style.display = 'block';

        // Save session data
        saveSession();
        updateAnalyticsDisplay();
    }

    // Start the test
    startBtn.addEventListener('click', () => {
        sessionData.startTime = Date.now();
        initializeStepConfigs();
        currentStep = 0;
        
        // Hide instructions and start button
        document.querySelector('.instructions').style.display = 'none';
        startBtn.style.display = 'none';
        
        // Show progress
        progressContainer.style.display = 'block';
        updateProgress();
        
        // Show first alert
        showErrorAlert(stepConfigs[currentStep]);
    });

    // Researcher panel
    toggleResearcher.addEventListener('click', () => {
        researcherPanel.classList.add('active');
    });

    closePanel.addEventListener('click', () => {
        researcherPanel.classList.remove('active');
    });

    // Preview button
    previewBtn.addEventListener('click', () => {
        const randomConfig = generateRandomConfig();
        showErrorAlert(randomConfig);
    });

    // Analytics functions
    function saveSession() {
        const sessions = loadSessionsFromStorage();
        sessions.push(sessionData);
        localStorage.setItem('vulnerableInterfaceSessions', JSON.stringify(sessions));
    }

    function loadSessionsFromStorage() {
        const data = localStorage.getItem('vulnerableInterfaceSessions');
        return data ? JSON.parse(data) : [];
    }

    function updateAnalyticsDisplay() {
        const sessions = loadSessionsFromStorage();
        
        if (sessions.length === 0) {
            analyticsDisplay.innerHTML = '<p class="no-data">No test sessions recorded yet.</p>';
            return;
        }

        let html = `
            <div class="analytics-summary">
                <h4>Overall Statistics</h4>
                <p><strong>Total Sessions:</strong> ${sessions.length}</p>
        `;

        // Calculate averages across all sessions
        let totalAvgResponseTime = 0;
        let totalAvgClicks = 0;
        
        sessions.forEach(session => {
            const sessionAvgTime = session.steps.reduce((sum, step) => sum + (step.responseTime || 0), 0) / session.steps.length;
            const sessionTotalClicks = session.steps.reduce((sum, step) => sum + step.clicks.total, 0);
            totalAvgResponseTime += sessionAvgTime;
            totalAvgClicks += sessionTotalClicks;
        });

        html += `
                <p><strong>Average Response Time:</strong> ${(totalAvgResponseTime / sessions.length / 1000).toFixed(2)}s</p>
                <p><strong>Average Clicks per Session:</strong> ${(totalAvgClicks / sessions.length).toFixed(1)}</p>
            </div>
        `;

        // Show last 5 sessions
        html += '<div class="session-list"><h4>Recent Sessions</h4>';
        sessions.slice(-5).reverse().forEach((session, idx) => {
            const sessionAvgTime = session.steps.reduce((sum, step) => sum + (step.responseTime || 0), 0) / session.steps.length;
            const sessionTotalClicks = session.steps.reduce((sum, step) => sum + step.clicks.total, 0);
            
            html += `
                <div class="session-item">
                    <strong>Session ${session.sessionId.slice(0, 8)}</strong><br>
                    Avg Response: ${(sessionAvgTime / 1000).toFixed(2)}s | Clicks: ${sessionTotalClicks}
                </div>
            `;
        });
        html += '</div>';

        analyticsDisplay.innerHTML = html;
    }

    clearAnalytics.addEventListener('click', () => {
        if (confirm('Clear all analytics data?')) {
            localStorage.removeItem('vulnerableInterfaceSessions');
            updateAnalyticsDisplay();
        }
    });

    exportAnalytics.addEventListener('click', () => {
        const sessions = loadSessionsFromStorage();
        if (sessions.length === 0) {
            alert('No data to export');
            return;
        }

        let csv = 'Session ID,Step Number,Start Time,Alert Shown,Dismissed,Response Time (ms),Total Clicks,Alert Clicks,Button Clicks,Overlay Clicks,Avatar,Tone,Message,Animation,Color,Typography,Sound,Position\n';
        
        sessions.forEach(session => {
            session.steps.forEach(step => {
                csv += `"${session.sessionId}",`;
                csv += `${step.stepNumber},`;
                csv += `"${new Date(session.startTime).toISOString()}",`;
                csv += `"${new Date(step.alertShownTime).toISOString()}",`;
                csv += `${step.dismissed},`;
                csv += `${step.responseTime || 0},`;
                csv += `${step.clicks.total},`;
                csv += `${step.clicks.alert},`;
                csv += `${step.clicks.button},`;
                csv += `${step.clicks.overlay},`;
                csv += `"${step.config.avatar}",`;
                csv += `"${step.config.tone}",`;
                csv += `"${step.config.message.replace(/"/g, '""')}",`;
                csv += `"${step.config.animation}",`;
                csv += `"${step.config.color}",`;
                csv += `"${step.config.typography}",`;
                csv += `"${step.config.sound}",`;
                csv += `"${step.config.position}"\n`;
            });
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vulnerable-interface-data-${Date.now()}.csv`;
        a.click();
    });

    function generateSessionId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2);
    }

    // Initialize
    updateAnalyticsDisplay();
});
