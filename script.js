// The Vulnerable Interface - Design Elements Research

document.addEventListener('DOMContentLoaded', function() {
    const testForm = document.getElementById('testForm');
    const errorContainer = document.getElementById('errorContainer');
    const resetBtn = document.getElementById('resetBtn');
    
    // Audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Sound effect generator
    function playSound(type) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch(type) {
            case 'alert':
                oscillator.frequency.value = 800;
                oscillator.type = 'square';
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
                break;
            case 'error':
                oscillator.frequency.value = 200;
                oscillator.type = 'sawtooth';
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
                break;
            case 'soft':
                oscillator.frequency.value = 600;
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.4);
                break;
            case 'click':
                oscillator.frequency.value = 1000;
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
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
        errorAlert.textContent = 'Error: Please fill in all required fields before submitting.';
        
        // Apply color scheme
        errorAlert.classList.add(`color-${options.color}`);
        
        // Apply typography
        errorAlert.classList.add(`typo-${options.typography}`);
        
        // Apply position
        errorAlert.classList.add(`position-${options.position}`);
        
        // Apply visual effects
        if (options.shadow) errorAlert.classList.add('effect-shadow');
        if (options.border) errorAlert.classList.add('effect-border');
        if (options.icon) errorAlert.classList.add('effect-icon');
        if (options.gradient) errorAlert.classList.add('effect-gradient');
        if (options.glow) errorAlert.classList.add('effect-glow');
        
        // Add modal overlay for center position
        if (options.position === 'center') {
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            document.body.appendChild(overlay);
            document.body.appendChild(errorAlert);
            
            // Close on overlay click
            overlay.addEventListener('click', function() {
                errorAlert.remove();
                overlay.remove();
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
