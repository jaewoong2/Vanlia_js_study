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
      count: 0,
      name: "",
      subscribe: {},
    };
    this.init();
  }

  bindEvents() {
    this.$state.routes.forEach(({ view }) => {
      view.on("view", () => {
        this.$main.setState({ view: view.render() });
      });

      view.on("subscribe", ({ props, component }) => {
        props.forEach((state) => {
          this.subscribe(state, component);
        });
      });
    });
  }

  subscribe(state, compoenent) {
    if (!this.$state.subscribe[state]) {
      this.$state.subscribe[state] = [compoenent];
      return;
    }
    this.$state.subscribe[`${state}`].push(compoenent);
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
    this.render();
  }

  init() {
    this.$nav = new Nav({ parent: this.$target });
    this.$main = new Main({ parent: this.$target, initialState: {} });

    this.$state.routes = [
      {
        path: "/",
        view: new Dashboard({
          name: this.$state.name,
          count: this.$state.count,
        }),
      },
      {
        path: "/posts",
        view: new Counter({
          count: this.$state.count,
          setCounter: () => this.setState({ count: this.$state.count + 1 }),
        }),
      },
      { path: "/settings", view: new Settings() },
    ];

    this.bindEvents();

    this.$state.routes.forEach((route) => route.view.bindEvents());

    // 라우팅 설정 => 렌더링
    setRouterState({ routes: this.$state.routes, parent: this.$main.$target });
    router();
  }

  render() {
    for (const key in this.$state.subscribe) {
      this.$state.subscribe[key].forEach((component) => {
        if (this.$state[key]) {
          let obj = {};
          obj[key] = this.$state[key];
          component.setState(obj);
        }
      });
    }
  }
}
