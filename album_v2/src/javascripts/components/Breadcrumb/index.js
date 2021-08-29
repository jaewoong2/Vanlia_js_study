import Component from "../../core/Component.js";

const initialState = {
  routes: [{ name: "ROOT", id: "" }],
};

export default class Breadcrumb extends Component {
  constructor({ parent }) {
    super();
    this.$parent = parent;
    this.$target = Breadcrumb.createElement();
    this.$state = initialState;
    this.init();
  }

  static createElement() {
    const breadCrumbWrapper = document.createElement("section");
    const breadCrumbs = document.createElement("div");
    const backButton = document.createElement("button");

    breadCrumbWrapper.classList.add("breadcrumb-container");
    breadCrumbs.classList.add("breadcrumbs");
    backButton.classList.add("button-back");

    breadCrumbWrapper.appendChild(breadCrumbs);
    breadCrumbWrapper.appendChild(backButton);

    return breadCrumbWrapper;
  }

  init() {
    this.$parent.appendChild(this.$target);
    this.bindEvents();
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
  }

  bindEvents() {
    this.$target
      .querySelector("button")
      .addEventListener("click", () => this.emit("back"));
    this.$target
      .querySelector(".breadcrumbs")
      .addEventListener("click", (event) =>
        this.emit("navClick", event.target.dataset.id)
      );
  }

  go(route) {
    this.setState({ routes: [...this.$state.routes, route] });
  }

  back() {
    this.setState({
      routes: [...this.$state.routes.slice(0, this.$state.routes.length - 1)],
    });
  }

  render() {
    const elements = this.$state.routes
      .map((route) => `<span data-id=${route.id}>${route.name}</span>`)
      .join("");

    this.$target.querySelector(".breadcrumbs").innerHTML = elements;

    return this.$target;
  }
}
