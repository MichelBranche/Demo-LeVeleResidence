import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildPageSchemas } from '../../data/seo';
import { useSiteLocale } from '../../hooks/useSiteLocale';

const SCRIPT_ID = 'ld-structured-data';

export function StructuredData() {
  const { pathname } = useLocation();
  const { locale } = useSiteLocale();

  useEffect(() => {
    const schemas = buildPageSchemas(pathname, locale);
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
    };
  }, [pathname, locale]);

  return null;
}
