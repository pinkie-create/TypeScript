export interface Idatabase {
  id: string;
  title: string;
  details: string;
  photos: string[];
  coordinates: number[];
  bookedDates: [];
  price: number;
}
export function cloneDate(date: Date): Date;

export function addDays(date: Date, days: number): Date;

export function get(id: string): string;

export function search(parameters: any): string;

export function book(flatId: string, checkInDate: Date, checkOutDate: Date);

export function _assertDatesAreCorrect(
  checkInDate: Date,
  checkOutDate: Date
): Date;

export function _resetTime(date: Date): void;

export function _calculateDifferenceInDays(
  startDate: Date,
  endDate: Date
): number;

export function _generateDateRange(from: Date, to: Date): Date;

export function _generateTransactionId(): number;

export function _areAllDatesAvailable(flat: Date, dateRange: Date): Date;

export function _formatFlatObject(flat: Date, nightNumber: number): string;

export function _readDatabase(): string;

export function _writeDatabase(database: []): void;

export function _syncDatabase(database: []): void;
