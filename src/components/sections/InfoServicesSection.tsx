import { useSiteLocale } from '../../hooks/useSiteLocale';

export function InfoServicesSection() {
  const { content } = useSiteLocale();
  const info = content.infoServices;

  const arrivalNotes = [
    info.noteLateCheckIn,
    info.noteSupplement,
    info.noteDeposit,
    info.noteCleaningPenalty,
  ];

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
          {arrivalNotes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>

        <div className="info-conditions">
          <h3 className="info-conditions__title">{info.conditionsTitle}</h3>
          <ul className="info-conditions__list body-text" role="list">
            {info.conditions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
