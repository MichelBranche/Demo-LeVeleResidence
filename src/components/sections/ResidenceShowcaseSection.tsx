import { ResidenceTiltedShowcase } from '../ui/ResidenceTiltedShowcase';

export function ResidenceShowcaseSection() {
  return (
    <section id="dintorni" className="residence-showcase" aria-labelledby="residence-showcase-title">
      <div className="residence-showcase__inner">
        <ResidenceTiltedShowcase />
      </div>
    </section>
  );
}
