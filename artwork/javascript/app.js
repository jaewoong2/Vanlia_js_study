import Arrow from "./components/Arrow/arrow.js";
import { Image } from "./components/Images/image.js";
import { ImageContainer } from "./components/Images/imageContainer.js";
import MenuContainer from "./components/MenuBar/menuContainer.js";
import Typo from "./components/TypoGraphic/typo.js";
import { blurring } from "./utils/index.js";

export class App {
  constructor() {
    this.$target = document.querySelector("#app");
    this.article = document.createElement("article");
    this.imageContainer = null;
    this.image = null;
    this.menuContainer = null;
    this.typo = new Typo();
    this.arrow = new Arrow("down").setup({ position: "down" });
    this.init();
  }

  init() {
    this.$target.appendChild(this.article);
    this.imageContainer = new ImageContainer(this.article);
    this.image = new Image(this.imageContainer.$target, "images/korea.png");
    this.menuContainer = new MenuContainer(this.$target);

    blurring(20, 100, 1.5, (blurValue) => {
      this.image.$target.style.filter = `blur(${blurValue}px)`;
    });
  }
}
