export default class Dashboard {
  constructor({ initialState } = { initialState: { name: "User!" } }) {
    this.setTitle("DashBoard");
    this.$state = initialState;
  }
  setTitle(title) {
    document.title = title;
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
  }

  render() {
    return `
        <h1>Welcome back, ${this.$state.name}</h1>
        <p>
            Fugiat voluptate et nisi Lorem cillum anim sit do eiusmod occaecat irure do. Reprehenderit anim fugiat sint exercitation consequat. Sit anim laborum sit amet Lorem adipisicing ullamco duis. Anim in do magna ea pariatur et.
        </p>
        <p>
            <a href="/posts" data-link>View recent posts</a>.
        </p>
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
