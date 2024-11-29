// Function to open free feature tabs with a glow animation
function openTab(url) {
  const feature = event.target.closest('.feature');
  feature.classList.add('active-glow'); // Add a glowing effect when clicked
  setTimeout(() => {
      feature.classList.remove('active-glow');
      window.open(url, '_blank'); // Open the feature in a new tab after the effect
  }, 500); // Delay to allow the glow effect to complete
}

// Function to handle locked features
function redirectToPro() {
  // Check if Pro is unlocked
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
          feature.onclick = function () {
              const featureName = feature.querySelector('h2').innerText.toLowerCase().replace(/ /g, '-');
              openTab(`${featureName}.html`); // Open the feature in a new tab
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
          if (button) {
              button.addEventListener('click', redirectToPro);
          }
      }
  });
}

// Run this function on page load
document.addEventListener('DOMContentLoaded', () => {
  updateFeatureStatus();  // Update UI based on Pro status
  applyLockedState();     // Apply locked states with blur and buttons
});
