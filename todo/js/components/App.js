import { getStorage, setStorage } from "../api/index.js";
import { initialRoutes, setRoutes } from "../router/index.js";
import Input from "./Input/index.js";
import List from "./List/index.js";
import Modal from "./Modal/index.js";

export default class App {
  constructor({ parent }) {
    // this.$parent = parent;
    this.$target = App.createElement();
    this.$input = null;
    this.$list = null;
    this.$modal = null;
    this.isRendering = false;
    this.init();
  }

  static createElement() {
    const container = document.createElement("div");
    container.classList.add("container");

    return container;
  }

  bindEvents() {
    this.$input.on("add", (todo) => this.add(todo));
    this.$list.on("remove", (index) => {
      this.$modal.confirm(`is it delete?`);
      this.$modal.on("remove", () => this.remove(index));
    });
  }

  add(todo = "") {
    this.$list.setState({ todos: [...this.$list.$state.todos, todo] });
    setStorage("todos", this.$list.$state.todos);
  }

  remove(index = -1) {
    this.$list.setState({
      todos: [
        ...this.$list.$state.todos.slice(0, index),
        ...this.$list.$state.todos.slice(
          index + 1,
          this.$list.$state.todos.length
        ),
      ],
    });
    setStorage("todos", this.$list.$state.todos);
  }

  getTodos() {
    this.$list.setState({ todos: getStorage("todos") });
  }

  init() {
    // 렌더링 2번 되는거 방지
    if (this.isRendering) return;
    this.isRendering = true;

    // this.$parent?.appendChild(this.$target);
    this.$input = new Input({ parent: this.$target });
    this.$list = new List({ parent: this.$target });
    this.$modal = new Modal({ parent: document.body });

    this.getTodos();
    this.bindEvents();
  }
}
