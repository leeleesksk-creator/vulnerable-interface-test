// The Vulnerable Interface - JavaScript for Error State Demonstrations

document.addEventListener('DOMContentLoaded', function() {
    // Scenario 1: Form Validation Error
    const validationForm = document.getElementById('validationForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    validationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let hasError = false;
        
        // Reset errors
        emailError.textContent = '';
        passwordError.textContent = '';
        emailInput.classList.remove('error');
        passwordInput.classList.remove('error');
        
        // Validate email
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            emailError.textContent = '❌ Email is required';
            emailInput.classList.add('error');
            hasError = true;
        } else if (!isValidEmail(emailValue)) {
            emailError.textContent = '❌ Please enter a valid email address';
            emailInput.classList.add('error');
            hasError = true;
        }
        
        // Validate password
        const passwordValue = passwordInput.value;
        if (passwordValue === '') {
            passwordError.textContent = '❌ Password is required';
            passwordInput.classList.add('error');
            hasError = true;
        } else if (passwordValue.length < 8) {
            passwordError.textContent = '❌ Password must be at least 8 characters long';
            passwordInput.classList.add('error');
            hasError = true;
        }
        
        if (!hasError) {
            alert('✅ Form submitted successfully! (This is just a demonstration)');
            validationForm.reset();
        }
    });

    // Scenario 2: Network Error
    const networkErrorBtn = document.getElementById('networkErrorBtn');
    const networkErrorDisplay = document.getElementById('networkErrorDisplay');

    networkErrorBtn.addEventListener('click', function() {
        networkErrorDisplay.innerHTML = `
            <div class="error-box">
                <h4>🌐 Network Connection Failed</h4>
                <p>Unable to reach the server. Please check your internet connection.</p>
                <p><span class="error-code">ERR_NETWORK_FAILURE</span></p>
                <p style="margin-top: 10px; font-size: 0.9em;">Common causes:</p>
                <ul style="margin-left: 20px; font-size: 0.9em;">
                    <li>No internet connection</li>
                    <li>Server is down</li>
                    <li>Firewall blocking the request</li>
                </ul>
            </div>
        `;
    });

    // Scenario 3: System Error (500)
    const systemErrorBtn = document.getElementById('systemErrorBtn');
    const systemErrorDisplay = document.getElementById('systemErrorDisplay');

    systemErrorBtn.addEventListener('click', function() {
        systemErrorDisplay.innerHTML = `
            <div class="error-box">
                <h4>⚠️ Internal Server Error</h4>
                <p>Something went wrong on our end. We're working to fix it.</p>
                <p><span class="error-code">HTTP 500 - Internal Server Error</span></p>
                <p style="margin-top: 10px; font-size: 0.9em;">
                    Our team has been notified. Please try again later.
                </p>
                <p style="font-size: 0.85em; color: #666; margin-top: 5px;">
                    Error ID: ERR-${generateErrorId()}
                </p>
            </div>
        `;
    });

    // Scenario 4: Permission Denied
    const permissionErrorBtn = document.getElementById('permissionErrorBtn');
    const permissionErrorDisplay = document.getElementById('permissionErrorDisplay');

    permissionErrorBtn.addEventListener('click', function() {
        permissionErrorDisplay.innerHTML = `
            <div class="error-box warning">
                <h4>🔒 Access Denied</h4>
                <p>You don't have permission to access this resource.</p>
                <p><span class="error-code">HTTP 403 - Forbidden</span></p>
                <p style="margin-top: 10px; font-size: 0.9em;">
                    This area is restricted to authorized users only.
                </p>
                <p style="font-size: 0.9em; margin-top: 5px;">
                    Need access? Contact your administrator.
                </p>
            </div>
        `;
    });

    // Scenario 5: Timeout Error
    const timeoutErrorBtn = document.getElementById('timeoutErrorBtn');
    const timeoutErrorDisplay = document.getElementById('timeoutErrorDisplay');

    timeoutErrorBtn.addEventListener('click', function() {
        timeoutErrorDisplay.innerHTML = `
            <div class="error-box info">
                <h4>⏱️ Request Timeout</h4>
                <p>The request took too long to complete.</p>
                <p><span class="error-code">HTTP 408 - Request Timeout</span></p>
                <p style="margin-top: 10px; font-size: 0.9em;">
                    The server didn't receive a complete request in the expected time.
                </p>
                <p style="font-size: 0.9em; margin-top: 5px;">
                    Please try again. If the problem persists, contact support.
                </p>
            </div>
        `;
    });

    // Scenario 6: Rate Limit Error
    const rateLimitBtn = document.getElementById('rateLimitBtn');
    const rateLimitDisplay = document.getElementById('rateLimitDisplay');

    rateLimitBtn.addEventListener('click', function() {
        rateLimitDisplay.innerHTML = `
            <div class="error-box warning">
                <h4>🚫 Rate Limit Exceeded</h4>
                <p>You've made too many requests. Please slow down.</p>
                <p><span class="error-code">HTTP 429 - Too Many Requests</span></p>
                <p style="margin-top: 10px; font-size: 0.9em;">
                    Rate limit: 100 requests per minute
                </p>
                <p style="font-size: 0.9em; margin-top: 5px;">
                    Try again in: <strong>45 seconds</strong>
                </p>
            </div>
        `;
    });

    // Reset All Scenarios
    const resetBtn = document.getElementById('resetBtn');

    resetBtn.addEventListener('click', function() {
        // Reset form
        validationForm.reset();
        emailError.textContent = '';
        passwordError.textContent = '';
        emailInput.classList.remove('error');
        passwordInput.classList.remove('error');
        
        // Clear all error displays
        networkErrorDisplay.innerHTML = '';
        systemErrorDisplay.innerHTML = '';
        permissionErrorDisplay.innerHTML = '';
        timeoutErrorDisplay.innerHTML = '';
        rateLimitDisplay.innerHTML = '';
        
        // Visual feedback
        resetBtn.textContent = '✅ Reset Complete!';
        setTimeout(function() {
            resetBtn.textContent = 'Reset All Scenarios';
        }, 2000);
    });

    // Helper Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function generateErrorId() {
        return Math.random().toString(36).slice(2, 11).toUpperCase();
    }
});
