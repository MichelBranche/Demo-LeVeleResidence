import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { suites, suiteFeatures, suiteScenes } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

function Scene({ scene }) {
  return (
    <figure className={`suite-scene suite-scene-${scene.orientation}`}>
      <img src={scene.src} alt={scene.alt ?? ''} loading="lazy" decoding="async" />
    </figure>
  );
}

export function SuitesSection() {
  const introRef = useRef(null);
  const mareRef = useRef(null);
  const giardinoRef = useRef(null);

  /* useEffect (non useLayoutEffect): lo scroll orizzontale + pin su #horizontal-section
     viene creato nel useEffect del parent (useLandingAnimations). Se partiamo prima,
     ScrollTrigger non vede ancora il pin e l’ingresso / loop non partono. */
  useEffect(() => {
    const intro = introRef.current;
    const mare = mareRef.current;
    const giardino = giardinoRef.current;
    if (!mare || !giardino || !intro) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.set([mare, giardino], {
      transformOrigin: '50% 62%',
      opacity: 0,
      y: 16,
      filter: 'blur(6px)',
    });

    /* Onde: ciclo continuo (ripete all’infinito dopo l’ingresso) */
    const waveTl = gsap.timeline({ repeat: -1, paused: true });
    waveTl
      .to(mare, { y: -7, rotate: -2.8, duration: 0.7, ease: 'sine.inOut' })
      .to(mare, { y: 6, rotate: 3, duration: 0.8, ease: 'sine.inOut' })
      .to(mare, { y: -3, rotate: -1.2, duration: 0.6, ease: 'sine.inOut' })
      .to(mare, { y: 0, rotate: 0, duration: 0.75, ease: 'sine.inOut' });

    /* Vento: solo x / rotate (no skewX: su testo italic + inline-block crea spesso una
       sottile linea chiara lungo il bordo che “scivola” con lo skew). */
    const windTl = gsap.timeline({ repeat: -1, paused: true });
    windTl
      .to(giardino, { x: 7, rotate: 1.4, duration: 1.9, ease: 'sine.inOut' })
      .to(giardino, { x: -6, rotate: -1.2, duration: 2.15, ease: 'sine.inOut' })
      .to(giardino, { x: 4, rotate: 0.65, duration: 1.5, ease: 'sine.inOut' })
      .to(giardino, { x: 0, rotate: 0, duration: 1.55, ease: 'sine.inOut' });

    let loopsStarted = false;
    const startLoops = () => {
      if (loopsStarted) return;
      loopsStarted = true;
      waveTl.play(0);
      windTl.play(0);
    };

    const entranceTl = gsap.timeline({
      paused: true,
      onComplete: () => {
        startLoops();
      },
    });
    entranceTl.to([mare, giardino], {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.75,
      stagger: 0.14,
      ease: 'power3.out',
    });

    let entranceStarted = false;
    const playEntranceOnce = () => {
      if (entranceStarted) return;
      entranceStarted = true;
      entranceTl.play(0);
    };

    /* Trigger su .suite-intro (affidabile anche con scroll orizzontale / pin) */
    const st = ScrollTrigger.create({
      trigger: intro,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        playEntranceOnce();
      },
    });

    ScrollTrigger.refresh();

    /* Se il blocco intro è già visibile al mount (refresh, resize, hash) */
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const r = intro.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.92 && r.bottom > 40;
      if (inView) {
        playEntranceOnce();
      }
    });

    return () => {
      st.kill();
      entranceTl.kill();
      waveTl.kill();
      windTl.kill();
      gsap.set([mare, giardino], { clearProps: 'all' });
    };
  }, []);

  return (
    <section id="horizontal-section" className="suites-section" data-bg="#3A312B" data-text="#FAF8F5">
      <div className="horizontal-wrapper">
        <div className="suite-intro" ref={introRef}>
          <p className="suite-eyebrow">Appartamenti</p>
          <h2>
            Con vista{' '}
            <span ref={mareRef} className="suite-view-word suite-view-word--mare">
              mare
            </span>{' '}
            o{' '}
            <span ref={giardinoRef} className="suite-view-word suite-view-word--giardino">
              giardino
            </span>
            .
          </h2>
          <p className="suite-lede">
            Il Residence offre <strong>18 monolocali</strong> con veranda e giardino o terrazza con vista mare, pensati
            per chi cerca indipendenza senza rinunciare al comfort.
          </p>
          <ul className="suite-features">
            {suiteFeatures.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>

        {/* Blocco "Vista Giardino" — card principale + scene */}
        <article className="suite-card" key={suites[0].slug}>
          <img src={suites[0].image} alt={suites[0].title} />
          <div className="suite-copy">
            <span className="suite-index">01</span>
            <div>
              <p className="suite-kicker">{suites[0].kicker}</p>
              <h3>{suites[0].title}</h3>
              <p>{suites[0].description}</p>
              <Link to={`/camere/${suites[0].slug}`} className="suite-cta">
                Scopri la camera
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </article>
        {suiteScenes.garden.map((scene) => (
          <Scene key={scene.src} scene={scene} />
        ))}

        {/* Blocco "Vista Mare" — card principale + scene */}
        <article className="suite-card" key={suites[1].slug}>
          <img src={suites[1].image} alt={suites[1].title} />
          <div className="suite-copy">
            <span className="suite-index">02</span>
            <div>
              <p className="suite-kicker">{suites[1].kicker}</p>
              <h3>{suites[1].title}</h3>
              <p>{suites[1].description}</p>
              <Link to={`/camere/${suites[1].slug}`} className="suite-cta">
                Scopri la camera
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </article>
        {suiteScenes.sea.map((scene) => (
          <Scene key={scene.src} scene={scene} />
        ))}
      </div>
    </section>
  );
}
