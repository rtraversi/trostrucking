// TROS Trucking & Hauling — Main JS

// ── Mobile nav toggle ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ── Intersection Observer — fade-in service cards ──
const cards = document.querySelectorAll('.service-card');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, parseInt(delay));
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease';
  cardObserver.observe(card);
});

// ── Netlify form handling (inline success state) ──
const form = document.getElementById('quoteForm');
const successMsg = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new URLSearchParams(new FormData(form));
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString()
      });
      form.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
      if (successMsg) successMsg.classList.add('visible');
      form.querySelector('.btn-submit').style.display = 'none';
    } catch {
      // Fallback — let the default Netlify redirect handle it
      form.submit();
    }
  });
}

// ── Nav background on scroll ──
const nav = document.querySelector('.nav-wrap');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(15,14,12,0.98)';
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
  } else {
    nav.style.background = 'rgba(15,14,12,0.92)';
    nav.style.boxShadow = 'none';
  }
}, { passive: true });
