import { Component } from "../../core/index.js";

export default class Couter extends Component {
  constructor({ props }) {
    super({ props });
    this.setTitle("Posts");
    this.$state = { ...props };
    this.init();
  }

  init() {
    this.bindEvents();
  }

  setTitle(title) {
    document.title = title;
  }

  bindEvents() {
    document.querySelector("main").addEventListener("click", (e) => {
      if (e.target.classList.contains("up-btn")) {
        this.$props.setCounter();
        this.useEvent("view");
      }
    });
  }

  render() {
    return `
            <button class="up-btn">UP</button>
            <p>${this.$props.count}</p>
        `;
  }
}
