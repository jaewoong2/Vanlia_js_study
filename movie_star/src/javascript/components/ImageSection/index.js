import Component from "../../core/Component.js";

export default class ImageSection extends Component {
  constructor({ parent }) {
    super();
    this.$parent = parent;
    this.$target = ImageSection.createElement();
    this.init();
  }

  static createElement() {
    const container = document.createElement("aside");
    const imageWrapper = document.createElement("div");
    const image = document.createElement("img");

    imageWrapper.classList.add("poster-container");
    container.classList.add("movie");

    image.src = "src/assets/images/poster_bootcamp.jpg";

    imageWrapper.appendChild(image);
    container.appendChild(imageWrapper);

    return container;
  }

  init() {
    this.$parent.appendChild(this.$target);
  }
}
