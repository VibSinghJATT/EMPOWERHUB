// app.js — home page interactions: enroll modal + save to Firestore (requires login)
import { auth, onAuthStateChanged, db, addDoc, collection, serverTimestamp } from './firebase.js';

const enrollModal = document.getElementById('enrollModal');
const planSelected = document.getElementById('planSelected');
const enrollBtn = document.getElementById('enrollSubmit');
const navAccount = document.getElementById('nav-account');
const navDashboard = document.getElementById('nav-dashboard');

let chosenPlan = null;

window.openEnroll = (btn) => {
  chosenPlan = btn.dataset.plan;
  const label = chosenPlan === '6m' ? '6‑Month Foundational + Specialized (₹500)' : '1‑Year Comprehensive Pathway (₹1000)';
  planSelected.textContent = label;
  enrollModal.showModal();
}

window.closeEnroll = () => enrollModal.close();

// Auth state for nav
onAuthStateChanged(auth, (user) => {
  if (user) {
    navAccount.style.display = 'none';
    navDashboard.style.display = 'inline-block';
  } else {
    navAccount.style.display = 'inline-block';
    navDashboard.style.display = 'none';
  }
});

enrollBtn?.addEventListener('click', async () => {
  const user = auth.currentUser;
  if (!user) {
    alert('Please login first.');
    window.location.href = 'login.html';
    return;
  }
  const name = document.getElementById('enrollName').value.trim();
  const email = document.getElementById('enrollEmail').value.trim();
  const phone = document.getElementById('enrollPhone').value.trim();
  const education = document.getElementById('enrollEducation').value;
  const interest = document.getElementById('enrollInterest').value.trim();

  if (!name || !email || !phone || !education) {
    alert('Please fill in all required fields.');
    return;
  }

  try {
    const docRef = await addDoc(collection(db, 'enrollments'), {
      uid: user.uid,
      name,
      email,
      phone,
      education,
      interest,
      plan: chosenPlan,
      planLabel: chosenPlan === '6m' ? '6‑Month' : '1‑Year',
      createdAt: serverTimestamp()
    });
    enrollModal.close();
    alert('Enrollment saved! Check your Dashboard.');
    window.location.href = 'dashboard.html';
  } catch (err) {
    console.error(err);
    alert('Error saving enrollment. Check console.');
  }
});
