const initialState = { todos: ["Study", "Exam"] };

export default class List {
  constructor({ parent }) {
    this.$parent = parent;
    this.$target = List.createElement();
    this.$state = initialState;
    this.init();
  }

  static createElement() {
    const container = document.createElement("ul");
    container.classList.add("list");

    return container;
  }

  init() {
    this.$parent?.appendChild(this.$target);
    this.bindEvents();
    this.render();
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
    this.render();
  }

  bindEvents() {
    this.$target.querySelectorAll(".delete-btn").forEach((button, i) => {
      button.addEventListener("click", () => this.emit("remove", i));
    });
  }

  render() {
    const listElement =
      this.$state.todos.length > 0
        ? this.$state.todos
            .map(
              (todo, i) => `
        <li>
            <span>${i + 1}- ${todo}</span>
            <span class="delete-btn">x</span>
        </li>
          `
            )
            .join("")
        : `<div>No Todos Today...</div>`;

    this.$target.innerHTML = listElement;
    this.bindEvents();
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
