import '../../styles/residence-crisp.css';
import { ResidenceServiceIcon } from '../ResidenceServiceIcon';
import { useSiteLocale } from '@/hooks/useSiteLocale';

type ResidenceCrispShowcaseProps = {
  className?: string;
};

export function ResidenceCrispShowcase({ className = '' }: ResidenceCrispShowcaseProps) {
  const { content } = useSiteLocale();
  const { residenceAccordion, residenceServices } = content;

  return (
    <div className={`residence-crisp residence-crisp--services ${className}`.trim()}>
      <div className="residence-crisp__services-block">
        <header className="residence-crisp__services-header">
          <h3 id="residence-services-title" className="section-title residence-crisp__services-title">
            {residenceAccordion.title}
          </h3>
          {residenceAccordion.subtitle ? (
            <p className="residence-crisp__subtitle">{residenceAccordion.subtitle}</p>
          ) : null}
        </header>

        <div className="residence-services">
          {residenceServices.groups.map((group) => (
            <section
              key={group.id}
              className={`residence-services__group residence-services__group--${group.id}`}
              aria-labelledby={`residence-services-${group.id}`}
            >
              <div className="residence-services__group-head">
                <h4 id={`residence-services-${group.id}`} className="residence-services__group-title">
                  {group.title}
                </h4>
                {group.badge ? (
                  <span className="residence-services__group-badge">{group.badge}</span>
                ) : null}
              </div>

              <ul className="residence-services__list" role="list">
                {group.items.map((item) => (
                  <li key={item.icon} className="residence-services__item">
                    <span className="residence-services__icon" aria-hidden>
                      <ResidenceServiceIcon id={item.icon} />
                    </span>
                    <span className="residence-services__label">{item.label}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
