export default class Arrow {
  constructor(type) {
    this.type = type;
    this.$target = document.createElement("i");
    this.init();
    this.bindEvents();
  }

  init() {
    document.body.querySelector("#app").appendChild(this.$target);

    this.$target.classList.add("arrow");
    if (this.type === "down") {
      this.$target.classList.add("down");
    }

    if (this.type === "right") {
      this.$target.classList.add("right");
    }

    if (this.type === "left") {
      this.$target.classList.add("down");
    }

    if (this.type === "up") {
      this.$target.classList.add("up");
    }

    return this;
  }

  setup({ className, position }) {
    this.$target.classList.add(className);
    if (position === "down") {
      this.$target.classList.add("pos-down");
    }

    if (position === "right") {
      this.$target.classList.add("pos-right");
    }

    if (position === "left") {
      this.$target.classList.add("pos-left");
    }

    if (position === "up") {
      this.$target.classList.add("pos-up");
    }
  }

  bindEvents() {
    this.$target.addEventListener("click", () => {
      window.scrollTo({ top: document.body.offsetHeight, behavior: "smooth" });
    });
  }
}
