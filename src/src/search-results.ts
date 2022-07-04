import {
  renderBlock,
  toggleFavorite,
  toBook,
  isFavoriteItem,
  sortSearchResult,
} from "./lib.js";
import { init } from "./init/init.js";
import { SelectOption } from "./init/selectOptions.js";

export function renderSearchStubBlock() {
  renderBlock(
    "search-results-block",
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  );
}

export function renderEmptyOrErrorSearchBlock(reasonMessage: string) {
  renderBlock(
    "search-results-block",
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  );
}

export function getSearchResultsListItem() {
  const places = init.searchResult;

  let list = "";

  places.forEach((place) => {
    const { name, description, remoteness, image, price } = place;
    const toggleIdPrefix = "toggle-";
    const toggleId = `${toggleIdPrefix}${place.id}`;
    const toBookIdPrefix = "to-book-";
    const toBookId = `${toBookIdPrefix}${place.id}`;
    list += `
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div
              id=${toggleId}
              class="favorites ${isFavoriteItem(toggleId) ? "active" : ""}"
            ></div>
            <img class="result-img" src="${image}" alt="">
          </div>
          <div class="result-info">
            <div class="result-info--header">
              <p>${name}</p>
              <p class="price">${price}&#8381;</p>
            </div>
            <div class="result-info--map">
              <i class="map-icon"></i>
              ${remoteness != null ? remoteness : "-"} км от вас
            </div>
            <div class="result-info--descr">${description}</div>
            <div class="result-info--footer">
              <div>
                <button id="${toBookId}">Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    `;
  });

  return list;
}

export function renderSearchResultsBlock() {
  renderBlock(
    "search-results-block",
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">${SelectOption.Ascending}</option>
                <option selected="">${SelectOption.Descending}</option>
                <option>${SelectOption.Closer}</option>
            </select>
        </div>
    </div>
    <ul id="results-list" class="results-list">
      ${getSearchResultsListItem()}
    </ul>
    `
  );

  const favoritesButtons = document.querySelectorAll(".favorites");
  favoritesButtons.forEach((button) => {
    button.addEventListener("click", (event) => toggleFavorite(event));
  });

  const toBookButtons = document.querySelectorAll(
    ".result-info--footer button"
  );
  toBookButtons.forEach((button) => {
    button.addEventListener("click", (event) => toBook(event));
  });
  const selectFilter = document.querySelector(".search-results-filter select");
  if (selectFilter instanceof Element) {
    selectFilter.addEventListener("change", sortSearchResult);
  }
}

export function renderSearchResultsList() {
  renderBlock("results-list", `${getSearchResultsListItem()}`);
}
