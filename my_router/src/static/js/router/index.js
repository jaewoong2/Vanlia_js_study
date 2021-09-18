let $state = { routes: [], parent: null };

export const setState = (newState) => {
  $state = { ...$state, ...newState };
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

export const router = () => {
  const { routes, parent } = $state;
  const potentialMatches = routes.map((route) => {
    return {
      route,
      result: location.pathname === route.path,
    };
  });

  const match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== false
  );

  if (!match) {
    parent.innerHTML = "Error!";
    return;
  }

  match.route.view.emit("view");
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
