import Main from "./Components/Main/index.js";
import Nav from "./Components/Nav/index.js";
import Home from "./Components/views/Home.js";
import Counter from "./Components/views/Counter.js";
import Settings from "./Components/views/Setting.js";
import { router } from "./router/index.js";
import { Application } from "./core/index.js";

export default class App extends Application {
  constructor() {
    super({ target: document.querySelector("#app") });
    this.$state = {
      count: 0,
      name: "",
    };
    this.init();
  }

  bindEvents() {
    Object.keys(this.$routes).forEach((path) => {
      this.$routes[path].setEvent("view", () => {
        this.$components["main"].setState({
          view: this.$routes[path].render(),
        });
      });
    });

    this.$routes["/settings"].setEvent("setName", (name) => {
      this.setState({ name });
    });
  }

  init() {
    const { useRouter, setRouterState } = router();

    this.setComponents({
      name: "nav",
      component: new Nav({ parent: this.$target }),
    });

    this.setComponents({
      name: "main",
      component: new Main({ parent: this.$target }),
    });

    this.setRoutes({
      path: "/",
      component: new Home({
        props: {
          name: this.$state.name,
          count: this.$state.count,
        },
      }),
    });

    this.setRoutes({
      path: "/counter",
      component: new Counter({
        props: {
          count: this.$state.count,
          setCounter: () => this.setState({ count: this.$state.count + 1 }),
        },
      }),
    });

    this.setRoutes({
      path: "/settings",
      component: new Settings(),
    });

    this.bindEvents();

    // 라우팅 설정 => 렌더링
    setRouterState({
      routes: Object.keys(this.$routes).map((path) => ({
        path: path,
        view: this.$routes[path],
      })),
      parent: this.$components["main"].$target,
    });

    useRouter();
  }
}
