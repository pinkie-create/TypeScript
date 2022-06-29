import { isFavoriteItem, toggleFavoriteItem } from "./favorite.js";
import { renderBlock } from "./lib.js";

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

export function renderEmptyOrErrorSearchBlock(reasonMessage) {
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

export function renderSearchResultsBlock(places) {
  let items = "";
  const { id, source } = places;
  const toggleIdPrefix = "toggle-";
  const toggleId = `${toggleIdPrefix}${source}_${id}`;
  if (Array.isArray(places) && places.length > 0) {
    places.forEach((place) => {
      items += `<li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div id=${toggleId} class="favorites ${
        isFavoriteItem(toggleId) ? "active" : ""
      }"
            ></div>
            <img class="result-img" src="./img/result-1.png" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${place.name}</p>
              <p class="price">${place.price}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 2.5км от вас</div>
            <div class="result-info--descr">${place.description}</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>`;
    });
  }
  renderBlock(
    "search-results-block",
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list" id="results-list">
     
    </ul>
    `
  );
  const list = document.getElementById("results-list");
  list.insertAdjacentHTML("afterbegin", items);
}
const favoritesButtons = document.querySelectorAll(".favorites");
favoritesButtons.forEach((button) => {
  button.addEventListener("click", (event) => toggleFavoriteItem(event));
});
