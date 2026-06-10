import { useCallback, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PelosaLightbox } from './PelosaLightbox';

export type PelosaGalleryItem = {
  src: string;
  alt: string;
  layout: 'wide' | 'tall';
};

type PelosaGalleryProps = {
  eyebrow: string;
  title: string;
  lead: string;
  viewLabel: string;
  items: PelosaGalleryItem[];
  openImageLabel: (alt: string) => string;
  lightbox: {
    closeLabel: string;
    closeGalleryLabel: string;
    prevLabel: string;
    nextLabel: string;
    counterLabel: (current: number, total: number) => string;
  };
};

export function PelosaGallery({
  eyebrow,
  title,
  lead,
  viewLabel,
  items,
  openImageLabel,
  lightbox,
}: PelosaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const goTo = useCallback(
    (index: number) => {
      if (items.length === 0) return;
      setActiveIndex((index + items.length) % items.length);
    },
    [items.length],
  );

  if (items.length === 0) return null;

  return (
    <section className="pelosa-gallery" aria-labelledby="pelosa-gallery-title">
      <div className="pelosa-gallery__inner">
        <header className="pelosa-gallery__header" data-pelosa-reveal>
          <p className="pelosa-gallery__eyebrow">{eyebrow}</p>
          <h2 id="pelosa-gallery-title" className="pelosa-gallery__title display-serif">
            {title}
          </h2>
          <p className="pelosa-gallery__lead">{lead}</p>
        </header>

        <div className="pelosa-gallery__mosaic">
          {items.map((item, index) => (
            <button
              key={item.src}
              type="button"
              className={`pelosa-gallery__item pelosa-gallery__item--${item.layout}`}
              data-pelosa-gallery-item
              onClick={() => setActiveIndex(index)}
              aria-label={openImageLabel(item.alt)}
            >
              <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
              <span className="pelosa-gallery__shade" aria-hidden />
              <span className="pelosa-gallery__meta">
                <span className="pelosa-gallery__index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="pelosa-gallery__view">
                  <span>{viewLabel}</span>
                  <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <PelosaLightbox
          images={items}
          index={activeIndex}
          onClose={closeLightbox}
          onPrev={() => goTo(activeIndex - 1)}
          onNext={() => goTo(activeIndex + 1)}
          closeLabel={lightbox.closeLabel}
          closeGalleryLabel={lightbox.closeGalleryLabel}
          prevLabel={lightbox.prevLabel}
          nextLabel={lightbox.nextLabel}
          counterLabel={lightbox.counterLabel(activeIndex + 1, items.length)}
        />
      )}
    </section>
  );
}
