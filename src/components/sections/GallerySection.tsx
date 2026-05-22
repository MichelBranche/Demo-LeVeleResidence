import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSiteLocale } from '../../hooks/useSiteLocale';
import { useStackingCards } from '../../hooks/useStackingCards';

export function GallerySection() {
  const { content } = useSiteLocale();
  const { gallery, galleryImages } = content;
  const wrapperRef = useRef<HTMLDivElement>(null);

  useStackingCards(wrapperRef, '.stacking-card', [galleryImages.length]);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    const t = window.setTimeout(refresh, 400);
    return () => window.clearTimeout(t);
  }, [galleryImages.length]);

  return (
    <section id="galleria" className="section section--gallery" aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="section-title display-serif section--gallery__title">
        {gallery.title}
      </h2>
      <div className="stacking-cards" ref={wrapperRef}>
        {galleryImages.map((image, index) => (
          <article
            key={image.src}
            className="stacking-card"
            style={{ zIndex: index + 1, top: `${106 + index * 64}px` }}
          >
            <figure>
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
            </figure>
          </article>
        ))}
      </div>
    </section>
  );
}
