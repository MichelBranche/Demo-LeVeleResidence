import { useEffect, useId, useRef, useState } from 'react';
import { headerUiCopy } from '../data/navCopy';
import { useSiteLocale } from '../hooks/useSiteLocale';
import { LOCALE_LABELS, SITE_LOCALES } from '../lib/siteLocales';
import { FlagIcon } from './FlagIcon';

export function LanguageToggle() {
  const { locale, setLocale } = useSiteLocale();
  const ui = headerUiCopy[locale];
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className="site-header__lang-wrap" ref={wrapRef}>
      <button
        type="button"
        className="site-header__lang"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-label={`${ui.langMenu}: ${LOCALE_LABELS[locale]}. ${ui.langChoose}.`}
        title={LOCALE_LABELS[locale]}
      >
        <FlagIcon locale={locale} className="site-header__lang-flag" />
      </button>

      {open ? (
        <ul
          id={listId}
          className="site-header__lang-menu"
          role="listbox"
          aria-label={ui.langChoose}
        >
          {SITE_LOCALES.map((code) => {
            const selected = code === locale;
            return (
              <li key={code} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`site-header__lang-option${selected ? ' is-selected' : ''}`}
                  onClick={() => {
                    setLocale(code);
                    setOpen(false);
                  }}
                >
                  <FlagIcon locale={code} className="site-header__lang-flag" />
                  <span className="site-header__lang-option-label">{LOCALE_LABELS[code]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
