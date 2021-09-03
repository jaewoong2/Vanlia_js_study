import Main from "./Components/Main/index.js";
import Nav from "./Components/Nav/index.js";
import Dashboard from "./Components/views/Dashboard.js";
import Posts from "./Components/views/Posts.js";
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
    this.$posts.on("view", () => {
      this.$main.setState({ view: this.$posts.render() });
    });
    this.$settings.on("view", () => {
      this.$main.setState({ view: this.$settings.render() });
    });
  }

  init() {
    this.$nav = new Nav({ parent: this.$target });
    this.$main = new Main({ parent: this.$target, initialState: {} });
    this.$dashboard = new Dashboard();
    this.$posts = new Posts();
    this.$settings = new Settings();

    this.$state.routes = [
      { path: "/", view: this.$dashboard },
      { path: "/posts", view: this.$posts },
      { path: "/settings", view: this.$settings },
    ];

    this.bindEvents();
    setRouterState({ routes: this.$state.routes, parent: this.$main.$target });
    router();
  }
}
