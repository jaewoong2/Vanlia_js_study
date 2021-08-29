export default class Input {
  constructor({ parent }) {
    this.$parent = parent;
    this.$target = Input.createElement();
    this.$state = { todo: "" };
    this.init();
  }

  static createElement() {
    const container = document.createElement("div");
    const form = document.createElement("form");
    const input = document.createElement("input");
    const button = document.createElement("button");

    container.classList.add("input-container");
    button.innerHTML = "+";

    container.appendChild(form);
    form.appendChild(input);
    form.appendChild(button);
    input.placeholder = "Add Todo..";

    return container;
  }

  init() {
    this.$parent.appendChild(this.$target);
    this.bindEvents();
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
  }

  bindEvents() {
    this.$target.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.$state.todo.trim() === "" || this.$state.todo.trim() === " ")
        return;
      this.emit("add", this.$state.todo);
      this.setState({ todo: "" });
    });

    this.$target.querySelector("input").addEventListener("change", (e) => {
      this.setState({ todo: e.target.value });
      e.target.value = "";
    });
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
