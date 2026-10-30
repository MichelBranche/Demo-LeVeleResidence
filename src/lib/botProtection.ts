/**
 * Routes whose browser fetches BotID must attach a challenge token.
 * The path and method must match the fetch in `src/lib/booking.ts` exactly.
 */
export const bookingBotProtection = [
  {
    path: '/api/booking',
    method: 'POST',
  },
];
