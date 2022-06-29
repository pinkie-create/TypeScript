import { IUser } from "./interfase/interfase";
import { renderBlock } from "./lib.js";

export function isUser(object: unknown): object is IUser {
  if (object != null && typeof object === "object") {
    return "username" in object && "avatarUrl" in object;
  }
  return false;
}

export function getUserData(): IUser | null {
  const key = "user";
  const storageValue: unknown = JSON.parse(localStorage.getItem(key));

  if (isUser(storageValue)) return storageValue;
}

export function renderUserBlock(
  userName: string,
  imgUrl: string,
  favoriteItemsAmount?: number
) {
  const favoritesCaption = favoriteItemsAmount
    ? favoriteItemsAmount
    : "ничего нет";
  const hasFavoriteItems = favoriteItemsAmount ? true : false;

  renderBlock(
    "user-block",
    `
    <div class="header-container">
      <img class="avatar" src=${imgUrl} alt="Wade Warren" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i id="icon" class="heart-icon${
              hasFavoriteItems ? " active" : ""
            }"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  );
}
