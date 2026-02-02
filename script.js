// ==================== PAGE NAVIGATION ====================
function goToPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function switchTab(tabName) {
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabName + 'Tab').classList.add('active');
}

// ==================== LOCAL STORAGE DATA ====================
let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
let generateOTP = null;
let currentResetEmail = null;

// ==================== AUTH FUNCTIONS ====================
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    const user = registeredUsers.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Send login email notification
        sendEmailNotification(email, user.name, 'login');
        showStatus('authStatus', 'Login successful! Redirecting...', 'success');
        setTimeout(() => {
            goToPage('agreementPage');
            form.reset();
        }, 1500);
    } else {
        showStatus('authStatus', 'Invalid email or password!', 'error');
    }
});

document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll('input');
    const [nameInput, emailInput, passwordInput, confirmPasswordInput] = inputs;

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validation
    if (password !== confirmPassword) {
        showStatus('authStatus', 'Passwords do not match!', 'error');
        return;
    }

    if (password.length < 6) {
        showStatus('authStatus', 'Password must be at least 6 characters!', 'error');
        return;
    }

    if (registeredUsers.some(u => u.email === email)) {
        showStatus('authStatus', 'Email already registered!', 'error');
        return;
    }

    // Register user with profile data
    const newUser = {
        name,
        email,
        password,
        title: '🌱 Seedling',
        badge: '🌱',
        streak: 0,
        lastStreakDate: null,
        profilePicture: null
    };
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

    // Send registration email notification
    sendEmailNotification(email, name, 'registered');

    showStatus('authStatus', 'Registration successful! Please login.', 'success');
    setTimeout(() => {
        switchTab('login');
        form.reset();
        document.querySelector('#authStatus').classList.remove('show');
    }, 1500);
});

// ==================== FORGOT PASSWORD FLOW (OTP-BASED) ====================
// Show email input section
function showEmailInput() {
    document.getElementById('emailInputSection').style.display = 'block';
    document.getElementById('phoneInputSection').style.display = 'none';
}

// Show phone input section
function showPhoneInput(method) {
    document.getElementById('emailInputSection').style.display = 'none';
    document.getElementById('phoneInputSection').style.display = 'block';
    const methodText = method === 'sms' ? 'SMS' : 'WhatsApp';
    document.getElementById('phoneMethodInfo').textContent = `We'll send OTP to this number via ${methodText}`;
}

