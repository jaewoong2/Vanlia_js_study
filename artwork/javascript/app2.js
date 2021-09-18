import { Image } from "./components/Images/image.js";
import { ImageContainer } from "./components/Images/imageContainer.js";

export default class App2 {
  constructor() {
    this.$target = document.querySelector("#app2");
    this.$images = [];
    this.$imagesContainer = document.createElement("div");
    this.bindEvents();
    this.isInit = false;
  }

  init() {
    this.isInit = true;
    this.$imagesContainer.classList.add("images-container");
    this.$target.appendChild(this.$imagesContainer);

    [1, 2, 3, 4, 5].forEach((value) => {
      this.$images.push(
        new Image(
          new ImageContainer(this.$target).$target,
          `images/image-${value}.jpg`
        )
      );
    });

    this.$images.forEach((image, index) => {
      image.$target.dataset.id = index;
      image.$target.classList.add("photo-image");
      image.$target.parentElement.className = "photo-container";
      this.$imagesContainer.appendChild(image.$target.parentElement);
    });

    const typoGraphic1 = document.createElement("p");
    typoGraphic1.classList.add("app2-typo");
    typoGraphic1.innerText = "그들의 삶 또한 우리와 다르지 않습니다";
    this.$target.appendChild(typoGraphic1);
  }

  bindEvents() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > document.body.offsetHeight - 100) {
        if (this.isInit === false) this.init();
      }
    });
  }
}
