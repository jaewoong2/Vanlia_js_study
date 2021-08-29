export default class ImageViewer {
  constructor({ parent }) {
    this.$parent = parent;
    this.$target = ImageViewer.createElement();
    this.$state = {
      filePath: "",
      isOpen: false,
    };
    this.bindEvents();
  }

  static createElement() {
    const imageWrapper = document.createElement("section");
    const imageContent = document.createElement("div");
    const image = document.createElement("img");

    imageWrapper.classList.add("modal", "image-viewer");
    imageContent.classList.add("content");

    imageContent.appendChild(image);
    imageWrapper.appendChild(imageContent);

    return imageWrapper;
  }

  bindEvents() {
    this.$target.addEventListener("click", (event) => {
      const currentTarget = event.currentTarget;
      if (this.$target === currentTarget) {
        this.setState({ isOpen: false });
      } else {
        this.setState({ isOpen: true });
      }
    });
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
    this.render();
  }

  render() {
    if (this.$state.isOpen) {
      this.$parent.appendChild(this.$target);
      this.$target.querySelector("img").src = this.$state.filePath;
    } else {
      this.$parent.removeChild(this.$target);
    }
  }
}