function sendOTP() {
    const otpMethod = document.querySelector('input[name="otpMethod"]:checked').value;
    const forgotMessage = document.getElementById('forgotMessage');
    let contact = '';
    let contactType = '';

    if (otpMethod === 'email') {
        contact = document.getElementById('forgotEmail').value.trim();
        contactType = 'email';

        if (!contact) {
            forgotMessage.textContent = '❌ Please enter your email address!';
            forgotMessage.style.color = '#d32f2f';
            return;
        }
    } else if (otpMethod === 'sms' || otpMethod === 'whatsapp') {
        contact = document.getElementById('forgotPhone').value.trim();
        contactType = otpMethod === 'sms' ? 'phone (SMS)' : 'phone (WhatsApp)';

        if (!contact) {
            const method = otpMethod === 'sms' ? 'SMS' : 'WhatsApp';
            forgotMessage.textContent = `❌ Please enter your phone number for ${method}!`;
            forgotMessage.style.color = '#d32f2f';
            return;
        }

        if (contact.length < 10) {
            forgotMessage.textContent = '❌ Please enter a valid phone number!';
            forgotMessage.style.color = '#d32f2f';
            return;
        }
    }

    // Find user by contact information
    let user = null;
    if (otpMethod === 'email') {
        user = registeredUsers.find(u => u.email === contact);
        if (!user) {
            forgotMessage.textContent = '❌ Email not found in our system!';
            forgotMessage.style.color = '#d32f2f';
            return;
        }
    } else if (otpMethod === 'sms' || otpMethod === 'whatsapp') {
        user = registeredUsers.find(u => u.phoneNumber === contact);
        if (!user) {
            forgotMessage.textContent = '❌ Phone number not registered! Please use Email option.';
            forgotMessage.style.color = '#d32f2f';
            return;
        }
    }

    // Generate 6-digit OTP
    generateOTP = Math.floor(100000 + Math.random() * 900000);
    currentResetEmail = user.email;
    const otpExpiryTime = Date.now() + (10 * 60 * 1000); // OTP expires in 10 minutes
    localStorage.setItem('otpExpiry', otpExpiryTime);

    // Simulate sending OTP based on delivery method
    let deliveryInfo = '';
    let messageContent = '';
    let displayContact = '';

    if (otpMethod === 'email') {
        deliveryInfo = `📧 OTP sent to your email`;
        messageContent = `Email OTP\n\nYour OTP is: ${generateOTP}\n\nEmail: ${contact}\n\nOTP Valid for 10 minutes.\nDo not share this with anyone.`;
        displayContact = contact;
    } else if (otpMethod === 'sms') {
        deliveryInfo = `📱 OTP sent via SMS to ${maskPhoneNumber(contact)}`;
        messageContent = `SMS OTP\n\nYour OTP is: ${generateOTP}\n\nPhone: ${maskPhoneNumber(contact)}\n\nOTP Valid for 10 minutes.`;
        displayContact = maskPhoneNumber(contact);
    } else if (otpMethod === 'whatsapp') {
        deliveryInfo = `💬 OTP sent via WhatsApp to ${maskPhoneNumber(contact)}`;
        messageContent = `WhatsApp OTP\n\nYour OTP is: ${generateOTP}\n\nPhone: ${maskPhoneNumber(contact)}\n\nOTP Valid for 10 minutes.`;
        displayContact = maskPhoneNumber(contact);
    }

    // Log to console (in production, this would use actual email/SMS/WhatsApp APIs)
    console.log(`🔐 PASSWORD RECOVERY OTP`);
    console.log(`Method: ${otpMethod.toUpperCase()}`);
    console.log(`Contact: ${displayContact}`);
    console.log(`${messageContent}`);

    // Show alert with OTP for demo
    alert(`🔐 PASSWORD RECOVERY\n\n${messageContent}\n\n${deliveryInfo}\n\n(In production, this would be sent via the selected method only)`);

    // Update UI with delivery method info
    document.getElementById('otpDeliveryInfo').textContent = deliveryInfo;

    // Move to step 2 - OTP verification
    forgotMessage.textContent = `✅ ${deliveryInfo}`;
    forgotMessage.style.color = '#4CAF50';

    setTimeout(() => {
        document.getElementById('forgotStep1').style.display = 'none';
        document.getElementById('forgotStep2').style.display = 'block';
        document.getElementById('otpInput').value = '';
        document.getElementById('otpInput').focus();
        document.getElementById('forgotMessage').textContent = '';
    }, 1500);
}

// Helper function to mask phone numbers
function maskPhoneNumber(phone) {
    if (!phone) return 'Not provided';
    const phoneStr = phone.toString();
    if (phoneStr.length <= 4) return phoneStr;
    return '*'.repeat(phoneStr.length - 4) + phoneStr.slice(-4);
}

