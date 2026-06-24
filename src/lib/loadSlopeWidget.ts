import {
  buildSlopePromotionsUrl,
  getSlopeBookingBaseUrl,
  type SlopeBookingLocale,
} from './slope';

const JQUERY_SRC = 'https://code.jquery.com/jquery-3.7.1.min.js';
const MODULES_SRC = '/vendor/slope-widgets/slope-modules.js';
const WIDGETS_SRC = '/vendor/slope-widgets/slope-widgets.js';

type ScriptLoadState = 'idle' | 'loading' | 'ready' | 'error';

let loadState: ScriptLoadState = 'idle';
let loadPromise: Promise<void> | null = null;

function loadScript(src: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

function ensureSlopeStyles(): void {
  if (document.getElementById('slope-widgets-css')) return;

  const link = document.createElement('link');
  link.id = 'slope-widgets-css';
  link.rel = 'stylesheet';
  link.href = '/vendor/slope-widgets/slope-widgets.css';
  document.head.appendChild(link);
}

export function ensureSlopeWidgetAssets(): Promise<void> {
  if (loadState === 'ready') return Promise.resolve();
  if (loadState === 'error') return Promise.reject(new Error('Slope widget assets failed to load'));
  if (loadPromise) return loadPromise;

  loadState = 'loading';
  ensureSlopeStyles();

  loadPromise = (async () => {
    await loadScript(JQUERY_SRC, 'slope-jquery');
    (window as SlopeWidgetWindow).slpWidgetOptions =
      (window as SlopeWidgetWindow).slpWidgetOptions ?? { force_mobile_layout: false };
    await loadScript(MODULES_SRC, 'slope-modules-js');
    await loadScript(WIDGETS_SRC, 'slope-widgets-js');
    loadState = 'ready';
  })().catch((error) => {
    loadState = 'error';
    loadPromise = null;
    throw error;
  });

  return loadPromise;
}

type SlopeJQueryObject = {
  data: (key: string) => unknown;
  find: (selector: string) => SlopeJQueryObject;
  html: (content?: string) => unknown;
  length: number;
};

type SlopeJQueryStatic = {
  (selector: string | Element): SlopeJQueryObject;
  get: (
    url: string,
    data: null,
    success: (response: { html?: string }) => void,
    dataType: 'jsonp',
  ) => void;
};

type SlopeWidgetWindow = Window & {
  jQuery?: SlopeJQueryStatic;
  slopeDateRangePicker?: {
    create: (
      checkInSelector: string,
      checkOutSelector: string,
      widget: Element,
      index: number,
      $: SlopeJQueryStatic,
    ) => { init: ($: SlopeJQueryStatic) => void };
  };
  slpWidgetOptions?: { force_mobile_layout?: boolean };
};

function ensureSlopeRemoteWidgetCss(baseUrl: string): void {
  if (document.getElementById('slope-widget-css')) return;

  const link = document.createElement('link');
  link.id = 'slope-widget-css';
  link.rel = 'stylesheet';
  link.href = `${baseUrl}/css/widgets/slope.css`;
  document.head.appendChild(link);
}

export function initSlopePromotionsWidget(
  propertyId: string,
  locale: SlopeBookingLocale,
): Promise<void> {
  return ensureSlopeWidgetAssets().then(
    () =>
      new Promise((resolve, reject) => {
        const $ = (window as SlopeWidgetWindow).jQuery;

        if (!$) {
          reject(new Error('jQuery not available'));
          return;
        }

        const mount = $('#slope-promotions');

        if (mount.length === 0) {
          reject(new Error('Slope promotions mount not found'));
          return;
        }

        ensureSlopeRemoteWidgetCss(getSlopeBookingBaseUrl());

        const url = buildSlopePromotionsUrl(propertyId, locale);
        let settled = false;

        const finish = (error?: Error) => {
          if (settled) return;
          settled = true;
          window.clearTimeout(timeoutId);
          if (error) reject(error);
          else resolve();
        };

        const timeoutId = window.setTimeout(() => {
          finish(new Error('Slope promotions request timed out'));
        }, 15000);

        $.get(
          url,
          null,
          (data) => {
            const html = data.html ?? '';
            mount.html(html);

            if (!html.trim()) {
              finish(new Error('Slope promotions response was empty'));
              return;
            }

            const widgetElement = document.getElementById('slope-promotions');
            if (widgetElement?.hasAttribute('data-open-new-tab')) {
              widgetElement.querySelectorAll('.slp-button').forEach((button) => {
                button.setAttribute('target', '_blank');
                button.setAttribute('rel', 'noopener noreferrer');
              });
            }

            finish();
          },
          'jsonp',
        );
      }),
  );
}

export function destroySlopeReservationWidgets(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-widget-count]').forEach((widget) => {
    widget.querySelectorAll('.slope-check-in-input').forEach((input) => {
      const flatpickrInstance = (
        input as HTMLInputElement & { _flatpickr?: { destroy: () => void } }
      )._flatpickr;
      flatpickrInstance?.destroy();
    });
    delete widget.dataset.slopeInitialized;
  });
}

export function initSlopeReservationWidgets(root: ParentNode = document): void {
  const win = window as SlopeWidgetWindow;
  const $ = win.jQuery;
  const slopeDateRangePicker = win.slopeDateRangePicker;

  if (!$ || !slopeDateRangePicker) return;

  const config = $('#slope-widgets-config');
  let slopeWidgetsMinDays = config.data('min-days');
  if (slopeWidgetsMinDays === '' || Number(slopeWidgetsMinDays) <= 0) {
    slopeWidgetsMinDays = 1;
  }

  Array.from(root.querySelectorAll<HTMLElement>('[data-widget-count]')).forEach(
    (widget, index) => {
      if (widget.dataset.slopeInitialized === 'true') return;

      destroySlopeReservationWidgets(widget);

      widget.dataset.slopeInitialized = 'true';
      widget.setAttribute('data-widget-count', String(index));
      slopeDateRangePicker
        .create('.slope-check-in-input', '.slope-check-out-input', widget, index, $)
        .init($);
    },
  );
}
