import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Setting from "./views/Setting.js";

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/posts", view: Posts },
    { path: "/settings", view: Setting },
  ];

  const potentialMatches = routes.map((route) => {
    return {
      route,
      result: location.pathname === route.path,
    };
  });

  const match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== false
  );

  console.log(match, potentialMatches);

  const view = new match.route.view();

  document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
