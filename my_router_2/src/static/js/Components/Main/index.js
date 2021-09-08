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
    this.render();
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
    this.render();
  }

  render() {
    if (typeof this.$state.view === "string") {
      this.$target.innerHTML = this.$state.view;
    }

    if (typeof this.$state.view === "object") {
      this.$target.innerHTML = "";
      this.$target.appendChild(this.$state.view);
    }
  }
}