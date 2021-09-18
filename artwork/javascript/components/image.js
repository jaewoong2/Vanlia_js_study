export class Image {
  constructor(parent) {
    this.$parent = parent;
    this.$target = Image.createElement();
    this.init();
  }

  static createElement() {
    return document.createElement("img");
  }

  bindEvnts() {}

  init() {
    this.$parent.appendChild(this.$target);
    this.$target.src = "images/korea.png";
    this.bindEvnts();
  }

  // 하위 컴포넌트에서 해당하는 event를 사용하면 callback 함수를 실행 시킬 수 있게 한다.
  setEvent(eventName, callback) {
    this.events = this.events ? this.events : {};
    this.events[eventName] = callback;
  }

  // eventName에 해당하는 함수 (on에 등록된 Callback Function)실행
  useEvent(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }
}
