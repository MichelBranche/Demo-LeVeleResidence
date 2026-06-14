import { useSiteLocale } from '../../hooks/useSiteLocale';

type InfoServicesSectionProps = {
  asPage?: boolean;
};

export function InfoServicesSection({ asPage = false }: InfoServicesSectionProps) {
  const { content } = useSiteLocale();
  const info = content.infoServices;

  const arrivalNotes = [
    info.noteLateCheckIn,
    info.noteSupplement,
    info.noteDeposit,
    info.noteCleaningPenalty,
  ];

  const titleId = 'info-servizi-title';
  const Root = asPage ? 'article' : 'section';

  return (
    <Root
      id="info-servizi"
      className={`section section--info${asPage ? ' info-page' : ''}`}
      aria-labelledby={titleId}
    >
      <div className={`section--info__inner${asPage ? ' info-page__inner' : ''}`}>
        <p className="eyebrow">{info.eyebrow}</p>
        {asPage ? (
          <h1 id={titleId} className="section-title display-serif info-page__title">
            {info.title}
          </h1>
        ) : (
          <h2 id={titleId} className="section-title">
            {info.title}
          </h2>
        )}
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
    </Root>
  );
}
