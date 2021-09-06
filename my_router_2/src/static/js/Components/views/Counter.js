export default class Couter {
  constructor(props) {
    this.setTitle("Posts");
    this.$state = {
      props,
      ...props,
    };
  }

  setTitle(title) {
    document.title = title;
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
  }

  bindEvents() {
    document.querySelector("main").addEventListener("click", (e) => {
      if (e.target.classList.contains("up-btn")) {
        this.$state.setCounter();
        this.emit("view");
      }
    });
    this.emit("subscribe", {
      props: Object.keys(this.$state.props),
      component: this,
    });
  }

  render() {
    return `
            <button class="up-btn">UP</button>
            <p>${this.$state.count}</p>
        `;
  }

  on(eventName, callback) {
    this.events = this.events ? this.events : {};
    this.events[eventName] = callback;
  }

  emit(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }
}
