import { IFavoriteItem, IFavoriteItems } from "./interfase/interfase";
import { getUserData, renderUserBlock } from "./user";

const isEmptyObject = (object): boolean => {
  return Object.keys(object).length === 0;
};

const addFavoriteItem = () => {
  //
};

export function getFavoritesItemsCount(): number | null {
  const key = "favoriteItems";
  const storageValue = localStorage.getItem(key);
  if (storageValue == null) return;

  const favoriteItems: unknown = JSON.parse(storageValue);

  if (favoriteItemsIsObject(favoriteItems)) {
    return Object.keys(favoriteItems).length;
  }
}

const updateFavoritesItemsAmount = (): void => {
  const keyAmount = "favoritesAmount";
  const favoriteItemsCount = getFavoritesItemsCount();
  const { username, avatarUrl } = getUserData();
  localStorage.setItem(keyAmount, JSON.stringify(favoriteItemsCount));

  renderUserBlock(username, avatarUrl, favoriteItemsCount);
};
const removeFavoriteItem = (targetId: string, item: IFavoriteItems) => {
  const key = "favoriteItems";
  delete item[targetId];
  localStorage.setItem(key, JSON.stringify(item));
};

export function isFavoriteItem(object: unknown): object is IFavoriteItem {
  if (object != null && typeof object === "object") {
    return "id" in object && "name" in object && "image" in object;
  }
  return false;
}

function favoriteItemsIsObject(object: unknown): object is IFavoriteItems {
  if (isEmptyObject(object)) return true;

  if (object != null && typeof object === "object") {
    const keys = Object.keys(object);
    for (const key of keys) {
      if (!isFavoriteItem(object[key])) return false;
    }
    return true;
  }
  return false;
}

export function getFavoritesItems(): IFavoriteItems | null {
  const key = "favoriteItems";
  const storageValue = localStorage.getItem(key);

  if (storageValue == null) return;

  const favoriteItems: unknown = JSON.parse(storageValue);

  if (favoriteItemsIsObject(favoriteItems)) return favoriteItems;
}

export const toggleFavoriteItem = (event: Event): Promise<void> => {
  const target = event.target;
  const toggleClass = "active";

  if (!(target instanceof Element)) return;
  const id = target.id;
  if (getFavoritesItems() == null) {
    addFavoriteItem();
    target.classList.add(toggleClass);
    updateFavoritesItemsAmount();
  } else if (id != null) {
    removeFavoriteItem(id, getFavoritesItems());
    target.classList.remove(toggleClass);
    updateFavoritesItemsAmount();
  } else {
    addFavoriteItem();
    target.classList.add(toggleClass);
    updateFavoritesItemsAmount();
  }
};

const favorit = document.querySelectorAll(".favorites");
for (let i = 0; i < favorit.length; i++) {
  favorit[i].addEventListener("click", toggleFavoriteItem);
}
