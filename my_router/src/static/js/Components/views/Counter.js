export default class Couter {
  constructor() {
    this.setTitle("Posts");
    this.$state = {
      counter: 0,
    };
    this.bindEvents();
  }
  setTitle(title) {
    document.title = title;
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
    this.emit("view");
  }

  bindEvents() {
    document.querySelector("main").addEventListener("click", (e) => {
      if (e.target.classList.contains("up-btn")) {
        this.setState({ counter: this.$state.counter + 1 });
      }
    });
  }

  render() {
    return `
            <button class="up-btn">UP</button>
            <p>${this.$state.counter}</p>
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
