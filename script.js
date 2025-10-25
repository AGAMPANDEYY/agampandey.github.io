// mobile nav
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
}

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      window.scrollTo({ top: el.offsetTop - 58, behavior: 'smooth' });
      links?.classList.remove('open');
    }
  });
});

// footer year
document.getElementById('year').textContent = new Date().getFullYear();