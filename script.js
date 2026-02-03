(function () {
  const wrap = document.querySelector('.panels');
  const panels = Array.from(document.querySelectorAll('.panel'));
  if (!wrap || !panels.length) return;

  function clearActive() {
    wrap.classList.remove('has-active');
    panels.forEach((p) => {
      p.classList.remove('is-active', 'is-inactive');
      const more = p.querySelector('.panel-more');
      if (more) more.setAttribute('aria-hidden', 'true');
    });
  }

  function setActive(panel) {
    wrap.classList.add('has-active');
    panels.forEach((p) => {
      const active = p === panel;
      p.classList.toggle('is-active', active);
      p.classList.toggle('is-inactive', !active);
      const more = p.querySelector('.panel-more');
      if (more) more.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
  }

  panels.forEach((panel) => {
    panel.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;

      const alreadyActive = panel.classList.contains('is-active');
      if (alreadyActive) clearActive();
      else setActive(panel);
    });

    panel.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const alreadyActive = panel.classList.contains('is-active');
        if (alreadyActive) clearActive();
        else setActive(panel);
      }
    });
  });

  clearActive();
})();
(function () {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  function closeNav() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.setAttribute('aria-expanded', 'false');

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', closeNav);
  });

  document.addEventListener('click', closeNav);
  window.addEventListener('resize', closeNav);
})();
