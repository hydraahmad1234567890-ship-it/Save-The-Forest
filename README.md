# Save the Forest - Multi-Page Security System

## 🌳 Project Overview
A comprehensive three-page security-focused awareness campaign with authentication, privacy agreements, and environmental conservation content.

## 📋 Features Implemented

### Page 1: Authentication & Security
- **Login** - Existing users can log in with email/password
- **Register** - New users can create accounts
- **Forgot Password** - Complete OTP verification flow:
  1. Enter email
  2. Receive 6-digit OTP
  3. Verify OTP
  4. Set new password

### Page 2: Privacy & Terms Agreement
- Terms of Service
- Privacy Policy
- Cookie Policy  
- Support Contact Information
- Must accept to proceed to main page

### Page 3: Main Content Page
- **Header** with navigation
- **Hero Section** - Campaign introduction
- **About Section** - Campaign details
- **Impact Section** - Statistics and achievements
- **Gallery** - Visual showcase
- **Contact Section** - Two contact methods:
  - **📧 Email** - Auto-greeting with user's name included
  - **💬 WhatsApp** - Auto-greeting with personalized message
- **Contact Form** - Message submission
- **Footer** - Links to privacy and terms

## 🔐 Security Features

1. **User Authentication**
   - Password validation (minimum 6 characters)
   - Email uniqueness checking
   - Password confirmation matching

2. **Forgot Password Flow**
   - Email verification
   - OTP generation and validation
   - Password reset with confirmation

3. **User Agreement Page**
   - Mandatory terms acceptance
   - Privacy policy acknowledgment
   - Cookie consent

4. **Data Storage**
   - All data stored in browser's localStorage
   - Session management
   - Logout functionality

## 🚀 How to Use

### Demo Credentials
```
Email: demo@example.com
Password: demo123
```

### Testing the Application

1. **Register a New Account**
   - Click "Register" tab
   - Fill in all fields
   - Click "Register"
   - Switch back to login and use credentials

2. **Login**
   - Use demo credentials or your registered account
   - Click "Login"
   - You'll be redirected to the agreement page

3. **Accept Terms**
   - Read privacy policy and terms
   - Check the agreement checkbox
   - Click "Accept & Continue"
   - You'll access the main page

4. **Forgot Password Flow**
   - Click "Forgot Password?"
   - Enter your registered email
   - An OTP will be displayed (demo purposes)
   - Enter the OTP
   - Set your new password
   - Login with new credentials

5. **Contact Methods**
   - **Email**: Click "Send Email" to open your default email client with auto-greeting
   - **WhatsApp**: Click "WhatsApp Now" to open WhatsApp with auto-greeting
   - **Contact Form**: Fill and submit the message form

6. **Logout**
   - Click "Logout" in navigation
   - Confirm logout
   - Return to login page

## 📁 File Structure

```
project ICT/
├── index.html      - Main HTML file (replaces PROJECT ICT.html)
├── style.css       - Complete styling
└── script.js       - All JavaScript functionality
```

## 🎨 Design Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Green Theme** - Environment-focused color palette
- **Smooth Animations** - Hover effects and transitions
- **Clean UI** - Modern, professional appearance
- **Accessible Forms** - Easy-to-use input fields

## 💾 Local Storage Data

### Stored Users
```json
{
    "name": "User Full Name",
    "email": "user@example.com", 
    "password": "encrypted_password"
}
```

### Contact Messages
```json
{
    "name": "Sender Name",
    "email": "sender@example.com",
    "message": "User message",
    "timestamp": "Date/Time"
}
```

### Current User Session
```json
{
    "name": "Logged In User",
    "email": "user@example.com",
    "password": "password"
}
```

## 🔧 Customization Guide

### Change Contact Information
Edit these values in `index.html`:
- Email: `info@savetheforest.com`
- WhatsApp: `+1-234-567-8900`

### Change Colors
Edit CSS variables in `style.css`:
- Primary Green: `#1b5e20`
- Secondary Green: `#2e7d32`

### Modify OTP Behavior
In `script.js`, modify the `sendOTP()` function to integrate with email API

### Add More Fields to Registration
Add input fields in `registerForm` and update validation in `script.js`

## ⚙️ Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - No external dependencies required
- **LocalStorage API** - For data persistence
- **Responsive Design** - CSS Grid and Flexbox

## 📱 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎯 Production Ready Considerations

1. **Backend Integration**
   - Replace localStorage with database
   - Integrate email API for OTP sending
   - Add proper password encryption

2. **Security Enhancements**
   - Implement SSL/HTTPS
   - Add CSRF protection
   - Use JWT tokens for sessions
   - Validate all inputs server-side

3. **Email Service**
   - Integrate Nodemailer, SendGrid, or similar
   - Send actual OTPs via email
   - Add email verification

4. **WhatsApp Integration**
   - Use WhatsApp Business API
   - Send automated responses
   - Track conversation history

5. **Analytics**
   - Implement Google Analytics
   - Track user behavior
   - Monitor conversion rates

## 📞 Support & Contact

For any questions or modifications, customize the contact section in the HTML with your actual details.

## 📜 License

This project is created for environmental awareness campaigns.

---

**Start your secure environmental campaign today!** 🌍♻️
