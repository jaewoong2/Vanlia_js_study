export default class MenuBar {
  constructor({ parent, idx }) {
    this.$parent = parent;
    this.$target = MenuBar.creatElement();
    this.index = idx;
    this.init();
  }

  init() {
    this.$parent.appendChild(this.$target);
    this.$target.dataset.index = this.index;
  }

  static creatElement() {
    return document.createElement("div");
  }
}
