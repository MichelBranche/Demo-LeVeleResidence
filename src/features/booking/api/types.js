/**
 * @typedef {Object} GuestBreakdown
 * @property {number} adults
 * @property {number} children
 * @property {number} infants
 */

/**
 * Payload inviato al backend (date ISO `YYYY-MM-DD`).
 * @typedef {Object} AvailabilitySearchPayload
 * @property {string} checkIn
 * @property {string} checkOut
 * @property {GuestBreakdown} guests
 */

/**
 * Voce elenco unità nella risposta.
 * @typedef {Object} AvailabilityUnitResult
 * @property {string} unitId
 * @property {string} name
 * @property {string} [kicker]
 * @property {'giardino' | 'mare'} [category]
 * @property {string} [image] URL anteprima
 * @property {boolean} available
 * @property {number} [maxGuests]
 * @property {string} [reason]
 */

/**
 * Risposta ricerca (mock o API).
 * @typedef {Object} AvailabilitySearchResponse
 * @property {'mock' | 'api' | string} [source]
 * @property {boolean} [syncedFromPlanning] true se il mock deriva dal planning admin (localStorage)
 * @property {string} [searchId]
 * @property {number} nights
 * @property {string} [currency]
 * @property {boolean} globalAvailable
 * @property {AvailabilityUnitResult[]} units
 * @property {string|null} [message]
 */

export {};
