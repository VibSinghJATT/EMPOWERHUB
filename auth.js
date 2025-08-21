import { 
  auth,
  db,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from './firebase.js';

const tabs = document.querySelectorAll('.tab-btn');
const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const authMessage = document.getElementById('authMessage');

tabs.forEach(btn => btn.addEventListener('click', () => {
  tabs.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const tab = btn.dataset.tab;
  tabLogin.classList.toggle('active', tab === 'login');
  tabRegister.classList.toggle('active', tab === 'register');
}));

document.getElementById('toRegister').addEventListener('click', (e) => {
  e.preventDefault();
  tabs[1].click();
});
document.getElementById('toLogin').addEventListener('click', (e) => {
  e.preventDefault();
  tabs[0].click();
});

// ✅ Email/Password Login
document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = 'dashboard.html';
  } catch (err) {
    authMessage.textContent = err.message;
  }
});

// ✅ Register
document.getElementById('registerBtn').addEventListener('click', async () => {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  if (!name) { authMessage.textContent = 'Enter your name'; return; }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    await setDoc(doc(db, 'users', cred.user.uid), { name, email, createdAt: new Date().toISOString() });
    window.location.href = 'dashboard.html';
  } catch (err) {
    authMessage.textContent = err.message;
  }
});

// ✅ Google Sign-In
document.getElementById('googleBtn').addEventListener('click', async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    window.location.href = 'dashboard.html';
  } catch (err) {
    authMessage.textContent = err.message;
  }
});

// ✅ Email Link (Passwordless)
document.getElementById('emailLinkBtn').addEventListener('click', async () => {
  const email = document.getElementById('loginEmail').value.trim();
  if (!email) { authMessage.textContent = 'Enter your email first'; return; }

  const actionCodeSettings = {
    url: window.location.origin + '/login.html',
    handleCodeInApp: true
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
    authMessage.textContent = 'Email link sent! Check your inbox.';
  } catch (err) {
    authMessage.textContent = err.message;
  }
});

// Complete email link sign-in
if (isSignInWithEmailLink(auth, window.location.href)) {
  let email = window.localStorage.getItem('emailForSignIn');
  if (!email) email = window.prompt('Confirm your email:');
  signInWithEmailLink(auth, email, window.location.href)
    .then(() => {
      window.localStorage.removeItem('emailForSignIn');
      window.location.href = 'dashboard.html';
    })
    .catch((err) => { authMessage.textContent = err.message; });
}

// ✅ Phone Sign-In
let confirmationResult;
document.getElementById('phoneBtn').addEventListener('click', async () => {
  const phoneNumber = document.getElementById('phoneInput').value;
  if (!phoneNumber) return;

  window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
  try {
    confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
    document.getElementById('otpInput').style.display = 'block';
    document.getElementById('verifyOtpBtn').style.display = 'block';
    authMessage.textContent = 'OTP sent!';
  } catch (err) {
    authMessage.textContent = err.message;
  }
});

document.getElementById('verifyOtpBtn').addEventListener('click', async () => {
  const code = document.getElementById('otpInput').value;
  try {
    await confirmationResult.confirm(code);
    window.location.href = 'dashboard.html';
  } catch (err) {
    authMessage.textContent = err.message;
  }
});
