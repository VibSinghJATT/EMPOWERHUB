// auth.js — login/register page using Firebase Auth
import { auth, db, onAuthStateChanged, updateProfile, signInWithEmailAndPassword, createUserWithEmailAndPassword, doc, setDoc } from './firebase.js';

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
  tabs.forEach(b => b.classList.remove('active'));
  tabs[1].classList.add('active');
  tabLogin.classList.remove('active');
  tabRegister.classList.add('active');
});

document.getElementById('toLogin').addEventListener('click', (e) => {
  e.preventDefault();
  tabs.forEach(b => b.classList.remove('active'));
  tabs[0].classList.add('active');
  tabRegister.classList.remove('active');
  tabLogin.classList.add('active');
});

// Login
document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = (document.getElementById('loginEmail').value || '').trim();
  const password = document.getElementById('loginPassword').value || '';
  authMessage.textContent = '';
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = 'dashboard.html';
  } catch (err) {
    authMessage.textContent = err.message;
  }
});

// Register
document.getElementById('registerBtn').addEventListener('click', async () => {
  const name = (document.getElementById('regName').value || '').trim();
  const email = (document.getElementById('regEmail').value || '').trim();
  const password = document.getElementById('regPassword').value || '';

  authMessage.textContent = '';
  if (!name) { authMessage.textContent = 'Please enter your name.'; return; }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    await setDoc(doc(db, 'users', cred.user.uid), {
      name,
      email,
      createdAt: new Date().toISOString()
    });
    window.location.href = 'dashboard.html';
  } catch (err) {
    authMessage.textContent = err.message;
  }
});
