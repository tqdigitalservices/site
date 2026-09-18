/* ============================================
   TechQuest Digital — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // --- Sticky Nav Scroll Effect ---
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  // --- Active Nav Link on Scroll ---
  const navLinks = document.querySelectorAll('.nav__link:not(.nav__link--cta)');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();


  // --- Mobile Nav Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');
  let overlay = null;

  function createOverlay() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'nav__overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', closeMobileNav);
  }

  function openMobileNav() {
    navToggle.classList.add('nav__toggle--active');
    navToggle.setAttribute('aria-expanded', 'true');
    navLinksContainer.classList.add('nav__links--open');
    createOverlay();
    requestAnimationFrame(function () {
      overlay.classList.add('nav__overlay--active');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    navToggle.classList.remove('nav__toggle--active');
    navToggle.setAttribute('aria-expanded', 'false');
    navLinksContainer.classList.remove('nav__links--open');
    if (overlay) {
      overlay.classList.remove('nav__overlay--active');
    }
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    var isOpen = navLinksContainer.classList.contains('nav__links--open');
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  // Close mobile nav when clicking a link
  navLinksContainer.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        closeMobileNav();
      }
    });
  });


  // --- Contact Form ---
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Clear previous errors
      contactForm.querySelectorAll('.form-input--error').forEach(function (el) {
        el.classList.remove('form-input--error');
      });
      contactForm.querySelectorAll('.form-error').forEach(function (el) {
        el.remove();
      });

      var nameInput = document.getElementById('contactName');
      var emailInput = document.getElementById('contactEmail');
      var messageInput = document.getElementById('contactMessage');

      var valid = true;

      if (!nameInput.value.trim()) {
        showError(nameInput, 'Please enter your name.');
        valid = false;
      }

      if (!emailInput.value.trim()) {
        showError(emailInput, 'Please enter your email address.');
        valid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address.');
        valid = false;
      }

      if (!messageInput.value.trim()) {
        showError(messageInput, 'Please enter a message.');
        valid = false;
      }

      if (!valid) return;

      // Show success state
      var formParent = contactForm.parentNode;
      contactForm.style.display = 'none';

      var successEl = document.createElement('div');
      successEl.className = 'form-success';
      successEl.innerHTML =
        '<div class="form-success__icon">' +
          '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' +
        '</div>' +
        '<h3 class="form-success__title">Message sent</h3>' +
        '<p class="form-success__text">Thank you for reaching out. We\'ll be in touch within one business day.</p>';

      formParent.insertBefore(successEl, contactForm);
    });
  }

  function showError(input, message) {
    input.classList.add('form-input--error');
    var errorEl = document.createElement('p');
    errorEl.className = 'form-error';
    errorEl.textContent = message;
    input.parentNode.appendChild(errorEl);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }


  // --- Scroll Reveal ---
  var revealElements = document.querySelectorAll(
    '.section-header, .about__value, .service-card, .industry-card, .contact__form, .contact__info-block'
  );

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements immediately
    revealElements.forEach(function (el) {
      el.classList.add('reveal--visible');
    });
  }
})();
