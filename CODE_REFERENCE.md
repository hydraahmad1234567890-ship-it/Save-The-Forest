# 💻 Code Reference Guide

## Quick Code Snippets for Common Tasks

---

## 🔧 Page Navigation

### Switch Between Pages
```javascript
// Go to authentication page
goToPage('authPage');

// Go to agreement page  
goToPage('agreementPage');

// Go to main page
goToPage('mainPage');
```

### Switch Between Auth Tabs
```javascript
// Show Login tab
switchTab('login');

// Show Register tab
switchTab('register');

// Show Forgot Password tab
switchTab('forgot');
```

---

## 📝 Form Validation Examples

### Email Validation
```javascript
// Check if email already registered
const userExists = registeredUsers.some(u => u.email === email);

if (userExists) {
    showStatus('authStatus', 'Email already registered!', 'error');
    return;
}
```

### Password Validation
```javascript
// Check minimum length
if (password.length < 6) {
    showStatus('authStatus', 'Password must be at least 6 characters!', 'error');
    return;
}

// Check if passwords match
if (password !== confirmPassword) {
    showStatus('authStatus', 'Passwords do not match!', 'error');
    return;
}
```

---

## 🔐 Authentication Logic

### Save User to Storage
```javascript
const newUser = { name, email, password };
registeredUsers.push(newUser);
localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
```

### Retrieve Registered Users
```javascript
let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
```

### Login User
```javascript
const user = registeredUsers.find(u => u.email === email && u.password === password);

if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    // Proceed to next page
}
```

### Get Current User
```javascript
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const userName = currentUser?.name || 'User';
```

### Logout User
```javascript
localStorage.removeItem('currentUser');
goToPage('authPage');
```

---

## 🔑 OTP Forgot Password Flow

### Generate OTP
```javascript
function sendOTP() {
    const email = document.getElementById('forgotEmail').value.trim();
    
    // Validate email exists
    const userExists = registeredUsers.some(u => u.email === email);
    if (!userExists) {
        showStatus('authStatus', 'Email not found!', 'error');
        return;
    }
    
    // Generate 6-digit OTP
    generateOTP = Math.floor(100000 + Math.random() * 900000);
    currentResetEmail = email;
    
    // In production: Send via email API
    // For demo: Show in alert
    alert(`OTP: ${generateOTP}`);
    
    // Move to OTP entry step
    document.getElementById('forgotStep1').style.display = 'none';
    document.getElementById('forgotStep2').style.display = 'block';
}
```

### Verify OTP
```javascript
function verifyOTP() {
    const enteredOTP = document.getElementById('otpInput').value.trim();
    
    if (parseInt(enteredOTP) === generateOTP) {
        showStatus('authStatus', 'OTP verified!', 'success');
        document.getElementById('forgotStep2').style.display = 'none';
        document.getElementById('forgotStep3').style.display = 'block';
    } else {
        showStatus('authStatus', 'Invalid OTP!', 'error');
    }
}
```

### Reset Password
```javascript
function resetPassword() {
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmNewPassword').value.trim();
    
    // Validate
    if (newPassword !== confirmPassword) {
        showStatus('authStatus', 'Passwords do not match!', 'error');
        return;
    }
    
    // Update user password
    const userIndex = registeredUsers.findIndex(u => u.email === currentResetEmail);
    if (userIndex !== -1) {
        registeredUsers[userIndex].password = newPassword;
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        showStatus('authStatus', 'Password reset successful!', 'success');
    }
}
```

---

## 💬 Contact Auto-Greeting

### Email Auto-Greeting
```javascript
function emailGreeting(e) {
    e.preventDefault();
    
    // Get logged-in user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userName = currentUser?.name || 'User';
    
    // Create personalized message
    const emailBody = `Hello Save the Forest team,\n\nMy name is ${userName}. I'm interested in learning more about your forest conservation campaign and would like to discuss potential collaboration or support.\n\nI look forward to hearing from you.\n\nBest regards,\n${userName}`;
    
    // Open email client
    const mailto = `mailto:info@savetheforest.com?subject=Forest%20Conservation%20Inquiry&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailto;
}
```

### WhatsApp Auto-Greeting
```javascript
function whatsappGreeting(e) {
    // Get logged-in user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userName = currentUser?.name || 'User';
    
    // Create personalized message
    const message = `Hello! My name is ${userName}. I'm very interested in your Save the Forest campaign and would like to know more about how I can contribute to environmental conservation. Could you share more details? Thank you!`;
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
```

---

## 📧 Contact Form Handling

### Submit Contact Form
```javascript
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const inputs = form.querySelectorAll('input, textarea');
    const [nameInput, emailInput, messageInput] = inputs;
    
    const contactMessage = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
        timestamp: new Date().toLocaleString()
    };
    
    // Store message
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.push(contactMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    // Show success
    showStatus('formStatus', 'Message sent successfully!', 'success');
    form.reset();
});
```

---

## 🎨 UI Status Messages

### Show Success Message
```javascript
showStatus('authStatus', 'Login successful!', 'success');
// Auto-hides after 3 seconds
```

### Show Error Message
```javascript
showStatus('authStatus', 'Invalid email or password!', 'error');
// Shows until user takes action
```

### Generic Status Message Function
```javascript
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
```

---

## 📱 DOM Selectors Used

### Get Elements by ID
```javascript
// Get form elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Get page elements
const authPage = document.getElementById('authPage');
const mainPage = document.getElementById('mainPage');

