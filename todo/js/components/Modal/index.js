export default class Modal {
  constructor({ parent }) {
    this.$parent = parent;
    this.$target = Modal.createElement();
    this.$state = {
      message: "Modal",
      isOpen: false,
    };
    this.init();
  }

  static createElement() {
    const conateinr = document.createElement("div");
    const content = document.createElement("div");

    conateinr.classList.add("modal");
    content.classList.add("content");
    conateinr.appendChild(content);

    return conateinr;
  }

  bindEvents() {
    this.$target.addEventListener("click", (event) => {
      if (event.target === this.$target) {
        this.setState({ isOpen: false });
      }
    });

    this.$target.querySelectorAll("span").forEach((elem) => {
      elem.addEventListener("click", () => {
        if (elem.classList.contains("o-btn")) {
          this.emit("remove");
        }
        this.setState({ isOpen: false });
      });
    });
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
    this.render();
  }

  init() {
    this.bindEvents();
  }

  alert() {}

  confirm(msg = "") {
    this.setState({ isOpen: true, message: msg });
    const content = this.$target.querySelector(".content");
    const confirm = document.createElement("div");
    const message = document.createElement("div");
    const buttonWrapper = document.createElement("div");

    confirm.classList.add("confirm");
    message.classList.add("message");
    buttonWrapper.classList.add("btn-wrapper");

    content.appendChild(confirm);
    confirm.appendChild(message);
    confirm.appendChild(buttonWrapper);

    message.innerHTML = this.$state.message;
    buttonWrapper.innerHTML = `
        <span class="o-btn">O</span>
        <span>X</span>
    `;

    this.bindEvents();
  }

  render() {
    if (this.$state.isOpen) {
      this.$parent?.appendChild(this.$target);
    } else {
      this.$target.querySelector(".content").innerHTML = "";
      this.$parent?.removeChild(this.$target);
    }
  }

  // 상위 컴포넌트에 등록
  on(eventName, callback) {
    this.events = this.events ? this.events : {};
    this.events[eventName] = callback;
  }

  // 상위 컴포넌트에서 사용 (하위 컴포넌트의 event 실행)
  emit(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }
}
