import Lenis from 'lenis';

declare global {
  interface Window {
    Webflow?: any;
    gsap?: any;
    ScrollTrigger?: any;
  }
}

// 1. Initialize Lenis Smooth Scroll
if (typeof window !== 'undefined') {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// 2. Initialize Webflow IX2 and GSAP Counters
export function initWebflowAndCounters(): void {
  try {
    if (typeof window !== 'undefined' && window.Webflow) {
      if (window.Webflow.destroy) window.Webflow.destroy();
      if (window.Webflow.ready) window.Webflow.ready();
      const ix2 = window.Webflow.require && window.Webflow.require('ix2');
      if (ix2 && ix2.init) ix2.init();
    }

    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);

      document.querySelectorAll('[data-counter]').forEach((counter: any) => {
        const textNode = [...counter.childNodes].find(
          (n: any) => n.nodeType === 3 && n.textContent?.trim()
        );
        const textEl = textNode || counter.firstElementChild || counter;
        const original = textEl.textContent?.trim() || '';

        const match = original.match(/^([^0-9.-]*)([0-9.,-]+)(.*)$/);
        if (!match) return;

        const prefix = match[1];
        const number = match[2].replace(/,/g, '');
        const suffix = match[3];
        const target = parseFloat(number);
        if (Number.isNaN(target)) return;

        const hasDecimal = number.includes('.');
        const hasComma = original.includes(',');
        const value = { current: 0 };

        window.gsap.fromTo(
          value,
          { current: 0 },
          {
            current: target,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: counter,
              start: 'top 88%',
              once: true,
            },
            onUpdate: () => {
              let formattedValue = hasDecimal
                ? value.current.toFixed(1)
                : Math.floor(value.current);

              if (hasComma && !hasDecimal) {
                formattedValue = Number(formattedValue).toLocaleString();
              }

              textEl.textContent = prefix + formattedValue + suffix;
            },
          }
        );
      });

      window.ScrollTrigger.refresh();
    }
  } catch (err) {
    console.warn('Animation re-init error:', err);
  }
}

// 3. Form & Accordion handlers
export function initInteractions(): void {
  initWebflowAndCounters();

  // FAQ Accordion fallback
  const faqCards = document.querySelectorAll<HTMLElement>('.faq-card');
  faqCards.forEach((card) => {
    const trigger = card.querySelector<HTMLElement>('.faq-title-wrap, .faq-card-top') || card;
    const summaryWrap = card.querySelector<HTMLElement>('.faq-summary-wrap');
    const icon = card.querySelector<HTMLElement>('.faq-icon');

    if (!summaryWrap) return;

    trigger.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('a')) return;

      const isCurrentlyOpen = summaryWrap.style.maxHeight && summaryWrap.style.maxHeight !== '0px';

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

  // Contact Form Submission
  document.querySelectorAll<HTMLFormElement>('form').forEach((form) => {
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
