"use strict";

// Calendario e barra delle prenotazioni
jQuery(document).ready(function ($) {
  // Reservation widgets are initialized by the host app after mount (initSlopeReservationWidgets).

  var slopeWidgetBorderRadius = $("#slope-widgets-config").data("range_button");

  if (slopeWidgetBorderRadius != '') {
    $(".slp-column").css('border-radius:', slopeWidgetBorderRadius);
  } //Title size Promotions


  var slopeWidgetTitleSize = $("#slope-widgets-config").data("title_size");

  if (slopeWidgetTitleSize != '') {
    $("p.slp-column").css('font-size:', slopeWidgetTitleSize);
  }
}); // Packages and promotions

/**
 * Widget object to isolate all the logic needed from a widget.
 */

var WidgetManager = function () {
  /**
   * Establishment ID for the widget instance.
   * @var {string}
   */
  var establishmentID;
  /**
   * Domain. The default value gets overridden in testing scenarios (e.g. //test.booking.slope.it).
   * @var {string}
   */

  var domain;
  /**
   * Language. The language in which the widget must be rendered.
   */

  var language;
  /**
   * Controller action representing the path fo the widget we want to retrieve.
   * @var {string}
   */

  var widgetAction = "search";
  return {
    /**
     * Populates the Widget object, this function is sort of initializer ("constructor").
     *
     * @param {string} widgetEstablishmentID
     * @param {string} widgetDomain
     * @param {string} type - Accepted values: "promotions", "search"
     * @param {string} lang - Can be empty
     */
    create: function create(widgetEstablishmentID, widgetDomain, type, lang) {
      establishmentID = widgetEstablishmentID;
      language = lang;
      domain = widgetDomain || "booking.slope.it";
      domain = "https://" + domain;

      switch (type) {
        case "promotions":
          widgetAction = "promotions";
          break;

        case "search":
        default:
          widgetAction = "search";
          break;
      }
    },

    /**
     * Returns the url of the action that generates the JSONp for the desired widget.
     *
     * @returns {string}
     */
    getWidgetUrl: function getWidgetUrl() {
      return domain + '/widgets/' + widgetAction + '/' + establishmentID + (language ? '/' + language : '');
    },

    /**
     * Returns the full url to the css resource.
     *
     * @returns {string}
     */
    getCSSResource: function getCSSResource() {
      return domain + "/css/widgets/slope.css";
    }
  };
}();
/**
 * Used to embed our promotions widget into external websites.
 * Dumped in a publicly accessible, easily readable URL (via Assetic `output` attribute).
 */


jQuery(document).ready(function ($) {
  // Host app loads promotions via initSlopePromotionsWidget (locale + custom markup).
  var promotionsMount = $('#slope-promotions');
  if (promotionsMount.length && promotionsMount.attr('data-host-managed')) {
    return;
  }

  if (promotionsMount.length) {
    WidgetManager.create(promotionsMount.attr('data-id'), $('#slope-bl').attr('data-domain'), 'promotions'); // The page might have more than 1 widget, include the css just once.

    if ($('#widget-css').length === 0) {
      $("head").append('<link id="widget-css" rel="stylesheet" type="text/css" href="' + WidgetManager.getCSSResource() + '" />');
    }

    $.get(WidgetManager.getWidgetUrl(), null, function (data) {
      promotionsMount.html(data.html); // Inject HTML in the page.
      // Book engine in new window Promotions

      if (document.querySelectorAll('[data-open-new-tab]').length > 0) {
        var widgetElement = document.getElementById('slope-promotions');
        widgetElement.querySelectorAll('.slp-button').forEach(function (promotionButton) {
          return promotionButton.setAttribute('target', '_blank');
        });
      }
    }, 'jsonp');
  }
});