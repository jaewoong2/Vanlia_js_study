import { Component } from "../../core/index.js";

export default class Dashboard extends Component {
  constructor({ props }) {
    super({ props });
    this.setTitle("DashBoard");
    this.$state = {
      ...props,
    };
    this.init();
  }

  setTitle(title) {
    document.title = title;
  }

  setState(state) {
    this.$state = { ...this.$state, ...state };
    this.render();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {}

  render() {
    return `
        <h1>Welcome back, ${this.$state.name + this.$state.count}</h1>
        <p>
            Fugiat voluptate et nisi Lorem cillum anim sit do eiusmod occaecat irure do. Reprehenderit anim fugiat sint exercitation consequat. Sit anim laborum sit amet Lorem adipisicing ullamco duis. Anim in do magna ea pariatur et.
        </p>
        <p>
            <a href="/posts" data-link>View recent posts</a>.
        </p>
    `;
  }
}
