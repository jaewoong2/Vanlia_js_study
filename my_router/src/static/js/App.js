import Main from "./Components/Main/index.js";
import Nav from "./Components/Nav/index.js";
import Dashboard from "./Components/views/Dashboard.js";
import Counter from "./Components/views/Counter.js";
import Settings from "./Components/views/Setting.js";
import { router, setState as setRouterState } from "./router/index.js";

export default class App {
  constructor() {
    this.$target = document.querySelector("#app");
    this.$state = {
      routes: [{}],
    };
    this.init();
  }

  bindEvents() {
    this.$dashboard.on("view", () => {
      this.$main.setState({ view: this.$dashboard.render() });
    });

    this.$counter.on("view", () => {
      this.$main.setState({ view: this.$counter.render() });
    });

    this.$settings.on("view", () => {
      this.$main.setState({ view: this.$settings.render() });
    });
  }

  init() {
    this.$nav = new Nav({ parent: this.$target });
    this.$main = new Main({ parent: this.$target, initialState: {} });
    this.$dashboard = new Dashboard({ initialState: { name: "Woongs!" } });
    this.$counter = new Counter();
    this.$settings = new Settings();

    this.$state.routes = [
      { path: "/", view: this.$dashboard },
      { path: "/posts", view: this.$counter },
      { path: "/settings", view: this.$settings },
    ];

    this.bindEvents();
    setRouterState({ routes: this.$state.routes, parent: this.$main.$target });
    router();
  }
}
