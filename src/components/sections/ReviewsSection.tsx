import { useRef } from 'react';
import { ReviewSummaryCard } from '@/components/ui/card-2';
import { formatCopy, getReviewListingUrl } from '../../i18n';
import type { ReviewCopy } from '../../i18n/types';
import { useReviewsMarquee } from '../../hooks/useReviewsMarquee';
import { useSiteLocale } from '../../hooks/useSiteLocale';

function StarRow({ rating, ariaTemplate }: { rating: number; ariaTemplate: string }) {
  const aria = formatCopy(ariaTemplate, { rating: String(rating) });
  return (
    <div className="review-card__stars" aria-label={aria}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? 'review-card__star--on' : undefined}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  openOnTemplate,
  ratingAria,
}: {
  review: ReviewCopy;
  openOnTemplate: string;
  ratingAria: string;
}) {
  const isGoogle = review.source === 'google';
  const platform = isGoogle ? 'Google' : 'Tripadvisor';
  const listingUrl = getReviewListingUrl(review);

  return (
    <li className={`review-card review-card--${review.source}`}>
      <div className="review-card__top">
        <span className={`review-card__badge review-card__badge--${review.source}`}>
          {platform}
        </span>
        <StarRow rating={review.rating} ariaTemplate={ratingAria} />
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
          {formatCopy(openOnTemplate, { platform })}
        </a>
      </footer>
    </li>
  );
}

const REVIEW_LINK_JOIN: Record<string, string> = {
  it: ' e ',
  en: ' and ',
  de: ' und ',
  fr: ' et ',
  es: ' y ',
};

export function ReviewsSection() {
  const { locale, content } = useSiteLocale();
  const { reviews, reviewLinks } = content;
  const { summary } = reviews;
  const sectionRef = useRef<HTMLElement>(null);
  const displayReviews = (reviews.items ?? []).filter((r) => r.rating >= 4);
  useReviewsMarquee(sectionRef);

  const renderStrip = (suffix: string) =>
    displayReviews.map((review) => (
      <ReviewCard
        key={`${review.id}${suffix}`}
        review={review}
        openOnTemplate={reviews.openOn}
        ratingAria={reviews.ratingAria}
      />
    ));

  return (
    <section id="recensioni" className="reviews" ref={sectionRef} aria-labelledby="recensioni-title">
      <div className="reviews__inner">
        <header className="reviews__header">
          <p className="reviews__eyebrow">{reviews.eyebrow}</p>
          <h2 id="recensioni-title" className="reviews__title">
            {reviews.title}
          </h2>
          <p className="reviews__subtitle">
            {reviews.subtitleBefore}{' '}
            <a href={reviewLinks.google.url} target="_blank" rel="noopener noreferrer">
              Google
            </a>{' '}
            {REVIEW_LINK_JOIN[locale] ?? ' · '}
            <a href={reviewLinks.tripadvisor.url} target="_blank" rel="noopener noreferrer">
              Tripadvisor
            </a>
            {reviews.subtitleAfter}
          </p>
        </header>

        <div className="reviews__summaries" role="group" aria-label={reviews.eyebrow}>
          <ReviewSummaryCard
            staggerIndex={0}
            className="review-summary-card--google"
            rating={summary.google.rating}
            reviewCount={summary.google.reviewCount}
            summaryText={summary.google.summaryText}
            reviewCountLabel={summary.reviewCountLabel}
            platformLabel={summary.google.platformLabel}
            locale={locale}
            href={reviewLinks.google.url}
          />
          <ReviewSummaryCard
            staggerIndex={1}
            className="review-summary-card--tripadvisor"
            rating={summary.tripadvisor.rating}
            reviewCount={summary.tripadvisor.reviewCount}
            summaryText={summary.tripadvisor.summaryText}
            reviewCountLabel={summary.reviewCountLabel}
            platformLabel={summary.tripadvisor.platformLabel}
            locale={locale}
            href={reviewLinks.tripadvisor.url}
          />
        </div>

        <div className="reviews__marquee-zone">
          <div className="reviews__marquee" aria-label={reviews.marqueeAria}>
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
      </div>
    </section>
  );
}