function verifyOTP() {
    const otpInput = document.getElementById('otpInput');
    const enteredOTP = otpInput.value.trim();
    const forgotMessage = document.getElementById('forgotMessage');

    if (!enteredOTP) {
        forgotMessage.textContent = '❌ Please enter the OTP!';
        forgotMessage.style.color = '#d32f2f';
        return;
    }

    if (enteredOTP.length !== 6 || isNaN(enteredOTP)) {
        forgotMessage.textContent = '❌ OTP must be 6 digits!';
        forgotMessage.style.color = '#d32f2f';
        return;
    }

    if (parseInt(enteredOTP) === generateOTP) {
        forgotMessage.textContent = '✅ OTP verified successfully!';
        forgotMessage.style.color = '#4CAF50';

        // Move to step 3 - Set new password
        setTimeout(() => {
            document.getElementById('forgotStep2').style.display = 'none';
            document.getElementById('forgotStep3').style.display = 'block';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmNewPassword').value = '';
            document.getElementById('newPassword').focus();
            document.getElementById('forgotMessage').textContent = '';
        }, 1000);
    } else {
        forgotMessage.textContent = '❌ Invalid OTP! Please try again.';
        forgotMessage.style.color = '#d32f2f';
        otpInput.value = '';
    }
}

function resetPassword() {
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmNewPassword').value.trim();
    const forgotMessage = document.getElementById('forgotMessage');

    if (!newPassword || !confirmPassword) {
        forgotMessage.textContent = '❌ Please fill all fields!';
        forgotMessage.style.color = '#d32f2f';
        return;
    }

    if (newPassword.length < 6) {
        forgotMessage.textContent = '❌ Password must be at least 6 characters!';
        forgotMessage.style.color = '#d32f2f';
        return;
    }

    if (newPassword !== confirmPassword) {
        forgotMessage.textContent = '❌ Passwords do not match!';
        forgotMessage.style.color = '#d32f2f';
        return;
    }

    // Update user password
    const userIndex = registeredUsers.findIndex(u => u.email === currentResetEmail);
    if (userIndex !== -1) {
        registeredUsers[userIndex].password = newPassword;
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

        forgotMessage.textContent = '✅ Password updated successfully!';
        forgotMessage.style.color = '#4CAF50';

        setTimeout(() => {
            resetForgotForm();
            switchTab('login');
        }, 1500);
    }
}

function backToEmailStep() {
    document.getElementById('forgotStep2').style.display = 'none';
    document.getElementById('forgotStep1').style.display = 'block';
    document.getElementById('otpInput').value = '';
    document.getElementById('forgotMessage').textContent = '';

    // Reset to email input by default
    document.querySelector('input[name="otpMethod"][value="email"]').checked = true;
    showEmailInput();
}

function resetForgotForm() {
    document.getElementById('forgotEmail').value = '';
    document.getElementById('forgotPhone').value = '';
    document.getElementById('otpInput').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';

    document.getElementById('forgotStep1').style.display = 'block';
    document.getElementById('forgotStep2').style.display = 'none';
    document.getElementById('forgotStep3').style.display = 'none';
    document.getElementById('forgotMessage').textContent = '';

    // Reset to email input by default
    document.querySelector('input[name="otpMethod"][value="email"]').checked = true;
    showEmailInput();

    generateOTP = null;
    currentResetEmail = null;
}

// ==================== AGREEMENT PAGE ====================
function goBack() {
    document.getElementById('agreeCheckbox').checked = false;
    goToPage('authPage');
    document.querySelector('#agreementStatus').classList.remove('show', 'success', 'error');
}

function acceptAgreement() {
    const checkbox = document.getElementById('agreeCheckbox');

    if (!checkbox.checked) {
        showStatus('agreementStatus', 'Please agree to the terms to continue!', 'error');
        return;
    }

    showStatus('agreementStatus', 'Terms accepted! Proceeding to main page...', 'success');
    setTimeout(() => {
        goToPage('mainPage');
    }, 1500);
}

function showPrivacy() {
    alert('🔒 PRIVACY POLICY\n\n' +
        'We collect and protect your personal data securely.\n' +
        '• Your information is encrypted\n' +
        '• We do not sell your data to third parties\n' +
        '• You can request data deletion anytime\n' +
        '• Your privacy is our priority');
}

function showTerms() {
    alert('📋 TERMS OF SERVICE\n\n' +
        'By using this platform:\n' +
        '• You agree to use it responsibly\n' +
        '• You respect environmental initiatives\n' +
        '• You follow all applicable laws\n' +
        '• You maintain data confidentiality');
}

