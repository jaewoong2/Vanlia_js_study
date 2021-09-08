import { Component } from "../../core/index.js";

export default class Settings extends Component {
  constructor() {
    super({});
    this.$target = Settings.createElement();
    this.setTitle("Settings");
    this.init();
  }

  static createElement() {
    const container = document.createElement("div");
    const form = document.createElement("form");
    const input = document.createElement("input");
    const button = document.createElement("button");

    form.id = "form";
    input.id = "input";

    form.appendChild(input);
    form.appendChild(button);
    container.appendChild(form);

    button.innerText = "Set";
    input.placeholder = "Name";
    input.type = "text";

    return container;
  }

  setTitle(title) {
    document.title = title;
  }

  bindEvents() {
    const form = this.$target.querySelector("form");
    const input = this.$target.querySelector("input");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (
        input.value.trim() === "" ||
        input.value.trim() === " " ||
        this.$state?.name.trim() === "" ||
        this.$state?.name.trim() === " "
      )
        return;
      this.useEvent("setName", this.$state.name);
      this.setState({ name: "" });
      input.value = "";
    });

    input.addEventListener("change", (e) => {
      this.setState({ name: e.target.value });
    });
  }

  init() {
    this.bindEvents();
  }

  render() {
    return this.$target;
  }
}
