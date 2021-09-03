export default class Posts {
  constructor() {
    this.setTitle("Posts");
  }
  setTitle(title) {
    document.title = title;
  }

  render() {
    return `
            <h1>Posts</h1>
            <p>You are viewing the posts!</p>
        `;
  }

  bindEvents() {
    this.emit("on", this.render());
  }

  on(eventName, callback) {
    this.events = this.events ? this.events : {};
    this.events[eventName] = callback;
  }

  emit(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }
}
