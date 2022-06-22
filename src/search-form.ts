import { renderBlock } from "./lib.js";

export function renderSearchFormBlock(
  dateArrival?: string,
  dateOfDeparture?: string
) {
  const ONE_DAY = 1;
  const TWO_DAY = 2;
  const ONE_MONTH = 1;
  const TWO_MONTH = 2;
  const LAST_MONTH_IN_YEAR = 11;

  function getDefaultDateOfDeparture(): string {
    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + ONE_MONTH)
      .toString()
      .padStart(2, "0");
    const day = (new Date().getDate() + ONE_DAY).toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function getDefaultDateArrivar(): string {
    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + ONE_MONTH)
      .toString()
      .padStart(2, "0");
    const day = (new Date().getDate() + ONE_DAY + TWO_DAY)
      .toString()
      .padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function getMinDate(): string {
    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + ONE_MONTH)
      .toString()
      .padStart(2, "0");
    const day = new Date().getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function getMaxDate() {
    const year = new Date().getFullYear();
    const nextMonth = (new Date().getMonth() + TWO_MONTH)
      .toString()
      .padStart(2, "0");
    const day = new Date().getDate().toString().padStart(2, "0");

    function getLastDayNextMonth() {
      const isLastMonthInYear = new Date().getMonth() === LAST_MONTH_IN_YEAR;

      if (isLastMonthInYear) {
        // todo следующий год
      } else {
        return new Date(year, Number(nextMonth), 0);
      }
    }

    return `${year}-${nextMonth}-${getLastDayNextMonth()}`;
  }

  renderBlock(
    "search-form-block",
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${
              dateArrival || getDefaultDateOfDeparture()
            }" min="${getMinDate()}" max="${getMaxDate()}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${
              dateOfDeparture || getDefaultDateArrivar()
            }" min="${getMinDate()}" max="${getMaxDate()}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );
}
