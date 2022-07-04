import { renderBlock } from "./lib.js";
import { init } from "./init/init.js";

export function renderUserBlock() {
  const { userName, URL } = init.user;
  const favoriteItemsAmount = init.favoriteAmount;
  const hasFavoriteItems = favoriteItemsAmount < 1 ? false : true;
  const favoritesCaption = hasFavoriteItems
    ? favoriteItemsAmount
    : "ничего нет";
  renderBlock(
    "user-block",
    `
      <div class="header-container">
        <img class="avatar" src="${URL}" alt="${userName}" />
        <div class="info">
            <p class="name">${userName}</p>
            <p class="fav">
              <i
                class="heart-icon${hasFavoriteItems ? " active" : ""}"
              ></i>${favoritesCaption}
            </p>
        </div>
      </div>
    `
  );
}
