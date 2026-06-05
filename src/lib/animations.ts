export function setupMicroInteractions() {
  document.querySelectorAll('.module-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      card.style.boxShadow = 'var(--shadow-md)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = (anchor as HTMLAnchorElement).getAttribute('href');
      if (!href || href === '#') return;
      try {
        const id = decodeURIComponent(href.slice(1));
        const target = document.querySelector('#' + CSS.escape(id));
        if (target) {
          e.preventDefault();
          const main = document.getElementById('app-main');
          if (main) {
            const mainRect = main.getBoundingClientRect();
            const targetRect = (target as HTMLElement).getBoundingClientRect();
            main.scrollTo({
              top: main.scrollTop + targetRect.top - mainRect.top - 20,
              behavior: 'smooth',
            });
          } else {
            window.scrollTo({
              top: (target as HTMLElement).offsetTop - 20,
              behavior: 'smooth',
            });
          }
        }
      } catch {
        // ignore invalid selectors
      }
    });
  });

  const sidebar = document.querySelector('.app-sidebar');
  if (sidebar) {
    (sidebar as HTMLElement).style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  }

  document.querySelectorAll('.result-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'border-color 0.2s ease, background 0.2s ease';
    });
  });
}
