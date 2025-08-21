# Empower Hub — Static Website (GitHub Pages Ready)

This is a simple, production-style static site (HTML/CSS/JS) that uses **Firebase** on the client for:
- **Authentication** (Email/Password)
- **Firestore** storage for **enrollments** and **users**

It works on **GitHub Pages** without any server-side code.

## 🚀 Quick Start

1. Create a Firebase project: https://console.firebase.google.com
2. Build a Web App in the project and copy your config.
3. In `firebase.js`, replace the placeholder `firebaseConfig` with your config.
4. In Firebase Console:
   - Enable **Authentication → Sign-in method → Email/Password**.
   - Enable **Firestore Database**.
5. (Optional but recommended) Set Firestore Security Rules (basic example below).
6. Push these files to your GitHub repo and enable **GitHub Pages**.

## 🔐 Firestore Rules (basic starter)

> Adjust as you grow; this is a minimal example for personal projects.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    match /enrollments/{docId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && resource.data.uid == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.uid == request.auth.uid;
    }
  }
}
```

## 📁 Structure

- `index.html` — Home, programs, enroll modal (saves to Firestore)
- `login.html` — Login/Register (Firebase Auth)
- `dashboard.html` — Shows user profile + enrollments
- `styles.css` — Minimal dark UI
- `firebase.js` — Firebase init + exports (CDN modular SDK)
- `auth.js` — Auth page logic
- `app.js` — Home page logic (enroll modal + save)
- `README.md` — This guide

## ✅ Notes
- Enrollment requires login; user is redirected to login if needed.
- Dashboard lists enrollments for the logged-in user.
- You can later add an **admin dashboard** and **payment** (Razorpay/Stripe) integration.
