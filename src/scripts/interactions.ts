/**
 * Interactive site behaviors: Accordions, Forms, Smooth Scrolling
 */
export function initInteractions(): void {
  // 1. FAQ Accordions
  const faqCards = document.querySelectorAll<HTMLElement>('.faq-card');
  faqCards.forEach((card) => {
    const trigger = card.querySelector<HTMLElement>('.faq-title-wrap') || card;
    const summaryWrap = card.querySelector<HTMLElement>('.faq-summary-wrap');
    const icon = card.querySelector<HTMLElement>('.faq-icon');

    if (!summaryWrap) return;

    trigger.addEventListener('click', (e) => {
      // Don't toggle if clicking a link inside
      if ((e.target as HTMLElement).closest('a')) return;

      const isCurrentlyOpen = summaryWrap.style.maxHeight && summaryWrap.style.maxHeight !== '0px';

      // Optionally close other accordions in the same list
      const parent = card.closest('.faq-list, .w-dyn-items');
      if (parent) {
        parent.querySelectorAll<HTMLElement>('.faq-card').forEach((otherCard) => {
          if (otherCard !== card) {
            const otherWrap = otherCard.querySelector<HTMLElement>('.faq-summary-wrap');
            const otherIcon = otherCard.querySelector<HTMLElement>('.faq-icon');
            if (otherWrap) {
              otherWrap.style.maxHeight = '0px';
              otherWrap.style.opacity = '0';
            }
            if (otherIcon) {
              otherIcon.style.transform = 'rotate(0deg)';
            }
          }
        });
      }

      if (isCurrentlyOpen) {
        summaryWrap.style.maxHeight = '0px';
        summaryWrap.style.opacity = '0';
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        summaryWrap.style.maxHeight = `${summaryWrap.scrollHeight + 32}px`;
        summaryWrap.style.opacity = '1';
        if (icon) icon.style.transform = 'rotate(45deg)';
      }
    });
  });

  // 2. Smooth Scrolling for Anchor Links
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector<HTMLElement>(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 3. Contact Form Submission & Project Pill Selector
  document.querySelectorAll<HTMLFormElement>('form').forEach((form) => {
    // Project type pills
    const pillButtons = form.querySelectorAll<HTMLElement>('[data-project-type], .project-type-pill');
    pillButtons.forEach((pill) => {
      pill.addEventListener('click', () => {
        pill.classList.toggle('is-selected');
        const input = form.querySelector<HTMLInputElement>('#project-type-input');
        if (input) {
          const selected = Array.from(pillButtons)
            .filter((p) => p.classList.contains('is-selected'))
            .map((p) => p.textContent?.trim())
            .filter(Boolean);
          input.value = selected.join(', ');
        }
      });
    });

    // Form submission interception
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('[type="submit"]') as HTMLInputElement | HTMLButtonElement | null;
      if (submitBtn) {
        submitBtn.setAttribute('disabled', 'true');
        if (submitBtn instanceof HTMLInputElement) {
          submitBtn.value = 'Submitting Inquiry...';
        } else if (submitBtn instanceof HTMLButtonElement) {
          submitBtn.textContent = 'Submitting Inquiry...';
        }
      }

      setTimeout(() => {
        const successCard = document.createElement('div');
        successCard.className = 'w-form-done';
        successCard.style.display = 'block';
        successCard.style.padding = '2rem';
        successCard.style.backgroundColor = '#181615';
        successCard.style.border = '1px solid #272523';
        successCard.style.borderRadius = '1.25rem';
        successCard.style.textAlign = 'center';
        successCard.style.color = '#ffffff';
        successCard.style.marginTop = '1.5rem';

        successCard.innerHTML = `
          <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(223, 16, 1, 0.2); border: 1px solid #df1001; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: #df1001;">
            <svg style="width: 24px; height: 24px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; font-family: 'BDO Grotesk', sans-serif;">Inquiry Received</h3>
          <p style="color: #b7bdc2; font-size: 0.95rem; max-width: 420px; margin: 0 auto 1.5rem; line-height: 1.5;">Thank you for reaching out. Our engineering directors will evaluate your requirements and contact you within 1 business day.</p>
          <button type="button" class="btn" style="background: #272523; color: white; border: none; padding: 0.6rem 1.4rem; border-radius: 9999px; cursor: pointer; font-size: 0.85rem;" onclick="window.location.reload()">Send Another Note</button>
        `;

        form.style.display = 'none';
        form.parentNode?.insertBefore(successCard, form.nextSibling);
      }, 600);
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractions);
  } else {
    initInteractions();
  }
}
