/** Shared SuitePage dynamic import — used by lazy() and hover prefetch. */
export const loadSuitePage = () =>
  import('../pages/SuitePage').then((m) => ({ default: m.SuitePage }));

export function prefetchSuitePage() {
  void loadSuitePage();
}
