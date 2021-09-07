export class Component {
  constructor({ parent, props, initialState }) {
    this.$parent = parent;
    this.$state = initialState;
    this.$props = props;
  }

  bindEvents() {}

  init() {}

  render() {}

  on(eventName, callback) {
    this.events = this.events ? this.events : {};
    this.events[eventName] = callback;
  }

  emit(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
    this.render();
  }

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

  setProps() {
    this.$subscribe.forEach(({ name, component }) => {
      if (!this.$state[name]) return;
      let obj = {};
      obj[name] = this.$state[name];
      component.setState({ ...obj });
    });
  }
}
