// The Vulnerable Interface - Enhanced Empathy Testing with Implicit Behavior Tracking
// Research Platform: Design Elements Create Feeling Without Verbal Explanation

document.addEventListener('DOMContentLoaded', function() {
    // Configuration pools - using Lorem Ipsum and design elements only
    const designConfigurations = [
        {
            avatar: '😊',
            visualTone: 'warm',  // Internal only, not shown to user
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt."
        },
        {
            avatar: '🤖',
            visualTone: 'robotic',
            message: "Lorem ipsum dolor sit amet. Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore."
        },
        {
            avatar: '😊',
            visualTone: 'friendly',
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit! Ut labore et dolore magna aliqua."
        },
        {
            avatar: '⚠️',
            visualTone: 'warning',
            message: "Lorem ipsum dolor sit amet. Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
        },
        {
            avatar: '🎭',
            visualTone: 'apologetic',
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
        },
        {
            avatar: '😊',
            visualTone: 'empathetic',
            message: "Lorem ipsum dolor sit amet! Consectetur adipiscing elit, sed do eiusmod tempor incididunt."
        },
        {
            avatar: '🤖',
            visualTone: 'cold',
            message: "Lorem ipsum dolor sit amet. Consectetur adipiscing elit sed do eiusmod."
        },
        {
            avatar: '😌',
            visualTone: 'calm',
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut labore et dolore magna aliqua."
        }
    ];

    const animations = ['shake', 'bounce', 'pulse', 'fade', 'slide', 'none'];
    const colors = ['aggressive-red', 'soft-red', 'orange', 'neutral', 'dark'];
    const typographies = ['bold', 'normal', 'light', 'serif', 'mono'];
    
    // Enhanced sound types with vocal-like qualities
    const vocalSounds = ['aww', 'sigh', 'reassure', 'frustration', 'gentle', 'none'];
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
    const instructions = document.getElementById('instructions');
    const toggleResearcher = document.getElementById('toggleResearcher');
    const researcherPanel = document.getElementById('researcherPanel');
    const closePanel = document.getElementById('closePanel');
    const clearAnalytics = document.getElementById('clearAnalytics');
    const exportAnalytics = document.getElementById('exportAnalytics');
    const analyticsDisplay = document.getElementById('analyticsDisplay');

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
        const designConfig = designConfigurations[Math.floor(Math.random() * designConfigurations.length)];
        return {
            ...designConfig,
            animation: animations[Math.floor(Math.random() * animations.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
            typography: typographies[Math.floor(Math.random() * typographies.length)],
            vocalSound: vocalSounds[Math.floor(Math.random() * vocalSounds.length)],
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

    // Enhanced vocal-like sound generation
    function playVocalSound(type) {
        if (type === 'none') return;
        
        const ctx = initAudioContext();
        
        switch(type) {
            case 'aww':
                // Sympathetic "aww" sound - descending frequency sweep
                playAwwSound(ctx);
                break;
            case 'sigh':
                // Long sigh - slow amplitude modulation
                playSighSound(ctx);
                break;
            case 'reassure':
                // Gentle reassurance - soft harmonics
                playReassureSound(ctx);
                break;
            case 'frustration':
                // Frustration - harsh buzzing
                playFrustrationSound(ctx);
                break;
            case 'gentle':
                // Gentle tone - pure sine wave
                playGentleSound(ctx);
                break;
        }
    }

    function playAwwSound(ctx) {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.6);
        
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.3);
        gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.6);
    }

    function playSighSound(ctx) {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        
        oscillator.connect(gainNode);
        lfo.connect(lfoGain);
        lfoGain.connect(gainNode.gain);
        gainNode.connect(ctx.destination);
        
        oscillator.type = 'triangle';
        oscillator.frequency.value = 300;
        
        lfo.type = 'sine';
        lfo.frequency.value = 3; // 3 Hz modulation
        lfoGain.gain.value = 0.1;
        
        gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        
        oscillator.start();
        lfo.start();
        oscillator.stop(ctx.currentTime + 1.2);
        lfo.stop(ctx.currentTime + 1.2);
    }

    function playReassureSound(ctx) {
        // Two oscillators for harmonics
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc1.type = 'sine';
        osc1.frequency.value = 500;
        osc2.type = 'sine';
        osc2.frequency.value = 750; // Perfect fifth
        
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        
        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 0.8);
        osc2.stop(ctx.currentTime + 0.8);
    }

    function playFrustrationSound(ctx) {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.value = 150;
        
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.4);
    }

    function playGentleSound(ctx) {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.value = 600;
        
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.5);
    }

    // Show error alert with three action buttons (no labels, icons only)
    function showErrorAlert(config) {
        const stepData = {
            stepNumber: currentStep + 1,
            config: config,
            alertShownTime: Date.now(),
            clicks: { total: 0, alert: 0, close: 0, proceed: 0, wait: 0 },
            actionChosen: null,
            dismissed: false,
            dismissTime: null
        };
        
        sessionData.steps.push(stepData);

        // Play vocal sound
        playVocalSound(config.vocalSound);

        // Create alert HTML with three action buttons (icon-only, no text labels)
        const alertHTML = `
            <div class="error-alert error-${config.position} color-${config.color} typography-${config.typography} animation-${config.animation}" id="currentAlert" role="alert" aria-live="assertive">
                <div class="error-overlay" id="errorOverlay"></div>
                <div class="error-content" id="errorContent">
                    <div class="error-avatar">${config.avatar}</div>
                    <div class="error-message">
                        ${config.message}
                    </div>
                    <div class="action-buttons">
                        <button class="btn-action btn-close" id="actionClose" aria-label="Close" title="">❌</button>
                        <button class="btn-action btn-proceed" id="actionProceed" aria-label="Proceed" title="">➔</button>
                        <button class="btn-action btn-wait" id="actionWait" aria-label="Wait" title="">✓</button>
                    </div>
                </div>
            </div>
        `;

        errorContainer.innerHTML = alertHTML;

        // Add click tracking
        const alertElement = document.getElementById('currentAlert');
        const actionClose = document.getElementById('actionClose');
        const actionProceed = document.getElementById('actionProceed');
        const actionWait = document.getElementById('actionWait');
        const errorContent = document.getElementById('errorContent');

        alertElement.addEventListener('click', () => {
            stepData.clicks.total++;
        });

        errorContent.addEventListener('click', (e) => {
            if (e.target === errorContent) {
                stepData.clicks.alert++;
            }
        });

        // Three different actions - reveals user's willingness/patience
        actionClose.addEventListener('click', () => {
            stepData.clicks.close++;
            stepData.actionChosen = 'close';
            dismissAlert('close');
        });

        actionProceed.addEventListener('click', () => {
            stepData.clicks.proceed++;
            stepData.actionChosen = 'proceed';
            dismissAlert('proceed');
        });

        actionWait.addEventListener('click', () => {
            stepData.clicks.wait++;
            stepData.actionChosen = 'wait';
            dismissAlert('wait');
        });

        // Keyboard support
        document.addEventListener('keydown', handleEscapeKey);
    }

    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            const stepData = sessionData.steps[currentStep];
            if (stepData) {
                stepData.actionChosen = 'escape';
            }
            dismissAlert('escape');
        }
    }

    // Dismiss alert and move to next step based on action
    function dismissAlert(action) {
        const stepData = sessionData.steps[currentStep];
        if (stepData && !stepData.dismissed) {
            stepData.dismissed = true;
            stepData.dismissTime = Date.now();
            stepData.responseTime = stepData.dismissTime - stepData.alertShownTime;
        }

        document.removeEventListener('keydown', handleEscapeKey);
        errorContainer.innerHTML = '';

        currentStep++;

        // Different timing based on action chosen
        let delay = 500;
        if (action === 'proceed') {
            delay = 300; // Quick transition if user wants to proceed
        } else if (action === 'wait') {
            delay = 800; // Slightly longer if user showed patience
        } else if (action === 'close') {
            // User wanted to exit - but continue test for research
            delay = 600;
        }

        if (currentStep < totalSteps) {
            // Show next step
            setTimeout(() => {
                updateProgress();
                showErrorAlert(stepConfigs[currentStep]);
            }, delay);
        } else {
            // Test complete
            showCompletion();
        }
    }

    function updateProgress() {
        progressText.textContent = `Step ${currentStep + 1} of ${totalSteps}`;
        const percentage = ((currentStep + 1) / totalSteps) * 100;
        progressFill.style.width = `${percentage}%`;
    }

    function showCompletion() {
        progressContainer.style.display = 'none';
        
        // Calculate statistics
        const totalResponseTime = sessionData.steps.reduce((sum, step) => sum + (step.responseTime || 0), 0);
        const avgResponseTime = (totalResponseTime / totalSteps / 1000).toFixed(2);
        
        const totalClicks = sessionData.steps.reduce((sum, step) => sum + step.clicks.total, 0);
        
        // Count action choices
        const actionCounts = {
            close: 0,
            proceed: 0,
            wait: 0,
            escape: 0
        };
        
        sessionData.steps.forEach(step => {
            if (step.actionChosen) {
                actionCounts[step.actionChosen]++;
            }
        });

        completionStats.innerHTML = `
            <div class="stat-item">
                <div class="stat-label">Average Response Time</div>
                <div class="stat-value">${avgResponseTime}s</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Total Interactions</div>
                <div class="stat-value">${totalClicks}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Action Pattern</div>
                <div class="stat-value">
                    ${actionCounts.close > 0 ? `❌ ${actionCounts.close} ` : ''}
                    ${actionCounts.proceed > 0 ? `➔ ${actionCounts.proceed} ` : ''}
                    ${actionCounts.wait > 0 ? `✓ ${actionCounts.wait}` : ''}
                </div>
            </div>
        `;

        completionScreen.style.display = 'block';
        
        // Save to localStorage
        saveSessionData();
    }

    function saveSessionData() {
        let allSessions = JSON.parse(localStorage.getItem('vulnerableInterfaceSessions') || '[]');
        allSessions.push(sessionData);
        localStorage.setItem('vulnerableInterfaceSessions', JSON.stringify(allSessions));
    }

    function generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
    }

    // Start test
    startBtn.addEventListener('click', function() {
        sessionData.startTime = Date.now();
        initializeStepConfigs();
        
        startBtn.style.display = 'none';
        instructions.style.display = 'none';
        progressContainer.style.display = 'block';
        
        updateProgress();
        showErrorAlert(stepConfigs[currentStep]);
    });

    // Researcher panel
    toggleResearcher.addEventListener('click', function() {
        researcherPanel.style.display = 'block';
        displayAnalytics();
    });

    closePanel.addEventListener('click', function() {
        researcherPanel.style.display = 'none';
    });

    function displayAnalytics() {
        const allSessions = JSON.parse(localStorage.getItem('vulnerableInterfaceSessions') || '[]');
        
        if (allSessions.length === 0) {
            analyticsDisplay.innerHTML = '<p class="no-data">No session data yet. Run a test to see analytics.</p>';
            return;
        }

        let html = `<div class="analytics-summary">
            <h4>Total Sessions: ${allSessions.length}</h4>
        </div>`;

        allSessions.forEach((session, index) => {
            const avgTime = session.steps.reduce((sum, s) => sum + (s.responseTime || 0), 0) / session.steps.length / 1000;
            const totalClicks = session.steps.reduce((sum, s) => sum + s.clicks.total, 0);
            
            html += `
                <div class="session-card">
                    <h5>Session ${index + 1}</h5>
                    <p>Avg Response: ${avgTime.toFixed(2)}s | Total Clicks: ${totalClicks}</p>
                    <div class="session-steps">
            `;
            
            session.steps.forEach(step => {
                html += `
                    <div class="step-summary">
                        <strong>Step ${step.stepNumber}:</strong> 
                        ${(step.responseTime / 1000).toFixed(2)}s | 
                        Action: ${step.actionChosen || 'none'} | 
                        ${step.config.avatar} ${step.config.vocalSound}
                    </div>
                `;
            });
            
            html += `</div></div>`;
        });

        analyticsDisplay.innerHTML = html;
    }

    clearAnalytics.addEventListener('click', function() {
        if (confirm('Clear all session data? This cannot be undone.')) {
            localStorage.removeItem('vulnerableInterfaceSessions');
            displayAnalytics();
        }
    });

    exportAnalytics.addEventListener('click', function() {
        const allSessions = JSON.parse(localStorage.getItem('vulnerableInterfaceSessions') || '[]');
        
        if (allSessions.length === 0) {
            alert('No data to export.');
            return;
        }

        let csv = 'Session ID,Step Number,Start Time,Alert Shown,Dismissed,Response Time (ms),Total Clicks,Close Clicks,Proceed Clicks,Wait Clicks,Action Chosen,Avatar,Vocal Sound,Animation,Color,Typography,Position,Message\n';

        allSessions.forEach(session => {
            session.steps.forEach(step => {
                const row = [
                    session.sessionId,
                    step.stepNumber,
                    new Date(session.startTime).toISOString(),
                    new Date(step.alertShownTime).toISOString(),
                    step.dismissTime ? new Date(step.dismissTime).toISOString() : '',
                    step.responseTime || '',
                    step.clicks.total,
                    step.clicks.close,
                    step.clicks.proceed,
                    step.clicks.wait,
                    step.actionChosen || '',
                    step.config.avatar,
                    step.config.vocalSound,
                    step.config.animation,
                    step.config.color,
                    step.config.typography,
                    step.config.position,
                    `"${step.config.message.replace(/"/g, '""')}"`
                ].join(',');
                csv += row + '\n';
            });
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vulnerable-interface-data-${Date.now()}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    });
});
