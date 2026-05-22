import { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { motion, animate, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { prefersReducedMotion } from '@/lib/motion';

export type ReviewSummaryCardProps = {
  rating: number;
  reviewCount: number;
  maxRating?: number;
  summaryText: string;
  reviewCountLabel: string;
  locale?: string;
  href?: string;
  platformLabel?: string;
  /** Ritardo ingresso rispetto alle altre card (es. 0, 1). */
  staggerIndex?: number;
  className?: string;
};

const STAGGER_STEP = 0.14;
const COUNT_DELAY = 0.35;

function formatCount(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(Math.round(value));
}

export function ReviewSummaryCard({
  rating,
  reviewCount,
  maxRating = 5,
  summaryText,
  reviewCountLabel,
  locale = 'it',
  href,
  platformLabel,
  staggerIndex = 0,
  className,
}: ReviewSummaryCardProps) {
  const observeRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLSpanElement>(null);
  const reviewCountRef = useRef<HTMLSpanElement>(null);
  const reduced = prefersReducedMotion();
  const hasAnimatedRef = useRef(false);

  const isInView = useInView(observeRef, {
    once: true,
    amount: 0.45,
    margin: '0px 0px -12% 0px',
  });

  const baseDelay = reduced ? 0 : staggerIndex * STAGGER_STEP;

  useEffect(() => {
    const setFinalValues = () => {
      if (ratingRef.current) ratingRef.current.textContent = rating.toFixed(1);
      if (reviewCountRef.current) {
        reviewCountRef.current.textContent = formatCount(reviewCount, locale);
      }
    };

    const setZeroValues = () => {
      if (ratingRef.current) ratingRef.current.textContent = '0.0';
      if (reviewCountRef.current) reviewCountRef.current.textContent = formatCount(0, locale);
    };

    if (!isInView) {
      if (!hasAnimatedRef.current) setZeroValues();
      return;
    }

    if (reduced) {
      setFinalValues();
      hasAnimatedRef.current = true;
      return;
    }

    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    setZeroValues();

    const delay = baseDelay + COUNT_DELAY;
    const ratingControl = animate(0, rating, {
      delay,
      duration: 1.5,
      ease: 'easeOut',
      onUpdate(value) {
        if (ratingRef.current) {
          ratingRef.current.textContent = value.toFixed(1);
        }
      },
    });

    const reviewCountControl = animate(0, reviewCount, {
      delay,
      duration: 1.5,
      ease: 'easeOut',
      onUpdate(value) {
        if (reviewCountRef.current) {
          reviewCountRef.current.textContent = formatCount(value, locale);
        }
      },
    });

    return () => {
      ratingControl.stop();
      reviewCountControl.stop();
    };
  }, [isInView, reduced, rating, reviewCount, locale, baseDelay]);

  const showMotion = isInView && !reduced;

  const ariaLabel =
    platformLabel != null
      ? `${platformLabel}: ${rating} su ${maxRating}, ${reviewCount} ${reviewCountLabel}. ${summaryText}`
      : `Valutazione ${rating} su ${maxRating}, ${reviewCount} ${reviewCountLabel}. ${summaryText}`;

  const MotionTag = href ? motion.a : motion.div;
  const linkProps = href
    ? { href, target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <div ref={observeRef} className={cn('review-summary-card__wrap', className)}>
    <MotionTag
      className={cn('review-summary-card', href && 'review-summary-card--link')}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={
        reduced
          ? { opacity: 1, y: 0 }
          : showMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 28 }
      }
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: baseDelay,
      }}
      aria-label={ariaLabel}
      {...linkProps}
    >
      <div className="review-summary-card__stars" aria-hidden>
        {Array.from({ length: maxRating }, (_, i) => (
          <motion.span
            key={i}
            className="review-summary-card__star"
            initial={reduced ? false : { opacity: 0, scale: 0.45 }}
            animate={
              reduced
                ? { opacity: 1, scale: 1 }
                : showMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.45 }
            }
            transition={{
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
              delay: baseDelay + 0.18 + i * 0.09,
            }}
          >
            <Star
              className={cn(
                'review-summary-card__star-icon',
                rating >= i + 1
                  ? 'review-summary-card__star-icon--on'
                  : 'review-summary-card__star-icon--off',
              )}
              fill="currentColor"
              strokeWidth={1.25}
              aria-hidden
            />
          </motion.span>
        ))}
      </div>

      <motion.p
        className="review-summary-card__score"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={
          reduced
            ? { opacity: 1, y: 0 }
            : showMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 10 }
        }
        transition={{
          duration: 0.45,
          ease: 'easeOut',
          delay: baseDelay + 0.42,
        }}
      >
        <span ref={ratingRef}>0.0</span>
        <span className="review-summary-card__count">
          {' '}
          (
          <span ref={reviewCountRef}>0</span> {reviewCountLabel})
        </span>
      </motion.p>

      <motion.p
        className="review-summary-card__text"
        initial={reduced ? false : { opacity: 0 }}
        animate={
          reduced ? { opacity: 1 } : showMotion ? { opacity: 1 } : { opacity: 0 }
        }
        transition={{
          duration: 0.5,
          ease: 'easeOut',
          delay: baseDelay + 0.55,
        }}
      >
        {summaryText}
      </motion.p>
    </MotionTag>
    </div>
  );
}
