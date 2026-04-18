import { getReviewListingUrl, getReviewsForDisplay, REVIEW_LINKS } from '../data/reviews';

function GoogleGlyph({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function TripadvisorGlyph({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#00AA6C" />
      <circle cx="9" cy="11" r="2.25" fill="#fff" />
      <circle cx="15" cy="11" r="2.25" fill="#fff" />
      <circle cx="9" cy="11" r="1" fill="#00AA6C" />
      <circle cx="15" cy="11" r="1" fill="#00AA6C" />
      <ellipse cx="12" cy="15.5" rx="2.5" ry="1.5" fill="#fff" />
    </svg>
  );
}

function StarRow({ rating }) {
  return (
    <div className="review-stars" aria-label={`Valutazione ${rating} su 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`review-star ${i < rating ? 'review-star--on' : ''}`}>
          ★
        </span>
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const reviews = getReviewsForDisplay();

  const renderReviewItems = (keySuffix = '') =>
    reviews.map((review) => {
      const isGoogle = review.source === 'google';
      const listingUrl = getReviewListingUrl(review);
      return (
        <li
          key={`${review.id}${keySuffix}`}
          className={`review-card review-card--${review.source}`}
        >
          <div className="review-card-top">
            <div className={`review-source-badge review-source-badge--${review.source}`}>
              {isGoogle ? <GoogleGlyph className="review-source-icon" /> : <TripadvisorGlyph className="review-source-icon" />}
              <span>{isGoogle ? 'Google' : 'Tripadvisor'}</span>
            </div>
            <StarRow rating={review.rating} />
          </div>
          <blockquote className="review-quote">
            <p>{review.text}</p>
          </blockquote>
          <footer className="review-card-footer">
            <div className="review-meta">
              <span className="review-author">{review.author}</span>
              <span className="review-date">{review.dateLabel}</span>
            </div>
            <a
              className="review-cta"
              href={listingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apri su {isGoogle ? 'Google' : 'Tripadvisor'}
              <span className="review-cta-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </footer>
        </li>
      );
    });

  return (
    <section id="recensioni" className="reviews-section" data-bg="#FAF8F5" data-text="#3A312B">
      <div className="reviews-section-bg" aria-hidden="true" />
      <div className="container reviews-inner">
        <header className="reviews-header">
          <div className="reviews-heading-row">
            <span className="reviews-intro-rule" aria-hidden="true" />
            <p className="eyebrow reviews-eyebrow">Dicono di noi</p>
          </div>
          <h3 className="split-target reviews-title">L&apos;opinione dei nostri ospiti.</h3>
          <p className="reviews-subtitle">
            Estratti da{' '}
            <a href={REVIEW_LINKS.google.url} target="_blank" rel="noopener noreferrer">
              Google
            </a>{' '}
            e{' '}
            <a href={REVIEW_LINKS.tripadvisor.url} target="_blank" rel="noopener noreferrer">
              Tripadvisor
            </a>
            .
          </p>
        </header>

        <div className="reviews-marquee" aria-label="Recensioni degli ospiti">
          <div className="reviews-marquee-mask">
            <div className="reviews-marquee-track">
              <ul className="reviews-marquee-strip" role="list">
                {renderReviewItems('')}
              </ul>
              <ul className="reviews-marquee-strip" role="presentation" aria-hidden="true">
                {renderReviewItems('-dup')}
              </ul>
            </div>
          </div>
        </div>

        <div className="reviews-platforms">
          <a
            className="reviews-platform-btn reviews-platform-btn--google"
            href={REVIEW_LINKS.google.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="reviews-platform-btn-icon">
              <GoogleGlyph />
            </span>
            <span className="reviews-platform-btn-text">
              <span className="reviews-platform-btn-label">Google</span>
              <span className="reviews-platform-btn-hint">Tutte le recensioni</span>
            </span>
          </a>
          <a
            className="reviews-platform-btn reviews-platform-btn--tripadvisor"
            href={REVIEW_LINKS.tripadvisor.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="reviews-platform-btn-icon">
              <TripadvisorGlyph />
            </span>
            <span className="reviews-platform-btn-text">
              <span className="reviews-platform-btn-label">Tripadvisor</span>
              <span className="reviews-platform-btn-hint">Tutte le recensioni</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
