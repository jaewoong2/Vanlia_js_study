# vanilla javascript 로 spa 만들기 (component, props 사용)

## Router 설정

```js
// ../router/index.js

let $state = { routes: [], parent: null };

export const router = () => {
  const setRouterState = ({ routes, parent }) => {
    $state = { routes, parent };
  };

  const useRouter = () => {
    const { routes, parent } = $state;
    if (!parent) {
      document.body.innerHTML = "Error!";
      return;
    }

    /** { result: location.pathName is route-path } */
    const potentialMatches = routes.map((route) => {
      return {
        route,
        result: location.pathname === route.path,
      };
    });

    /** location.pathname = route-path */
    const match = potentialMatches.find(
      (potentialMatch) => potentialMatch.result !== false
    );

    if (!match) {
      parent.innerHTML = "Error!";
      return;
    }

    // match에 해당하는 route의 event를 실행
    match.route.view.useEvent("view");
  };

  const navigateTo = (url) => {
    history.pushState(null, null, url);
    useRouter();
  };

  return { useRouter, setRouterState, navigateTo };
};
```

### setRouterState

영상에서는 `router` 함수에서 직접 `routes` 들을 설정해서 관리를 했는데, 직접 `router` 파일에서 관리를 하는 것보다 `Component`들을 관리하는 `app.js` 에서 `router`,
`routes` 등을 설정해줘서 좀더 관리에 용이하도록 수정 하였다.

### useRouter

```js
const potentialMatches = routes.map((route) => {
  return {
    route,
    result: location.pathname === route.path,
  };
});
```

`potentialMatches` 는 설정된 `routes` 중에서 현재 `pathname` 과 동일한 `path` 값을 갖으면 `result` 값을 `true로` 갖지 않으면 `false`로 반환하는 함수이다.

```js
const match = potentialMatches.find(
  (potentialMatch) => potentialMatch.result !== false
);
```

`match` 는 `potentialMatches` 에서 `result` 가 `true` 인 `routes` 를 의미한다.

```js
match.route.view.useEvent("view");
```

나중에 Component 들이 공통으로 갖게될 `useEvent` 함수를 사용해서 현재 pathname과 동일한 `path` 값을 갖는 `route`의 `component`를 `app.js` 에서 사용 할 수 있도록 한다.

- 결과: parent 값에 component 가 하위 엘리먼트로 들어간다.

## Application Class

```js
export class Application {
  constructor({ target }) {
    this.$target = target;
    this.$state = {};
    this.$routes = {};
    this.$components = {};
    this.$subscribe = [];
  }

  bindEvents() {}

  init() {}

  // 전체를 관리하는 Applictaion 에서 components를 관리 할 수 있도록 Set
  setComponents({ name, component }) {
    if (!name || !component) return;
    this.$components[name] = component;
    this.$components[name].setEvent("subscribe", ({ props, component }) => {
      props.forEach((state) => {
        this.$subscribe.push({ name: state, component: component });
      });
    });
    this.$components[name].setSubscribe();
  }

  // 전체를 관리하는 Applictaion 에서 routes 관리 할 수 있도록 Set
  setRoutes({ path, component }) {
    this.$routes[path] = component;
    this.$routes[path].setEvent("subscribe", ({ props, component }) => {
      props.forEach((state) => {
        this.$subscribe.push({ name: state, component: component });
      });
    });
    this.$routes[path].setSubscribe();
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
    this.setProps();
  }

  // 어떤 상태가 변경되었을 때, 그 상태를 구독하고 있는 component 에 변경된 상태를 다시 전파한다.
  setProps() {
    this.$subscribe.forEach(({ name, component }) => {
      if (!this.$state[name]) return;
      let obj = {};
      obj[name] = this.$state[name];
      // component의 setProps는 component가 갖고 있는 props를 변경하는 것 (setProps와 유사)
      component.setProps({ ...obj });
    });
  }
}
```

모든 Component 들을 관리하는 Class가 상속하는 함수이다.

### Set Funtion

