// The Vulnerable Interface - Research Platform with Analytics

document.addEventListener('DOMContentLoaded', function() {
    // UI Elements
    const startBtn = document.getElementById('startBtn');
    const errorContainer = document.getElementById('errorContainer');
    const toggleResearcher = document.getElementById('toggleResearcher');
    const researcherPanel = document.getElementById('researcherPanel');
    const closePanel = document.getElementById('closePanel');
    const previewBtn = document.getElementById('previewBtn');
    const resetConfig = document.getElementById('resetConfig');
    const clearAnalytics = document.getElementById('clearAnalytics');
    const exportAnalytics = document.getElementById('exportAnalytics');
    const analyticsDisplay = document.getElementById('analyticsDisplay');
    
    // Analytics tracking
    let sessionData = {
        sessionId: generateSessionId(),
        startTime: null,
        alertShownTime: null,
        interactions: [],
        dismissed: false,
        dismissTime: null
    };
    
    let allSessions = loadSessionsFromStorage();
    
    // Audio context for sound effects
    let audioContext = null;
    
    function initAudioContext() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioContext;
    }
    
    // Sound effect generator
    function playSound(type) {
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
                gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.3);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.3);
                break;
            case 'error':
                oscillator.frequency.value = 200;
                oscillator.type = 'sawtooth';
                gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.5);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.5);
                break;
            case 'soft':
                oscillator.frequency.value = 600;
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.4);
                break;
            case 'click':
                oscillator.frequency.value = 1000;
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.1);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.1);
                break;
        }
    }
    
    // Get current design configuration
    function getCurrentConfig() {
        return {
            animation: document.getElementById('animationSelect').value,
            color: document.getElementById('colorSelect').value,
            typography: document.getElementById('typographySelect').value,
            sound: document.getElementById('soundSelect').value,
            position: document.getElementById('positionSelect').value,
            shadow: document.getElementById('shadowCheck').checked,
            border: document.getElementById('borderCheck').checked,
            icon: document.getElementById('iconCheck').checked,
            gradient: document.getElementById('gradientCheck').checked,
            glow: document.getElementById('glowCheck').checked
        };
    }
    
    // Track interaction
    function trackInteraction(eventType, details = {}) {
        const interaction = {
            type: eventType,
            timestamp: Date.now(),
            timeSinceStart: sessionData.startTime ? Date.now() - sessionData.startTime : 0,
            timeSinceAlert: sessionData.alertShownTime ? Date.now() - sessionData.alertShownTime : 0,
            ...details
        };
        sessionData.interactions.push(interaction);
        console.log('Interaction tracked:', interaction);
    }
    
    // Create and show error alert
    function showErrorAlert(config) {
        // Clear previous error
        errorContainer.innerHTML = '';
        
        // Remove any existing modal overlay
        const existingOverlay = document.querySelector('.modal-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }
        
        // Create error alert element
        const errorAlert = document.createElement('div');
        errorAlert.className = 'error-alert';
        errorAlert.setAttribute('role', 'alert');
        errorAlert.setAttribute('aria-live', 'assertive');
        
        // Add icon if selected
        if (config.icon) {
            const iconSpan = document.createElement('span');
            iconSpan.setAttribute('aria-label', 'Warning');
            iconSpan.textContent = '⚠️ ';
            iconSpan.style.fontSize = '1.5em';
            iconSpan.style.marginRight = '10px';
            errorAlert.appendChild(iconSpan);
        }
        
        // Add text content
        const textSpan = document.createElement('span');
        textSpan.textContent = 'Error: Please fill in all required fields before submitting.';
        errorAlert.appendChild(textSpan);
        
        // Add dismiss button
        const dismissBtn = document.createElement('button');
        dismissBtn.className = 'btn-dismiss';
        dismissBtn.textContent = 'OK';
        dismissBtn.setAttribute('aria-label', 'Dismiss error alert');
        errorAlert.appendChild(dismissBtn);
        
        // Apply color scheme
        errorAlert.classList.add(`color-${config.color}`);
        
        // Apply typography
        errorAlert.classList.add(`typo-${config.typography}`);
        
        // Apply position
        errorAlert.classList.add(`position-${config.position}`);
        
        // Apply visual effects
        if (config.shadow) errorAlert.classList.add('effect-shadow');
        if (config.border) errorAlert.classList.add('effect-border');
        if (config.gradient) errorAlert.classList.add('effect-gradient');
        if (config.glow) errorAlert.classList.add('effect-glow');
        
        // Function to close error alert
        function closeErrorAlert() {
            if (!sessionData.dismissed) {
                sessionData.dismissed = true;
                sessionData.dismissTime = Date.now();
                const responseTime = sessionData.dismissTime - sessionData.alertShownTime;
                trackInteraction('dismiss', { responseTime: responseTime });
                saveSession();
                updateAnalyticsDisplay();
            }
            
            errorAlert.remove();
            const overlay = document.querySelector('.modal-overlay');
            if (overlay) {
                overlay.remove();
            }
            
            // Re-enable start button
            startBtn.disabled = false;
            startBtn.textContent = 'Start New Test';
        }
        
        // Track clicks on the alert
        errorAlert.addEventListener('click', function(e) {
            if (e.target !== dismissBtn) {
                trackInteraction('alert_click', { target: 'alert_body' });
            }
        });
        
        // Track dismiss button click
        dismissBtn.addEventListener('click', function() {
            trackInteraction('button_click', { target: 'dismiss_button' });
            closeErrorAlert();
        });
        
        // Add modal overlay for center position
        if (config.position === 'center') {
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            overlay.setAttribute('role', 'button');
            overlay.setAttribute('aria-label', 'Close error message');
            overlay.setAttribute('tabindex', '0');
            document.body.appendChild(overlay);
            document.body.appendChild(errorAlert);
            
            // Make error alert focusable
            errorAlert.setAttribute('tabindex', '0');
            errorAlert.focus();
            
            // Close on overlay click
            overlay.addEventListener('click', function() {
                trackInteraction('overlay_click');
                closeErrorAlert();
            });
            
            // Close on Escape key
            function handleKeyDown(e) {
                if (e.key === 'Escape') {
                    trackInteraction('escape_key');
                    closeErrorAlert();
                    document.removeEventListener('keydown', handleKeyDown);
                }
            }
            document.addEventListener('keydown', handleKeyDown);
            
            // Close on overlay Enter/Space
            overlay.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    trackInteraction('overlay_keyboard');
                    closeErrorAlert();
                }
            });
        } else if (config.position === 'top' || config.position === 'toast') {
            document.body.appendChild(errorAlert);
        } else {
            errorContainer.appendChild(errorAlert);
        }
        
        // Apply animation
        if (config.animation !== 'none') {
            errorAlert.classList.add(`animate-${config.animation}`);
        }
        
        // Play sound effect
        if (config.sound !== 'none') {
            playSound(config.sound);
        }
        
        // Record alert shown time
        sessionData.alertShownTime = Date.now();
        trackInteraction('alert_shown', { config: config });
    }
    
    // Start button handler
    startBtn.addEventListener('click', function() {
        // Initialize new session
        sessionData = {
            sessionId: generateSessionId(),
            startTime: Date.now(),
            alertShownTime: null,
            interactions: [],
            dismissed: false,
            dismissTime: null,
            config: getCurrentConfig()
        };
        
        trackInteraction('start_clicked');
        
        // Disable start button
        startBtn.disabled = true;
        startBtn.textContent = 'Test in Progress...';
        
        // Show error alert with current configuration
        showErrorAlert(sessionData.config);
    });
    
    // Researcher panel toggle
    toggleResearcher.addEventListener('click', function() {
        researcherPanel.classList.toggle('active');
    });
    
    closePanel.addEventListener('click', function() {
        researcherPanel.classList.remove('active');
    });
    
    // Preview button
    previewBtn.addEventListener('click', function() {
        const config = getCurrentConfig();
        showErrorAlert(config);
    });
    
    // Reset configuration
    resetConfig.addEventListener('click', function() {
        document.getElementById('animationSelect').value = 'shake';
        document.getElementById('colorSelect').value = 'aggressive-red';
        document.getElementById('typographySelect').value = 'bold';
        document.getElementById('soundSelect').value = 'alert';
        document.getElementById('positionSelect').value = 'inline';
        document.getElementById('shadowCheck').checked = true;
        document.getElementById('borderCheck').checked = false;
        document.getElementById('iconCheck').checked = true;
        document.getElementById('gradientCheck').checked = false;
        document.getElementById('glowCheck').checked = false;
    });
    
    // Clear analytics
    clearAnalytics.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
            allSessions = [];
            localStorage.removeItem('vulnerableInterfaceSessions');
            updateAnalyticsDisplay();
        }
    });
    
    // Export analytics
    exportAnalytics.addEventListener('click', function() {
        if (allSessions.length === 0) {
            alert('No data to export.');
            return;
        }
        
        const csv = generateCSV(allSessions);
        downloadCSV(csv, 'vulnerable-interface-data.csv');
    });
    
    // Helper functions
    function generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11);
    }
    
    function saveSession() {
        allSessions.push(sessionData);
        localStorage.setItem('vulnerableInterfaceSessions', JSON.stringify(allSessions));
    }
    
    function loadSessionsFromStorage() {
        const stored = localStorage.getItem('vulnerableInterfaceSessions');
        return stored ? JSON.parse(stored) : [];
    }
    
    function updateAnalyticsDisplay() {
        if (allSessions.length === 0) {
            analyticsDisplay.innerHTML = '<p class="no-data">No test sessions recorded yet. Participant clicks will be tracked here.</p>';
            return;
        }
        
        let html = '<div class="analytics-summary">';
        html += `<p><strong>Total Sessions:</strong> ${allSessions.length}</p>`;
        
        // Calculate average response time
        const completedSessions = allSessions.filter(s => s.dismissed);
        if (completedSessions.length > 0) {
            const avgResponseTime = completedSessions.reduce((sum, s) => {
                return sum + (s.dismissTime - s.alertShownTime);
            }, 0) / completedSessions.length;
            html += `<p><strong>Avg Response Time:</strong> ${(avgResponseTime / 1000).toFixed(2)}s</p>`;
            
            const avgClicks = completedSessions.reduce((sum, s) => {
                return sum + s.interactions.filter(i => i.type.includes('click')).length;
            }, 0) / completedSessions.length;
            html += `<p><strong>Avg Clicks:</strong> ${avgClicks.toFixed(1)}</p>`;
        }
        html += '</div>';
        
        html += '<div class="session-list"><h4>Recent Sessions:</h4>';
        allSessions.slice(-5).reverse().forEach((session, index) => {
            const responseTime = session.dismissed ? 
                ((session.dismissTime - session.alertShownTime) / 1000).toFixed(2) + 's' : 
                'Not completed';
            const clickCount = session.interactions.filter(i => i.type.includes('click')).length;
            html += `<div class="session-item">
                <strong>Session ${allSessions.length - index}</strong>
                <span>Response: ${responseTime}</span>
                <span>Clicks: ${clickCount}</span>
            </div>`;
        });
        html += '</div>';
        
        analyticsDisplay.innerHTML = html;
    }
    
    function generateCSV(sessions) {
        let csv = 'Session ID,Start Time,Alert Shown,Dismissed,Response Time (ms),Total Clicks,Alert Clicks,Button Clicks,Overlay Clicks,Config Animation,Config Color,Config Typography,Config Sound,Config Position\n';
        
        sessions.forEach(session => {
            const responseTime = session.dismissed ? session.dismissTime - session.alertShownTime : 'N/A';
            const totalClicks = session.interactions.filter(i => i.type.includes('click')).length;
            const alertClicks = session.interactions.filter(i => i.type === 'alert_click').length;
            const buttonClicks = session.interactions.filter(i => i.type === 'button_click').length;
            const overlayClicks = session.interactions.filter(i => i.type === 'overlay_click').length;
            
            csv += `${session.sessionId},`;
            csv += `${new Date(session.startTime).toISOString()},`;
            csv += `${session.alertShownTime ? new Date(session.alertShownTime).toISOString() : 'N/A'},`;
            csv += `${session.dismissed},`;
            csv += `${responseTime},`;
            csv += `${totalClicks},`;
            csv += `${alertClicks},`;
            csv += `${buttonClicks},`;
            csv += `${overlayClicks},`;
            csv += `${session.config?.animation || 'N/A'},`;
            csv += `${session.config?.color || 'N/A'},`;
            csv += `${session.config?.typography || 'N/A'},`;
            csv += `${session.config?.sound || 'N/A'},`;
            csv += `${session.config?.position || 'N/A'}\n`;
        });
        
        return csv;
    }
    
    function downloadCSV(csv, filename) {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    
    // Initialize analytics display
    updateAnalyticsDisplay();
});
