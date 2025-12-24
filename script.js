// ScrollSpy (Highlight active link in Navbar)
const sections = document.querySelectorAll('.section-spy');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= (sectionTop - 150)) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current))link.classList.add('active');
  });
});

// Reveal on Scroll
const revealElements = document.querySelectorAll('.reveal-on-scroll');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); //? Anima una sola volta
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// Smooth Scroll
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, //? Navbar height offset
        behavior: 'smooth'
      });
    }
  });
});

// Hamburger Menu Logic
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinksMobile = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

navLinksMobile.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Interazioni foto/marquee: pointer events + blocco long-press
const interactive = document.querySelectorAll('.image-frame, .marquee-strip');
const clearPressing = () => interactive.forEach(el => el.classList.remove('is-pressing'));

interactive.forEach(el => {
  // Blocca menu contestuale
  el.addEventListener('contextmenu', (e) => e.preventDefault());

  const add = () => el.classList.add('is-pressing');

  // Pointer unificato
  el.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') e.preventDefault(); // sopprime long-press/haptic
    add();
  }, { passive: false });

  el.addEventListener('pointerup', clearPressing);
  el.addEventListener('pointercancel', clearPressing);
  el.addEventListener('pointerleave', clearPressing);
});

// Salvaguardia: rimuove lo stato se il rilascio avviene fuori dall'elemento
window.addEventListener('pointerup', clearPressing, { passive: true });
window.addEventListener('pointercancel', clearPressing, { passive: true });