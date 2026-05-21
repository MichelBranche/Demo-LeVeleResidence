import { useRef } from 'react';
import { galleryImages } from '../../data/site';
import { useStackingCards } from '../../hooks/useStackingCards';

export function GallerySection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useStackingCards(wrapperRef, '.stacking-card');

  return (
    <section className="section section--gallery">
      <h2 className="section-title display-serif section--gallery__title">Atmosfera Le Vele</h2>
      <div className="stacking-cards" ref={wrapperRef}>
        {galleryImages.map((item, index) => (
          <article
            key={item.src}
            className="stacking-card"
            style={{ zIndex: index + 1, top: `${106 + index * 64}px` }}
          >
            <figure>
              <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
            </figure>
          </article>
        ))}
      </div>
    </section>
  );
}
