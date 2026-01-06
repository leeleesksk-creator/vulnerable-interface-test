// The Vulnerable Interface - Design Elements Research

document.addEventListener('DOMContentLoaded', function() {
    const testForm = document.getElementById('testForm');
    const errorContainer = document.getElementById('errorContainer');
    const resetBtn = document.getElementById('resetBtn');
    
    // Audio context for sound effects (initialized on first use to comply with browser policies)
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
    
    // Get selected design options
    function getSelectedOptions() {
        return {
            animation: document.querySelector('input[name="animation"]:checked').value,
            color: document.querySelector('input[name="color"]:checked').value,
            typography: document.querySelector('input[name="typography"]:checked').value,
            sound: document.querySelector('input[name="sound"]:checked').value,
            position: document.querySelector('input[name="position"]:checked').value,
            shadow: document.getElementById('shadow').checked,
            border: document.getElementById('border').checked,
            icon: document.getElementById('icon').checked,
            gradient: document.getElementById('gradient').checked,
            glow: document.getElementById('glow').checked
        };
    }
    
    // Create error alert with selected design
    function showErrorAlert(options) {
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
        if (options.icon) {
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
        
        // Apply color scheme
        errorAlert.classList.add(`color-${options.color}`);
        
        // Apply typography
        errorAlert.classList.add(`typo-${options.typography}`);
        
        // Apply position
        errorAlert.classList.add(`position-${options.position}`);
        
        // Apply visual effects
        if (options.shadow) errorAlert.classList.add('effect-shadow');
        if (options.border) errorAlert.classList.add('effect-border');
        if (options.gradient) errorAlert.classList.add('effect-gradient');
        if (options.glow) errorAlert.classList.add('effect-glow');
        
        // Function to close error alert
        function closeErrorAlert() {
            errorAlert.remove();
            const overlay = document.querySelector('.modal-overlay');
            if (overlay) {
                overlay.remove();
            }
        }
        
        // Add modal overlay for center position
        if (options.position === 'center') {
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
            overlay.addEventListener('click', closeErrorAlert);
            
            // Close on Escape key
            function handleKeyDown(e) {
                if (e.key === 'Escape') {
                    closeErrorAlert();
                    document.removeEventListener('keydown', handleKeyDown);
                }
            }
            document.addEventListener('keydown', handleKeyDown);
            
            // Close on overlay Enter/Space
            overlay.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    closeErrorAlert();
                }
            });
        } else if (options.position === 'top' || options.position === 'toast') {
            document.body.appendChild(errorAlert);
        } else {
            errorContainer.appendChild(errorAlert);
        }
        
        // Apply animation
        if (options.animation !== 'none') {
            errorAlert.classList.add(`animate-${options.animation}`);
        }
        
        // Play sound effect
        if (options.sound !== 'none') {
            playSound(options.sound);
        }
        
        // Auto-remove toast and top notifications after 5 seconds
        if (options.position === 'toast' || options.position === 'top') {
            setTimeout(function() {
                errorAlert.style.opacity = '0';
                errorAlert.style.transition = 'opacity 0.3s ease';
                setTimeout(function() {
                    errorAlert.remove();
                }, 300);
            }, 5000);
        }
    }
    
    // Form submission handler
    testForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const options = getSelectedOptions();
        showErrorAlert(options);
    });
    
    // Reset button handler
    resetBtn.addEventListener('click', function() {
        // Clear error display
        errorContainer.innerHTML = '';
        
        // Remove any errors from body
        const bodyErrors = document.querySelectorAll('body > .error-alert');
        bodyErrors.forEach(error => error.remove());
        
        // Remove any modal overlays
        const overlays = document.querySelectorAll('.modal-overlay');
        overlays.forEach(overlay => overlay.remove());
        
        // Reset form
        testForm.reset();
        
        // Visual feedback
        resetBtn.textContent = '✅ Reset Complete!';
        setTimeout(function() {
            resetBtn.textContent = 'Reset Test';
        }, 2000);
    });
    
    // Add change listeners to play preview sounds
    const soundRadios = document.querySelectorAll('input[name="sound"]');
    soundRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value !== 'none') {
                playSound(this.value);
            }
        });
    });
});
