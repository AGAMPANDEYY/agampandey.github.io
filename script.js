// Mobile navigation toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle) {
  const setExpanded = (isExpanded) => {
    toggle.setAttribute('aria-expanded', String(isExpanded));
  };

  const handleResize = () => {
    const isDesktop = window.matchMedia('(min-width: 900px)').matches;
    if (isDesktop) {
      links?.classList.remove('open');
      setExpanded(false);
      return;
    }
    setExpanded(links?.classList.contains('open'));
  };

  toggle.addEventListener('click', () => {
    links?.classList.toggle('open');
    setExpanded(links?.classList.contains('open'));
  });

  window.addEventListener('resize', handleResize);
  window.addEventListener('load', handleResize);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      const header = document.querySelector('.site-header');
      const headerOffset = header ? header.offsetHeight : 0;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      links?.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Active section highlighting in navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollPos = window.scrollY + 100; // Offset for better UX
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Update on scroll
window.addEventListener('scroll', updateActiveNav);
// Update on load
window.addEventListener('load', updateActiveNav);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (links && links.classList.contains('open')) {
    if (!e.target.closest('.nav-links') && !e.target.closest('.nav-toggle')) {
      links.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();


document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('[data-scroll]');

  cards.forEach(card => {
    const scroller = card.querySelector('.news-list');
    if (!scroller) return;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = scroller;
      const atTop = scrollTop <= 0;
      const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      // mark whether it actually overflows
      const isScrollable = scrollHeight > clientHeight + 1;
      card.classList.toggle('is-scrollable', isScrollable);

      card.classList.toggle('at-top', atTop);
      card.classList.toggle('at-bottom', atBottom);
      if (scrollTop > 2) card.classList.add('scrolled');
    };

    scroller.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update(); // initial
  });

  // Fade in lazy-loaded images when they finish loading
  document.querySelectorAll('img.lazy-img').forEach(img => {
    if (img.complete) {
      img.classList.add('is-loaded');
      return;
    }
    img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
  });
});
