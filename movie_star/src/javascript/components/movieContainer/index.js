import Component from "../../core/Component.js";
import ImageSection from "../ImageSection/index.js";
import infoSection from "../infoSection/index.js";

export default class MovieContainer extends Component {
  constructor({ parent }) {
    super();
    this.$parent = parent;
    this.$target = MovieContainer.createElement();
    this.$imageSection = new ImageSection({ parent: this.$target });
    this.$infoSection = new infoSection({ parent: this.$target });
  }

  static createElement() {
    const container = document.createElement("section");

    container.classList.add("movie-container");

    return container;
  }

  init() {
    this.$parent.appendChild(this.$target);
  }
}
