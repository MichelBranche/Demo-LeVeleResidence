import type { SlopeBookingLocale } from './slope';

function cleanTitle(text: string): string {
  return text.replace(/^Copia di\s+/i, '').trim();
}

function isValidityLabel(text: string): boolean {
  return /validit|validity|gültig|validité|until|fino|bis|jusqu/i.test(text);
}

function cellValueText(cell: HTMLElement): string {
  return cell.innerHTML
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const PROMO_COLUMN_SELECTOR = [
  '.slp-row > .slp-column',
  '.lp-row > .lp-column',
  '.slp-row > [class*="column"]',
  '.lp-row > [class*="column"]',
].join(', ');

/**
 * Replaces Slope widget markup with a minimal card: image, title, validity, CTA.
 */
export function enhanceSlopePromotionsMarkup(
  root: HTMLElement,
  _locale: SlopeBookingLocale,
): void {
  root.querySelectorAll('.slp-row, .lp-row').forEach((row) => {
    row.classList.add('slope-promotions-deck');
  });

  root.querySelectorAll<HTMLElement>(PROMO_COLUMN_SELECTOR).forEach((column) => {
    if (column.dataset.slopeEnhanced === 'true') return;

    const titleEl = column.querySelector('p.slp-title, p.lp-title');
    const button = column.querySelector<HTMLAnchorElement>(
      'a.slp-button, [id^="promotion-submit-"]',
    );

    let validityText = '';

    column.querySelectorAll('table.slp tr, table.lp tr').forEach((rowEl) => {
      const cells = rowEl.querySelectorAll('td');
      if (cells.length < 2) return;

      const label = cells[0].textContent?.trim() ?? '';
      const value = cellValueText(cells[1] as HTMLElement);

      if (isValidityLabel(label)) {
        validityText = value;
      }
    });

    const title =
      cleanTitle(titleEl?.textContent ?? '') ||
      cleanTitle(column.querySelector(':scope > p')?.textContent ?? '');

    const image = column.querySelector<HTMLImageElement>(
      'img.promotion, img.lp-promotion, :scope > img',
    );

    const card = document.createElement('div');
    card.className = 'slope-promo-card';

    if (image?.src) {
      const media = document.createElement('div');
      media.className = 'slope-promo-card__media';
      image.classList.add('slope-promo-card__image');
      image.removeAttribute('width');
      image.removeAttribute('height');
      image.style.removeProperty('width');
      image.style.removeProperty('height');
      image.style.removeProperty('max-height');
      image.style.removeProperty('object-fit');
      image.alt = title || '';
      image.loading = 'lazy';
      image.decoding = 'async';
      media.appendChild(image);
      card.appendChild(media);
    }

    const body = document.createElement('div');
    body.className = 'slope-promo-card__body';

    if (title) {
      const heading = document.createElement('h3');
      heading.className = 'slope-promo-card__title display-serif';
      heading.textContent = title;
      body.appendChild(heading);
    }

    if (validityText) {
      const validity = document.createElement('p');
      validity.className = 'slope-promo-card__validity';
      validity.textContent = validityText;
      body.appendChild(validity);
    }

    if (button) {
      button.classList.add('slope-promo-card__cta');
      body.appendChild(button);
    }

    card.appendChild(body);

    column.replaceChildren(card);
    column.classList.add('slope-promo-card-shell');
    column.classList.remove('slp-column-4', 'lp-column-4');
    column.dataset.slopeEnhanced = 'true';
  });
}
