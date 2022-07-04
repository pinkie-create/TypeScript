import {
  Place as HomyPlace,
  isPlace as isHomyPlace,
  isPlaceArray as isHomyPlaceArray,
} from "./response.js";
import { SearchFilter as HomySearchFilter } from "./search-filter.js";
import { BookFilter as HomyBookFilter } from "./book-filter.js";
import { Provider } from "../../init/domain/provider.js";
import { Place } from "../../init/domain/place.js";
import { HTTPHelper } from "../../helpers/http-helper.js";
import { SearchFilter } from "../../init/domain/search-filter.js";
import { BookResponse } from "../../init/domain/book-response.js";
import { BookFilter } from "../../init/domain/book-filter.js";

export class HomyProvider implements Provider {
  public static provider = "homy";
  private static apiURL = "http://localhost:3030";
  private static placeRoot = "/places";

  public async get(id: string): Promise<Place> {
    try {
      const response = await HTTPHelper.fetchAsJson<HomyPlace>(
        this._getURL(id)
      );

      if (response instanceof Error) throw response;

      this._isValidResponse(response);

      return this._convertToPlace(response);
    } catch (error) {
      console.error(error);
    }
  }

  public async search(filter: SearchFilter): Promise<Place[]> {
    try {
      const homyFilter = this._convertToHomySearchFilter(filter);
      const response = await HTTPHelper.fetchAsJson<HomyPlace[]>(
        this._getURL(null, homyFilter)
      );

      if (response instanceof Error) throw response;

      this._isValidResponse(response);

      return response.map((item) => this._convertToPlace(item));
    } catch (error) {
      console.error(error);
    }
  }

  public async book(id: string, filter: SearchFilter): Promise<BookResponse> {
    try {
      const homyFilter = this._convertToHomyBookFilter(filter);
      const response = await HTTPHelper.fetchAsJson<HomyPlace>(
        this._getURL(id, homyFilter),
        {
          method: "PATCH",
        }
      );

      if (response instanceof Error) return BookResponse.failure;

      return BookResponse.success;
    } catch (error) {
      console.error(error);
    }
  }

  private _getURL(
    id?: string,
    filter?: HomySearchFilter | HomyBookFilter,
    root = true
  ) {
    let url = HomyProvider.apiURL;

    if (root) url += HomyProvider.placeRoot;

    if (id != null) url += `/${id}`;

    if (filter != null) {
      url += HTTPHelper.getQueryString(filter);
    }
    return url;
  }

  private _convertToPlace(homyPlace: HomyPlace): Place {
    const { id, name, description, bookedDates, price, image, remoteness } =
      homyPlace;

    return new Place(
      HomyProvider.provider,
      id.toString(),
      name,
      description,
      bookedDates,
      price,
      image,
      remoteness
    );
  }

  private _convertToHomySearchFilter(filter: SearchFilter): HomySearchFilter {
    const { checkInDate, checkOutDate, priceLimit, coordinates } = filter;
    try {
      if (coordinates == null) throw new Error("Missing coordinate field.");

      const homyFilter: HomySearchFilter = {
        coordinates,
        checkInDate: checkInDate.getTime(),
        checkOutDate: checkOutDate.getTime(),
      };

      if (priceLimit != null) homyFilter.maxPrice = priceLimit;

      return homyFilter;
    } catch (error) {
      console.error(error);
    }
  }

  private _convertToHomyBookFilter(filter: BookFilter): HomyBookFilter {
    const { checkInDate, checkOutDate } = filter;
    return {
      checkInDate: checkInDate.getTime(),
      checkOutDate: checkOutDate.getTime(),
    };
  }

  private _isValidResponse(response: HomyPlace | HomyPlace[] | Error): void {
    if (!(isHomyPlace(response) || isHomyPlaceArray(response))) {
      throw new Error(`Type is not Place. Received data: ${response}`);
    }
  }
}
