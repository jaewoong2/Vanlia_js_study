export default class Main {
  constructor({ parent, initialState = { view: "" } }) {
    this.$parent = parent;
    this.$target = Main.createElement();
    this.$state = initialState;
    this.init();
    this.render();
  }

  static createElement() {
    const main = document.createElement("main");

    return main;
  }

  init() {
    this.$parent.appendChild(this.$target);
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
    this.render();
  }

  render() {
    this.$target.innerHTML = this.$state.view;
  }
}
