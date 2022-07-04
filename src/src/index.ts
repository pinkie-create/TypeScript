import { renderSearchFormBlock } from "./search-form.js";
import { renderSearchStubBlock } from "./search-results.js";
import { renderUserBlock } from "./user.js";
import { bookTimeLimitHandler } from "./lib.js";

window.addEventListener("DOMContentLoaded", () => {
  renderUserBlock();
  renderSearchFormBlock();
  renderSearchStubBlock();

  document.addEventListener("timer-end", bookTimeLimitHandler);
});