// Get tab elements
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
```

### Query by Class or Selector
```javascript
// Get all pages
document.querySelectorAll('.page');

// Get all auth tabs
document.querySelectorAll('.auth-tab');

// Get all inputs in form
form.querySelectorAll('input, textarea');
```

---

## 🔄 Event Listeners

### Form Submit
```javascript
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Handle login
});
```

### Click Event
```javascript
document.getElementById('emailBtn').addEventListener('click', function(e) {
    emailGreeting(e);
});
```

### Window Load
```javascript
window.addEventListener('load', function() {
    // Check if user already logged in
    const currentUser = localStorage.getItem('currentUser');
    
    if (currentUser) {
        goToPage('mainPage');
    } else {
        goToPage('authPage');
    }
});
```

---

## 💾 LocalStorage Operations

### Save Data
```javascript
// Save object
const user = { name: 'John', email: 'john@example.com' };
localStorage.setItem('currentUser', JSON.stringify(user));

// Save array
const users = [user1, user2, user3];
localStorage.setItem('registeredUsers', JSON.stringify(users));
```

### Retrieve Data
```javascript
// Get object
const user = JSON.parse(localStorage.getItem('currentUser')) || null;

// Get array with fallback
const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
```

### Delete Data
```javascript
// Delete single key
localStorage.removeItem('currentUser');

// Clear all
localStorage.clear();
```

### Check if Exists
```javascript
if (localStorage.getItem('currentUser')) {
    console.log('User is logged in');
}
```

---

## 🎯 Common Patterns

### Ternary Operator for Default Values
```javascript
const userName = currentUser?.name || 'User';
// If currentUser exists and has name, use it
// Otherwise use 'User'
```

### Array Find Method
```javascript
const user = registeredUsers.find(u => u.email === email);
// Returns first matching user or undefined
```

### Array Some Method
```javascript
const exists = registeredUsers.some(u => u.email === email);
// Returns true if any matching user found
```

### Spread in URL Parameters
```javascript
const mailto = `mailto:info@example.com?subject=Hello&body=${encodeURIComponent(message)}`;
// encodeURIComponent handles special characters
```

---

## 🔧 CSS Classes for Status

### Success Status
```css
.status-message.success {
    background: #c8e6c9;
    color: #1b5e20;
    border-left: 4px solid #1b5e20;
}
```

### Error Status
```css
.status-message.error {
    background: #ffcdd2;
    color: #c62828;
    border-left: 4px solid #c62828;
}
```

---

## 📋 Form Input Examples

### Get Form Values
```javascript
const form = document.getElementById('loginForm');
const email = form.querySelector('input[type="email"]').value;
const password = form.querySelector('input[type="password"]').value;
```

### Reset Form
```javascript
document.getElementById('loginForm').reset();
// Clears all input fields
```

### Get All Inputs
```javascript
const inputs = form.querySelectorAll('input, textarea');
const [input1, input2, input3] = inputs;
```

---

## 🌐 URL Scheme Usage

### Mailto Links
```javascript
const mailtoURL = `mailto:info@example.com?subject=Hello&body=Message`;
window.location.href = mailtoURL;
```

### WhatsApp Links
```javascript
const whatsappURL = `https://wa.me/1234567890?text=Hello`;
window.open(whatsappURL, '_blank');
```

### With Special Characters
```javascript
const message = "Hello, how are you?";
const encoded = encodeURIComponent(message);
// "Hello%2C%20how%20are%20you%3F"
```

---

## 🎨 Toggle Display

### Show/Hide Element
```javascript
// Hide
element.style.display = 'none';

// Show
element.style.display = 'block';

// Toggle class
element.classList.toggle('active');

// Add class
element.classList.add('active');

// Remove class
element.classList.remove('active');
```

---

## 📊 Data Structure Examples

### User Object
```javascript
{
    name: "John Doe",
    email: "john@example.com",
    password: "password123"
}
```

### Contact Message Object
```javascript
{
    name: "Visitor Name",
    email: "visitor@example.com",
    message: "I want to help",
    timestamp: "1/21/2026, 2:30:45 PM"
}
```

### Registered Users Array
```javascript
[
    { name: "User 1", email: "user1@example.com", password: "pass1" },
    { name: "User 2", email: "user2@example.com", password: "pass2" }
]
```

---

## 🚀 Performance Tips

### Optimize Selectors
```javascript
// Good
const user = document.getElementById('userId');

// Avoid
const user = document.querySelector('#userId');

// Very Avoid
const user = document.querySelectorAll('div')[5];
```

### Cache DOM Queries
```javascript
// Instead of querying multiple times
const form = document.getElementById('form');
const input1 = form.querySelector('input');
const input2 = form.querySelector('input[type="email"]');

// Better
const inputs = form.querySelectorAll('input');
```

---

## 🧪 Testing Tips

### Test in Console
```javascript
// Check registered users
console.log(JSON.parse(localStorage.getItem('registeredUsers')));

// Check current user
console.log(JSON.parse(localStorage.getItem('currentUser')));

// Check contact messages
console.log(JSON.parse(localStorage.getItem('contactMessages')));

// Clear specific key
localStorage.removeItem('currentUser');
```

---

## 📚 Reference

- [MDN - LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN - querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [MDN - addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [MDN - Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

---

Happy coding! 🎉
