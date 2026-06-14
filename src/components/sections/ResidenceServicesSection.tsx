import { ResidenceCrispShowcase } from '../ui/ResidenceCrispShowcase';

export function ResidenceServicesSection() {
  return (
    <section id="residence-servizi" className="residence-services-section" aria-labelledby="residence-services-title">
      <div className="residence-services-section__inner">
        <ResidenceCrispShowcase variant="services" />
      </div>
    </section>
  );
}
