import { getFavoritesItems } from "./favorite";
import { renderSearchFormBlock } from "./search-form.js";
import { renderSearchStubBlock } from "./search-results.js";
import { getUserData, renderUserBlock } from "./user.js";
import { renderToast } from "./lib.js";

localStorage.setItem(
  "user",
  JSON.stringify({
    username: "Bob",
    avatarUrl:
      "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png",
  })
);

window.addEventListener("DOMContentLoaded", () => {
  const { username, avatarUrl } = getUserData();
  renderUserBlock(username, avatarUrl);
  renderSearchFormBlock();
  renderSearchStubBlock();
  renderToast(
    {
      text: "Это пример уведомления. Используйте его при необходимости",
      type: "success",
    },
    {
      name: "Понял",
      handler: () => {
        console.log("Уведомление закрыто");
      },
    }
  );
});
