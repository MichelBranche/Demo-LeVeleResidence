import { ServicesAccordion } from './ServicesAccordion';

/** Wrapper standalone (home usa l’accordion dentro ResidenceSection). */
export function ServicesSection() {
  return (
    <section className="section" aria-labelledby="services-accordion-title">
      <ServicesAccordion />
    </section>
  );
}
