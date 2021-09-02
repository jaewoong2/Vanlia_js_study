const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async ({ $parent, routes }) => {
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
    $parent.innerHTML = "Error!";
  }

  $parent.innerHTML = new match.route.view({ props: match.route.props });
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