```js
// 전체를 관리하는 Applictaion 에서 components를 관리 할 수 있도록 Set
setComponents({ name, component }) {
  if (!name || !component) return;
  this.$components[name] = component;
  // subscribe 이벤트를 설정 `$subscirbe` 에 각 $state 값을 구독하는 component를 넣어준다.
  this.$components[name].setEvent("subscribe", ({ props, component }) => {
    props.forEach((state) => {
      this.$subscribe.push({ name: state, component: component });
    });
  });

  // component에 설정된 "subscribe" 이벤트를 사용하는 함수
  this.$components[name].setSubscribe();
}
```

`setComponents` 는 컴포넌트들을 담고 있는 변수 `$components`에 `{ 컴포넌트의 이름: 컴포넌트 }` 의 형식의 `object` 를 넣어주는 함수 이다.

`Component`에서 `Props` 를 받게 되면 `useEvent("subscribe", ({props, component}))` 를 실행하는데, 동시에 Application의 subscribe에 각 App 이 갖고있는 state를 구독 하고 있는 Component를 담게 된다.

```js
// 전체를 관리하는 Applictaion 에서 routes 관리 할 수 있도록 Set
setRoutes({ path, component }) {
  this.$routes[path] = component;
  this.$routes[path].setEvent("subscribe", ({ props, component }) => {
    props.forEach((state) => {
      this.$subscribe.push({ name: state, component: component });
    });
  });
  this.$routes[path].setSubscribe();
}
```

`setComponents` 와 유사한 역할을 한다. `route`들을 담고 있는 변수 `$routes`에 `{ routes의 path: 컴포넌트 }` 의 형식의 `object` 를 넣어주는 함수 이다.

`$routes` 는 나중에 `setRouterState()` 에 `routes` 값으로 설정된다.

```js
setState(state) {
  this.$state = { ...this.$state, ...state };
  this.setProps();
}
```

`$state`의 값을 새로운 `state` 값을 갱신한다. 갱신된 `state` 를 구독하는 Component 들에 전파하는 `setProps` 함수를 실행한다.

```js
setProps() {
  this.$subscribe.forEach(({ name, component }) => {
    if (!this.$state[name]) return;
    let obj = {};
    obj[name] = this.$state[name];
    // component의 setProps는 component가 갖고 있는 props를 변경하는 것 (setProps와 유사)
    component.setProps({ ...obj });
  });
}
```

구독하고 있는 Component 들의 props들을 갱신시킨다.

## Component Class

```js
export class Component {
  constructor({ parent, props, initialState }) {
    this.$parent = parent;
    this.$state = initialState;
    this.$props = props;
  }

  init() {}

  render() {}

  // 하위 컴포넌트에서 해당하는 event를 사용 (useEvent)하면 callback 함수를 실행 시킬 수 있게 한다.
  setEvent(eventName, callback) {
    this.events = this.events ? this.events : {};
    this.events[eventName] = callback;
  }

  // eventName에 해당하는 함수 (setEvent에 등록한 event 의 Callback Function)실행
  useEvent(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }

  // state 값을 갱신한다.
  setState(state) {
    this.$state = { ...this.$state, ...state };
    this.render();
  }

  // props 들을 갱신한다. (상위 컴포넌트에서 실행)
  setProps(props) {
    this.$props = { ...this.$props, ...props };
    this.render();
  }

  // 상위 컴포넌트에서 props로 들어온 값들을 상위 컴포넌트에 알리는 event
  setSubscribe() {
    if (this.$props) {
      this.useEvent("subscribe", {
        props: Object.keys(this.$props),
        component: this,
      });
    }
  }
}
```

## Next

### App 에서 Props를 전달한 값을 Component 에서 변경하고 router를 변경하며, 다른 Component에서 이를 사용하 것을 알아보도록 합니다.

---

출처(Router 설정): https://www.youtube.com/watch?v=6BozpmSjk-Y (Vanlia JS SPA)

출처(Component 설정): https://github.com/paullabkorea/theJungleFinalCodingTestFrontEnd
