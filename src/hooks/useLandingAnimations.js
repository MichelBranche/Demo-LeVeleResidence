import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export function useLandingAnimations() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    });

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    const splits = [];
    document.querySelectorAll('.split-target').forEach((target) => {
      const split = new SplitType(target, { types: 'words, chars' });
      splits.push(split);
      gsap.from(split.chars, {
        scrollTrigger: {
          trigger: target,
          start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        rotationZ: 10,
        duration: 1,
        stagger: 0.03,
        ease: 'power4.out',
      });
    });

    gsap.to('.hero-bg', {
      scale: 1,
      y: '20%',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to('.circle-mask', {
      clipPath: 'circle(150% at 50% 50%)',
      scrollTrigger: {
        trigger: '#circle-reveal',
        start: 'top top',
        end: '+=150%',
        scrub: 1,
        pin: true,
      },
    });

    const horizontalSection = document.querySelector('.horizontal-wrapper');
    if (horizontalSection) {
      const getScrollAmount = () => -(horizontalSection.scrollWidth - window.innerWidth);
      gsap.to(horizontalSection, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: '#horizontal-section',
          start: 'top top',
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
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

    const parallaxUpEl = document.querySelector('.parallax-up');
    const parallaxDownEl = document.querySelector('.parallax-down');
    if (parallaxUpEl) {
      gsap.to(parallaxUpEl, {
        y: -100,
        scrollTrigger: { trigger: parallaxUpEl, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }
    if (parallaxDownEl) {
      gsap.to(parallaxDownEl, {
        y: 100,
        scrollTrigger: { trigger: parallaxDownEl, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }

    const magnets = document.querySelectorAll('.magnetic-wrap');
    const cleanupMagnetListeners = [];

    magnets.forEach((magnet) => {
      const button = magnet.querySelector('.magnetic-btn');
      if (!button) {
        return;
      }

      const onMouseMove = (event) => {
        const rect = magnet.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.4;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.4;
        gsap.to(button, { x, y, duration: 0.2 });
      };

      const onMouseLeave = () => {
        gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      };

      magnet.addEventListener('mousemove', onMouseMove);
      magnet.addEventListener('mouseleave', onMouseLeave);
      cleanupMagnetListeners.push(() => {
        magnet.removeEventListener('mousemove', onMouseMove);
        magnet.removeEventListener('mouseleave', onMouseLeave);
      });
    });

    return () => {
      cleanupMagnetListeners.forEach((cleanup) => cleanup());
      splits.forEach((split) => split.revert());
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}
