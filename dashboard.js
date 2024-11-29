// Function to open free feature tabs with a glow animation
function openTab(event, url) {
  const feature = event.target.closest('.feature');
  feature.classList.add('active-glow'); // Add a glowing effect when clicked
  setTimeout(() => {
      feature.classList.remove('active-glow');
      window.open(url, '_blank'); // Open the feature in a new tab after the effect
  }, 500);
}

// Function to handle locked features
function redirectToPro() {
  const isPro = localStorage.getItem('isPro');
  if (isPro === 'true') {
      alert('You already have access to Pro features!');
  } else {
      const proceedToPayment = confirm(
          "This feature requires a Pro version. Proceed to the payment page?"
      );
      if (proceedToPayment) {
          window.location.href = 'payment.html'; // Redirect to payment page
      }
  }
}

// Function to unlock Pro features (called after payment is successful)
function unlockProFeatures() {
  localStorage.setItem('isPro', 'true');
  alert('Pro features have been unlocked! Returning to the dashboard...');
  window.location.href = 'dashboard.html'; // Redirect back to dashboard
}

// Function to update the UI based on Pro status
function updateFeatureStatus() {
  const isPro = localStorage.getItem('isPro');
  const lockedFeatures = document.querySelectorAll('.feature.locked');

  if (isPro === 'true') {
      lockedFeatures.forEach(feature => {
          feature.classList.remove('locked');
          feature.classList.add('free'); // Make the feature free
          feature.querySelector('button')?.remove(); // Remove "Get Pro" button
          feature.onclick = function (event) {
              const featureName = feature.querySelector('h2').innerText.toLowerCase().replace(/ /g, '-');
              openTab(event, `${featureName}.html`); // Open the feature in a new tab
          };
      });

      // Add a glowing entry animation for unlocked features
      lockedFeatures.forEach(feature => {
          feature.classList.add('pro-unlocked');
          setTimeout(() => feature.classList.remove('pro-unlocked'), 1000);
      });
  }
}

// Function to apply blur and locked state for features requiring Pro
function applyLockedState() {
  const features = document.querySelectorAll('.feature');
  features.forEach(feature => {
      if (feature.classList.contains('locked')) {
          feature.style.filter = 'blur(4px)';
          const button = feature.querySelector('button');
          button?.addEventListener('click', redirectToPro);
      }
  });
}

// Load username and email from localStorage
function loadUsername() {
  const username = localStorage.getItem('username') || 'Guest';
  const email = localStorage.getItem('email') || 'guest@example.com';
  document.getElementById('profile-username').textContent = `Name: ${username}`;
  document.getElementById('profile-email').textContent = `Email: ${email}`;
}

// Toggle profile details dropdown
function toggleProfileDetails() {
  const profileDetails = document.getElementById('profile-details');
  profileDetails.style.display = profileDetails.style.display === 'block' ? 'none' : 'block';
}

// Redirect to the home page
function redirectToHome() {
  window.location.href = 'home.html'; // Replace with your actual home page URL
}

// Simulate user login and store in localStorage
function login(username, email) {
  localStorage.setItem('username', username);
  localStorage.setItem('email', email);
  alert('Login successful! Redirecting to dashboard...');
  window.location.href = 'dashboard.html'; // Redirect back to dashboard
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('isPro')) localStorage.setItem('isPro', 'false');
  loadUsername();
  updateFeatureStatus();
  applyLockedState();
});
