import { useEffect } from 'react';
import { buildLodgingSchema } from '../../data/seo';
import { useSiteLocale } from '../../hooks/useSiteLocale';

const SCRIPT_ID = 'ld-lodging-business';

export function StructuredData() {
  const { locale } = useSiteLocale();

  useEffect(() => {
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(buildLodgingSchema(locale));

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
    };
  }, [locale]);

  return null;
}
