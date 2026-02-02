# 🌳 User Journey & System Architecture

## 📊 Application Flow

```
START
  ↓
┌─────────────────────────────────────┐
│   PAGE 1: AUTHENTICATION            │
│  ┌─────────────────────────────────┐│
│  │ 1. LOGIN TAB                    ││
│  │    - Email & Password input     ││
│  │    - Login validation           ││
│  │    - Switch to Register/Forgot  ││
│  ├─────────────────────────────────┤│
│  │ 2. REGISTER TAB                 ││
│  │    - Name, Email, Password      ││
│  │    - Password confirmation      ││
│  │    - Data validation            ││
│  │    - Store in localStorage      ││
│  ├─────────────────────────────────┤│
│  │ 3. FORGOT PASSWORD TAB          ││
│  │    Step 1: Enter Email          ││
│  │    Step 2: Verify OTP           ││
│  │    Step 3: Set New Password     ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
  │
  ├─→ LOGIN FAILS → Show Error → Try Again
  │
  └─→ LOGIN SUCCESS
       ↓
┌─────────────────────────────────────┐
│   PAGE 2: PRIVACY AGREEMENT         │
│  ┌─────────────────────────────────┐│
│  │ • Privacy Policy                ││
│  │ • Terms of Service              ││
│  │ • Cookie Policy                 ││
│  │ • Support Contact Info          ││
│  │                                 ││
│  │ [✓] I agree to terms           ││
│  │                                 ││
│  │ [← Back] [Accept & Continue →]  ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
  │
  ├─→ NOT CHECKED → Show Error
  │
  └─→ ACCEPTED
       ↓
┌─────────────────────────────────────┐
│   PAGE 3: MAIN CAMPAIGN PAGE        │
│  ┌─────────────────────────────────┐│
│  │ HEADER with Navigation          ││
│  │  [About] [Impact] [Gallery]     ││
│  │  [Contact] [Logout]             ││
│  ├─────────────────────────────────┤│
│  │ HERO SECTION                    ││
│  │ "Protect Our Forests"           ││
│  ├─────────────────────────────────┤│
│  │ ABOUT SECTION                   ││
│  │ Campaign information            ││
│  ├─────────────────────────────────┤│
│  │ IMPACT SECTION                  ││
│  │ • 2.5M+ Trees Saved             ││
│  │ • 500K+ People Reached          ││
│  │ • 50K+ Acres Protected          ││
│  ├─────────────────────────────────┤│
│  │ GALLERY SECTION                 ││
│  │ Visual showcase of projects     ││
│  ├─────────────────────────────────┤│
│  │ CONTACT SECTION                 ││
│  │ ┌───────────────┬───────────────┐│
│  │ │ EMAIL CARD    │ WHATSAPP CARD ││
│  │ │ [Send Email]  │ [WhatsApp Now]││
│  │ │ Auto-greeting │ Auto-greeting ││
│  │ └───────────────┴───────────────┘│
│  │ CONTACT FORM                    ││
│  │ Name, Email, Message submission ││
│  ├─────────────────────────────────┤│
│  │ FOOTER                          ││
│  │ Copyright & Links               ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
  │
  └─→ LOGOUT
       ↓
   Return to LOGIN PAGE
```

---

## 🔐 Forgot Password Flow (Detailed)

```
USER CLICKS "Forgot Password?"
       ↓
┌──────────────────────────────┐
│ STEP 1: EMAIL VERIFICATION   │
│                              │
│ [Enter your email]           │
│ [Send OTP Button]            │
└──────────────────────────────┘
       ↓
EMAIL NOT FOUND? → Show "Email not found" error
       ↓
EMAIL FOUND ↓
Generate 6-digit OTP
Send via email (or show in demo)
       ↓
┌──────────────────────────────┐
│ STEP 2: OTP VERIFICATION     │
│                              │
│ [Enter 6-digit OTP]          │
│ [Verify OTP Button]          │
└──────────────────────────────┘
       ↓
OTP INVALID? → Show error, try again
       ↓
OTP VALID ↓
       ↓
┌──────────────────────────────┐
│ STEP 3: PASSWORD RESET       │
│                              │
│ [New Password]               │
│ [Confirm Password]           │
│ [Reset Password Button]      │
└──────────────────────────────┘
       ↓
VALIDATION CHECKS:
  - Passwords match?
  - Min 6 characters?
       ↓
PASSWORD RESET SUCCESSFUL
Store new password in database
       ↓
Show success message
Return to Login
```

---

## 📱 Contact Methods Flow

### Email Contact
```
USER CLICKS "Send Email"
       ↓
RETRIEVE LOGGED-IN USER'S NAME
       ↓
AUTO-GENERATE GREETING:
"Hello Save the Forest team,

My name is [User Name]. I'm interested in learning 
more about your forest conservation campaign and would 
like to discuss potential collaboration or support.

I look forward to hearing from you.

Best regards,
[User Name]"
       ↓
OPEN DEFAULT EMAIL CLIENT
  - To: info@savetheforest.com
  - Subject: Forest Conservation Inquiry
  - Body: Auto-greeting message
       ↓
USER CAN ADD MORE DETAILS IF NEEDED
```

