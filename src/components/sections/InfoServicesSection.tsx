import { useSiteLocale } from '../../hooks/useSiteLocale';

export function InfoServicesSection() {
  const { content } = useSiteLocale();
  const info = content.infoServices;

  return (
    <section id="info-servizi" className="section section--info" aria-labelledby="info-servizi-title">
      <div className="section--info__inner">
        <p className="eyebrow">{info.eyebrow}</p>
        <h2 id="info-servizi-title" className="section-title">
          {info.title}
        </h2>
        <p className="section-kicker">{info.kicker}</p>

        <div className="info-times">
          <div>
            <h3>{info.checkInTitle}</h3>
            <p>{info.checkInTime}</p>
          </div>
          <div>
            <h3>{info.checkOutTitle}</h3>
            <p>{info.checkOutTime}</p>
          </div>
        </div>

        <div className="info-notes body-text">
          <p>{info.noteLateCheckIn}</p>
          <p>{info.noteSupplement}</p>
        </div>
      </div>
    </section>
  );
}
