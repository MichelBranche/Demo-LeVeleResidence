import { useEffect } from 'react';

/** Ripristina stato DOM dopo refresh/HMR (overflow, classi bloccanti). */
export function AppBootstrap() {
  useEffect(() => {
    document.body.style.overflow = '';
    document.body.style.pointerEvents = '';
    document.body.classList.remove('oh-preloader-active');

    const stuck = document.querySelector('.cookie-consent:not(.cookie-consent--visible)');
    if (stuck) {
      stuck.classList.add('cookie-consent--visible');
    }
  }, []);

  return null;
}
