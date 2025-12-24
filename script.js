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
const body = document.body;

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  body.classList.toggle('no-scroll', navMenu.classList.contains('active'));
});

navLinksMobile.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    body.classList.remove('no-scroll');
  });
});




// Seleziona la foto e gli elementi interattivi
const photo = document.querySelector('.image-frame');

const disableHaptic = (e) => {
  // Impedisce l'apertura del menu contestuale e la relativa vibrazione
  e.preventDefault();
  return false;
};

if (photo) {
  // Blocca il menu contestuale (clic destro / tap prolungato)
  photo.addEventListener('contextmenu', disableHaptic);
  
  // Opzionale: impedisce il "gesture menu" di alcuni browser Android
  photo.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) e.preventDefault(); // Blocca pinch-to-zoom sulla foto
  }, { passive: false });
}

// Se vuoi estenderlo a TUTTO il sito (tranne i link/bottoni reali)
document.addEventListener('contextmenu', (e) => {
  // Se non stiamo cliccando su un link o un tasto, blocca il menu e la vibrazione
  if (!e.target.closest('a') && !e.target.closest('button')) {
    e.preventDefault();
  }
}, false);