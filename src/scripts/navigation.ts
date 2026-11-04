/**
 * Navigation Menu Interactions
 */
export function initNavigation(): void {
  const menuButtons = document.querySelectorAll<HTMLButtonElement>('.menu-button, [data-nav-toggle]');
  const menuPanel = document.querySelector<HTMLElement>('.nav-menu-panel-container');
  const navElement = document.querySelector<HTMLElement>('.navber');

  if (!menuButtons.length || !menuPanel) return;

  let isOpen = false;

  const setMenuState = (open: boolean) => {
    isOpen = open;
    menuButtons.forEach((btn) => {
      btn.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        btn.classList.add('w--open', 'is-active');
      } else {
        btn.classList.remove('w--open', 'is-active');
      }

      // Update Menu / Close text if present
      const menuText = btn.querySelector('.nav-menu-text');
      if (menuText) {
        menuText.textContent = isOpen ? 'Close' : 'Menu';
      }

      // Update 4-dot indicator styles
      const dots = btn.querySelectorAll<HTMLElement>('.menu-dot');
      dots.forEach((dot) => {
        if (isOpen) {
          dot.style.backgroundColor = '#df1001';
        } else {
          dot.style.backgroundColor = '#ffffff';
        }
      });
    });

    if (isOpen) {
      menuPanel.style.maxHeight = '850px';
      menuPanel.style.opacity = '1';
      menuPanel.style.visibility = 'visible';
      menuPanel.style.paddingBottom = '2rem';
    } else {
      menuPanel.style.maxHeight = '0px';
      menuPanel.style.opacity = '0';
      menuPanel.style.visibility = 'hidden';
      menuPanel.style.paddingBottom = '0px';
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
  const navLinks = menuPanel.querySelectorAll<HTMLAnchorElement>('a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });
}

// Auto-run on DOMContentLoaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
}
