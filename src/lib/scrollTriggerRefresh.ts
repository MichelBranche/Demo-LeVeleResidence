import { ScrollTrigger } from 'gsap/ScrollTrigger';

let rafId = 0;
const delayTimers = new Set<ReturnType<typeof setTimeout>>();

/** Unifica più `ScrollTrigger.refresh()` ravvicinati in un solo frame. */
export function scheduleScrollTriggerRefresh(delayMs = 0): void {
  if (delayMs > 0) {
    const timer = window.setTimeout(() => {
      delayTimers.delete(timer);
      scheduleScrollTriggerRefresh(0);
    }, delayMs);
    delayTimers.add(timer);
    return;
  }

  if (rafId !== 0) return;

  rafId = requestAnimationFrame(() => {
    rafId = 0;
    ScrollTrigger.refresh();
  });
}

/** Dopo layout asincrono (immagini, font): due frame prima del refresh. */
export function scheduleScrollTriggerRefreshAfterLayout(): void {
  requestAnimationFrame(() => {
    scheduleScrollTriggerRefresh();
  });
}
