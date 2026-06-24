import { ArrowUpRight, Mail, MapPin, Phone, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteLocale } from '../../hooks/useSiteLocale';
import { SwayingPhotoGallery } from '../ui/SwayingPhotoGallery';

type ContactSectionProps = {
  asPage?: boolean;
};

/** Subset of home gallery images shown on the contact page (0-based indices). */
const CONTACT_GALLERY_INDICES = [0, 2, 4, 5, 6] as const;

type ContactChannel = {
  label: string;
  href: string;
  value: string;
  icon: typeof Phone;
};

function ContactChannelsList({ channels }: { channels: readonly ContactChannel[] }) {
  return (
    <ul className="contact-section__channels" role="list">
      {channels.map((ch) => {
        const Icon = ch.icon;
        return (
          <li key={ch.label}>
            <a className="contact-section__channel" href={ch.href}>
              <span className="contact-section__channel-icon" aria-hidden>
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <span className="contact-section__channel-copy">
                <span className="contact-section__channel-label">{ch.label}</span>
                <span className="contact-section__channel-value">{ch.value}</span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function ContactAddressCard({
  siteName,
  addressLabel,
  addressCountry,
  street,
  postalCode,
  city,
  region,
}: {
  siteName: string;
  addressLabel: string;
  addressCountry: string;
  street: string;
  postalCode: string;
  city: string;
  region: string;
}) {
  return (
    <article className="contact-section__address-card">
      <div className="contact-section__address-head">
        <MapPin size={18} strokeWidth={1.75} aria-hidden />
        <h3 className="contact-section__address-label">{addressLabel}</h3>
      </div>
      <p className="contact-section__residence-name">{siteName}</p>
      <address className="contact-section__address">
        {street}
        <br />
        {postalCode} {city} ({region})
        <br />
        {addressCountry}
      </address>
    </article>
  );
}

function ContactPhotoGallery({
  photos,
  ariaLabel,
  asPage,
}: {
  photos: { src: string; alt: string }[];
  ariaLabel: string;
  asPage: boolean;
}) {
  if (photos.length === 0) return null;

  return (
    <ul
      className={asPage ? 'contact-page__gallery' : 'contact-section__photos'}
      role="list"
      aria-label={ariaLabel}
    >
      {photos.map((photo, index) => (
        <li
          key={photo.src}
          className={
            asPage
              ? `contact-page__gallery-item${index === 0 ? ' contact-page__gallery-item--feature' : ''}`
              : 'contact-section__photo-item'
          }
        >
          <figure className={asPage ? 'contact-page__figure' : 'contact-section__photo'}>
            <img
              src={photo.src}
              alt={photo.alt}
              className={asPage ? 'contact-page__figure-img' : 'contact-section__photo-img'}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </li>
      ))}
    </ul>
  );
}

export function ContactSection({ asPage = false }: ContactSectionProps) {
  const { content } = useSiteLocale();
  const {
    contactIntro,
    contactLabels,
    contactCustomOffer,
    contactPhotos,
    gallery,
    galleryImages,
    config: site,
    siteMapCoords,
    addressCountry,
  } = content;

  const channels = [
    {
      label: contactLabels.phone,
      href: `tel:${site.phone.replace(/\s/g, '')}`,
      value: site.phone,
      icon: Phone,
    },
    {
      label: contactLabels.mobile,
      href: `tel:${site.mobile.replace(/\s/g, '')}`,
      value: site.mobile,
      icon: Smartphone,
    },
    {
      label: contactLabels.email,
      href: `mailto:${site.email}`,
      value: site.email,
      icon: Mail,
    },
  ] as const;

  const contactGalleryPhotos = CONTACT_GALLERY_INDICES.flatMap((index) => {
    const photo = galleryImages[index];
    return photo ? [photo] : [];
  });

  const titleId = 'contatti-title';
  const Root = asPage ? 'article' : 'section';

  if (asPage) {
    return (
      <Root
        id="contatti"
        className="contact-section contact-page"
        aria-labelledby={titleId}
      >
        <div className="contact-page__inner">
          <header className="contact-page__header">
            <div className="contact-page__heading-row">
              <span className="contact-page__rule" aria-hidden />
              <p className="contact-page__eyebrow">{contactIntro.eyebrow}</p>
            </div>
            <h1 id={titleId} className="contact-page__title display-serif">
              {contactIntro.title}
            </h1>
            <p className="contact-page__lead">{contactIntro.kicker}</p>
          </header>

          <div className="contact-page__shell">
            <div className="contact-page__panel">
              <div className="contact-page__panel-grid">
                <ContactAddressCard
                  siteName={site.name}
                  addressLabel={contactLabels.address}
                  addressCountry={addressCountry}
                  street={site.address.street}
                  postalCode={site.address.postalCode}
                  city={site.address.city}
                  region={site.address.region}
                />
                <ContactChannelsList channels={channels} />
              </div>

              <aside className="contact-page__offer-note" aria-labelledby="contact-custom-offer-title">
                <h3 id="contact-custom-offer-title" className="contact-page__offer-title">
                  {contactCustomOffer.title}
                </h3>
                <p className="contact-page__offer-text">{contactCustomOffer.text}</p>
              </aside>

              <div className="contact-page__actions">
                <Link className="contact-page__cta contact-page__cta--primary" to="/prenota">
                  <span>{contactLabels.bookStay}</span>
                  <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden />
                </Link>
                <a
                  className="contact-page__cta contact-page__cta--ghost"
                  href={siteMapCoords.hasMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{contactLabels.directions}</span>
                  <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden />
                </a>
              </div>
            </div>

            <SwayingPhotoGallery
              photos={contactGalleryPhotos}
              ariaLabel={gallery.title}
              className="contact-page__swaying-gallery"
            />
          </div>
        </div>
      </Root>
    );
  }

  return (
    <Root
      id="contatti"
      className="contact-section"
      aria-labelledby={titleId}
    >
      <div className="contact-section__inner">
        <header className="contact-section__header">
          <p className="contact-section__eyebrow">{contactIntro.eyebrow}</p>
          <h2 id={titleId} className="contact-section__title">
            {contactIntro.title}
          </h2>
          <p className="contact-section__lead">{contactIntro.kicker}</p>
        </header>

        <div className="contact-section__grid">
          <ContactAddressCard
            siteName={site.name}
            addressLabel={contactLabels.address}
            addressCountry={addressCountry}
            street={site.address.street}
            postalCode={site.address.postalCode}
            city={site.address.city}
            region={site.address.region}
          />
          <ContactChannelsList channels={channels} />
        </div>

        <ContactPhotoGallery photos={contactPhotos} ariaLabel={contactIntro.title} asPage={false} />
      </div>
    </Root>
  );
}
