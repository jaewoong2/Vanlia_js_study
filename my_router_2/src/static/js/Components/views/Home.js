import { Component } from "../../core/index.js";

export default class Home extends Component {
  constructor({ props }) {
    super({ props });
    this.setTitle("Home");
    this.$state = {
      ...props,
    };
    this.init();
  }

  setTitle(title) {
    document.title = title;
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
    this.render();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {}

  render() {
    return `
        <h1> Hello, ${this.$props.name + ":::::" + this.$props.count}</h1>
    `;
  }
}
