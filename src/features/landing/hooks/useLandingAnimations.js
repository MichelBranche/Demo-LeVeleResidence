import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export function useLandingAnimations({ setBookingVisible }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    });

    /* Un solo `lenis.raf` per frame, in sync con GSAP (stesso pattern di `useLenisSmoothScroll`).
       Prima c'erano insieme `requestAnimationFrame` e `gsap.ticker` → doppio step Lenis, scroll
       non allineato a ScrollTrigger (pin/scrub in particolare su mobile). */
    lenis.on('scroll', ScrollTrigger.update);
    const lenisTickerFn = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(lenisTickerFn);

    const splits = [];
    let heroLettersTween = null;
    document.querySelectorAll('.split-target').forEach((target) => {
      const split = new SplitType(target, { types: 'chars' });
      splits.push(split);
      gsap.from(split.chars, {
        scrollTrigger: { trigger: target, start: 'top 72%' },
        y: 100,
        opacity: 0,
        rotationZ: 5,
        duration: 1,
        stagger: 0.05,
        ease: 'power4.out',
      });
    });

    gsap.to('.hero-bg', {
      scale: 1,
      y: '15%',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
    });

    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
      const heroLetters = heroTitle.querySelectorAll('.char');
      heroLettersTween = gsap.to(heroLetters, {
        yPercent: -10,
        rotate: -1.2,
        duration: 2.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.05,
          from: 'center',
          yoyo: true,
          repeat: -1,
        },
      });
    }

    /* Copy hero (tagline + lede): split in parole e stato iniziale nascosto.
       L'ingresso parte all'evento `intro:done` (dispatchato quando l'utente clicca Prosegui)
       così l'animazione è visibile e non consumata dietro al loading screen. */
    const taglineEl = document.querySelector('.hero-tagline');
    const ledeEl = document.querySelector('.hero-lede');
    let taglineSplit = null;
    let ledeSplit = null;
    if (taglineEl) {
      taglineSplit = new SplitType(taglineEl, { types: 'words' });
      splits.push(taglineSplit);
      gsap.set(taglineSplit.words, { yPercent: 60, opacity: 0, skewY: 3 });
    }
    if (ledeEl) {
      ledeSplit = new SplitType(ledeEl, { types: 'words' });
      splits.push(ledeSplit);
      gsap.set(ledeSplit.words, { y: 14, opacity: 0, filter: 'blur(6px)' });
    }

    const playHeroCopy = () => {
      if (taglineSplit) {
        gsap.to(taglineSplit.words, {
          yPercent: 0,
          opacity: 1,
          skewY: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.06,
          delay: 0.2,
        });
      }
      if (ledeSplit) {
        gsap.to(ledeSplit.words, {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power2.out',
          stagger: { each: 0.022, from: 'start' },
          delay: 0.6,
        });
      }
    };
    window.addEventListener('intro:done', playHeroCopy, { once: true });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      const circleReveal = document.querySelector('#circle-reveal');
      const circleMask = document.querySelector('.circle-mask');
      if (circleReveal && circleMask) {
        gsap.fromTo(
          circleMask,
          { clipPath: 'circle(15% at 50% 50%)' },
          {
            clipPath: 'circle(150% at 50% 50%)',
            ease: 'none',
            scrollTrigger: {
              trigger: circleReveal,
              start: 'top top',
              /* Schermi stretti: più traccia di scroll così lo scrub resta controllabile col touch. */
              end: () => (window.innerWidth < 1024 ? '+=220%' : '+=120%'),
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              fastScrollEnd: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    } else {
      /* Rivelazione statica senza pin/scrub per chi preferisce meno movimento. */
      gsap.set('.circle-mask', { clipPath: 'circle(150% at 50% 50%)' });
    }

    document.querySelectorAll('[data-bg]').forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () =>
          gsap.to('body', {
            backgroundColor: section.dataset.bg,
            color: section.dataset.text,
            duration: 0.8,
          }),
        onEnterBack: () =>
          gsap.to('body', {
            backgroundColor: section.dataset.bg,
            color: section.dataset.text,
            duration: 0.8,
          }),
      });
    });

    const cleanupMagnet = [];

    if (!prefersReducedMotion) {
      const offersSection = document.querySelector('.offers-section');
      const offersHeader = document.querySelector('.offers-header');
      const offersCards = gsap.utils.toArray('.offers-section .offer-card');
      const offersOrbs = gsap.utils.toArray('.offers-section .offers-orb');
      const offerIcons = gsap.utils.toArray('.offers-section .offer-icon-wrap');
      const offersMarquee = document.querySelector('.offers-top-marquee');
      const offerGlow = gsap.utils.toArray('.offers-section .offer-glow');
      const cleanupOfferTilt = [];

      if (offersSection && offersHeader && offersCards.length > 0) {
        const offersTl = gsap.timeline({
          scrollTrigger: {
            trigger: offersSection,
            start: 'top 74%',
            once: true,
          },
        });

        offersTl.from(offersHeader, {
          y: 38,
          opacity: 0,
          duration: 0.95,
          ease: 'power4.out',
        });

        offersTl.from(
          offersCards,
          {
            clipPath: 'inset(0 0 100% 0 round 12px)',
            y: 44,
            opacity: 0,
            rotateX: 6,
            transformOrigin: 'top center',
            duration: 1.05,
            stagger: 0.15,
            ease: 'power4.out',
          },
          '-=0.55'
        );

        offersTl.from(
          offerGlow,
          {
            scale: 0.6,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.1,
          },
          '-=0.9'
        );

        offersCards.forEach((card) => {
          const onMove = (event) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            const rotateY = (x - 0.5) * 8;
            const rotateX = (0.5 - y) * 6;
            gsap.to(card, {
              rotateX,
              rotateY,
              y: -6,
              transformPerspective: 900,
              transformOrigin: 'center',
              duration: 0.35,
              ease: 'power2.out',
            });
          };

          const onLeave = () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              y: 0,
              duration: 0.5,
              ease: 'power3.out',
            });
          };

          card.addEventListener('mousemove', onMove);
          card.addEventListener('mouseleave', onLeave);
          cleanupOfferTilt.push(() => {
            card.removeEventListener('mousemove', onMove);
            card.removeEventListener('mouseleave', onLeave);
          });
        });
      }

      if (offersMarquee) {
        gsap.to(offersMarquee, {
          xPercent: -12,
          duration: 18,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        });
      }

      if (offersOrbs.length > 0) {
        gsap.to(offersOrbs, {
          yPercent: -14,
          xPercent: 8,
          duration: 8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          stagger: 0.8,
        });
      }

      if (offerIcons.length > 0) {
        gsap.to(offerIcons, {
          y: -5,
          rotate: 3,
          duration: 2.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          stagger: 0.2,
        });
      }

      if (cleanupOfferTilt.length > 0) {
        cleanupMagnet.push(() => {
          cleanupOfferTilt.forEach((cleanup) => cleanup());
        });
      }
    }

    /* Suites section:
       - Desktop (>=1024px) → scroll orizzontale con pin (layout "gallery").
       - Mobile/tablet (<1024px) → stack verticale con entrance stagger su scroll. */
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const section = document.querySelector('#horizontal-section');
      const wrapper = section?.querySelector('.horizontal-wrapper');
      if (!section || !wrapper) return;

      /* Distanza orizzontale da percorrere (scrollWidth - viewport).
         invalidateOnRefresh ricalcola su resize/zoom. */
      const getDistance = () => Math.max(0, wrapper.scrollWidth - window.innerWidth);

      const tween = gsap.to(wrapper, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(wrapper, { clearProps: 'transform' });
      };
    });

    mm.add('(max-width: 1023px)', () => {
      /* Entrance stagger soltanto quando NON c'è il pin orizzontale. */
      const targets = gsap.utils.toArray('.suites-section .suite-card, .suites-section .suite-scene');
      const tweens = targets.map((el) =>
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          y: 42,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
        })
      );

      return () => {
        tweens.forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
      };
    });

    /* Carosello recensioni: loop orizzontale infinito (doppia striscia nel DOM). */
    let cleanupReviewMarquee = () => {};
    if (!prefersReducedMotion) {
      const track = document.querySelector('.reviews-marquee-track');
      const strip = track?.querySelector('.reviews-marquee-strip');
      if (track && strip) {
        const mask = track.closest('.reviews-marquee-mask');
        let tween = null;

        const startMarquee = () => {
          tween?.kill();
          const w = strip.offsetWidth;
          if (w < 8) return;
          const dur = Math.max(28, w / 48);
          tween = gsap.fromTo(track, { x: 0 }, { x: -w, duration: dur, ease: 'none', repeat: -1 });
        };

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            startMarquee();
            ScrollTrigger.refresh();
          });
        });

        const onResize = () => {
          gsap.set(track, { x: 0 });
          startMarquee();
        };
        window.addEventListener('resize', onResize);

        const onEnter = () => tween?.pause();
        const onLeave = () => tween?.resume();
        mask?.addEventListener('mouseenter', onEnter);
        mask?.addEventListener('mouseleave', onLeave);

        cleanupReviewMarquee = () => {
          window.removeEventListener('resize', onResize);
          mask?.removeEventListener('mouseenter', onEnter);
          mask?.removeEventListener('mouseleave', onLeave);
          tween?.kill();
          gsap.set(track, { clearProps: 'transform' });
        };
      }
    }

    const parallaxUp = document.querySelector('.parallax-up');
    const parallaxDown = document.querySelector('.parallax-down');
    if (parallaxUp) {
      gsap.to(parallaxUp, {
        y: -150,
        scrollTrigger: { trigger: parallaxUp, start: 'top 85%', end: 'bottom 15%', scrub: 1 },
      });
    }
    if (parallaxDown) {
      gsap.to(parallaxDown, {
        y: 150,
        scrollTrigger: { trigger: parallaxDown, start: 'top 85%', end: 'bottom 15%', scrub: 1 },
      });
    }

    const magnets = document.querySelectorAll('.magnetic-wrap');
    magnets.forEach((magnet) => {
      const button = magnet.querySelector('.magnetic-btn');
      if (!button || window.innerWidth <= 768) return;

      const onMove = (event) => {
        const rect = magnet.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.4;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.4;
        gsap.to(button, { x, y, duration: 0.2, ease: 'power2.out' });
      };
      const onLeave = () => {
        gsap.to(button, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
      };
      magnet.addEventListener('mousemove', onMove);
      magnet.addEventListener('mouseleave', onLeave);
      cleanupMagnet.push(() => {
        magnet.removeEventListener('mousemove', onMove);
        magnet.removeEventListener('mouseleave', onLeave);
      });
    });

    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      const footer = document.getElementById('site-footer');
      if (!footer) {
        setBookingVisible(pastHero);
        return;
      }
      const { top } = footer.getBoundingClientRect();
      /* Nasconde la barra quando il footer entra in vista (scompare sopra al footer). */
      const footerEntering = top < window.innerHeight - 56;
      setBookingVisible(pastHero && !footerEntering);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    /* Ricalibra altezze (100vh/addr bar) dopo il layout, importante per i pin su mobile. */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('intro:done', playHeroCopy);
      cleanupMagnet.forEach((cleanup) => cleanup());
      cleanupReviewMarquee();
      heroLettersTween?.kill();
      splits.forEach((split) => split.revert());
      /* revert() rimuove in modo sicuro tutti i tween/pin creati dentro mm.add(). */
      mm.revert();
      gsap.ticker.remove(lenisTickerFn);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [setBookingVisible]);

  /* Apertura/chiusura menu ora è gestita internamente da MenuOverlay, così
     funziona anche su route diverse dalla home. */
}
