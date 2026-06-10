import { Star } from 'lucide-react';
import { UniqueTestimonials, type TestimonialItem } from '@/components/ui/UniqueTestimonials';
import { getReviewListingUrl } from '../../i18n';
import type { ReviewCopy } from '../../i18n/types';
import { useSiteLocale } from '../../hooks/useSiteLocale';

function platformLabel(source: ReviewCopy['source']) {
  return source === 'google' ? 'Google' : 'Tripadvisor';
}

function pickFeaturedReviews(items: readonly ReviewCopy[], limit = 3): ReviewCopy[] {
  const pool = items.filter((review) => review.rating >= 4);
  const google = pool.filter((review) => review.source === 'google');
  const tripadvisor = pool.filter((review) => review.source === 'tripadvisor');
  const featured: ReviewCopy[] = [];
  let gi = 0;
  let ti = 0;

  while (featured.length < limit && (gi < google.length || ti < tripadvisor.length)) {
    if (gi < google.length) featured.push(google[gi++]);
    if (featured.length < limit && ti < tripadvisor.length) featured.push(tripadvisor[ti++]);
  }

  return featured;
}

function toTestimonial(review: ReviewCopy): TestimonialItem {
  return {
    id: review.id,
    quote: review.text,
    author: review.author,
    role: `${platformLabel(review.source)} · ${review.dateLabel}`,
    rating: review.rating,
    source: review.source,
    href: getReviewListingUrl(review),
  };
}

function PlatformStat({
  platform,
  rating,
  reviewCount,
  reviewCountLabel,
  href,
}: {
  platform: string;
  rating: number;
  reviewCount: number;
  reviewCountLabel: string;
  href: string;
}) {
  return (
    <a className="reviews__platform" href={href} target="_blank" rel="noopener noreferrer">
      <span className="reviews__platform-label">{platform}</span>
      <span className="reviews__platform-score">{rating.toFixed(1)}</span>
      <span className="reviews__platform-stars" aria-hidden>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={index < Math.round(rating) ? 'reviews__platform-star--on' : undefined}
            fill="currentColor"
            strokeWidth={1.25}
          />
        ))}
      </span>
      <span className="reviews__platform-count">
        {reviewCount} {reviewCountLabel}
      </span>
    </a>
  );
}

export function ReviewsSection() {
  const { content } = useSiteLocale();
  const { reviews, reviewLinks } = content;
  const { summary } = reviews;
  const testimonialItems = pickFeaturedReviews(reviews.items ?? []).map(toTestimonial);

  return (
    <section id="recensioni" className="reviews" aria-labelledby="recensioni-title">
      <div className="reviews__inner">
        <header className="reviews__header">
          <p className="reviews__eyebrow">{reviews.eyebrow}</p>
          <h2 id="recensioni-title" className="reviews__title">
            {reviews.title}
          </h2>
        </header>

        <div className="reviews__platforms" role="group" aria-label={reviews.eyebrow}>
          <PlatformStat
            platform={summary.google.platformLabel}
            rating={summary.google.rating}
            reviewCount={summary.google.reviewCount}
            reviewCountLabel={summary.reviewCountLabel}
            href={reviewLinks.google.url}
          />
          <span className="reviews__platform-divider" aria-hidden />
          <PlatformStat
            platform={summary.tripadvisor.platformLabel}
            rating={summary.tripadvisor.rating}
            reviewCount={summary.tripadvisor.reviewCount}
            reviewCountLabel={summary.reviewCountLabel}
            href={reviewLinks.tripadvisor.url}
          />
        </div>

        <UniqueTestimonials
          items={testimonialItems}
          ariaLabel={reviews.marqueeAria}
          openOnTemplate={reviews.openOn}
          prevAria={reviews.prevAria}
          nextAria={reviews.nextAria}
          className="unique-testimonial--minimal"
        />
      </div>
    </section>
  );
}
