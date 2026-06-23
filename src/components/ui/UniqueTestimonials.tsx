import { AnimatePresence, useReducedMotion } from 'framer-motion';
import * as m from 'framer-motion/m';
import '../../styles/unique-testimonials.css';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { formatCopy } from '@/i18n';
import { cn } from '@/lib/utils';
import { MotionLazy } from './MotionLazy';

const AUTOPLAY_MS = 5200;

export type TestimonialItem = {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  source: 'google' | 'tripadvisor';
  href?: string;
};

type UniqueTestimonialsProps = {
  items: readonly TestimonialItem[];
  ariaLabel: string;
  openOnTemplate: string;
  prevAria: string;
  nextAria: string;
  className?: string;
};

function TestimonialSlide({
  item,
  openOnTemplate,
}: {
  item: TestimonialItem;
  openOnTemplate: string;
}) {
  return (
    <>
      <blockquote className="unique-testimonial__quote">
        <p>{item.quote}</p>
      </blockquote>

      <footer className="unique-testimonial__attribution">
        <cite className="unique-testimonial__author">{item.author}</cite>
        <span className="unique-testimonial__role" aria-hidden>
          ·
        </span>
        <span className="unique-testimonial__role">{item.role}</span>
        {item.href ? (
          <a
            className="unique-testimonial__source-link"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {formatCopy(openOnTemplate, {
              platform: item.source === 'google' ? 'Google' : 'Tripadvisor',
            })}
          </a>
        ) : null}
      </footer>
    </>
  );
}

export function UniqueTestimonials({
  items,
  ariaLabel,
  openOnTemplate,
  className,
}: UniqueTestimonialsProps) {
  const reduceMotion = useReducedMotion();
  const testimonials = useMemo(() => items.slice(0, 3), [items]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stageHeight, setStageHeight] = useState<number | null>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const count = testimonials.length;

  const goToNext = useCallback(() => {
    if (count <= 1) return;
    setActiveIndex((index) => (index + 1) % count);
  }, [count]);

  const measureStage = useCallback(() => {
    const root = measureRef.current;
    if (!root) return;

    const heights = Array.from(
      root.querySelectorAll<HTMLElement>('[data-testimonial-measure]'),
    ).map((node) => node.getBoundingClientRect().height);

    const max = Math.max(0, ...heights);
    if (max > 0) {
      setStageHeight(Math.ceil(max));
    }
  }, []);

  useLayoutEffect(() => {
    measureStage();
  }, [measureStage, testimonials, openOnTemplate]);

  useEffect(() => {
    const root = measureRef.current;
    if (!root || typeof ResizeObserver === 'undefined') return undefined;

    const observer = new ResizeObserver(() => {
      measureStage();
    });

    observer.observe(root);
    return () => observer.disconnect();
  }, [measureStage, testimonials]);

  useEffect(() => {
    if (reduceMotion || count <= 1 || paused) return undefined;

    const id = window.setInterval(goToNext, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, count, paused, goToNext]);

  useEffect(() => {
    if (count <= 1) return undefined;

    const onVisibility = () => {
      setPaused(document.hidden);
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [count]);

  if (testimonials.length === 0) return null;

  const active = testimonials[activeIndex] ?? testimonials[0];

  const motionProps = reduceMotion
    ? { initial: false, animate: { opacity: 1, y: 0 }, exit: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const },
      };

  return (
    <MotionLazy>
    <article
      className={cn('unique-testimonial', className)}
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div
        className="unique-testimonial__body"
        style={stageHeight ? { minHeight: stageHeight } : undefined}
      >
        <AnimatePresence mode="wait">
          <m.div
            key={active.id}
            className="unique-testimonial__content"
            aria-live="polite"
            {...motionProps}
          >
            <TestimonialSlide item={active} openOnTemplate={openOnTemplate} />
          </m.div>
        </AnimatePresence>
      </div>

      <div ref={measureRef} className="unique-testimonial__measure" aria-hidden>
        {testimonials.map((item) => (
          <div
            key={item.id}
            data-testimonial-measure
            className="unique-testimonial__content unique-testimonial__content--measure"
          >
            <TestimonialSlide item={item} openOnTemplate={openOnTemplate} />
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="unique-testimonial__dots" aria-hidden>
          {testimonials.map((testimonial, index) => (
            <span
              key={testimonial.id}
              className={cn(
                'unique-testimonial__dot',
                index === activeIndex && 'unique-testimonial__dot--active',
              )}
            />
          ))}
        </div>
      )}
    </article>
    </MotionLazy>
  );
}
