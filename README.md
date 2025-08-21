# 📘 Empower Hub Website

Empower Hub is a platform designed to help students and job seekers **learn → train → intern → get hired**.  
This repository contains the website frontend built with **HTML, CSS, JavaScript, Firebase (Auth + Firestore)**, and deployed via **GitHub Pages**.

---

## 🚀 Features
- 🔑 **User Authentication**
  - Email & Password Login
  - Google Sign-in
  - Passwordless Email Link
  - Phone Number + OTP Login

- 🎓 **Enrollments**
  - Users can enroll in programs
  - Enrollment data stored securely in Firestore

- 📊 **Dashboard**
  - View user profile and enrollment status

- 🔐 **Secure Firestore Rules** (see `firestore.rules`)
  - Users can only view/update their own data

---

## 📂 Project Structure
```
empower-hub-site/
├── index.html         # Homepage
├── login.html         # Login & Register page
├── dashboard.html     # User dashboard
├── firebase.js        # Firebase initialization
├── auth.js            # Authentication logic
├── app.js             # App/dashboard logic
├── styles.css         # Global styling
├── firestore.rules    # Firestore security rules
└── README.md          # This file
```

---

## 🛠️ Setup & Run

### 1. Clone this repo
```bash
git clone https://github.com/<your-username>/empower-hub-site.git
cd empower-hub-site
```

### 2. Configure Firebase
- Create a Firebase project in [Firebase Console](https://console.firebase.google.com/).  
- Enable **Authentication** methods: Email/Password, Google, Phone.  
- Enable **Cloud Firestore**.  
- Copy your Firebase config into `firebase.js`.  

### 3. Deploy with GitHub Pages
- Push your code to GitHub.  
- Go to **Settings → Pages** → set branch to `main` and folder to `/ (root)`.  
- Your site will be live at:  
  ```
  https://<your-username>.github.io/empower-hub-site/
  ```

---

## 🔐 Firestore Security Rules
See `firestore.rules` file.  
- Users can only access their own profile (`/users/{uid}`) and their own enrollments (`/enrollments/{docId}`).  

---

## 👩‍💻 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss.  

---

## 📜 License
This project is licensed under the MIT License.
