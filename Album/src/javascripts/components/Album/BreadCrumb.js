import Component from "../../helpers/Component.js";

export default class BreadCrumb extends Component {
  constructor(props) {
    super(props);
    const { parentElement } = props;
    this.$parentElemnt = parentElement;
    this.$state = {
      routes: [{ name: "ROOT", id: "" }],
    };
    this.$target = BreadCrumb.createBreadCrumb();
    this.init();
  }

  static createBreadCrumb() {
    const breadCrumbWrapper = document.createElement("section");
    breadCrumbWrapper.classList.add("breadcrumb-container");

    const breadCrumb = document.createElement("div");
    breadCrumb.classList.add("breadcrumbs");

    breadCrumbWrapper.appendChild(breadCrumb);

    const backButton = document.createElement("button");
    backButton.classList.add("button-back");
    breadCrumbWrapper.appendChild(backButton);

    return breadCrumbWrapper;
  }

  init() {
    this.$parentElemnt.appendChild(this.$target);
    this.bindEvents();
  }

  bindEvents() {
    const backButton = this.$target.querySelector(".button-back");
    backButton.addEventListener("click", () => this.emit("back"));

    const breadcrumbs = this.$target.querySelector(".breadcrumbs");

    breadcrumbs.addEventListener(
      "click",
      (event) =>
        this.$state.routes[this.$state.routes.length - 1].id !==
          event.target.dataset.id &&
        this.emit("navClick", event.target.dataset.id)
    );
  }

  forward(route) {
    this.setState({ routes: [...this.$state.routes, route] });
    return this;
  }

  back() {
    this.setState({
      routes: [...this.$state.routes.slice(0, this.$state.routes.length - 1)],
    });
    return this;
  }

  getParentNode() {
    return this.$state.routes[this.$state.routes.length - 1];
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
  }

  render() {
    const routeElements = this.$state.routes
      .map((route) => `<span data-id=${route.id}>${route.name}</span>`)
      .join("");

    this.$target.querySelector(".breadcrumbs").innerHTML = routeElements;

    return this.$target;
  }
}
