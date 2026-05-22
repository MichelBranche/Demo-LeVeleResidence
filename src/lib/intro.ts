const INTRO_DONE_EVENT = 'intro:done';

let introDone = false;

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
