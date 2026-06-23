import { useSiteLocale } from '../../hooks/useSiteLocale';
import { ExpandableGallery } from '../ui/ExpandableGallery';

export function GallerySection() {
  const { content } = useSiteLocale();
  const { gallery, galleryImages } = content;

  return (
    <section id="galleria" className="section section--gallery" aria-labelledby="gallery-title">
      <div className="section--gallery__inner">
        <h2 id="gallery-title" className="section-title display-serif section--gallery__title">
          {gallery.title}
        </h2>
        <ExpandableGallery
          images={galleryImages}
          closeLabel={gallery.closeLabel}
          prevLabel={gallery.prevLabel}
          nextLabel={gallery.nextLabel}
          counterLabel={(current, total) => gallery.counterLabel.replace('{current}', String(current)).replace('{total}', String(total))}
          autoplayLabel={gallery.autoplayLabel}
          autoplayOnEnter
        />
      </div>
    </section>
  );
}
