import { useSiteLocale } from '../../hooks/useSiteLocale';
import { ExpandableGallery } from '../ui/ExpandableGallery';

export function GallerySection() {
  const { content } = useSiteLocale();
  const { residenceWelcome, residenceWelcomeImages } = content;

  return (
    <section id="galleria" className="section section--gallery" aria-labelledby="gallery-title">
      <div className="section--gallery__inner">
        <h2 id="gallery-title" className="section-title display-serif section--gallery__title sr-only">
          {residenceWelcome.galleryAria}
        </h2>
        <ExpandableGallery
          images={residenceWelcomeImages}
          closeLabel={residenceWelcome.closeLabel}
          prevLabel={residenceWelcome.prevLabel}
          nextLabel={residenceWelcome.nextLabel}
          counterLabel={(current, total) => residenceWelcome.counterLabel.replace('{current}', String(current)).replace('{total}', String(total))}
          autoplayLabel={residenceWelcome.autoplayLabel}
          autoplayOnEnter
        />
      </div>
    </section>
  );
}
