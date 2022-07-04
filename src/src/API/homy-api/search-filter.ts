import { Filter } from "../../init/domain/filter";

export interface SearchFilter extends Filter<string | number | undefined> {
  coordinates: string;
  checkInDate: number;
  checkOutDate: number;
  maxPrice?: number | undefined;
}
