/**
 * User-specific JavaScript utilities and functions
 */

// User-specific global variables
let isLoggedIn = false;
let currentUser = null;
let cartItems = [];

// Initialize user functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeUserCommon();
});

/**
 * Initialize user-specific functionality
 */
function initializeUserCommon() {
  // Initialize toastr notifications
  initializeToastr();
  
  // Initialize intersection observer for animations
  initializeAnimations();
  
  // Initialize smooth scrolling
  initializeSmoothScrolling();
  
  // Initialize user session
  initializeUserSession();
  
  // Initialize user-specific event listeners
  initializeUserEventListeners();
}

/**
 * Initialize Toastr notifications
 */
function initializeToastr() {
  if (typeof toastr !== 'undefined') {
    toastr.options = {
      closeButton: true,
      progressBar: true,
      timeOut: '3500',
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      showAnimation: 'slideDown',
      hideAnimation: 'slideUp',
      showDuration: 300,
      hideDuration: 300,
      extendedTimeOut: 1000,
      tapToDismiss: true,
      toastClass: 'toast-custom'
    };
  }
}

/**
 * Show toast notification
 * @param {string} type - Type of notification (success, error, info, warning)
 * @param {string} message - Message to display
 */
function showToast(type, message) {
  if (typeof toastr !== 'undefined') {
    toastr[type](message);
  } else {
    console.log(`${type.toUpperCase()}: ${message}`);
  }
}

/**
 * Handle user logout
 */
function logout() {
  // Clear user data from localStorage
  localStorage.removeItem('userToken');
  localStorage.removeItem('userData');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('activeTab');
  
  // Clear session storage
  sessionStorage.clear();
  
  // Reset global variables
  isLoggedIn = false;
  currentUser = null;
  cartItems = [];
  
  // Show logout message
  showToast('info', 'You have been logged out successfully');
  
  // Redirect to login page after a short delay
  setTimeout(() => {
    window.location.href = '../auth/login.html';
  }, 1000);
}

/**
 * Initialize animations using Intersection Observer
 */
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Remove observer after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe animated elements
  document.querySelectorAll('[class*="animate-fade-in"], .fade-in').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Initialize user session
 */
function initializeUserSession() {
  const userToken = localStorage.getItem('userToken');
  const userData = localStorage.getItem('userData');
  
  if (userToken && userData) {
    isLoggedIn = true;
    currentUser = JSON.parse(userData);
    updateUIForLoggedInUser();
  }
}

/**
 * Update UI for logged in user
 */
function updateUIForLoggedInUser() {
  // Update cart badge if it exists (using cart.js function)
  if (typeof updateCartBadge === 'function') {
    updateCartBadge();
  }
  
  // Show/hide elements based on login status
  const authElements = document.querySelectorAll('[data-auth="required"]');
  authElements.forEach(el => {
    el.style.display = isLoggedIn ? 'block' : 'none';
  });
  
  const guestElements = document.querySelectorAll('[data-auth="guest"]');
  guestElements.forEach(el => {
    el.style.display = isLoggedIn ? 'none' : 'block';
  });
}

/**
 * Initialize user-specific event listeners
 */
function initializeUserEventListeners() {
  // Handle form submissions with loading states
  document.querySelectorAll('form[data-async]').forEach(form => {
    form.addEventListener('submit', handleAsyncFormSubmit);
  });
  
  // Handle modal close on outside click
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal(this.id);
      }
    });
  });
  
  // Handle escape key for modals
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const visibleModal = document.querySelector('.modal-overlay.show');
      if (visibleModal) {
        closeModal(visibleModal.id);
      }
    }
  });
}

/**
 * Handle async form submissions
 * @param {Event} e - Form submit event
 */
function handleAsyncFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  
  if (submitBtn) {
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
    submitBtn.disabled = true;
    
    // Restore button after 3 seconds (or when request completes)
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 3000);
  }
}

/**
 * Open modal with animation
 * @param {string} modalId - ID of the modal to open
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    // Force reflow to ensure the modal is rendered before adding the show class
    modal.offsetHeight;
    modal.classList.add('show');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close modal with animation
 * @param {string} modalId - ID of the modal to close
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
    // Wait for the transition to complete before hiding
    setTimeout(() => {
      modal.classList.add('hidden');
      // Restore body scroll
      document.body.style.overflow = '';
    }, 300);
  }
}

// Export functions for use in other scripts
window.UserCommon = {
  showToast,
  logout,
  openModal,
  closeModal,
  // Remove updateCartBadge and cartItems from here to avoid conflicts
  isLoggedIn,
  currentUser
};