// ==================== CONTACT FUNCTIONS ====================
function emailGreeting(e) {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userName = currentUser?.name || 'User';

    // Auto-greeting in the email body
    const emailBody = `Hello Save the Forest team,\n\nMy name is ${userName}. I'm interested in learning more about your forest conservation campaign and would like to discuss potential collaboration or support.\n\nI look forward to hearing from you.\n\nBest regards,\n${userName}`;

    const mailto = `mailto:info@savetheforest.com?subject=Forest%20Conservation%20Inquiry&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailto;

    console.log('📧 Email client opened with auto-greeting');
}

function whatsappGreeting(e) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userName = currentUser?.name || 'User';

    // Auto-greeting for WhatsApp
    const message = `Hello! My name is ${userName}. I'm very interested in your Save the Forest campaign and would like to know more about how I can contribute to environmental conservation. Could you share more details? Thank you!`;

    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    console.log('💬 WhatsApp link created with auto-greeting');
}

document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll('input, textarea');
    const [nameInput, emailInput, messageInput] = inputs;

    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;

    // Store message (in real app, send to server)
    const contactMessage = {
        name,
        email,
        message,
        timestamp: new Date().toLocaleString()
    };

    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.push(contactMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    showStatus('formStatus', 'Message sent successfully! We will get back to you soon.', 'success');
    form.reset();

    setTimeout(() => {
        document.getElementById('formStatus').classList.remove('show');
    }, 4000);
});

// ==================== LOGOUT ====================
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        goToPage('authPage');
        switchTab('login');
        document.getElementById('authStatus').classList.remove('show');
        document.getElementById('agreementStatus').classList.remove('show');
    }
}

// ==================== UTILITY FUNCTIONS ====================
function showStatus(elementId, message, type) {
    const statusElement = document.getElementById(elementId);
    statusElement.textContent = message;
    statusElement.className = `status-message show ${type}`;

    if (type === 'error') {
        setTimeout(() => {
            statusElement.classList.remove('show');
        }, 3000);
    }
}

// ==================== PROFILE FUNCTIONS ====================
function addToStreak() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const today = new Date().toDateString();

    if (currentUser.lastStreakDate === today) {
        showStatus('authStatus', 'You already added today! Come back tomorrow.', 'error');
        return;
    }

    currentUser.streak = (currentUser.streak || 0) + 1;
    currentUser.lastStreakDate = today;

    // Update title based on streak
    updateTitle(currentUser);

    // Update user in registered users
    const userIndex = registeredUsers.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        registeredUsers[userIndex] = currentUser;
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    loadProfileData();
    showStatus('authStatus', `🔥 Streak increased to ${currentUser.streak} days!`, 'success');
}

function updateTitle(user) {
    const streak = user.streak || 0;

    if (streak >= 100) {
        user.title = '👑 Legend';
        user.badge = '👑';
    } else if (streak >= 61) {
        user.title = '⭐ Conservation Hero';
        user.badge = '⭐';
    } else if (streak >= 31) {
        user.title = '🌲 Forest Elder';
        user.badge = '🌲';
    } else if (streak >= 16) {
        user.title = '🌳 Tree Guardian';
        user.badge = '🌳';
    } else if (streak >= 6) {
        user.title = '🌿 Sprout';
        user.badge = '🌿';
    } else {
        user.title = '🌱 Seedling';
        user.badge = '🌱';
    }
}

