import MenuBar from "./menuBar.js";

export default class MenuContainer {
  constructor(parent) {
    this.$parent = parent;
    this.$target = MenuContainer.createElement();
    this.$menuBars = [];
    this.init();
  }

  static createElement() {
    return document.createElement("div");
  }

  init() {
    this.$parent.appendChild(this.$target);
    this.$target.classList.add("menu-container");

    const menubar1 = new MenuBar({ parent: this.$target, idx: 1 });
    const menubar2 = new MenuBar({ parent: this.$target, idx: 2 });
    const menubar3 = new MenuBar({ parent: this.$target, idx: 3 });

    this.$menuBars = [menubar1, menubar2, menubar3];

    this.$menuBars.forEach((bar) => {
      this.$target.appendChild(bar.$target);
    });
  }
}
