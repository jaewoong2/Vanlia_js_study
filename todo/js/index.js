import App from "./components/App.js";
import { initialRoutes, setRoutes } from "./router/index.js";

const init = () => {
  const app = new App({ parent: document.querySelector("#app") });
  setRoutes(location.pathname, app.$target);
  initialRoutes();
};

window.onload = init;
