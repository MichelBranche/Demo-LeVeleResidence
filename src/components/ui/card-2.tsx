import gsap from 'gsap';
import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from 'react';
import { Star } from 'lucide-react';
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
  const cardRef = useRef<HTMLAnchorElement | HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ratingRef = useRef<HTMLSpanElement>(null);
  const reviewCountRef = useRef<HTMLSpanElement>(null);
  const reduced = prefersReducedMotion();
  const hasAnimatedRef = useRef(false);
  const [inView, setInView] = useState(false);

  const baseDelay = reduced ? 0 : staggerIndex * STAGGER_STEP;

  useEffect(() => {
    const root = observeRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45, rootMargin: '0px 0px -12% 0px' },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

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

    if (!inView) {
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
    const ratingCounter = { value: 0 };
    const countCounter = { value: 0 };

    const ratingTween = gsap.to(ratingCounter, {
      value: rating,
      delay,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (ratingRef.current) {
          ratingRef.current.textContent = ratingCounter.value.toFixed(1);
        }
      },
    });

    const countTween = gsap.to(countCounter, {
      value: reviewCount,
      delay,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (reviewCountRef.current) {
          reviewCountRef.current.textContent = formatCount(countCounter.value, locale);
        }
      },
    });

    return () => {
      ratingTween.kill();
      countTween.kill();
    };
  }, [inView, reduced, rating, reviewCount, locale, baseDelay]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !inView) return;

    if (reduced) {
      gsap.set(card, { clearProps: 'opacity,transform' });
      if (starsRef.current) gsap.set(starsRef.current.children, { clearProps: 'opacity,transform' });
      if (scoreRef.current) gsap.set(scoreRef.current, { clearProps: 'opacity,transform' });
      if (textRef.current) gsap.set(textRef.current, { clearProps: 'opacity' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power3.out',
          delay: baseDelay,
        },
      );

      if (starsRef.current) {
        gsap.fromTo(
          starsRef.current.children,
          { opacity: 0, scale: 0.45 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.42,
            ease: 'power3.out',
            stagger: 0.09,
            delay: baseDelay + 0.18,
          },
        );
      }

      if (scoreRef.current) {
        gsap.fromTo(
          scoreRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
            delay: baseDelay + 0.42,
          },
        );
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            delay: baseDelay + 0.55,
          },
        );
      }
    }, card);

    return () => ctx.revert();
  }, [inView, reduced, baseDelay]);

  const ariaLabel =
    platformLabel != null
      ? `${platformLabel}: ${rating} su ${maxRating}, ${reviewCount} ${reviewCountLabel}. ${summaryText}`
      : `Valutazione ${rating} su ${maxRating}, ${reviewCount} ${reviewCountLabel}. ${summaryText}`;

  const cardClass = cn('review-summary-card', href && 'review-summary-card--link');
  const sharedProps = {
    ref: cardRef,
    className: cardClass,
    'aria-label': ariaLabel,
    style: reduced ? undefined : ({ opacity: 0, transform: 'translateY(28px)' } as const),
  };

  const inner = (
    <>
      <div ref={starsRef} className="review-summary-card__stars" aria-hidden>
        {Array.from({ length: maxRating }, (_, i) => (
          <span key={i} className="review-summary-card__star">
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
          </span>
        ))}
      </div>

      <p ref={scoreRef} className="review-summary-card__score">
        <span ref={ratingRef}>0.0</span>
        <span className="review-summary-card__count">
          {' '}
          (
          <span ref={reviewCountRef}>0</span> {reviewCountLabel})
        </span>
      </p>

      <p ref={textRef} className="review-summary-card__text">
        {summaryText}
      </p>
    </>
  );

  return (
    <div ref={observeRef} className={cn('review-summary-card__wrap', className)}>
      {href ? (
        <a
          {...(sharedProps as ComponentPropsWithoutRef<'a'>)}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {inner}
        </a>
      ) : (
        <div {...(sharedProps as ComponentPropsWithoutRef<'div'>)}>{inner}</div>
      )}
    </div>
  );
}
