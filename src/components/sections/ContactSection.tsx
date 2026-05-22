import { useSiteLocale } from '../../hooks/useSiteLocale';

export function ContactSection() {
  const { content } = useSiteLocale();
  const { contactIntro, contactLabels, config: site } = content;

  const channels = [
    { label: contactLabels.phone, href: `tel:${site.phone.replace(/\s/g, '')}`, value: site.phone },
    { label: contactLabels.mobile, href: `tel:${site.mobile.replace(/\s/g, '')}`, value: site.mobile },
    { label: contactLabels.email, href: `mailto:${site.email}`, value: site.email },
  ] as const;

  return (
    <section id="contatti" className="contact-section" aria-labelledby="contatti-title">
      <div className="contact-section__inner">
        <header className="contact-section__header">
          <div className="contact-section__heading-row">
            <span className="contact-section__rule" aria-hidden />
            <p className="contact-section__eyebrow">{contactIntro.eyebrow}</p>
          </div>
          <h2 id="contatti-title" className="contact-section__title">
            {contactIntro.title}
          </h2>
          <p className="contact-section__kicker">{contactIntro.kicker}</p>
        </header>

        <article className="contact-section__panel">
          <div className="contact-section__residence">
            <h3 className="contact-section__panel-title">{site.name}</h3>
            <address className="contact-section__address">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city} ({site.address.region})
              <br />
              {content.addressCountry}
            </address>
          </div>

          <ul className="contact-section__channels" role="list">
            {channels.map((ch) => (
              <li key={ch.label}>
                <span className="contact-section__channel-label">{ch.label}</span>
                <a href={ch.href}>{ch.value}</a>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
