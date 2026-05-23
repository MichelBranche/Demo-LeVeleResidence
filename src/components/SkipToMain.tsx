import { useSiteLocale } from '../hooks/useSiteLocale';

export function SkipToMain() {
  const { content } = useSiteLocale();

  return (
    <a className="skip-link" href="#main-content">
      {content.headerUi.skipToContent}
    </a>
  );
}
