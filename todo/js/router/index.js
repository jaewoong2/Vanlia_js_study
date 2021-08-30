const APP_ELEMENT = document.querySelector("#app");

const routes = {};

function setRoutes(pathName, element) {
  routes[pathName] = element;
}

function initialRoutes() {
  const pathName = window.location.pathname;
  renderHTML(routes[pathName]);
  window.onpopstate = () => renderHTML(routes[pathName]);
}

function historyRouterPush(pathName) {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  renderHTML(routes[pathName]);
}

function renderHTML(route) {
  APP_ELEMENT.appendChild(route);
}

export { initialRoutes, historyRouterPush, setRoutes };
