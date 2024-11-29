let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.oncroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// Typing Text Code 

const typed = new Typed('.multiple-text', {
    strings: ['Physical Fitness', 'Weight Gain','Weight Loss','Strength Training','Running','Energy Recovery','Perfect Physique'],
    typeSpeed: 60,
    backspeed:60,
    backDelay:1000,
    loop:true,
  });

// login code 

  function toggleForm() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const formTitle = document.getElementById('form-title');
    const toggleLink = document.getElementById('toggle-link');
  
    if (loginForm.style.display === 'none') {
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
      formTitle.innerHTML = 'Login';
      toggleLink.innerHTML = "Don't have an account? Sign up";
    } else {
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
      formTitle.innerHTML = 'Sign Up';
      toggleLink.innerHTML = 'Already have an account? Login';
    }
  }
  
  function handleSubmit(event, formType) {
    event.preventDefault(); // Prevent form from reloading the page
  
    // Hide the forms and show the "Thank you" message
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const thankYouMessage = document.getElementById('thank-you-message');
  
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    thankYouMessage.style.display = 'block';
  
    // Optionally, change the text depending on the form type
    const thankYouText = document.querySelector('#thank-you-message p');
    if (formType === 'login') {
      thankYouText.textContent = "You have successfully logged in.";
    } else if (formType === 'signup') {
      thankYouText.textContent = "Your account has been successfully created.";
    }
  
    // Redirect to home page after 3 seconds
    setTimeout(function() {
      window.location.href = "home.html"; // Change to the actual home page URL
    }, 3000); // 3 seconds delay before redirecting
  }

