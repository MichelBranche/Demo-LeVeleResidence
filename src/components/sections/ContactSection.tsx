import { Mail, MapPin, Phone, Smartphone } from 'lucide-react';
import { useSiteLocale } from '../../hooks/useSiteLocale';

type ContactSectionProps = {
  asPage?: boolean;
};

export function ContactSection({ asPage = false }: ContactSectionProps) {
  const { content } = useSiteLocale();
  const { contactIntro, contactLabels, contactPhotos, config: site } = content;

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

  const titleId = 'contatti-title';
  const Root = asPage ? 'article' : 'section';

  return (
    <Root
      id="contatti"
      className={`contact-section${asPage ? ' contact-page' : ''}`}
      aria-labelledby={titleId}
    >
      <div className={`contact-section__inner${asPage ? ' contact-page__inner' : ''}`}>
        <header className="contact-section__header">
          <p className="contact-section__eyebrow">{contactIntro.eyebrow}</p>
          {asPage ? (
            <h1 id={titleId} className="contact-section__title contact-page__title display-serif">
              {contactIntro.title}
            </h1>
          ) : (
            <h2 id={titleId} className="contact-section__title">
              {contactIntro.title}
            </h2>
          )}
          <p className="contact-section__lead">{contactIntro.kicker}</p>
        </header>

        <div className="contact-section__grid">
          <article className="contact-section__address-card">
            <div className="contact-section__address-head">
              <MapPin size={18} strokeWidth={1.75} aria-hidden />
              <h3 className="contact-section__address-label">{contactLabels.address}</h3>
            </div>
            <p className="contact-section__residence-name">{site.name}</p>
            <address className="contact-section__address">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city} ({site.address.region})
              <br />
              {content.addressCountry}
            </address>
          </article>

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
        </div>

        {contactPhotos.length > 0 && (
          <ul className="contact-section__photos" role="list" aria-label={contactIntro.title}>
            {contactPhotos.map((photo) => (
              <li key={photo.src} className="contact-section__photo-item">
                <figure className="contact-section__photo">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="contact-section__photo-img"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Root>
  );
}
