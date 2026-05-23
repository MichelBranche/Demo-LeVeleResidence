import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function wrapLines(element: HTMLElement) {
  const text = element.textContent ?? '';
  const words = text.split(/\s+/);
  element.innerHTML = '';

  const line = document.createElement('span');
  line.className = 'line-reveal__line';
  const mask = document.createElement('span');
  mask.className = 'line-reveal__mask';
  const inner = document.createElement('span');
  inner.className = 'line-reveal__inner';

  words.forEach((word, index) => {
    inner.append(document.createTextNode(word));
    if (index < words.length - 1) {
      inner.append(document.createTextNode(' '));
    }
  });

  mask.append(inner);
  line.append(mask);
  element.append(line);
}

export function useLineReveal(
  scopeRef: RefObject<HTMLElement | null>,
  selector: string,
  options?: { delay?: number },
) {
  useGSAP(
    () => {
      const root = scopeRef.current;
      if (!root) return;

      const targets = root.querySelectorAll<HTMLElement>(selector);
      targets.forEach((el) => {
        wrapLines(el);
        gsap.from(el.querySelectorAll('.line-reveal__inner'), {
          y: '100%',
          stagger: 0.01,
          duration: 1.6,
          delay: options?.delay ?? 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    },
    { scope: scopeRef, dependencies: [selector] },
  );
}
