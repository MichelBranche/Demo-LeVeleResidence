import { useSiteLocale } from '../hooks/useSiteLocale';

export function SkipToMain() {
  const { content } = useSiteLocale();

  return (
    <a
      className="skip-link"
      href="#main-content"
      onClick={(event) => {
        event.currentTarget.blur();
      }}
    >
      {content.headerUi.skipToContent}
    </a>
  );
}
