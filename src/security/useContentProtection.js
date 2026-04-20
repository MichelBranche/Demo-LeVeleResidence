import { useEffect } from 'react';

export function useContentProtection() {
  useEffect(() => {
    if (import.meta.env.DEV) return undefined;
    if ((import.meta.env.VITE_CONTENT_PROTECTION || 'on').toLowerCase() === 'off') return undefined;

    const onContextMenu = (event) => {
      event.preventDefault();
    };

    const onDragStart = (event) => {
      const element = event.target;
      if (!(element instanceof Element)) return;
      if (element.closest('img, video')) event.preventDefault();
    };

    const onKeyDown = (event) => {
      const k = event.key.toLowerCase();
      const blocked =
        event.key === 'F12' ||
        ((event.ctrlKey || event.metaKey) && ['s', 'u', 'p'].includes(k)) ||
        ((event.ctrlKey || event.metaKey) && event.shiftKey && ['i', 'j', 'c'].includes(k));
      if (blocked) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('dragstart', onDragStart);
    document.addEventListener('keydown', onKeyDown, true);

    return () => {
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('dragstart', onDragStart);
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, []);
}
