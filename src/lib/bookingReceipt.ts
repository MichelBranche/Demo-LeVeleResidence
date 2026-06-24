import type { BookingAccommodation } from './booking';

export type BookingReceipt = {
  reference: string;
  submittedAt: string;
  checkIn: string;
  checkOut: string;
  arrivalTime: string;
  accommodation: BookingAccommodation;
  accommodationLabel: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};