function loadProfileData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    // Update profile info
    document.getElementById('rangerName').textContent = currentUser.name + ' (Forest Ranger)';
    document.getElementById('rangerEmail').textContent = currentUser.email;
    document.getElementById('rangerTitle').textContent = currentUser.title || '🌱 Seedling';
    document.getElementById('rankBadge').textContent = currentUser.badge || '🌱';

    // Update streak
    document.getElementById('streakCount').textContent = currentUser.streak || 0;

    const lastDate = currentUser.lastStreakDate ? new Date(currentUser.lastStreakDate).toLocaleDateString() : 'No activity yet';
    document.getElementById('lastStreakDate').textContent = lastDate;

    // Update profile picture
    if (currentUser.profilePicture) {
        document.getElementById('profilePicture').src = currentUser.profilePicture;
    }

    // Update title badges
    updateTitleBadges(currentUser.streak || 0);
}

function updateTitleBadges(streak) {
    // Remove current class from all
    document.querySelectorAll('.title-badge').forEach(badge => badge.classList.remove('current'));

    // Add current to appropriate badge
    if (streak >= 100) {
        document.getElementById('title-legend')?.classList.add('current');
    } else if (streak >= 61) {
        document.getElementById('title-hero')?.classList.add('current');
    } else if (streak >= 31) {
        document.getElementById('title-elder')?.classList.add('current');
    } else if (streak >= 16) {
        document.getElementById('title-tree')?.classList.add('current');
    } else if (streak >= 6) {
        document.getElementById('title-sprout')?.classList.add('current');
    } else {
        // Add current to first badge (Seedling) by default
        const firstBadge = document.querySelector('.title-badge');
        if (firstBadge) firstBadge.classList.add('current');
    }
}

function sendEmailNotification(email, name, type) {
    const subject = type === 'registered' ? '✓ Successfully Registered' : '✓ Successfully Logged In';
    const message = type === 'registered'
        ? `Welcome to Save the Forest, ${name}! Your account has been successfully registered. You are now a Forest Ranger!`
        : `Welcome back, ${name}! You have successfully logged in. Keep growing your conservation streak!`;

    // Show email modal
    showEmailModal(subject, message, email, name);

    // Log to console (in production, this would send actual email)
    console.log(`📧 Email sent to ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
}

function showEmailModal(subject, message, email, name) {
    const modal = document.getElementById('emailModal');
    document.getElementById('emailMessage').textContent = message;
    document.getElementById('emailSentTo').innerHTML = `<strong>Sent to:</strong> ${email}`;
    document.getElementById('emailTitle').innerHTML = `<strong>Title:</strong> Forest Ranger`;
    modal.style.display = 'flex';
}

function closeEmailModal() {
    document.getElementById('emailModal').style.display = 'none';
}

// Picture upload handler
document.addEventListener('DOMContentLoaded', function () {
    const picUpload = document.getElementById('picUpload');
    if (picUpload) {
        picUpload.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    currentUser.profilePicture = event.target.result;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));

                    // Update in registered users
                    const userIndex = registeredUsers.findIndex(u => u.email === currentUser.email);
                    if (userIndex !== -1) {
                        registeredUsers[userIndex].profilePicture = event.target.result;
                        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
                    }

                    document.getElementById('profilePicture').src = event.target.result;
                    showStatus('authStatus', '✓ Profile picture updated!', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

// ==================== PAGE INITIALIZATION ====================
window.addEventListener('load', function () {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
        // User is logged in and has agreed to terms
        goToPage('mainPage');
        loadProfileData();
    } else {
        // Show login page
        goToPage('authPage');
        switchTab('login');
    }

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && !href.includes('onclick')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        const modal = document.getElementById('emailModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// ==================== DEMO DATA ====================
// Add demo user for testing
window.addEventListener('load', function () {
    if (registeredUsers.length === 0) {
        const demoUser = {
            name: 'Demo User',
            email: 'demo@example.com',
            password: 'demo123',
            phoneNumber: '03001234567',
            title: '🌱 Seedling',
            badge: '🌱',
            streak: 0,
            lastStreakDate: null,
            profilePicture: null
        };
        registeredUsers.push(demoUser);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        console.log('Demo credentials: demo@example.com / demo123');
        console.log('Demo phone: 03001234567');
    }
});
