// The Vulnerable Interface - Enhanced Empathy Testing with Implicit Behavior Tracking
// Research Platform: Design Elements Create Feeling Without Verbal Explanation

document.addEventListener('DOMContentLoaded', function() {
    // Configuration pools - using Lorem Ipsum and design elements only
    // Using single consistent error message as requested
    const errorMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    
    const designConfigurations = [
        {
            avatar: '😊',
            visualTone: 'warm',  // Internal only, not shown to user
            message: errorMessage
        },
        {
            avatar: '🤖',
            visualTone: 'robotic',
            message: errorMessage
        },
        {
            avatar: '😊',
            visualTone: 'friendly',
            message: errorMessage
        },
        {
            avatar: '⚠️',
            visualTone: 'warning',
            message: errorMessage
        },
        {
            avatar: '🎭',
            visualTone: 'apologetic',
            message: errorMessage
        },
        {
            avatar: '😊',
            visualTone: 'empathetic',
            message: errorMessage
        },
        {
            avatar: '🤖',
            visualTone: 'cold',
            message: errorMessage
        },
        {
            avatar: '😌',
            visualTone: 'calm',
            message: errorMessage
        }
    ];

    const animations = ['shake', 'bounce', 'pulse', 'fade', 'slide', 'none'];
    const colors = ['aggressive-red', 'soft-red', 'orange', 'neutral', 'dark'];
    const typographies = ['bold', 'normal', 'light', 'serif', 'mono'];
    
    // Enhanced sound types with vocal-like qualities
    const vocalSounds = ['aww', 'sigh', 'reassure', 'frustration', 'gentle', 'none'];
    const positions = ['inline', 'top', 'center', 'toast'];
    
    // Button layout positions - creates friction by varying placement
    const buttonLayouts = [
        'horizontal-center',  // Standard horizontal center
        'horizontal-left',    // Horizontal left-aligned
        'horizontal-right',   // Horizontal right-aligned
        'vertical-left',      // Vertical stack on left
        'vertical-right',     // Vertical stack on right
        'vertical-center',    // Vertical stack centered
        'diagonal-tl-br',     // Diagonal from top-left to bottom-right
        'diagonal-tr-bl',     // Diagonal from top-right to bottom-left
        'scattered-wide'      // Scattered across wider area
    ];
    
    // Wait times between steps (ms) - variable friction testing
    const waitTimes = [500, 1000, 1500, 2000, 2500];

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
            position: positions[Math.floor(Math.random() * positions.length)],
            buttonLayout: buttonLayouts[Math.floor(Math.random() * buttonLayouts.length)],
            waitTime: waitTimes[Math.floor(Math.random() * waitTimes.length)]
        };
    }

    // Generate all 5 step configurations at the start
    function initializeStepConfigs() {
        stepConfigs = [];
        for (let i = 0; i < totalSteps; i++) {
            stepConfigs.push(generateRandomConfig());
        }
    }

    // Enhanced vocal-like sound generation with human resemblance
    function playVocalSound(type) {
        if (type === 'none') return;
        
        const ctx = initAudioContext();
        
        switch(type) {
            case 'aww':
                // Sympathetic "aww" sound - human vocal formants
                playAwwSound(ctx);
                break;
            case 'sigh':
                // Long sigh - breath-like noise with pitch drop
                playSighSound(ctx);
                break;
            case 'reassure':
                // Gentle reassurance - warm vocal tone with vibrato
                playReassureSound(ctx);
                break;
            case 'frustration':
                // Frustration - tense vocal tone with edge
                playFrustrationSound(ctx);
                break;
            case 'gentle':
                // Gentle tone - soft vocal with slight flutter
                playGentleSound(ctx);
                break;
        }
    }

    function playAwwSound(ctx) {
        // More human-like "aww" with formant structure
        const fundamental = ctx.createOscillator();
        const formant1 = ctx.createOscillator();
        const formant2 = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const formantGain1 = ctx.createGain();
        const formantGain2 = ctx.createGain();
        
        // Fundamental frequency
        fundamental.connect(gainNode);
        fundamental.type = 'sawtooth';
        fundamental.frequency.setValueAtTime(220, ctx.currentTime); // A3
        fundamental.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.7);
        
        // Formant 1 (vowel "ah" first formant ~700Hz)
        formant1.connect(formantGain1);
        formantGain1.connect(gainNode);
        formant1.type = 'sine';
        formant1.frequency.setValueAtTime(700, ctx.currentTime);
        formant1.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 0.7);
        formantGain1.gain.value = 0.3;
        
        // Formant 2 (vowel "ah" second formant ~1200Hz)
        formant2.connect(formantGain2);
        formantGain2.connect(gainNode);
        formant2.type = 'sine';
        formant2.frequency.setValueAtTime(1200, ctx.currentTime);
        formant2.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.7);
        formantGain2.gain.value = 0.2;
        
        gainNode.connect(ctx.destination);
        
        // Natural envelope with attack and decay
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 0.05); // Quick attack
        gainNode.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.3);  // Sustain
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7); // Long decay
        
        fundamental.start();
        formant1.start();
        formant2.start();
        fundamental.stop(ctx.currentTime + 0.7);
        formant1.stop(ctx.currentTime + 0.7);
        formant2.stop(ctx.currentTime + 0.7);
    }

    function playSighSound(ctx) {
        // Breath-like sigh with noise and pitch drop
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        // Generate pink-ish noise for breath quality
        for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * 0.3;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = 800;
        noiseFilter.Q.value = 2;
        
        const noiseGain = ctx.createGain();
        
        // Pitched component for vocal quality
        const oscillator = ctx.createOscillator();
        const oscGain = ctx.createGain();
        
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(400, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 1.3);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        oscillator.connect(oscGain);
        
        const masterGain = ctx.createGain();
        noiseGain.connect(masterGain);
        oscGain.connect(masterGain);
        masterGain.connect(ctx.destination);
        
        // Envelope for natural breath
        noiseGain.gain.setValueAtTime(0.15, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.3);
        
        oscGain.gain.setValueAtTime(0.12, ctx.currentTime);
        oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.3);
        
        noise.start();
        oscillator.start();
        noise.stop(ctx.currentTime + 1.3);
        oscillator.stop(ctx.currentTime + 1.3);
    }

    function playReassureSound(ctx) {
        // Warm vocal tone with gentle vibrato
        const fundamental = ctx.createOscillator();
        const formant = ctx.createOscillator();
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        const gainNode = ctx.createGain();
        const formantGain = ctx.createGain();
        
        // Vibrato LFO
        vibrato.type = 'sine';
        vibrato.frequency.value = 5.5; // Natural vocal vibrato ~5-6 Hz
        vibratoGain.gain.value = 8; // Pitch variation in Hz
        vibrato.connect(vibratoGain);
        
        // Fundamental with vibrato
        fundamental.type = 'sawtooth';
        fundamental.frequency.setValueAtTime(260, ctx.currentTime); // C4
        vibratoGain.connect(fundamental.frequency);
        fundamental.connect(gainNode);
        
        // Formant for vowel color
        formant.type = 'sine';
        formant.frequency.value = 1000; // "oo" vowel formant
        formant.connect(formantGain);
        formantGain.connect(gainNode);
        formantGain.gain.value = 0.25;
        
        gainNode.connect(ctx.destination);
        
        // Natural vocal envelope
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.08);
        gainNode.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.4);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
        
        vibrato.start();
        fundamental.start();
        formant.start();
        vibrato.stop(ctx.currentTime + 0.9);
        fundamental.stop(ctx.currentTime + 0.9);
        formant.stop(ctx.currentTime + 0.9);
    }

    function playFrustrationSound(ctx) {
        // Tense vocal with harsh overtones
        const fundamental = ctx.createOscillator();
        const overtone1 = ctx.createOscillator();
        const overtone2 = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const overtoneGain1 = ctx.createGain();
        const overtoneGain2 = ctx.createGain();
        
        // Lower pitched, tense fundamental
        fundamental.type = 'sawtooth';
        fundamental.frequency.value = 180; // Low growl-like
        fundamental.connect(gainNode);
        
        // Harsh overtones
        overtone1.type = 'square';
        overtone1.frequency.value = 360; // 2nd harmonic
        overtone1.connect(overtoneGain1);
        overtoneGain1.connect(gainNode);
        overtoneGain1.gain.value = 0.2;
        
        overtone2.type = 'sawtooth';
        overtone2.frequency.value = 540; // 3rd harmonic
        overtone2.connect(overtoneGain2);
        overtoneGain2.connect(gainNode);
        overtoneGain2.gain.value = 0.15;
        
        gainNode.connect(ctx.destination);
        
        // Abrupt, tense envelope
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 0.03);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        
        fundamental.start();
        overtone1.start();
        overtone2.start();
        fundamental.stop(ctx.currentTime + 0.45);
        overtone1.stop(ctx.currentTime + 0.45);
        overtone2.stop(ctx.currentTime + 0.45);
    }

    function playGentleSound(ctx) {
        // Soft vocal with slight flutter/tremolo
        const oscillator = ctx.createOscillator();
        const tremolo = ctx.createOscillator();
        const tremoloGain = ctx.createGain();
        const gainNode = ctx.createGain();
        
        // Tremolo (amplitude modulation) for gentle flutter
        tremolo.type = 'sine';
        tremolo.frequency.value = 4.5; // Gentle flutter
        tremolo.connect(tremoloGain);
        tremoloGain.gain.value = 0.15; // Subtle effect
        
        oscillator.type = 'triangle'; // Softer than sawtooth
        oscillator.frequency.value = 330; // E4
        oscillator.connect(gainNode);
        
        tremoloGain.connect(gainNode.gain);
        gainNode.connect(ctx.destination);
        
        // Very gentle envelope
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        
        tremolo.start();
        oscillator.start();
        tremolo.stop(ctx.currentTime + 0.6);
        oscillator.stop(ctx.currentTime + 0.6);
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
        // Button layout varies by configuration to create friction
        const alertHTML = `
            <div class="error-alert error-${config.position} color-${config.color} typography-${config.typography} animation-${config.animation}" id="currentAlert" role="alert" aria-live="assertive">
                <div class="error-overlay" id="errorOverlay"></div>
                <div class="error-content" id="errorContent">
                    <div class="error-avatar">${config.avatar}</div>
                    <div class="error-message">
                        ${config.message}
                    </div>
                    <div class="action-buttons layout-${config.buttonLayout}">
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

    // Dismiss alert and move to next step with configured wait time
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

        // Use the configured wait time for this step to test friction impact
        const delay = stepConfigs[currentStep - 1]?.waitTime || 1000;

        if (currentStep < totalSteps) {
            // Show next step after configured wait time
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
