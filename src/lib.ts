import { init } from "./init/init.js";
import { getSearchFormData } from "./search-form.js";
import { deletePrefix } from "./helpers/delete-prefix.js";
import { Providers } from "./init/domain/providers.js";
import { renderUserBlock } from "./user.js";
import { BookResponse } from "./init/domain/book-response.js";
import { renderSearchResultsList } from "./search-results.js";
import { SelectOption } from "./init/selectOptions.js";
import { HomyProvider } from "./API/homy-api/homy-api-provider.js";
import { FlatRentProvider } from "./API/flat-rent-sdk/flat-rent-sdk-provider.js";

export function renderBlock(elementId, html) {
  const element = document.getElementById(elementId);
  element.innerHTML = html;
}

export function renderToast(message, action) {
  let messageText = "";

  if (message != null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || "Закрыть"}</button>
      </div>
    `;
  }

  renderBlock("toast-block", messageText);

  const button = document.getElementById("toast-main-action");
  if (button != null) {
    button.onclick = function () {
      if (action != null && action.handler != null) {
        action.handler();
      }
      renderToast(null, null);
    };
  }
}

export async function toggleFavorite(event: Event): Promise<void> {
  const target = event.target;
  const toggleClass = "active";
  const prefix = "toggle-";

  if (!(target instanceof Element)) return;
  const id = deletePrefix(target.id, prefix);

  const favoriteItems = init.favoriteItems;
  if (favoriteItems[id] != null) {
    removeFavoriteItem(id);
    target.classList.remove(toggleClass);
    updateFavoritesItemsAmount();
  } else {
    await addFavoriteItem(id);
    target.classList.add(toggleClass);
    updateFavoritesItemsAmount();
  }
}

export async function toBook(event: Event): Promise<void> {
  try {
    const target = event.target;

    if (!(target instanceof Element)) return;
    const prefix = "to-book-";

    const [providerName, originalId] = deletePrefix(target.id, prefix).split(
      "-"
    );

    if (providerName == null || originalId == null) {
      throw new Error(`Invalid id: ${target.id}`);
    }

    const fromId = "search-form";
    const { filter, providers } = getSearchFormData(fromId);

    const provider = providers.find((provider) => {
      switch (providerName) {
        case Providers.HomyAPI:
          return provider instanceof HomyProvider;
        case Providers.FlatRentSDK:
          return provider instanceof FlatRentProvider;
        default:
      }
    });
    const result = await provider.book(originalId, filter);

    if (result === BookResponse.success) {
      renderToast(
        {
          text: "Бронирование прошло успешно.",
          type: "success",
        },
        {
          name: "Ok",
          handler: () => {
            console.log("Уведомление закрыто");
          },
        }
      );
    } else {
      renderToast(
        {
          text: "Произошла ошибка при бронировании.",
          type: "error",
        },
        {
          name: "Ok",
          handler: () => {
            console.log("Уведомление закрыто");
          },
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
}

export async function addFavoriteItem(id: string): Promise<void> {
  try {
    const fromId = "search-form";
    const { providers } = getSearchFormData(fromId);
    const [providerName, originalId] = id.split("-");

    if (providerName == null || originalId == null) {
      throw new Error(`Invalid id: ${id}`);
    }

    const provider = providers.find((provider) => {
      switch (providerName) {
        case Providers.HomyAPI:
          return provider instanceof HomyProvider;
        case Providers.FlatRentSDK:
          return provider instanceof FlatRentProvider;
        default:
      }
    });

    const place = await provider.get(originalId);

    init.addFavoriteItems(place);
  } catch (error) {
    console.error(error.message);
  }
}

export function removeFavoriteItem(id: string) {
  try {
    init.removeFavoriteItem(id);
  } catch (error) {
    console.error(error);
  }
}

export function updateFavoritesItemsAmount(): void {
  renderUserBlock();
}

export function isFavoriteItem(id: string): boolean {
  const prefix = "toggle-";
  const placeId = deletePrefix(id, prefix);
  const favoriteItems = init.favoriteItems;

  return favoriteItems[placeId] != null ? true : false;
}

export function sortSearchResult(event: Event): void {
  const target = event.target;

  if (!(target instanceof HTMLSelectElement)) return;

  switch (target.value) {
    case SelectOption.Descending:
      init.sortSearchResultByDescendingPrice();
      renderSearchResultsList();
      break;
    case SelectOption.Ascending:
      init.sortSearchResultByAscendingPrice();
      renderSearchResultsList();
      break;
    case SelectOption.Closer:
      init.sortSearchResultByCloser();
      renderSearchResultsList();
      break;
    default:
  }
}

export function bookTimeLimitHandler(): void {
  const toBookButtons = document.querySelectorAll(
    ".result-info--footer button"
  );
  toBookButtons.forEach((button) =>
    button.setAttribute("disabled", "disabled")
  );

  renderToast(
    {
      text: "Пожалуйста обновите результаты поиска.",
      type: "error",
    },
    {
      name: "Закрыть",
      handler: () => {
        console.log("Уведомление закрыто");
      },
    }
  );
}
