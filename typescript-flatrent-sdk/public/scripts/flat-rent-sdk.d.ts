export type Coordinates = [number, number];

export interface Idatabase {
  id: string;
  title: string;
  details: string;
  photos: string[];
  coordinates: Coordinates;
  bookedDates: [];
  price: number;
}

export interface IFormattedFlatRentPlace extends Omit<Idatabase, "price"> {
  totalPrice: number;
}

export interface ISearchParameters {
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  priceLimit: number;
}

export function cloneDate(date: Date): Date;
export function addDays(data: Date, days: number);

export class FlatRentSdk {
  get(id: string): Promise<IFormattedFlatRentPlace | null>;
  search(
    parameters: ISearchParameters
  ): Promise<IFormattedFlatRentPlace[] | Error>;
  book(
    flatId: string,
    checkInDate: Date,
    checkOutDate: Date
  ): Promise<number | Error>;
  private _assertDatesAreCorrect(checkInDate: Date, checkOutDate: Date): void;
  private _resetTime(data: Date): void;
  private _calculateDifferenceInDays(startDate: Date, endDate: Date): number;
  private _generateDateRange(from: Date, to: Date): Date[];
  private _generateTransactionId(): number;
  private _areAllDatesAvailable(flat: Idatabase, dateRange: Date[]): boolean;
  private _formatFlatObject(
    flat: Idatabase,
    nightNumber: number
  ): IFormattedFlatRentPlace;
  private _readDatabase(): Idatabase[] | null;
  private _writeDatabase(database: Idatabase[]): void;
  private _syncDatabase(database: Idatabase[]): void;
}
