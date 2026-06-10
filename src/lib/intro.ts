const INTRO_DONE_EVENT = 'intro:done';
const HERO_COPY_DONE_EVENT = 'intro:hero-copy-done';

let introDone = false;
let heroCopyDone = false;

/** Resetta lo stato intro (nuova esecuzione preloader nella stessa sessione). */
export function resetIntroState(): void {
  introDone = false;
  heroCopyDone = false;
  delete document.documentElement.dataset.introDone;
  delete document.documentElement.dataset.heroCopyDone;
}

/** True dopo il primo intro completato (anche se il listener si attacca in ritardo). */
export function isIntroDone(): boolean {
  return introDone;
}

export function markIntroDone(): void {
  if (introDone) return;
  introDone = true;
  document.documentElement.dataset.introDone = '1';
  window.dispatchEvent(new CustomEvent(INTRO_DONE_EVENT));
}

/** Esegue subito se l'intro è già passata, altrimenti attende l'evento. */
export function onIntroDone(callback: () => void): () => void {
  if (introDone) {
    callback();
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener(INTRO_DONE_EVENT, handler, { once: true });
  return () => window.removeEventListener(INTRO_DONE_EVENT, handler);
}

export function isHeroCopyDone(): boolean {
  return heroCopyDone;
}

export function markHeroCopyDone(): void {
  if (heroCopyDone) return;
  heroCopyDone = true;
  document.documentElement.dataset.heroCopyDone = '1';
  window.dispatchEvent(new CustomEvent(HERO_COPY_DONE_EVENT));
}

export function onHeroCopyDone(callback: () => void): () => void {
  if (heroCopyDone) {
    callback();
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener(HERO_COPY_DONE_EVENT, handler, { once: true });
  return () => window.removeEventListener(HERO_COPY_DONE_EVENT, handler);
}
