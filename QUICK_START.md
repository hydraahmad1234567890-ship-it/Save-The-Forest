# 🌳 Quick Start Guide - Save the Forest Campaign

## ✅ What's Been Implemented

Your project now has a **complete 3-page security system** with all requested features:

### ✨ Page 1: Login/Register/Forgot Password
- ✅ User login system
- ✅ User registration with validation
- ✅ Forgot password with OTP flow
  - Enter email → Receive OTP → Enter OTP → Reset password

### ✨ Page 2: Privacy & Terms Agreement
- ✅ Comprehensive privacy policy
- ✅ Terms of service
- ✅ Cookie policy
- ✅ Support contact information
- ✅ Mandatory checkbox to proceed

### ✨ Page 3: Main Content Page
- ✅ **Email Contact** - Click to send email with auto-greeting including user's name
- ✅ **WhatsApp Contact** - Click to open WhatsApp with auto-personalized greeting
- ✅ All campaign content (about, impact, gallery)
- ✅ Contact form
- ✅ Logout functionality

---

## 🚀 How to Run

1. **Replace the old file**
   - Delete `PROJECT ICT.html`
   - Use the new `index.html` instead

2. **Keep these files in the same folder**
   - `index.html` - Main file (new)
   - `style.css` - Styling (updated)
   - `script.js` - JavaScript (new)

3. **Open in browser**
   - Simply open `index.html` in any modern web browser
   - No server needed - runs completely locally

---

## 🧪 Test with Demo Credentials

```
Email: demo@example.com
Password: demo123
```

### Test Flow:
1. Login with demo credentials
2. Read and accept terms/privacy
3. See the main page with contact features
4. Click "Send Email" or "WhatsApp Now" to test contact methods
5. Click "Logout" to return to login page

---

## 🎯 Key Features Explained

### Auto-Greeting System
When a user clicks email or WhatsApp:
- Their name is automatically included in the greeting
- Professional message is pre-filled
- They can add more details if needed

Example:
```
"Hello! My name is [User Name]. I'm interested in learning 
more about your forest conservation campaign..."
```

### OTP Forgot Password Flow
1. User enters email on "Forgot Password" tab
2. System generates 6-digit OTP (shown in alert for demo)
3. User enters OTP to verify
4. User sets new password
5. User can login with new password

### Security Features
- Password minimum 6 characters
- Email uniqueness validation
- Password confirmation matching
- Session management
- Logout clears user data

---

## 📝 What You Can Customize

### Contact Information
Open `index.html` and search for:
- `info@savetheforest.com` - Change to your email
- `+1-234-567-8900` - Change to your WhatsApp number

### Colors
Open `style.css` and modify:
- `#1b5e20` - Primary green
- `#2e7d32` - Secondary green

### Privacy Text
Open `index.html` and edit the agreement section with your actual policies

### Contact Form Fields
Add more fields in the contact form section of `index.html`

---

## 🔐 Production Considerations

When moving to production:

1. **Email OTP**
   - Currently shows OTP in alert (demo)
   - Use SendGrid, Nodemailer, or similar to send actual emails

2. **Data Storage**
   - Currently uses browser localStorage
   - Switch to a real database (Firebase, MongoDB, etc.)

3. **Password Security**
   - Currently stores plain text (demo only)
   - Use bcrypt or similar for hashing

4. **WhatsApp Integration**
   - Currently opens WhatsApp Web
   - For business: Use WhatsApp Business API

---

## ❓ FAQ

**Q: Where is my data stored?**
A: In browser's localStorage (locally on your device). In production, use a database.

**Q: How do I reset the demo data?**
A: Open browser DevTools → Application → LocalStorage → Delete all entries

**Q: Can I customize the pages?**
A: Yes! Edit the HTML/CSS/JS files directly. The code is fully commented.

**Q: Do I need a backend server?**
A: Not for demo. For production with email OTP, real WhatsApp, you'll need a backend.

**Q: Can I add more pages?**
A: Yes! Follow the same pattern - add a `<div class="page">` and use `goToPage()` function.

---

## 📋 File Structure

```
project ICT/
├── index.html        ← Main file (open this)
├── style.css         ← All styling
├── script.js         ← All JavaScript logic
└── README.md         ← This guide
```

---

## 🎨 Page Layouts

### Page 1: Auth Page
```
[Login Tab] [Register Tab] [Forgot Password Tab]
- Forms with validation
- Status messages
- Tab switching
```

### Page 2: Agreement Page
```
Privacy Policy
Terms of Service
Cookie Policy
Support Info

[Checkbox] I agree to terms
[Back Button] [Accept & Continue Button]
```

### Page 3: Main Page
```
[Header with Navigation]
[Hero Section]
[About Section]
[Impact Statistics]
[Gallery]
[Contact Methods]
  - Email with auto-greeting
  - WhatsApp with auto-greeting
[Contact Form]
[Footer]
```

---

## 🌟 What Makes This Professional

✅ Three-tier security system
✅ Responsive design (mobile, tablet, desktop)
✅ User authentication
✅ OTP verification
✅ Auto-greeting on contact
✅ Privacy & terms compliance
✅ Professional UI/UX
✅ No external dependencies
✅ Fully commented code
✅ Easy to customize

---

## 🚀 Next Steps

1. **Test the application** - Go through all 3 pages
2. **Customize contact info** - Update email and phone number
3. **Modify colors/text** - Make it your own
4. **Add backend** - When ready for production
5. **Deploy** - Host on your server

---

**Your security-focused environmental campaign is ready!** 🌍🔐
