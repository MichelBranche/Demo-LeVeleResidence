import { getLocaleCopy } from '../i18n';
import { readSiteLocale } from '../lib/siteLocaleStorage';

type ErrorFallbackProps = {
  error: Error | null;
};

function Caveman() {
  return (
    <div className="error-fallback__caveman">
      <div className="error-fallback__leg">
        <div className="error-fallback__foot">
          <div className="error-fallback__fingers" />
        </div>
      </div>
      <div className="error-fallback__leg">
        <div className="error-fallback__foot">
          <div className="error-fallback__fingers" />
        </div>
      </div>
      <div className="error-fallback__shape">
        <div className="error-fallback__circle" />
        <div className="error-fallback__circle" />
      </div>
      <div className="error-fallback__head">
        <div className="error-fallback__eye">
          <div className="error-fallback__nose" />
        </div>
      </div>
      <div className="error-fallback__arm">
        <div className="error-fallback__club" />
      </div>
    </div>
  );
}

export function ErrorFallback({ error }: ErrorFallbackProps) {
  const copy = getLocaleCopy(readSiteLocale()).errorBoundary;

  return (
    <div className="error-fallback" role="alert">
      <div className="error-fallback__bg-text" aria-hidden>
        <p>Oops</p>
      </div>

      <div className="error-fallback__scene" aria-hidden>
        <Caveman />
        <Caveman />
      </div>

      <div className="error-fallback__panel">
        <h1 className="error-fallback__title">{copy.title}</h1>
        <p className="error-fallback__body">{copy.body}</p>

        <div className="error-fallback__actions">
          <button type="button" className="error-fallback__btn error-fallback__btn--primary" onClick={() => window.location.reload()}>
            {copy.reload}
          </button>
          <a className="error-fallback__btn" href="/">
            {copy.home}
          </a>
        </div>

        {error ? (
          <details className="error-fallback__details">
            <summary>{copy.detailsLabel}</summary>
            <pre>{error.message}</pre>
          </details>
        ) : null}
      </div>
    </div>
  );
}
