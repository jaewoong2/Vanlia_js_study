import Nav from "./Components/Nav/index.js";

export default class App {
  constructor({ parent }) {
    this.$parent = parent;
    this.$target = document.querySelector("#app");
    this.$state = {};
  }

  init() {
    this.$nav = new Nav({ parent: this.$target });
  }
}
