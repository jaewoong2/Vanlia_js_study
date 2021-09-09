# vanilla javascript 로 spa 만들기2 (component, props 사용)

이번에는 실제 프로젝트를 만들면서 알아보도록 하겠습니다.

## 프로젝트 구성:

- App : 전체 컴포넌트 및 Router 등을 제어하는 역할

- Main : `<main>` Router에 따라서 `main` 에 views 중 1가지 `Component` 가 들어옴

- Nav : `<nav>` 클릭시 이동

- Views/Counter, Data, Home, Settings : `Main`에 들어갈 `Components`

- ![](https://images.velog.io/images/jwisgenius/post/1a7226dd-dd56-40fd-a25a-bd72d102b5f8/image.png)

## App.js

```js
import Main from "./Components/Main/index.js";
import Nav from "./Components/Nav/index.js";
import { Counter, Data, Home, Settings } from "./Components/views/index.js";
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

  // 각 컴포넌트에 Event를 Set 한다.

  bindEvents() {
    // "view" ==> 하위 컴포넌트에서 uesEvent("view") 를 하면, main 컴포넌트에 하위 컴포넌트를 연결한다.
    Object.keys(this.$routes).forEach((path) => {
      this.$routes[path].setEvent("view", () => {
        this.$components["main"].setView(this.$routes[path].render());
      });
    });

    // "setName" => App.js state 의 name 을 넘겨받은 name 으로 변경한다.
    // setState 가 실행되면, 그 state를 구독 하고 있는 컴포넌트의 setState를 실행시켜
    // 변경점을 반영한다.
    this.$routes["/datas"].setEvent("setName", ({ name }) => {
      this.setState({ name });
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
      component: new Settings({ props: { name: this.$state.name } }),
    });

    this.setRoutes({
      path: "/datas",
      component: new Data({ props: {} }),
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
```

### BindEvents()

`bindEvents()` 함수는 모든 컴포넌트 들이 App 의 변수에 입력이 되어야 `Event` 들을 `Set` 할 수 있다. 따라서, 모든 Component, Routes 들을 Set 입력 한다음에 bindEvents() 를 실행 시킬 수 있도록 한다.

### useRouter()

`useRouter()`는 `setRouterState` 에 입력된 `routes` 에 따라 설정이 되기 때문에, `setRouterState` 를 한 후 실행 시킬 수 있도록 한다.

- 개선할 점: 각 `Routes`들의 `view(Component)` 가 속하게 될 상위 컴포넌트를 `Route` 에 따라 다르게 할 때도 있을 것 같다. ex) Settings는 Footer에, Counter는 Main에 Home은 document.body ...

  - 이러한 점을 하기 위해서 routes 들을 설정 할 때, 상위 컴포넌트도 입력 할 수 있게 하면 좋을 것 같다. ex) `match.route.view.useEvent('view', match.route.parent)` 으로 사용

## Main.js

```js
import { Component } from "../../core/index.js";

export default class Main extends Component {
  constructor({ parent, initialState = { view: "" } }) {
    super({ parent, initialState });
    this.init();
  }

  static createElement() {
    const main = document.createElement("main");

    return main;
  }

  init() {
    this.$target = Main.createElement();
    this.$parent.appendChild(this.$target);
  }

  // view를 입력 받으면, 해당 view의 타입에 따라서 하위 컴포넌트로 넣어준다.
  setView(view) {
    this.setState({ view });
    if (typeof this.$state.view === "string") {
      this.$target.innerHTML = this.$state.view;
    }

    // string 값으로 넣으면 eventListner가 정상작동 하지 않을 때가 있어, elem 요소로 넘겨 줄 때 있기 때문에 Html Dom object 형식으로 넘겨 주게 된다.
    if (typeof this.$state.view === "object") {
      this.$target.innerHTML = "";
      this.$target.appendChild(this.$state.view);
    }
  }

  render() {}
}
```

## 역할

Main 아래에 routing에 따라 보여주고 싶은 view를 설정한다. 그 view의 값에 따라서 main에 넣어준다.

- 앞서 말 했던 것 처럼 굳이 main에만 넣어줄 필요 없이 여러 상위 컴포넌트를 만들고
  그에 따라서 routing view를 설정해주어도 괜찮을 것 같다.

`App.js` 에서 `setView()` 를 실행한다. 이에 따라서 view 값이 바뀐다.

- 실행 순서

  - useRouter() 에서 해당 pathname을 갖고 있는 component 에서 useEvent("view") 실행

  - 실행 됨에 따라 `App.js` 에서 callback 함수로 설정한 `main` 컴포넌트의 `setView()`를 실행
