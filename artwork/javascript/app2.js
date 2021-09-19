import { createElement } from "./components/Circle/Circle.js";

export default class App2 {
  constructor() {
    this.$target = document.body.querySelector("#app2");
    this.$circleBox = document.createElement("div");
    this.$circle = null;
    this.init();
  }

  init() {
    this.$target.appendChild(this.$circleBox);
    this.$circleBox.classList.add("circle-box");

    createElement({
      width: "150px",
      height: "150px",
      parent: document.body.querySelector(".circle-box"),
      color: "rgba(2, 91, 255, 0.76)",
      peresentage: 65.8,
      text: "통일 \n 필요하다",
      containerClass: "circle-container",
    });
  }

  bindEvents() {}
}
