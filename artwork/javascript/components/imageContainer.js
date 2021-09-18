export class ImageContainer {
  constructor(parent) {
    this.$parent = parent;
    this.$target = ImageContainer.createElement();
    this.init();
  }

  static createElement() {
    return document.createElement("div");
  }

  init() {
    this.$parent.appendChild(this.$target);
    this.$target.classList.add("image-container");
  }

  setEvent(eventName, callback) {
    this.events = this.events ? this.events : {};
    this.events[eventName] = callback;
  }

  // eventName에 해당하는 함수 (on에 등록된 Callback Function)실행
  useEvent(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }
}
