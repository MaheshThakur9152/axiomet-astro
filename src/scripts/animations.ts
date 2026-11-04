/**
 * Visual Animations: Counter increments & scroll reveals
 */
export function initAnimations(): void {
  // 1. Stat Counter Animation with IntersectionObserver
  const counters = document.querySelectorAll<HTMLElement>('[data-counter], .impact-number, .stat-number');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const targetEl = entry.target as HTMLElement;
          obs.unobserve(targetEl);

          const text = targetEl.textContent?.trim() || '';
          const match = text.match(/^([^0-9.-]*)([0-9.,-]+)(.*)$/);
          if (!match) return;

          const prefix = match[1];
          const rawNum = match[2].replace(/,/g, '');
          const suffix = match[3];
          const targetNum = parseFloat(rawNum);

          if (Number.isNaN(targetNum)) return;

          const hasDecimal = rawNum.includes('.');
          const duration = 1600;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            const currentVal = targetNum * easeProgress;

            let formatted = hasDecimal ? currentVal.toFixed(1) : Math.floor(currentVal).toString();
            targetEl.textContent = prefix + formatted + suffix;

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              targetEl.textContent = text;
            }
          };

          requestAnimationFrame(animate);
        });
      },
      { threshold: 0.2 }
    );

    counters.forEach((c) => observer.observe(c));
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
}
