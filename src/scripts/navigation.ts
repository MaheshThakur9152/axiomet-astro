/**
 * Navigation Menu Interactions for Webflow Navbar Component
 */
export function initNavigation(): void {
  const menuButtons = document.querySelectorAll<HTMLElement>('.menu-button.w-nav-button');
  const navMenu = document.querySelector<HTMLElement>('.nav-menu.w-nav-menu');
  const navElement = document.querySelector<HTMLElement>('.navber.w-nav');

  if (!menuButtons.length || !navMenu) return;

  let isOpen = false;

  const setMenuState = (open: boolean) => {
    isOpen = open;
    menuButtons.forEach((btn) => {
      btn.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        btn.classList.add('w--open');
      } else {
        btn.classList.remove('w--open');
      }

      const menuText = btn.querySelector('.nav-menu-text');
      if (menuText) {
        menuText.textContent = isOpen ? 'Close' : 'Menu';
      }

      const dots = btn.querySelectorAll<HTMLElement>('.menu-dot');
      dots.forEach((dot) => {
        dot.style.backgroundColor = isOpen ? '#df1001' : '#ffffff';
      });
    });

    if (isOpen) {
      navMenu.classList.add('w--open');
      navMenu.style.display = 'block';
    } else {
      navMenu.classList.remove('w--open');
      navMenu.style.display = 'none';
    }
  };

  menuButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setMenuState(!isOpen);
    });
  });

  // Close on Escape key
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setMenuState(false);
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e: MouseEvent) => {
    if (isOpen && navElement && !navElement.contains(e.target as Node)) {
      setMenuState(false);
    }
  });

  // Close menu when clicking a navigation link
  const navLinks = navMenu.querySelectorAll<HTMLAnchorElement>('a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
}
