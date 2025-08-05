/* script.js */
function scrollToCollections() {
  document.getElementById('collections').scrollIntoView({ behavior: 'smooth' });
  console.log('Navigated to collections section');
}

// Product image carousel functionality
document.querySelectorAll('.product-image').forEach(function(imgDiv) {
  const images = JSON.parse(imgDiv.getAttribute('data-images'));
  let idx = 0;
  const mainImg = imgDiv.querySelector('.main-img');
  let interval;

  imgDiv.addEventListener('mouseenter', function() {
    interval = setInterval(function() {
      idx = (idx + 1) % images.length;
      mainImg.src = images[idx];
    }, 1000); // Change image every 1000ms
  });

  imgDiv.addEventListener('mouseleave', function() {
    clearInterval(interval);
    idx = 0;
    mainImg.src = images[0]; // Reset to first image
  });
});

// Email subscription functionality
function handleSubscribe(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById('emailInput');
  const subscribeBtn = document.getElementById('subscribeBtn');
  const subscribeMessage = document.getElementById('subscribeMessage');
  const email = emailInput.value.trim();
  
  // Clear previous messages
  subscribeMessage.className = 'subscribe-message';
  subscribeMessage.textContent = '';
  
  // Validate email
  if (!email) {
    showMessage('Please enter your email address.', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showMessage('Please enter a valid email address.', 'error');
    return;
  }
  
  // Show loading state
  subscribeBtn.classList.add('loading');
  subscribeBtn.disabled = true;
  showMessage('Subscribing...', 'loading');
  
  // Simulate API call (replace with actual API endpoint)
  setTimeout(() => {
    // Simulate success/failure
    const success = Math.random() > 0.1; // 90% success rate for demo
    
    if (success) {
      // Store email in localStorage (for demo purposes)
      const subscribers = JSON.parse(localStorage.getItem('midveySubscribers') || '[]');
      
      if (subscribers.includes(email)) {
        showMessage('You are already subscribed to our newsletter!', 'error');
      } else {
        subscribers.push(email);
        localStorage.setItem('midveySubscribers', JSON.stringify(subscribers));
        showMessage('🎉 Thank you! You have successfully subscribed to Midvey newsletter.', 'success');
        emailInput.value = ''; // Clear the input
        
        // Optional: Send email data to a server
        // sendToServer(email);
      }
    } else {
      showMessage('Subscription failed. Please try again later.', 'error');
    }
    
    // Reset button state
    subscribeBtn.classList.remove('loading');
    subscribeBtn.disabled = false;
  }, 2000); // 2 second delay for demo
}

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to show messages
function showMessage(message, type) {
  const subscribeMessage = document.getElementById('subscribeMessage');
  subscribeMessage.textContent = message;
  subscribeMessage.className = `subscribe-message ${type}`;
  
  // Auto-hide success messages after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      subscribeMessage.className = 'subscribe-message';
      subscribeMessage.textContent = '';
    }, 5000);
  }
}

// Optional: Function to send data to your server
function sendToServer(email) {
  // Example implementation for sending to your backend
  
  fetch('/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Subscription sent to server:', data);
  })
  .catch(error => {
    console.error('Error sending to server:', error);
  });
  
}

// Initialize subscription counter (for demo)
document.addEventListener('DOMContentLoaded', function() {
  const subscribers = JSON.parse(localStorage.getItem('midveySubscribers') || '[]');
  console.log(`Current subscribers: ${subscribers.length}`);
});
