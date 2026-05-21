import { useRef } from 'react';
import {
  getReviewListingUrl,
  getReviewsForDisplay,
  reviewLinks,
  type Review,
} from '../../data/reviews';
import { useReviewsMarquee } from '../../hooks/useReviewsMarquee';

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="review-card__stars" aria-label={`Valutazione ${rating} su 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? 'review-card__star--on' : undefined}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const isGoogle = review.source === 'google';
  const listingUrl = getReviewListingUrl(review);

  return (
    <li className={`review-card review-card--${review.source}`}>
      <div className="review-card__top">
        <span className={`review-card__badge review-card__badge--${review.source}`}>
          {isGoogle ? 'Google' : 'Tripadvisor'}
        </span>
        <StarRow rating={review.rating} />
      </div>
      <blockquote className="review-card__quote">
        <p>{review.text}</p>
      </blockquote>
      <footer className="review-card__footer">
        <div className="review-card__meta">
          <span className="review-card__author">{review.author}</span>
          <span className="review-card__date">{review.dateLabel}</span>
        </div>
        <a
          className="review-card__link"
          href={listingUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Apri su {isGoogle ? 'Google' : 'Tripadvisor'} →
        </a>
      </footer>
    </li>
  );
}

export function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const displayReviews = getReviewsForDisplay();
  useReviewsMarquee(sectionRef);

  const renderStrip = (suffix: string) =>
    displayReviews.map((review) => <ReviewCard key={`${review.id}${suffix}`} review={review} />);

  return (
    <section id="recensioni" className="reviews" ref={sectionRef} aria-labelledby="recensioni-title">
      <div className="reviews__inner">
        <header className="reviews__header">
          <p className="reviews__eyebrow">Recensioni</p>
          <h2 id="recensioni-title" className="reviews__title">
            Cosa dicono gli ospiti
          </h2>
          <p className="reviews__subtitle">
            Estratti da{' '}
            <a href={reviewLinks.google.url} target="_blank" rel="noopener noreferrer">
              Google
            </a>{' '}
            e{' '}
            <a href={reviewLinks.tripadvisor.url} target="_blank" rel="noopener noreferrer">
              Tripadvisor
            </a>
            .
          </p>
        </header>

        <div className="reviews__marquee" aria-label="Recensioni degli ospiti">
          <div className="reviews__marquee-mask">
            <div className="reviews__marquee-track">
              <ul className="reviews__marquee-strip" role="list">
                {renderStrip('')}
              </ul>
              <ul className="reviews__marquee-strip" role="presentation" aria-hidden>
                {renderStrip('-dup')}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
