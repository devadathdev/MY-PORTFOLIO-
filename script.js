(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }));
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const items = document.querySelectorAll('.project-card, .principles article, .stack-row, .section-heading');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(item => item.classList.add('reveal'));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    items.forEach(item => observer.observe(item));
  }
  // Subtle pointer-driven 3D parallax for the intelligence-engine panel.
  const hud = document.querySelector('.hud-3d');
  if (hud && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hud.addEventListener('pointermove', event => {
      const rect = hud.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      hud.style.transform = 'perspective(1000px) rotateX(' + ((.5-y)*2.3).toFixed(2) + 'deg) rotateY(' + ((x-.5)*3.2).toFixed(2) + 'deg)';
    });
    hud.addEventListener('pointerleave', () => { hud.style.transform = ''; });
  }
  // Gentle depth response on project cards for mouse/trackpad users.
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = 'translateY(-3px) rotateX(' + (-y*1.6).toFixed(2) + 'deg) rotateY(' + (x*1.8).toFixed(2) + 'deg)';
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }
})();