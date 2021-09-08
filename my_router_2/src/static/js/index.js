import App from "./App.js";
import { router } from "./router/index.js";

new App();

const { useRouter, navigateTo } = router();

window.addEventListener("popstate", useRouter);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  useRouter();
});