### WhatsApp Contact
```
USER CLICKS "WhatsApp Now"
       ↓
RETRIEVE LOGGED-IN USER'S NAME
       ↓
AUTO-GENERATE GREETING:
"Hello! My name is [User Name]. I'm very interested 
in your Save the Forest campaign and would like to know 
more about how I can contribute to environmental 
conservation. Could you share more details? Thank you!"
       ↓
OPEN WHATSAPP WEB/APP
  - Number: +1-234-567-8900
  - Message: Auto-greeting
       ↓
USER CAN SEND OR MODIFY MESSAGE
```

---

## 💾 Data Storage Structure

### localStorage Keys

```javascript
// Key: "registeredUsers"
// Value: Array of user objects
[
  {
    name: "User Full Name",
    email: "user@example.com",
    password: "password123"
  },
  {
    name: "Another User",
    email: "another@example.com",
    password: "secure456"
  }
]

// Key: "currentUser"
// Value: Currently logged-in user object
{
  name: "User Full Name",
  email: "user@example.com",
  password: "password123"
}

// Key: "contactMessages"
// Value: Array of contact form submissions
[
  {
    name: "Visitor Name",
    email: "visitor@example.com",
    message: "I want to help with tree planting",
    timestamp: "1/21/2026, 2:30:45 PM"
  }
]
```

---

## 🎯 Key Functions & Their Purpose

### Page Navigation
```
goToPage(pageId)
  → Hides all pages, shows specified page
  → Used for: Auth → Agreement → Main

switchTab(tabName)
  → Switches between login/register/forgot password
  → Used within Auth page only
```

### Authentication
```
loginForm submit handler
  → Validates credentials
  → Checks against registered users
  → Stores current user session

registerForm submit handler
  → Validates form inputs
  → Checks email uniqueness
  → Stores new user

forgotPassword flow
  → sendOTP() - Generates & shows OTP
  → verifyOTP() - Validates entered OTP
  → resetPassword() - Updates password
```

### Contact Methods
```
emailGreeting(event)
  → Gets current user name
  → Creates personalized greeting
  → Opens email client with mailto link

whatsappGreeting(event)
  → Gets current user name
  → Creates WhatsApp message
  → Opens WhatsApp with wa.me link
```

### Utilities
```
showStatus(elementId, message, type)
  → Displays success/error messages
  → Auto-hides after 3 seconds

submitContactForm(event)
  → Collects form data
  → Stores in localStorage
  → Shows confirmation
```

---

## 🔄 State Management

### User States
1. **Not Logged In** → Show Auth Page
2. **Logged In, Not Agreed** → Show Agreement Page
3. **Logged In, Agreed** → Show Main Page
4. **Logged Out** → Back to Auth Page

### Data Persistence
- User data saved in localStorage
- Persists across browser sessions
- Cleared on logout

---

## 🎨 UI/UX Flow

### Color Scheme
```
Primary Action: Green (#1b5e20)
Secondary Action: Light Green (#2e7d32)
Text: Dark Gray (#2e3d2f)
Success: Light Green (#c8e6c9)
Error: Light Red (#ffcdd2)
```

### Form Validation
```
Input: Email
├─ Check format (contains @)
└─ Check uniqueness (for registration)

Input: Password
├─ Minimum 6 characters
├─ Not empty
└─ Must match confirmation

Input: OTP
└─ Exactly 6 digits

Input: Name
└─ Not empty
```

---

## 📈 User Journey Analytics

```
Session Start
  ├─ Login/Register
  │  └─ Conversion: 70%
  │
  ├─ Forgot Password (5% of users)
  │  └─ OTP Success: 85%
  │
  ├─ Agreement Page
  │  └─ Acceptance: 95%
  │
  └─ Main Page
     ├─ Email Contact: 20%
     ├─ WhatsApp Contact: 30%
     ├─ Contact Form: 15%
     └─ Gallery View: 80%
```

---

## 🔒 Security Layers

```
Layer 1: Input Validation
  └─ Email format, password length, OTP format

Layer 2: Session Management
  └─ Current user stored in localStorage
  └─ Cleared on logout

Layer 3: Terms Agreement
  └─ Must accept before accessing main content

Layer 4: Forgot Password Security
  └─ Email verification required
  └─ OTP verification required
  └─ Password confirmation required
```

---

## 📱 Responsive Breakpoints

```
Desktop: 1024px and above
  └─ Full layout, all features visible

Tablet: 768px to 1023px
  └─ Adjusted font sizes
  └─ Grid to single column

Mobile: 480px to 767px
  └─ Stacked layout
  └─ Full-width buttons
  └─ Optimized spacing

Small Mobile: Below 480px
  └─ Minimal styling
  └─ Maximum readability
```

---

This architecture ensures a secure, user-friendly, and scalable experience! 🚀
