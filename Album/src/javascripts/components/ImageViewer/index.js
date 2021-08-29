export default class ImageViewer {
  constructor({ parentElement }) {
    this.$parentElement = parentElement;
    this.$target = ImageViewer.createImageViewer();
    this.bindEvents();
  }

  static createImageViewer() {
    const imageViewrWrapper = document.createElement("section");
    const imageViewrContent = document.createElement("div");
    const imageElement = document.createElement("img");

    imageViewrWrapper.classList.add("modal", "image-viewer");
    imageViewrContent.classList.add("content");
    imageElement;

    imageViewrContent.appendChild(imageElement);
    imageViewrWrapper.appendChild(imageViewrContent);

    return imageViewrWrapper;
  }

  bindEvents() {
    this.$target.addEventListener("click", (event) => {
      const currentTarget = event.currentTarget;
      if (this.$target === currentTarget) {
        this.close();
      } else {
        this.open();
      }
    });
  }

  open(filePath = "") {
    this.$target.querySelector("img").src = filePath;
    this.$parentElement.appendChild(this.$target);
  }

  close() {
    this.$parentElement.removeChild(this.$target);
  }
}
