// Form Toggle
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');

loginBtn.addEventListener('click', () => {
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
  loginBtn.classList.add('active');
  signupBtn.classList.remove('active');
});

signupBtn.addEventListener('click', () => {
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
  loginBtn.classList.remove('active');
  signupBtn.classList.add('active');
});

// Signup Functionality
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const number = document.getElementById('signup-number').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;

  // Validate Confirm Password
  if (password !== confirmPassword) {
    alert('Passwords do not match. Please try again.');
    return;
  }

  // Save user data in localStorage
  const user = { name, email, number, password };
  localStorage.setItem(email, JSON.stringify(user));

  alert('Sign-up successful! You can now log in.');
  loginBtn.click(); // Switch to login form
});

// Login Functionality
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem(email));

  if (user && user.password === password) {
    alert(`Welcome back, ${user.name}!`);
    localStorage.setItem('loggedInUser', email); // Save logged-in state
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid email or password.');
  }
});
