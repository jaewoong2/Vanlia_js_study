export class Component {
  constructor({ parent, props, initialState }) {
    this.$parent = parent;
    this.$state = initialState;
    this.$props = props;
  }

  bindEvents() {}

  init() {}

  render() {}

  // 하위 컴포넌트에서 해당하는 event를 사용하면 callback 함수를 실행 시킬 수 있게 한다.
  on(eventName, callback) {
    this.events = this.events ? this.events : {};
    this.events[eventName] = callback;
  }

  // eventName에 해당하는 함수 (on에 등록된 Callback Function)실행
  emit(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
    this.render();
  }

  setProps(props) {
    this.$props = { ...this.$props, ...props };
    this.render();
  }

  // 상위 컴포넌트에서 props로 들어온 값들을 상위 컴포넌트에 알리는 event
  setSubscribe() {
    if (this.$props) {
      this.emit("subscribe", {
        props: Object.keys(this.$props),
        component: this,
      });
    }
  }
}

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
    this.$components[name].on("subscribe", ({ props, component }) => {
      props.forEach((state) => {
        this.$subscribe.push({ name: state, component: component });
      });
    });
    this.$components[name].setSubscribe();
  }

  // 전체를 관리하는 Applictaion 에서 routes 관리 할 수 있도록 Set
  setRoutes({ path, component }) {
    this.$routes[path] = component;
    this.$routes[path].on("subscribe", ({ props, component }) => {
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
